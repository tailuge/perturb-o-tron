import "mocha"
import { expect } from "chai"
import { Event } from "../src/event"

describe("Event", () => {
  it("isComplete parses correctly", done => {
    let event =
      "info depth 1 seldepth 2 multipv 1 score cp 4750 nodes 20 nps 10000 tbhits 0 time 2 pv h8g7"
    expect(new Event(event).isComplete()).to.be.false
    expect(new Event("bestmove h8g7 ponder h1g2").isComplete()).to.be.true
    done()
  })

  it("bestMove parses correctly", done => {
    expect(new Event("bestmove h8g7 ponder h1g2").bestMove()).to.equal("h8g7")
    expect(new Event("bestmove ").bestMove()).to.equal("")
    done()
  })

  it("score eval correctly", done => {
    expect(new Event("a score cp 4750 n").score()).to.equal("win")
    expect(new Event("a score cp -4750 n").score()).to.equal("lose")
    expect(new Event("a score cp -50 n").score()).to.equal("drawn")
    done()
  })

  it("score mate correctly", done => {
    expect(new Event("a score mate 1 n").score()).to.equal("win")
    expect(new Event("a score mate -2 n").score()).to.equal("lose")
    done()
  })

  it("score ignores other messages", done => {
    expect(new Event("status message").score()).to.equal("noScore")
    done()
  })

  it("extract pv correctly", done => {
    expect(new Event("other pv a1a2 b5b4").pv()).to.deep.equal(["a1a2", "b5b4"])
    done()
  })
})
