export class Event {
  private readonly event: string

  private static readonly matePattern = /score mate ([^ ]*) .*/
  private static readonly centipawnPattern = /score cp ([^ ]*) .*/
  private static readonly completePattern = /bestmove.*/

  constructor(event) {
    this.event = event
  }

  isComplete() {
    return Event.completePattern.exec(this.event) ? true : false
  }

  score(fen) {
    var parsedScore = Event.matePattern.exec(this.event)
    if (parsedScore) {
      return this.scoreMate(fen, parsedScore[1])
    }
    parsedScore = Event.centipawnPattern.exec(this.event)
    if (parsedScore) {
      return this.scoreCp(fen, parsedScore[1])
    }
    return "noScore"
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
