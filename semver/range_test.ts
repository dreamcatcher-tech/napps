// Copyright Isaac Z. Schlueter and Contributors. All rights reserved. ISC license.
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
import { assert } from "../assert/mod.ts";
import { parse } from "./parse.ts";
import { parseRange } from "./parse_range.ts";
import { testRange } from "./test_range.ts";

Deno.test("range", async (t) => {
  const versions: [string, string][] = [
    ["1.0.0 - 2.0.0", "1.2.3"],
    ["^1.2.3+build", "1.2.3"],
    ["^1.2.3+build", "1.3.0"],
    ["1.2.3-pre+asdf - 2.4.3-pre+asdf", "1.2.3"],
    ["1.2.3-pre+asdf - 2.4.3-pre+asdf", "1.2.3-pre.2"],
    ["1.2.3-pre+asdf - 2.4.3-pre+asdf", "2.4.3-alpha"],
    ["1.2.3+asdf - 2.4.3+asdf", "2.4.3-alpha"],
    ["1.2.3+asdf - 2.4.3+asdf", "2.4.3"],
    ["1.0.0", "1.0.0"],
    [">=*", "0.2.4"],
    ["", "1.0.0"],
    ["*", "1.2.3"],
    [">1.0.0", "1.1.0"],
    ["<=2.0.0", "2.0.0"],
    ["<=2.0.0", "1.9999.9999"],
    ["<=2.0.0", "0.2.9"],
    ["<2.0.0", "1.9999.9999"],
    ["<2.0.0", "0.2.9"],
    [">=0.1.97", "0.1.97"],
    ["0.1.20 || 1.2.4", "1.2.4"],
    [">=0.2.3 || <0.0.1", "0.0.0"],
    [">=0.2.3 || <0.0.1", "0.2.3"],
    [">=0.2.3 || <0.0.1", "0.2.4"],
    ["||", "1.3.4"],
    ["2.x.x", "2.1.3"],
    ["1.2.x", "1.2.3"],
    ["1.2.x || 2.x", "2.1.3"],
    ["1.2.x || 2.x", "1.2.3"],
    ["x", "1.2.3"],
    ["2.*.*", "2.1.3"],
    ["1.2.*", "1.2.3"],
    ["1.2.* || 2.*", "2.1.3"],
    ["1.2.* || 2.*", "1.2.3"],
    ["*", "1.2.3"],
    ["2", "2.1.2"],
    ["2.3", "2.3.1"],
    ["~0.0.1", "0.0.1"],
    ["~0.0.1", "0.0.2"],
    ["~x", "0.0.9"], // >=2.4.0 <2.5.0
    ["~2", "2.0.9"], // >=2.4.0 <2.5.0
    ["~2.4", "2.4.0"], // >=2.4.0 <2.5.0
    ["~2.4", "2.4.5"],
    ["~>3.2.1", "3.2.2"], // >=3.2.1 <3.3.0,
    ["~1", "1.2.3"], // >=1.0.0 <2.0.0
    ["~>1", "1.2.3"],
    ["~1.0", "1.0.2"], // >=1.0.0 <1.1.0,
    [">=1", "1.0.0"],
    ["<1.2", "1.1.1"],
    ["~v0.5.4-pre", "0.5.5"],
    ["~v0.5.4-pre", "0.5.4"],
    ["=0.7.x", "0.7.2"],
    ["<=0.7.x", "0.7.2"],
    [">=0.7.x", "0.7.2"],
    ["<=0.7.x", "0.6.2"],
    ["~1.2.1 >=1.2.3", "1.2.3"],
    ["~1.2.1 =1.2.3", "1.2.3"],
    ["~1.2.1 1.2.3", "1.2.3"],
    ["~1.2.1 >=1.2.3 1.2.3", "1.2.3"],
    ["~1.2.1 1.2.3 >=1.2.3", "1.2.3"],
    ["~1.2.1 1.2.3", "1.2.3"],
    [">=1.2.1 1.2.3", "1.2.3"],
    ["1.2.3 >=1.2.1", "1.2.3"],
    [">=1.2.3 >=1.2.1", "1.2.3"],
    [">=1.2.1 >=1.2.3", "1.2.3"],
    ["<=1.2.3", "1.2.3-beta"],
    [">=1.2", "1.2.8"],
    ["^1.2.3", "1.8.1"],
    ["^0.1.2", "0.1.2"],
    ["^0.1", "0.1.2"],
    ["^0.0.1", "0.0.1"],
    ["^1.2", "1.4.2"],
    ["^1.2 ^1", "1.4.2"],
    ["^1.2.3-alpha", "1.2.3-pre"],
    ["^1.2.0-alpha", "1.2.0-pre"],
    ["^0.0.1-alpha", "0.0.1-beta"],
    ["^0.0.1-alpha", "0.0.1"],
    ["^0.1.1-alpha", "0.1.1-beta"],
    ["^x", "1.2.3"],
    ["x - 1.0.0", "0.9.7"],
    ["x - 1.x", "0.9.7"],
    ["1.0.0 - x", "1.9.7"],
    ["1.x - x", "1.9.7"],
    ["<=7.x", "7.9.9"],
  ];

  for (const [r, v] of versions) {
    await t.step(`${r} ∋ ${v}`, () => {
      const range = parseRange(r);
      const s = parse(v);
      assert(testRange(s, range));
    });
  }
});

