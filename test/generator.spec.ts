import "mocha"
import { expect } from "chai"
import { Generator } from "../src/generator"

describe("Generator", () => {
  it("Initialise ok", done => {
    new Generator("5k2/8/8/6P1/8/4K3/8/8 w - -")
    done()
  })

  it("No positions generated for empty origin square", done => {
    let generator = new Generator("5k2/8/8/6P1/8/4K3/8/8 w - - 0 1")
    expect(generator.perturb("a1")).to.deep.equal([])
    done()
  })

  it("Positions generated for perturbed king", done => {
    let generator = new Generator("5k2/8/8/6P1/8/4K3/8/8 w - - 0 1")
    expect(generator.perturb("e3").length).to.equal(57)
    done()
  })
})
