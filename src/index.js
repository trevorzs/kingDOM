const DOMNodeCollection = require("./dom_node_collection");
let docReady = false;
const docCallbacks = [];

window.$l = (argument) => {
  switch (typeof argument) {
    case "string":
      const nodeList = document.querySelectorAll(argument);
      const nodeArray = Array.from(nodeList);
      return new DOMNodeCollection(nodeArray);
    case "object":
      if (argument instanceof HTMLElement){
        return new DOMNodeCollection([argument]);
      }
    case "function":
      if (docReady){
        argument();
      }else{
        docCallbacks.push(argument);
      }
  }
}

window.$l.extend = (...args) => {
  let base = args[0];
  for (var i = 1; i < args.length; i++) {
    Object.assign(base,args[i]);
  }
  return base;
}

document.addEventListener("DOMContentLoaded", function(){
  docReady = true;
  docCallbacks.forEach(func => func());
})

window.$l.ajax = (options) => {
  let params = {
    method: "GET",
    url: "",
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    dataType: 'json',
    success: () => {},
    error: () => {},
  };

  if (options){
    params = Object.assign(params,options);
  }

  return new Promise((resolve,reject) => {
    const req = new XMLHttpRequest();
    req.open(params.method,params.url);
    req.onload = () => {
      if (req.status === 200){
        resolve(JSON.parse(req.response));
      }else{
        reject(Error(JSON.parse(req.statusText));
      }
    }
    req.onerror = () => {
      reject(Error("Network Error"));
    }
    req.send(JSON.stringify(params.data));
  })
}
