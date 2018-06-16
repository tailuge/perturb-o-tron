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

  it("score mate correctly for white", done => {
    expect(new Event("a score mate 1 n").score("w")).to.equal("whiteWin")
    expect(new Event("a score mate -2 n").score("w")).to.equal("blackWin")
    done()
  })

  it("score mate correctly for black", done => {
    expect(new Event("a score mate 1 n").score("b")).to.equal("blackWin")
    expect(new Event("a score mate -2 n").score("b")).to.equal("whiteWin")
    done()
  })

  it("score ignores other messages", done => {
    expect(new Event("status message").score("b")).to.equal("noScore")
    done()
  })
})

//info depth 6 seldepth 2 multipv 1 score mate 1 n
