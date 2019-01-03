const DOMNodeCollection = require("./dom_node_collection");
let docReady = false;
const docCallbacks = [];

$l = (argument) => {
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

$l.extend = (...args) => {
  let base = args[0];
  for (var i = 1; i < args.length; i++) {
    Object.assign(base,args[i]);
  }
  return base;
}

$l.ajax = (options) => {
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
    params = $l.extend(params,options);
  }

  return new Promise((resolve,reject) => {
    const req = new XMLHttpRequest();
    req.open(params.method,params.url);
    req.onload = () => {
      if (req.status === 200){
        resolve(JSON.parse(req.response));
      }else{
        reject(Error(req.statusText));
      }
    }
    req.send(JSON.stringify(params.data));
  })
}

document.addEventListener("DOMContentLoaded", function(){
  docReady = true;
  docCallbacks.forEach(func => func());
  getValues("USD",$l("input").value());
  setup();
})

const setup = ()=>{
  getValues("USD",$l("input").value());
  $l("input").on("change", ()=>{
    getValues("USD",$l("input").value());
  });
  $l("span").nodes.forEach(span => {
    $l(span).on("click", (e) => {
      toggleAll();
      $l(span).addClass("selected");
      getValues($l(span).html(),$l("input").value());
    })
  })
}

const toggleAll = () => {
  $l("span").nodes.forEach(span => {
    $l(span).removeClass("selected");
  })
}

const getValues = (currency, value) => {
  $l.ajax({method: "GET",
    url: `https://api.exchangeratesapi.io/latest?base=${currency}`}).then((response)=>{
      $l("#AUD").html("AUD $ "+calculatePrice(response.rates.AUD,value));
      $l("#HKD").html("HKD $ "+calculatePrice(response.rates.HKD,value));
      $l("#USD").html("USD $ "+calculatePrice(response.rates.USD,value));
      $l("#JPY").html("JPY ¥ "+calculatePrice(response.rates.JPY,value));
    })
}

const calculatePrice =(price,value) => {
  return (price*value).toFixed(2).toString();
}
