import "mocha"
import { expect } from "chai"
import { Event } from "../src/event"

describe("Event", () => {
  it("isComplete parses correctly", done => {
    expect(
      new Event(
        "info depth 1 seldepth 2 multipv 1 score cp 4750 nodes 20 nps 10000 tbhits 0 time 2 pv h8g7"
      ).isComplete()
    ).to.be.false
    expect(new Event("bestmove h8g7 ponder h1g2").isComplete()).to.be.true
    done()
  })

  it("score correctly for white", done => {
    expect(new Event("a score cp 4750 n").score("w")).to.equal("whiteWin")
    expect(new Event("a score cp -4750 n").score("w")).to.equal("blackWin")
    expect(new Event("a score cp -50 n").score("w")).to.equal("drawn")

    done()
  })

  it("score correctly for black", done => {
    expect(new Event("a score cp 4750 n").score("b")).to.equal("blackWin")
    expect(new Event("a score cp -4750 n").score("b")).to.equal("whiteWin")
    expect(new Event("a score cp -50 n").score("b")).to.equal("drawn")
    done()
  })
})
