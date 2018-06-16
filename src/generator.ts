import { Chess } from "chess.js"
import { Position } from "./position"

export class Generator {
  private readonly chess

  constructor(fen) {
    this.chess = new Chess(fen)
  }

  perturb(square): Position[] {
    const piece = this.chess.get(square)
    if (!piece) {
      return []
    }

    const removed = new Chess(this.chess.fen())
    removed.remove(square)

    var results: Position[] = []
    this.candidateSquares(piece).forEach(targetSquare => {
      const newFen = this.validFen(piece, targetSquare, removed)
      if (newFen) {
        results.push(new Position(newFen, targetSquare))
      }
    })
    return results
  }

  private candidateSquares(piece) {
    if (piece.type == "p") {
      return this.chess.SQUARES.filter(x => /.[2-7]/.test(x))
    }
    return this.chess.SQUARES
  }

  private validFen(piece, targetSquare, board) {
    if (!board.get(targetSquare)) {
      board.put(piece, targetSquare)
      const fen = board.fen()
      const in_check = board.in_check()
      const in_stalemate = board.in_stalemate()
      board.remove(targetSquare)
      if (!in_check && !in_stalemate && this.validForOtherSide(fen)) {
        return fen
      }
    }
  }

  private validForOtherSide(fen) {
    const otherSide = new Chess(this.fenForOtherSide(fen))
    return !otherSide.in_check()
  }

  private fenForOtherSide(fen) {
    return fen.includes(" w ")
      ? fen.replace(/ w .*/, " b - - 0 1")
      : fen.replace(/ b .*/, " w - - 0 2")
  }
}
