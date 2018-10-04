# list-search

[![Build Status](https://travis-ci.org/ascensionwd/list-search.svg?branch=master)](https://travis-ci.org/ascensionwd/list-search)

Simple search implementation for a list of objects.

## installation

```
$ yarn add list-search
```

## usage

* Provide a list of objects with a common set of fields.
* Perform a query, returning a subset of the input list sorted by relevance.

Relevance is determined by the amount of times words in the input query appear
as words within the list of words to compare against, which is constructed by
taking the value from all the defined fields, splitting them into words and then
merging those lists together.

## examples

```javascript
const search = require('list-search');

const provider = search([
  { name: 'test' },
  { name: 'another test' },
  { name: 'yet another test' },
  { name: 'yet another test again' }
], ['name']);

console.log(provider.query('test').length); // 4
console.log(provider.query('a').length); // 3
console.log(provider.query('again test').length); // 1
console.log(provider.query('yet').length); // 2
```
