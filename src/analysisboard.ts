import { StockfishQueue } from "./stockfishqueue"
import { Generator } from "./generator"
import { Shapes } from "./shapes"

export class AnalysisBoard {
  private readonly stockfishQueue
  private readonly chessground
  private shapes = new Shapes()
  
  constructor(stockfish, chessground) {
    this.stockfishQueue = new StockfishQueue(stockfish, console.log)
    this.chessground = chessground
  }

  perturb(fen, perturbedSquare) {
    this.clear()
    this.chessground.set({
      fen: fen,
      drawable: {
        enabled: false
      }
    })
    new Generator(fen).perturb(perturbedSquare).forEach(p => {
      this.stockfishQueue.enqueue(p, x => {
        this.annotate(x)
      })
    })
  }

  private clear() {
    this.shapes.clear()
    this.chessground.setShapes(this.shapes.shapes)
  }

  depth(depth) {
    this.stockfishQueue.depth = depth
  }
  
  private annotate(position) {
    this.shapes.annotate(position)
    this.chessground.setShapes(this.shapes.shapes)
  }
}
