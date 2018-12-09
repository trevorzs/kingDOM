class DOMNodeCollection {
  constructor(nodeArray){
    this.nodes = nodeArray;
  }

  html(arg){
    if (typeof arg === "string"){
      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].inerHTML = arg;
      }
    }else if (this.nodes[0]){
        return this.nodes[0].innerHTML;
    }
  }

  empty(){
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].html = "";
    }
  }

  append(arg){
    if (this.nodes.length === 0) return;

    switch (typeof arg) {
      case "object":
        if (!arg instanceof DOMNodeCollection){
          children = $l(children);
        }
        break;
      case "string":
      break;

    }

  }

}

module.exports = DOMNodeCollection;
