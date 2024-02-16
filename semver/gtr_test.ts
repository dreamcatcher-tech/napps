// Copyright Isaac Z. Schlueter and Contributors. All rights reserved. ISC license.
// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
import { assert } from "../assert/mod.ts";
import { gtr } from "./gtr.ts";
import { parse } from "./parse.ts";
import { parseRange } from "./parse_range.ts";

Deno.test("gtr", async (t) => {
  // [range, version]
  // Version should be greater than range
  const versions: [string, string][] = [
    ["~1.2.2", "1.3.0"],
    ["~0.6.1-1", "0.7.1-1"],
    ["1.0.0 - 2.0.0", "2.0.1"],
    ["1.0.0", "1.0.1-beta1"],
    ["1.0.0", "2.0.0"],
    ["<=2.0.0", "2.1.1"],
    ["<=2.0.0", "3.2.9"],
    ["<2.0.0", "2.0.0"],
    ["0.1.20 || 1.2.4", "1.2.5"],
    ["2.x.x", "3.0.0"],
    ["1.2.x", "1.3.0"],
    ["1.2.x || 2.x", "3.0.0"],
    ["2.*.*", "5.0.1"],
    ["1.2.*", "1.3.3"],
    ["1.2.* || 2.*", "4.0.0"],
    ["2", "3.0.0"],
    ["2.3", "2.4.2"],
    ["~2.4", "2.5.0"], // >=2.4.0 <2.5.0
    ["~2.4", "2.5.5"],
    ["~>3.2.1", "3.3.0"], // >=3.2.1 <3.3.0
    ["~1", "2.2.3"], // >=1.0.0 <2.0.0
    ["~>1", "2.2.4"],
    ["~1.0", "1.1.2"], // >=1.0.0 <1.1.0
    ["<1.2", "1.2.0"],
    ["~v0.5.4-pre", "0.6.0"],
    ["~v0.5.4-pre", "0.6.1-pre"],
    ["=0.7.x", "0.8.0"],
    ["=0.7.x", "0.8.0-asdf"],
    ["<0.7.x", "0.7.0"],
    ["~1.2.2", "1.3.0"],
    ["1.0.0 - 2.0.0", "2.2.3"],
    ["1.0.0", "1.0.1"],
    ["<=2.0.0", "3.0.0"],
    ["<=2.0.0", "2.9999.9999"],
    ["<=2.0.0", "2.2.9"],
    ["<2.0.0", "2.9999.9999"],
    ["<2.0.0", "2.2.9"],
    ["2.x.x", "3.1.3"],
    ["1.2.x", "1.3.3"],
    ["1.2.x || 2.x", "3.1.3"],
    ["2.*.*", "3.1.3"],
    ["1.2.*", "1.3.3"],
    ["1.2.* || 2.*", "3.1.3"],
    ["2", "3.1.2"],
    ["2.3", "2.4.1"],
    ["~2.4", "2.5.0"], // >=2.4.0 <2.5.0
    ["~>3.2.1", "3.3.2"], // >=3.2.1 <3.3.0
    ["~1", "2.2.3"], // >=1.0.0 <2.0.0
    ["~>1", "2.2.3"],
    ["~1.0", "1.1.0"], // >=1.0.0 <1.1.0
    ["<1", "1.0.0"],
    ["=0.7.x", "0.8.2"],
    ["<0.7.x", "0.7.2"],
  ];

  for (const [a, b] of versions) {
    await t.step(`${b} > ${a}`, () => {
      const r = parseRange(a);
      const s = parse(b);
      assert(gtr(s, r));
    });
  }
});

Deno.test("gtrNegative", async (t) => {
  const versions: [string, string][] = [
    ["~0.6.1-1", "0.6.1-1"],
    ["1.0.0 - 2.0.0", "1.2.3"],
    ["1.0.0 - 2.0.0", "0.9.9"],
    ["1.0.0", "1.0.0"],
    [">=*", "0.2.4"],
    ["*", "1.2.3"],
    ["*", "v1.2.3-foo"],
    [">=1.0.0", "1.0.0"],
    [">=1.0.0", "1.0.1"],
    [">=1.0.0", "1.1.0"],
    [">1.0.0", "1.0.1"],
    [">1.0.0", "1.1.0"],
    ["<=2.0.0", "2.0.0"],
    ["<=2.0.0", "1.9999.9999"],
    ["<=2.0.0", "0.2.9"],
    ["<2.0.0", "1.9999.9999"],
    ["<2.0.0", "0.2.9"],
    [">=0.1.97", "v0.1.97"],
    [">=0.1.97", "0.1.97"],
    ["0.1.20 || 1.2.4", "1.2.4"],
    ["0.1.20 || >1.2.4", "1.2.4"],
    ["0.1.20 || 1.2.4", "1.2.3"],
    ["0.1.20 || 1.2.4", "0.1.20"],
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
    ["1.2.* || 2.*", "1.2.3"],
    ["*", "1.2.3"],
    ["2", "2.1.2"],
    ["2.3", "2.3.1"],
    ["~2.4", "2.4.0"], // >=2.4.0 <2.5.0
    ["~2.4", "2.4.5"],
    ["~>3.2.1", "3.2.2"], // >=3.2.1 <3.3.0
    ["~1", "1.2.3"], // >=1.0.0 <2.0.0
    ["~>1", "1.2.3"],
    ["~1.0", "1.0.2"], // >=1.0.0 <1.1.0
    [">=1", "1.0.0"],
    ["<1.2", "1.1.1"],
    ["~v0.5.4-pre", "0.5.5"],
    ["~v0.5.4-pre", "0.5.4"],
    ["=0.7.x", "0.7.2"],
    [">=0.7.x", "0.7.2"],
    ["=0.7.x", "0.7.0-asdf"],
    [">=0.7.x", "0.7.0-asdf"],
    ["<=0.7.x", "0.6.2"],
    [">0.2.3 >0.2.4 <=0.2.5", "0.2.5"],
    [">=0.2.3 <=0.2.4", "0.2.4"],
    ["1.0.0 - 2.0.0", "2.0.0"],
    ["^1", "0.0.0-0"],
    ["^3.0.0", "2.0.0"],
    ["^1.0.0 || ~2.0.1", "2.0.0"],
    ["^0.1.0 || ~3.0.1 || 5.0.0", "3.2.0"],
    ["^0.1.0 || ~3.0.1 || >4 <=5.0.0", "3.5.0"],
  ];

  for (const [a, b] of versions) {
    await t.step(`${b} ≯ ${a}`, () => {
      const range = parseRange(a);
      const version = parse(b);
      assert(!gtr(version, range));
    });
  }
});