import "mocha"
import { StockfishQueue } from "../src/stockfishqueue"
import * as sinon from "sinon"

describe("StockfishQueue", () => {

  var stockfishInterface
  var postMessage
  var addEventListener
  
  beforeEach(function() {
    stockfishInterface = { postMessage: ({}) => {}, addEventListener: ({}, {}) => {} }
    postMessage = sinon.spy(stockfishInterface,"postMessage")
    addEventListener = sinon.spy(stockfishInterface,"addEventListener")
  })

  afterEach(function() {
    postMessage.resetHistory()
    addEventListener.resetHistory()
  })

  it("Initialise ok", done => {
    new StockfishQueue(stockfishInterface, ({}) => {})
    sinon.assert.calledOnce(postMessage)
    sinon.assert.calledOnce(addEventListener)
    done()
  })
  
  it("Enqueue calls stockfish", done => {
    let stockfishQueue = new StockfishQueue(stockfishInterface, ({}) => {})
    stockfishQueue.enqueue("7k/8/8/8/8/8/R7/R6K w - -", ({}) => {})
    sinon.assert.calledOnce(addEventListener)
    sinon.assert.calledThrice(postMessage)
    done()
  })

})
