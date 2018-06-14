import { Event } from "./event"

export class StockfishQueue {
  private readonly stockfish
  private log

  constructor(stockfish, log) {
    this.stockfish = stockfish
    this.log = log
    this.stockfish.postMessage("setoption name MultiPV value 1")
    this.stockfish.addEventListener("message", event => {
      this.sfEventHandler(event.data)
    })
  }

  sfEventHandler(event) {
    this.log(event.data)
    const e = new Event(event)
    if (e.isComplete()) {
      //      taskComplete();
    }

    var score = e.score("fen")
    this.log(score)
  }

  solveFen(fen) {
    this.log("sending fen to stockfish for scoring : " + fen)
    this.stockfish.postMessage("position fen " + fen)
    this.stockfish.postMessage("go depth 8")
  }
}
