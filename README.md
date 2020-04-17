# readdir

```bash
npm install
```

## Initialize

```javascript
const readdir = require("./node_modules/readdir");
const resources = readdir.init([`${__dirname}/resources`]);
// OR const resources = readdir.init(`${__dirname}/resources`);
```

## get

```javascript
resources.get("resources.functions");
// { myFunction: { test: true }, myFunction2: [Function] }
```

## exec

```javascript
resources.exec("resources.functions", 234);
// { function2: 236, functions: { function1: 1, test: { test: 234 } } }
```
