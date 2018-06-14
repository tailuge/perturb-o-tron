
export class StockfishQueue {

  private readonly stockfish

  constructor(stockfish) {
    this.stockfish = stockfish;
  }
  
  initialise() {
    this.stockfish.postMessage('setoption name MultiPV value 1')
  }
}
