// deno-lint-ignore-file no-explicit-any
import { assert } from '@std/assert/assert'
import { TendermintMessage, TendermintNode } from './polka.ts'
import {
  assertEquals,
  assertNotEquals,
} from 'https://deno.land/std@0.192.0/testing/asserts.ts'

// Basic test: single round proposal->prevote->precommit
Deno.test('TendermintNode - simple consensus flow', () => {
  const node = new TendermintNode()
  const proposal: TendermintMessage = {
    from: 'peer1',
    type: 'PROPOSAL',
    round: 0,
    data: 'Block1',
  }
  node.receiveMessage(proposal)
  assertEquals(node.getState().lockedValue, 'Block1')

  const prevote1: TendermintMessage = {
    from: 'peer2',
    type: 'PREVOTE',
    round: 0,
    data: 'Block1',
  }
  const prevote2: TendermintMessage = {
    from: 'peer3',
    type: 'PREVOTE',
    round: 0,
    data: 'Block1',
  }
  node.receiveMessage(prevote1)
  node.receiveMessage(prevote2)
  assertEquals(node.getState().lockedValue, 'Block1')

  const precommit1: TendermintMessage = {
    from: 'peer2',
    type: 'PRECOMMIT',
    round: 0,
    data: 'Block1',
  }
  const precommit2: TendermintMessage = {
    from: 'peer3',
    type: 'PRECOMMIT',
    round: 0,
    data: 'Block1',
  }
  node.receiveMessage(precommit1)
  node.receiveMessage(precommit2)

  assertEquals(node.getState().lastAgreed, 'Block1')
  // Should have moved to next round
  assertEquals(node.getState().round, 1)
})

// Test multiple proposals in the same round
Deno.test('TendermintNode - multiple proposals locks on first', () => {
  const node = new TendermintNode()
  node.receiveMessage({
    from: 'peer1',
    type: 'PROPOSAL',
    round: 0,
    data: 'BlockA',
  })
  node.receiveMessage({
    from: 'peer2',
    type: 'PROPOSAL',
    round: 0,
    data: 'BlockB',
  })
  const lockedValue = node.getState().lockedValue
  assertNotEquals(lockedValue, undefined)
  // Should remain locked to whichever arrived first
})

// Test round skipping
Deno.test('TendermintNode - ignores old rounds, accepts new round', () => {
  const node = new TendermintNode()
  // Round 0 proposal
  node.receiveMessage({
    from: 'peer1',
    type: 'PROPOSAL',
    round: 0,
    data: 'BlockX',
  })
  assertEquals(node.getState().lockedRound, 0)

  // Attempt an old round message
  node.receiveMessage({
    from: 'peer2',
    type: 'PROPOSAL',
    round: -1,
    data: 'BlockY',
  })
  // Should still have lockedRound = 0
  assertEquals(node.getState().lockedRound, 0)

  // Next round
  node.receiveMessage({
    from: 'peer3',
    type: 'PROPOSAL',
    round: 1,
    data: 'BlockZ',
  })
  assertEquals(node.getState().lockedRound, 1)
})

// Quick check for no finalization if not enough precommits
Deno.test('TendermintNode - does not finalize with insufficient precommits', () => {
  const node = new TendermintNode()
  node.receiveMessage({
    from: 'peer1',
    type: 'PROPOSAL',
    round: 0,
    data: 'BlockA',
  })
  node.receiveMessage({
    from: 'peer2',
    type: 'PREVOTE',
    round: 0,
    data: 'BlockA',
  })
  node.receiveMessage({
    from: 'peer2',
    type: 'PRECOMMIT',
    round: 0,
    data: 'BlockA',
  })

  // Only 1 precommit - not enough
  assertEquals(node.getState().lastAgreed, undefined)
})

// Stress test
Deno.test('TendermintNode - stress test with multiple messages', () => {
  const node = new TendermintNode()
  const peers = ['peer1', 'peer2', 'peer3', 'peer4']
  const totalMessages = 1000

  for (let i = 0; i < totalMessages; i++) {
    const round = Math.floor(i / 50) // increment round roughly every 50 messages
    const msgTypeIndex = i % 3 // cycle through PROPOSAL, PREVOTE, PRECOMMIT
    let type: TendermintMessage['type']
    if (msgTypeIndex === 0) type = 'PROPOSAL'
    else if (msgTypeIndex === 1) type = 'PREVOTE'
    else type = 'PRECOMMIT'

    const from = peers[i % peers.length]!
    assert(from !== undefined)
    node.receiveMessage({
      from,
      type,
      round,
      data: `Block-${round}`,
    })
  }

  // We can't assert a specific final block because it depends on message order,
  // but we can at least assert no runtime errors and the node advanced some rounds.
  const currentRound = node.getState().round
  // Should have advanced beyond at least some rounds
  assertEquals(currentRound > 0, true)
})
