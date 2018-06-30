export class Ui {
  static setStatus(text, colour?) {
    let elt = document.getElementById("status")
    if (elt) {
      elt.innerHTML = text
      elt.style.backgroundColor = colour ? colour : "black"
    }
  }

  static setExplorerView(innerHtml) {
    let elt = document.getElementById("explorer")
    if (elt) {
      elt.innerHTML = innerHtml
    }
  }

  static setFen(fen) {
    let elt = <HTMLInputElement>document.getElementById("fen")
    if (elt) {
      elt.value = fen
    }
  }

  static button(text, type, onClick) {
    return `<button class="${type}" type="button" onClick="${onClick}">${text}</button>`
  }
}
