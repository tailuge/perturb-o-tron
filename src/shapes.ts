export class Shapes {

  shapes: any[] = []

  clear() {
    this.shapes = []
  }
  
  annotate(position) {
    this.shapes.push(this.circle(position))
    this.shapes.push(this.piece(position))
    if (position.score == "win") {
      this.shapes.push(this.line(position))
    }
  }

  private circle(position) {
    return {
      orig: position.targetSquare,
      brush: this.brush(position.score)
    }
  }

  private line(position) {
    let bestMove = position.bestMove
    return {
      orig: bestMove.substring(0, 2),
      dest: bestMove.substring(2, 4),
      brush: this.brush(position.score)
    }
  }

  private piece(position) {
    return {
      orig: position.targetSquare,
      brush: this.brush(position.score),
      piece: {
        color: "white",
        role: "king",
        scale: 0.3
      }
    }
  }

  private brush(score) {
    switch (score) {
      case "win":
        return "green"
      case "lose":
        return "red"
      case "drawn":
        return "yellow"
      default:
        return "blue"
    }
  }
}
