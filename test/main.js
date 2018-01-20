const mocha = require('mocha');
const assert = require('assert');
const search = require('../index');

describe('SearchProvider', () => {
  const sample = [
    { name: 'test' },
    { name: 'another test' },
    { name: 'test tube' },
    { name: 'angled test tube' }
  ];

  const provider = search(sample, ['name']);

  describe('#getRelevance', () => {
    it('Should correctly measure the relevance of items within a list.', () => {
      assert.strictEqual(provider.getRelevance({ name: 'test' }, 'test'), 1);
      assert.strictEqual(provider.getRelevance({ name: 'another test' }, 'a'), 1);
      assert.strictEqual(provider.getRelevance({ name: 'another test' }, 'te noth'), 2);
    });

    it('Should correctly reduce the input list based on query criteria.', () => {
      assert.strictEqual(provider.query('test').length, 4);
      assert.strictEqual(provider.query('t tube').length, 2);
    });
  });
});