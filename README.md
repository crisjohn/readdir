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
    - index.js
- server.js
- app.js
- package.json
```

## Initialize readdir

```javascript

const readdir = require("readdir.js");

const resources = readdir.init([`${__dirname}/resources`, `${__dirname}/routes`]);
/**
 * resources.data:
 *  {
 *      myFunction: [Function],
 *      myClass: [Function: MyClass],
 *      user: [Function],
 *      index: {}
 *  }
 **/

const resources1 = readdir.init(`${__dirname}/resources`);
/**
 * resources1.data:
 *  {
 *      myFunction: [Function],
 *      myClass: [Function: MyClass]
 *  }
 **/

const resources2 = readdir.init(`${__dirname}/resources`, true);
/**
 * resources2.data:
 *  {
 *      resources: {
 *          functions: {
 *              myFunction: [Function]
 *          },
 *          classes: {
 *              myClass: [Function: MyClass]
 *          }
 *      }
 *  }
 **/
```

## get

```javascript

resources.get('myFunction');
/**
 * return: [Function]
 **/

resources2.get('resources.functions');
/**
 * return: {
 *      myFunction: [Function]
 * }
 **/


```
