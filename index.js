class SearchProvider {
  constructor(input, fields) {
    this._input = input;
    this._fields = fields;
  }

  /**
   * Determine the relevance of a record against a search query.
   * 
   * @param {object} record The record to check.
   * @param {string} query The full search query.
   * 
   * @returns {number}
   */
  getRelevance(record, query) {
    if (this.isValid(record)) {
      const queryTree = query.toLowerCase().split(/\s+/);
      let compareTree = [];

      for (let field of this._fields) {
        compareTree = compareTree.concat(record[field].toLowerCase().split(/\s+/));
      }
      
      if (queryTree.length <= compareTree.length) {
        return compareTree.reduce((total, compareBranch) => {
          for (let queryBranch of queryTree) {
            if (compareBranch.indexOf(queryBranch) >= 0) {
              return total + 1;
            }
          }

          return total;
        }, 0);
      }
    } else {
      throw new Error('Record does not contain all the required fields.');
    }

    return 0;
  }

  /**
   * Determine whether a record has a relevance score of 1 or more.
   * 
   * @param {object} record The record to check.
   * @param {string} query The full search query.
   * 
   * @returns {boolean}
   */
  matches(record, query) {
    return this.getRelevance(record, query) > 0;
  }

  /**
   * Determine whether a record is valid and able to be included in search
   * results.
   * 
   * @param {object} record The record to check.
   * 
   * @returns {boolean}
   */
  isValid(record) {
    for (let field of this._fields) {
      if (!(field in record)) return false;
    }

    return true;
  }

  /**
   * Perform a search query on the input. Search results are sorted by relevance.
   * 
   * @param {string} query The search query.
   * 
   * @returns {object[]}
   */
  query(query) {
    return this._input
      .map(record => ({ record, relevance: this.getRelevance(record, query) }))
      .filter(record => record.relevance > 0)
      .sort((a, b) => a.relevance === b.relevance ? 0 : (a.relevance > b.relevance ? -1 : 1))
      .map(record => record.record);
  }

  /**
   * The original unmodified input list.
   * 
   * @returns {object[]}
   */
  get input() {
    return this._input;
  }

  /**
   * The fields to check on each record in the input list.
   * 
   * @returns {object[]}
   */
  get fields() {
    return this._fields;
  }
}

/**
 * Create a queryable set from an input list.
 * 
 * @param {object[]} input An array of records to search against.
 * @param {string[]} fields An array of fields to extract from each record and
 * include in the search.
 * 
 * @returns {SearchProvider}
 */
module.exports = (input, fields) => new SearchProvider(input, fields);