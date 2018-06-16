export class Position {
  public readonly fen
  public readonly targetSquare
  public score
  public bestMove

  constructor(fen, targetSquare) {
    this.fen = fen
    this.targetSquare = targetSquare
  }
}
