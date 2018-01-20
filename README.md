# list-search

Simple search implementation for a list of objects.

## installation

```
$npm install --save list-search
```

## usage

* Provide a list of objects with a common set of fields.
* Perform a query, returning a subset of the input list sorted by relevance.

Relevance is determined by the amount of times words in the input query appear
as words within the list of words to compare against, which is constructed by
taking the value from all the defined fields, splitting them into words and then
merging those lists together.

## examples

```
const search = require('./index');

const provider = search([
  { name: 'test' },
  { name: 'another test' },
  { name: 'yet another test' },
  { name: 'yet another test again' }
], ['name']);

console.log(provider.getRelevance({ name: 'test' }, 'te'));
console.log(provider.getRelevance({ name: 'test tent' }, 'te'));

console.log(provider.query('test'));
console.log(provider.query('a'));
console.log(provider.query('test nother'));
console.log(provider.query('a t'));
```