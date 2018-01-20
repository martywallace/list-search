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
    });
  });
});