export class Util {
  static fullFen(fen) {
    if (fen.trim().split(" ").length == 4) {
      return fen.includes(" w ") ? fen + " 0 2" : fen + " 0 1"
    } else {
      return fen
    }
  }

  static fenForOtherSide(fen) {
    return fen.includes(" w ")
      ? fen.replace(/ w .*/, " b - - 0 1")
      : fen.replace(/ b .*/, " w - - 0 2")
  }

  private static coordinates(square) {
    return {
      x: square.charCodeAt(0) - "a".charCodeAt(0) + 1,
      y: Number(square.substring(1, 2))
    }
  }

  static distance(squareA, squareB) {
    let a = Util.coordinates(squareA)
    let b = Util.coordinates(squareB)
    return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y))
  }

  static repairFen(fen, sideToPlay) {
    return fen.split(" ")[0] + (sideToPlay == "w" ? " w - - 0 2" : " b - - 0 1")
  }
}
