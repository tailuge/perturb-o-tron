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
}
