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

    if (typeof arg === 'object' && !(arg instanceof DOMNodeCollection)){
      arg = $l(arg);
    } else if (arg instanceof DOMNodeCollection){
      for (var i = 0; i < this.nodes.length; i++) {
        for (var j = 0; j < arg.nodes.length; j++) {
          this.nodes[i].append(arg.nodes[j].cloneNode(true));
        }
      }
    }

    if (typeof arg === 'string'){
      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].innerHTML += arg;
      }
    }
  }

  attr(key,val){
    if (typeof val === "string"){
      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].setAttribute(key,val);
      }
    }
  }

  addClass(arg){
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].classList.add(arg);
    }
  }

  removeClass(arg){
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].classlist.remove(arg);
    }
  }

  children() {
    let nodeList = [];
    for (var i = 0; i < this.nodes.length; i++) {
      const childNodes = this.nodes[i].children;
      nodeList = nodeList.concat(Array.from(childNodes));
    }
    return new DOMNodeCollection(childNodes);
  }

  parent() {
    let nodeList = [];
    for (var i = 0; i < this.nodes.length; i++) {
      const parent = this.nodes[i].parentNode;
      if (!parent.visited){
        nodeList.push(parent);
        parent.visited = true;
      }
    }
    for (var i = 0; i < nodeList.length; i++) {
      nodeList[i].visited = false;
    }
    return new DOMNodeCollection(nodeList);
  }

  find(selector){
    let nodeList = [];
    for (var i = 0; i < this.nodes.length; i++) {
      const selected = this.nodes[i].querySelectorAll(selector);
      nodeList = nodeList.concat(Array.from(selected));
    }
    return new DOMNodeCollection(nodeList);
  }

  remove(){
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].parentNode.removeChild(this.nodes[i]);
    }
  }
}

module.exports = DOMNodeCollection;
