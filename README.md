# readdir

## Initialize

```javascript
const readdir = require("./index");
const resources = readdir.init([`${__dirname}/resources`]);
// OR const resources = readdir.init(`${__dirname}/resources`);
```

## Get

```javascript
resources.get("resources.functions");
// { myFunction: { test: true }, myFunction2: [Function] }
```
