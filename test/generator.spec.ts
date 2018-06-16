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

  it("Pawn cannot be perturbed to end ranks", done => {
    let generator = new Generator("5k2/8/8/6P1/8/4K3/8/8 w - - 0 1")
    expect(generator.perturb("g5").length).to.equal(45)
    done()
  })

  it("Positions restricted for pinned black piece", done => {
    let generator = new Generator("7k/8/7r/8/8/7R/8/7K w - - 0 1")
    expect(generator.perturb("h3").length).to.equal(4)
    expect(generator.perturb("h6").length).to.equal(4)
    done()
  })

  it("Positions restricted for pinned white piece", done => {
    let generator = new Generator("7k/8/7r/8/8/7R/8/7K b - - 0 2")
    expect(generator.perturb("h3").length).to.equal(4)
    expect(generator.perturb("h6").length).to.equal(4)
    done()
  })
})
