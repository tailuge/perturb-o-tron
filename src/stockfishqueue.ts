import { Event } from "./event"

class WorkItem {
  public readonly fen
  public readonly onComplete
  public score

  constructor(fen, onComplete) {
    this.fen = fen
    this.onComplete = onComplete
  }
}

export class StockfishQueue {
  private readonly stockfish
  private log
  private workItems: WorkItem[] = []

  constructor(stockfish, log) {
    this.stockfish = stockfish
    this.log = log
    this.stockfish.postMessage("setoption name MultiPV value 1")
    this.stockfish.addEventListener("message", event => {
      this.sfEventHandler(event.data)
    })
  }

  private sfEventHandler(event) {
    this.log(event)
    const e = new Event(event)
    if (e.isComplete()) {
      this.log("complete")
      let completeItem = this.workItems.shift()
      completeItem && completeItem.onComplete(completeItem.score)
      if (this.workItems.length > 0) {
        this.processNextWorkItem()
      }
      return
    }

    var score = e.score(this.workItems[0].fen)
    if (score != "noScore") {
      this.workItems[0].score = score
      this.log("parsed as " + score)
      return
    }
    this.log("ignored")
  }

  enqueue(fen, onComplete) {
    this.workItems.push(new WorkItem(fen, onComplete))
    if (this.workItems.length == 1) {
      this.processNextWorkItem()
    }
  }

  private processNextWorkItem() {
    let fen = this.workItems[0].fen
    this.log("sending fen to stockfish for scoring : " + fen)
    this.stockfish.postMessage("position fen " + fen)
    this.stockfish.postMessage("go depth 8")
  }
}
