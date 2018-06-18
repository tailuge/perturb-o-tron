import { StockfishQueue } from "./stockfishqueue"
import { Generator } from "./generator"
import { Shapes } from "./shapes"

export class AnalysisBoard {
  private readonly stockfishQueue
  private readonly chessground
  private shapes = new Shapes()
  private onSelect

  constructor(stockfish, chessground) {
    this.stockfishQueue = new StockfishQueue(stockfish, console.log)
    this.chessground = chessground
  }

  static config(fen) {
    return {
      fen: fen,
      drawable: {
        enabled: false
      },
      selectable: {
        enabled: false
      },
      highlight: {
        lastMove: false,
        check: false
      }
    }
  }

  perturb(fen, perturbedSquare) {
    this.clear()
    this.chessground.set(AnalysisBoard.config(fen))
    new Generator(fen).perturb(perturbedSquare).forEach(p => {
      this.stockfishQueue.enqueue(p, x => {
        this.annotate(x)
      })
    })
  }

  depth(depth) {
    this.stockfishQueue.depth = depth
  }

  selectMode(onSelect) {
    this.onSelect = onSelect
    this.chessground.set({
      movable: {
        color: undefined
      },
      events: {
        select: x => this.selectPerturbedPiece(x)
      }
    })
  }

  selectPerturbedPiece(square) {
    console.log(square)
    this.chessground.setShapes([
      {
        orig: square,
        brush: "blue"
      }
    ])
    this.chessground.set({
      movable: {
        color: "both"
      },
      events: {
        select: undefined
      }
    })
    this.onSelect(square)
  }

  private clear() {
    this.shapes.clear()
    this.chessground.setShapes(this.shapes.shapes)
  }

  private annotate(position) {
    this.shapes.annotate(position)
    this.chessground.setShapes(this.shapes.shapes)
  }
}
