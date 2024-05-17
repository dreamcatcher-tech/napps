import * as secp from '@noble/secp256k1'
import {
  ArtifactMachine,
  EngineInterface,
  isValidForMachine,
  JsonValue,
  PID,
  print,
  ROOT_SESSION,
} from './web-client.types.ts'
import { Session } from './web-client-session.ts'
import { ulid } from 'ulid'

/**
 * Create a shell that is targeted at the home chain, to avoid reimplementation
 * of the shell logic.
 * Ping should validate that the home chain exists on the server.
 */

export class Machine implements ArtifactMachine {
  readonly #engine: EngineInterface
  readonly #pid: PID
  readonly #privKey: Uint8Array
  readonly #pubKey: Uint8Array
  readonly #machineId: string
  #rootSessionPromise: Promise<Session>

  static load(engine: EngineInterface, privateKey: string) {
    if (!secp.utils.isValidPrivateKey(privateKey)) {
      throw new Error('Invalid private key')
    }
    return new Machine(engine, privateKey)
  }
  static generatePrivateKey() {
    return secp.etc.bytesToHex(secp.utils.randomPrivateKey())
  }
  static deriveMachineId(privateKey: string) {
    if (!secp.utils.isValidPrivateKey(privateKey)) {
      throw new Error('Invalid private key')
    }
    const pubKey = secp.getPublicKey(privateKey)
    return secp.etc.bytesToHex(pubKey)
  }

  private constructor(engine: EngineInterface, privateKey: string) {
    this.#engine = engine
    this.#privKey = secp.etc.hexToBytes(privateKey)
    this.#pubKey = secp.getPublicKey(this.#privKey)
    this.#machineId = secp.etc.bytesToHex(this.#pubKey)

    const actorId = this.#machineId
    const machineId = this.#machineId
    const branches = [...engine.homeAddress.branches, actorId, machineId]
    this.#pid = { ...engine.homeAddress, branches }
    this.#rootSessionPromise = this.#connect()
  }
  get rootTerminalPromise() {
    return this.#rootSessionPromise
  }
  get pid() {
    return this.#pid
  }
  get machineId() {
    return this.#machineId
  }
  clone() {
    return new Machine(this.#engine, secp.etc.bytesToHex(this.#privKey))
  }
  async #connect() {
    const branches = [...this.#pid.branches, ROOT_SESSION]
    const rootPid = { ...this.pid, branches }

    await this.#engine.ensureMachineTerminal(rootPid)
    return Session.resume(this.#engine, this, rootPid)
  }

  /** If the given pid is valid, uses that session, else creates a new one */
  openSession(retry?: PID): Session {
    if (retry) {
      if (!isValidForMachine(retry, this.pid)) {
        // TODO change to be isChildOf
        throw new Error('Invalid session pid: ' + print(retry))
      }
      return Session.resume(this.#engine, this, retry)
    }
    const pid = { ...this.pid, branches: [...this.pid.branches, ulid()] }
    return Session.create(this.#engine, this, pid)
  }
  ping(params?: { data?: JsonValue }) {
    return this.#engine.ping(params?.data)
    // TODO return some info about the deployment
    // version, deployment location, etc
    // if you want to ping in a chain, use an isolate
  }
}
