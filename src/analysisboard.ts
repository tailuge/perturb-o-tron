import { StockfishQueue } from "./stockfishqueue"
import { Generator } from "./generator"
import { Shapes } from "./shapes"
import { Position } from "./position"
import { Chess } from "chess.js"

export class AnalysisBoard {
  private readonly stockfishQueue
  private readonly chessground
  private shapes = new Shapes()
  private onSelect
  private positionMap: { [key: string]: Position } = {}
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
        lastMove: true,
        check: false
      }
    }
  }

  perturb(fen, perturbedSquare) {
    this.clear()
    this.positionMap = {}
    this.chessground.set(AnalysisBoard.config(fen))
    new Generator(fen).perturb(perturbedSquare).forEach(p => {
      this.positionMap[p.targetSquare] = p
      this.stockfishQueue.enqueue(p, x => {
        this.annotate(x)
      })
    })
  }

  views() {
    var squares = new Chess().SQUARES
    var result = ""
    squares.forEach(square => {
      result += '<button class="explorer" type="button" '
      let p = this.positionMap[square]

      if (p) {
        result += `onClick="showFen('${p.fen}')">${p.targetSquare}</button>`
      } else {
        result += "> - </button>"
      }
      if (square.includes("h")) {
        result += "<br/>"
      }
    })
    return result
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
    this.chessground.set({
      lastMove: [square],
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

  showFenAndShapes(fen) {
    this.chessground.set({
      fen: fen
    })
    this.chessground.setShapes(this.shapes.shapes)
  }

  private annotate(position) {
    this.shapes.annotate(position)
    this.chessground.setShapes(this.shapes.shapes)
  }
}
