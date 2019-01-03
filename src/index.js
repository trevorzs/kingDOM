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


const CURRENCIES = {
  "AUD": "$",
  "HKD": "$",
  "USD": "$",
  "JPY": "¥",
  "GBP": "£",
  "EUR": "€",
  "PHP": "₱",
  "INR": "₹",
  "ILS": "₪",
  "RUB": "₽",
  "DKK": "kr",
  "HUF": "Ft",
  "PLN": "zł",
  "THB": "฿",
  "TRY": "₺",
  "ZAR": "R"


}

const setup = ()=>{
  for (var i = 0; i < Object.keys(CURRENCIES).length; i++) {
    const key = Object.keys(CURRENCIES)[i];
    let htmlElement = document.createElement("h2");
    $l(htmlElement).attr("id",key);
    $l(".prices").append(htmlElement);
  }
  getValues("USD",$l("input").value());

  $l("input").on("change", ()=>{
    getValues("USD",$l("input").value());
  });
  $l("span").nodes.forEach(span => {
    // wraps current span in DOMNodeCollection
    let spanNode = $l(span);

    //adds onClick listeners for each span Node
    spanNode.on("click", (e) => {
      removeClassFromSpans();
      spanNode.addClass("selected");

      //changes symbol next to input field
      const currency = spanNode.html();
      const symbol = CURRENCIES[currency]
      $l("#symbol").html(` ${symbol}`);

      //pulls api data based on currencies list
      const value = $l("input").value();
      getValues(currency,value);
    })
  })
}

const removeClassFromSpans = () => {
  $l("span").nodes.forEach(span => {
    $l(span).removeClass("selected");
  })
}

const getValues = (currency, value) => {
  $l.ajax({method: "GET",
    url: `https://api.exchangeratesapi.io/latest?base=${currency}`}).then((response)=>{
      for (var i = 0; i < Object.keys(CURRENCIES).length; i++) {
        const key = Object.keys(CURRENCIES)[i];
        const symbol= CURRENCIES[key];
        const price = response.rates[key];
        $l(`#${key}`).html(`${key} ${symbol} `+ calculatePrice(price,value));
      }
    })
}

//helper function to round converted price
const calculatePrice =(price,value) => {
  return (price*value).toFixed(2).toString();
}
