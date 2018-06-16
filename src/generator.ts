import { Chess } from "chess.js"

class Position {
  public readonly fen
  public readonly targetSquare
  public score

  constructor(fen, targetSquare) {
    this.fen = fen
    this.targetSquare = targetSquare
  }
}

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
    removed.SQUARES.forEach(targetSquare => {
      const newFen = this.validPlaced(piece, targetSquare, removed)
      if (newFen) {
        results.push(new Position(newFen, targetSquare))
      }
    })

    return results
  }

  private validPlaced(piece, targetSquare, board) {
    if (!board.get(targetSquare)) {
      board.put(piece, targetSquare)
      const fen = board.fen()
      const in_check = board.in_check()
      board.remove(targetSquare)
      if (!in_check) {
        return fen
      }
    }
  }
}
