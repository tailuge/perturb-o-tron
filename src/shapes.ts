export class Shapes {
  shapes: any[] = []

  clear() {
    this.shapes = []
  }

  annotate(position) {
    this.shapes.push(this.circle(position))
  }

  private circle(position) {
    return {
      orig: position.targetSquare,
      brush: this.brush(position.score)
    }
  }

  pv(position) {
    return position.pv.map((m, i) => {
      return this.line(
        m,
        Math.max((16 - i) / 2, 2),
        i % 2 == 0 ? this.brush(position.score) : this.altBrush(position.score)
      )
    })
  }

  line(move, width, colour) {
    return {
      orig: move.substring(0, 2),
      dest: move.substring(2, 4),
      brush: colour,
      modifiers: {
        lineWidth: width
      }
    }
  }

  private altBrush(score) {
    switch (score) {
      case "win":
        return "red"
      case "lose":
        return "green"
      default:
        return "blue"
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
