# list-search

Simple search implementation for a list of objects.

## installation

```
$npm install --save list-search
```

## example

```
const search = require('./index');

const provider = search([
  { name: 'test', id: 10 },
  { name: 'another test', id: 12 }
], ['name', 'id']);

console.log(provider.getRelevance({ name: 'test' }, 'te')); // 1
console.log(provider.getRelevance({ name: 'test tent' }, 'te')); // 2

console.log(provider.query('test a'));
```