Deno.test({
  name: "negativeRange",
  fn: async (t) => {
    const versions: [string, string][] = [
      ["1.0.0 - 2.0.0", "2.2.3"],
      ["1.2.3+asdf - 2.4.3+asdf", "1.2.3-pre.2"],
      ["^1.2.3+build", "2.0.0"],
      ["^1.2.3+build", "1.2.0"],
      ["1.2.3-pre+asdf - 2.4.3-pre+asdf", "2.4.3"],
      ["^1.2.3", "1.2.3-pre"],
      ["^1.2", "1.2.0-pre"],
      [">1.2", "1.3.0-beta"],

      ["<=1.2.3", "1.2.4-beta"],
      ["^1.2.3", "1.2.3-beta"],
      ["<1.2.3", "1.2.3-beta"],
      ["=1.2.3", "1.2.3-beta"],

      ["=0.7.x", "0.7.0-asdf"],
      [">=0.7.x", "0.7.0-asdf"],
      ["1.0.0", "1.0.1"],
      [">=1.0.0", "0.0.0"],
      [">=1.0.0", "0.0.1"],
      [">=1.0.0", "0.1.0"],
      [">1.0.0", "0.0.1"],
      [">1.0.0", "0.1.0"],
      ["<=2.0.0", "3.0.0"],
      ["<=2.0.0", "2.9999.9999"],
      ["<=2.0.0", "2.2.9"],
      ["<2.0.0", "2.9999.9999"],
      ["<2.0.0", "2.2.9"],
      [">=0.1.97", "0.1.93"],
      ["0.1.20 || 1.2.4", "1.2.3"],
      [">=0.2.3 || <0.0.1", "0.0.3"],
      [">=0.2.3 || <0.0.1", "0.2.2"],
      ["2.x.x", "3.1.3"],
      ["1.2.x", "1.3.3"],
      ["1.2.x || 2.x", "3.1.3"],
      ["1.2.x || 2.x", "1.1.3"],
      ["2.*.*", "1.1.3"],
      ["2.*.*", "3.1.3"],
      ["1.2.*", "1.3.3"],
      ["1.2.* || 2.*", "3.1.3"],
      ["1.2.* || 2.*", "1.1.3"],
      ["2", "1.1.2"],
      ["2.3", "2.4.1"],
      ["~0.0.1", "0.1.0-alpha"],
      ["~0.0.1", "0.1.0"],
      ["~2.4", "2.5.0"], // >=2.4.0 <2.5.0
      ["~2.4", "2.3.9"],
      ["~>3.2.1", "3.3.2"], // >=3.2.1 <3.3.0
      ["~>3.2.1", "3.2.0"], // >=3.2.1 <3.3.0
      ["~1", "0.2.3"], // >=1.0.0 <2.0.0
      ["~>1", "2.2.3"],
      ["~1.0", "1.1.0"], // >=1.0.0 <1.1.0
      ["<1", "1.0.0"],
      [">=1.2", "1.1.1"],
      ["~v0.5.4-beta", "0.5.4-alpha"],
      ["=0.7.x", "0.8.2"],
      [">=0.7.x", "0.6.2"],
      ["<0.7.x", "0.7.2"],
      [">1.2", "1.2.8"],
      ["^0.0.1", "0.0.2-alpha"],
      ["^0.0.1", "0.0.2"],
      ["^1.2.3", "2.0.0-alpha"],
      ["^1.2.3", "1.2.2"],
      ["^1.2", "1.1.9"],

      // invalid ranges never satisfied!
      ["blerg", "1.2.3"],
      ["^1.2.3", "2.0.0-pre"],
    ];

    for (const [r, v] of versions) {
      await t.step(`${r} ∌ ${v}`, () => {
        const range = parseRange(r);
        const s = parse(v);
        const found = testRange(s, range);
        assert(!found);
      });
    }
  },
});

Deno.test("unlockedPrereleaseRange", function () {
  const versions: [string, string][] = [
    ["*", "1.0.0-rc1"],
    ["^1.0.0-0", "1.0.1-rc1"],
    ["^1.0.0-rc2", "1.0.1-rc1"],
    ["^1.0.0", "1.0.1-rc1"],
    ["^1.0.0", "1.1.0-rc1"],
  ];

  for (const [r, v] of versions) {
    const range = parseRange(r);
    const s = parse(v);
    const found = testRange(s, range);
    assert(found, `${r} not satisfied by ${v}`);
  }
});

Deno.test("negativeUnlockedPrereleaseRange", function () {
  const versions: [string, string][] = [
    ["^1.0.0", "1.0.0-rc1"],
    ["^1.2.3-rc2", "2.0.0"],
    ["^1.0.0", "2.0.0-rc1"], // todo: review, this is inverted from original test case
  ];

  for (const [r, v] of versions) {
    const range = parseRange(r);
    const s = parse(v);
    const found = testRange(s, range);
    assert(!found, `${v} satisfied by ${r} unexpectedly`);
  }
});