import 'mocha'
import { StockfishQueue } from '../src/stockfishqueue'

describe("StockfishQueue", () => {
  it("Initialise ok", (done) => {
    new StockfishQueue(null)
    done()
  })
})
