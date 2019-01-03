# README
## KingDOM
Live Site: [http://trevorzsmith.com/kingDOM/](http://trevorzsmith.com/kingDOM/)
![screenshot](images/screenshot.png)

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
}```

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
}```

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
