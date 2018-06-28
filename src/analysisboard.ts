import { StockfishQueue } from "./stockfishqueue"
import { Generator } from "./generator"
import { Shapes } from "./shapes"
import { Position } from "./position"
import { Util } from "./util"
import { Ui } from "./ui"
import { Chess } from "chess.js"

export class AnalysisBoard {
  private readonly stockfishQueue
  private readonly chessground
  private shapes = new Shapes()
  private onSelect
  private positionMap: { [key: string]: Position } = {}

  constructor(stockfish, chessground) {
    this.stockfishQueue = new StockfishQueue(
      stockfish,
      () => this.allComplete(),
      ({}) => {}
    )
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
      },
      draggable: {
        deleteOnDropOff: true
      }
    }
  }

  allComplete() {
    let summary = {}
    summary["win"] = 0
    summary["lose"] = 0
    summary["drawn"] = 0

    Object.keys(this.positionMap).forEach(k => {
      let v = this.positionMap[k]
      if (v) {
        if (v.score) {
          summary[v.score]++
        }
      }
    })
    Ui.setStatus(
      `wins:${summary["win"]} loses:${summary["lose"]} draws:${
        summary["drawn"]
      }`
    )
    this.updateExplorerView()
  }

  perturb(fen, perturbedSquare) {
    this.clear()
    this.positionMap = {}
    this.chessground.set(AnalysisBoard.config(fen))
    var positions = new Generator(fen).perturb(perturbedSquare)
    positions.sort(
      (a, b) =>
        Util.distance(a.targetSquare, perturbedSquare) -
        Util.distance(b.targetSquare, perturbedSquare)
    )
    positions.forEach(p => {
      this.positionMap[p.targetSquare] = p
      this.stockfishQueue.enqueue(p, x => {
        this.annotate(x)
      })
    })
  }

  updateExplorerView() {
    var squares = new Chess().SQUARES
    var result = ""
    squares.forEach(square => {
      let p = this.positionMap[square]
      let text = p ? square : "-"
      let target = p ? p.targetSquare : ""
      let classes = "explorer " + (p && p.score ? p.score : "")
      result += Ui.button(text, classes, `showFenAndPv('${target}')`)
      if (square.includes("h")) {
        result += "<br/>"
      }
    })
    Ui.setExplorerView(result)
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

  placePieceMode(p, c) {
    this.chessground.set({
      movable: {
        color: undefined
      },
      events: {
        select: x => this.addPiece({ type: p, color: c }, x)
      }
    })
  }

  addPiece(piece, x) {
    console.log(this.chessground.getFen())
    var fen = this.chessground.getFen() + " w - - 0 2"
    console.log(fen)
    var chess = new Chess(fen)
    console.log(chess.fen())
    chess.put(piece, x)
    console.log(chess.fen())
    this.showFen(chess.fen())
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

  fenForTarget(square) {
    return this.positionMap[square].fen
  }

  showFenAndPv(square) {
    let p = this.positionMap[square]
    let pv = this.shapes.pv(p)
    this.chessground.set({
      fen: p.fen
    })
    this.chessground.setShapes([...this.shapes.shapes, ...pv])
  }

  showFen(fen) {
    this.chessground.set({
      fen: fen
    })
  }

  private annotate(position) {
    this.shapes.annotate(position)
    this.chessground.setShapes(this.shapes.shapes)
  }
}
