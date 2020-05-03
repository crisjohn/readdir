# readdir

## Sample Directory
```bash
- resources
    - functions
        -> myFunction.js
    - classes
        -> myClass.js
- routes
    - controller
        -> user.js
        -> add.js
    - index.js
- server.js
- app.js
- package.json
```

## Initialize readdir

```javascript
const readdir = require("readdir");
const resources = readdir.init([`${__dirname}/resources`, `${__dirname}/routes`]);
const resources1 = readdir.init(`${__dirname}/resources`);
const resources2 = readdir.init(`${__dirname}/resources`, true);
```

## get

```javascript
resources.get("resources.functions");
// { myFunction: { test: true }, myFunction2: [Function] }
```