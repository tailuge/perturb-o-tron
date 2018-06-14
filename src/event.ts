export class Event {
  private readonly event

  private readonly matePattern = /score mate ([^ ]*) .*/
  private readonly centipawnPattern = /score cp ([^ ]*) .*/
  private readonly completePattern = /bestmove.*/

  constructor(event) {
    this.event = event
  }

  isComplete() {
    return this.completePattern.exec(this.event) ? true : false
  }

  score(fen) {
    var parsedScore = this.matePattern.exec(this.event)
    if (parsedScore) {
      return this.scoreMate(fen, parsedScore[1])
    }
    parsedScore = this.centipawnPattern.exec(this.event)
    if (parsedScore) {
      return this.scoreCp(fen, parsedScore[1])
    }
    return 0
  }

  private scoreCp(fen, v) {
    if (v < 250 && v > -250) {
      return "drawn"
    }

    if (fen.includes("w")) {
      return v > 0 ? "whiteWin" : "blackWin"
    } else {
      return v < 0 ? "whiteWin" : "blackWin"
    }
  }

  private scoreMate(fen, v) {
    if (fen.includes("w")) {
      return v.includes("-") ? "blackWin" : "whiteWin"
    }
    return v.includes("-") ? "whiteWin" : "blackWin"
  }
}
