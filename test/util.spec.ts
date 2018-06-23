import "mocha"
import { expect } from "chai"
import { Util } from "../src/util"

describe("Util", () => {
  it("fenForOtherSide", done => {
    expect(Util.fenForOtherSide("5k2/8/8/6P1/8/4K3/8/8 w - - 0 1")).to.equal(
      "5k2/8/8/6P1/8/4K3/8/8 b - - 0 1"
    )
    expect(Util.fenForOtherSide("5k2/8/8/6P1/8/4K3/8/8 b - - 0 1")).to.equal(
      "5k2/8/8/6P1/8/4K3/8/8 w - - 0 2"
    )
    done()
  })

  it("fullFen", done => {
    expect(Util.fullFen("5k2/8/8/6P1/8/4K3/8/8 w - -")).to.equal(
      "5k2/8/8/6P1/8/4K3/8/8 w - - 0 2"
    )
    expect(Util.fullFen("5k2/8/8/6P1/8/4K3/8/8 b - -")).to.equal(
      "5k2/8/8/6P1/8/4K3/8/8 b - - 0 1"
    )
    expect(Util.fullFen("5k2/8/8/6P1/8/4K3/8/8 w - - 0 1")).to.equal(
      "5k2/8/8/6P1/8/4K3/8/8 w - - 0 1"
    )
    done()
  })
})
