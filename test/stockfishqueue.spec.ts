import "mocha"
import { StockfishQueue } from "../src/stockfishqueue"
import * as sinon from "sinon"

describe("StockfishQueue", () => {
  it("Initialise ok", done => {
    var mocksf = { postMessage: ({}) => {}, addEventListener: ({}, {}) => {} }
    var mocklog = sinon.mock(console.log)
    new StockfishQueue(mocksf, mocklog)
    done()
  })
})
