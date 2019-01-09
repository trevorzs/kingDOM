# README
## KingDOM
Live Site: [http://trevorzsmith.com/kingDOM/](http://trevorzsmith.com/kingDOM/)
![screenshot](images/screenshot2.png)

## About
This project is a lightweight custom jQuery build using vanilla JavaScript.

It is shown in application as a currency converter app. It sends AJAX requests in order to fetch live conversion rates. It also makes use of custom jQuery selectors and event listeners for dynamic rendering of DOM elements.

## API
#### Functions:

`$l`
Mimics jQuery's `$` function and wraps elements in a `DOMNodeCollection`, which is also a custom built class. Functions applied to `DOMNodeCollections` are listed below.
```javascript
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
}
```

`$l.ajax`
Allows sending of AJAX requests in order to interact with foreign APIs. Returns a promise using a `XMLHttpRequest`, allowing the AJAX request to be chainable.

```javascript
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
```

#### `DOMNodeCollection` functions:

`html`
Either overwrites html of all elements inside the `DOMNodeCollection` with a given string or, returns the `DOMNodeCollection`'s innerHTML.

`addClass` / `removeClass`
Adds classes to the classLists of elements inside the collection

`attr`
Overwrites or returns the specified attribute

`on` / `off`
Adds or removes event listeners from the `DOMNodeCollection`.

`children` / `parent`
Returns children or parents of the collection as a `DOMNodeCollection`

`empty`
Removes innerHTML of all elements in `DOMNodeCollection`

#### Adds Currencies Dynamically
Defines a constant for quick and dynamic fetching/addition of currencies displayed
``` javascript
const CURRENCIES = {
  "AUD": "$",
  "HKD": "$",
  "USD": "$",
  "JPY": "¥",
  "GBP": "£",
  "EUR": "€",
}
```

Loops over currencies and adds them as h2 elements to the main div. Adding currencies to the CURRENCIES object will automatically display new currencies.

``` javascript
for (const currency in CURRENCIES) {
  let htmlElement = document.createElement("h2");
  $l(htmlElement).attr("id",currency);
  $l(".prices").append(htmlElement);
}
```

Uses custom `on` method to add event listener on key press.
Key press changes to input will dynamically display results from AJAX request,
live updating currencies and their conversions

``` javascript
on(eventType, callback){
  for (var i = 0; i < this.nodes.length; i++) {
    const node = this.nodes[i];
    node.addEventListener(eventType, callback);
    node.listener = callback;
  }
}

$l("input").on("keyup", ()=>{
  getValues("USD",$l("input").value());
});

const getValues = (currency, value) => {
  $l.ajax({method: "GET",
    url: `https://api.exchangeratesapi.io/latest?base=${currency}`}).then((response)=>{
      for (const key in CURRENCIES) {
        const symbol= CURRENCIES[key];
        const price = response.rates[key];
        $l(`#${key}`).html(`${key} ${symbol} `+ calculatePrice(price,value));
      }
    })
}

```
