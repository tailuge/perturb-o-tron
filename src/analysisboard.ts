import { StockfishQueue } from "./stockfishqueue"
import { Generator } from "./generator"
//import { Chessground } from "chessground"

export class AnalysisBoard {
  private readonly stockfishQueue
  private readonly chessground
  private shapes: any[] = []

  constructor(stockfish, chessground) {
    this.stockfishQueue = new StockfishQueue(stockfish, console.log)
    this.chessground = chessground
  }

  perturb(fen, perturbedSquare) {
    this.clear()
    new Generator(fen).perturb(perturbedSquare).forEach(p => {
      this.stockfishQueue.enqueue(p, x => {
        this.annotate(x)
      })
    })
  }

  private clear() {
    this.shapes = []
    this.chessground.setShapes(this.shapes)
  }

  private annotate(position) {
    this.shapes.push({
      orig: position.targetSquare,
      brush: this.brush(position.score)
    })
    let bestMove = position.bestMove
    this.shapes.push({
      orig: bestMove.substring(0, 2),
      dest: bestMove.substring(2, 4),
      brush: this.brush(position.score)
    })
    this.chessground.setShapes(this.shapes)
  }

  private brush(score) {
    switch (score) {
      case "whiteWin":
        return "green"
      case "blackWin":
        return "red"
      case "drawn":
        return "yellow"
      default:
        return "blue"
    }
  }
}
