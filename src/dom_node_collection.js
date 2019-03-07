class DOMNodeCollection {
  constructor(nodeArray){
    this.nodes = nodeArray;
  }

  html(arg){
    if (typeof arg === "string"){
      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].innerHTML = arg;
      }
    }else if (this.nodes[0]){
        return this.nodes[0].innerHTML;
    }
  }

  value(){
    if (this.nodes[0]){
        return this.nodes[0].value;
    }else{
      return null;
    }
  }

  empty(){
    this.html("");
  }

  append(arg){
    if (arg.constructor.name === "DOMNodeCollection"){
      for (var i = 0; i < this.nodes.length; i++) {
        for (var j = 0; j < arg.nodes.length; j++) {
          this.nodes[i].innerHTML += arg.nodes[j].outerHTML;
        }
      }
    } else if (arg instanceof HTMLElement){
      this.nodes.forEach(node => node.innerHTML += arg.outerHTML);
    }else if (typeof arg === 'string'){
      this.nodes.forEach(node => node.innerHTML += arg);
    }
  }

  attr (attribute, value) {
    if (value) {
      this.nodes.forEach(node => node.setAttribute(attribute, value));
    } else {
      return this.nodes[0].getAttribute(attribute);
    }
  }

  removeAttr(attribute){
    this.nodes.forEach(node => node.removeAttribute(attribute));
  }

  addClass(arg){
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].classList.add(arg);
    }
  }

  removeClass(arg){
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].classList.remove(arg);
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
      nodeList = nodeList.push(selected);
    }
    return new DOMNodeCollection(nodeList);
  }

  remove(){
    this.nodes.forEach(node => node.outerHTML = "");
    this.nodes = [];
  }

  on(eventType, callback){
    for (var i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      node.addEventListener(eventType, callback);
      node.listener = callback;
    }
  }

  off(eventType){
    for (var i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];
      node.removeEventListener(eventType, node.listener);
      node.listener = null;
    }
  }
}

module.exports = DOMNodeCollection;
