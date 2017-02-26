module.exports = () => {
  let storage = {};
  let nextKey = 1;

  return {
    getAll: () => {
      return storage;
    },

    get: (key) => {
      return storage[key];
    },

    post: (newItem) => {
      let key = nextKey++;
      storage[key] = newItem;
      return key;
    },
    
    put: (key, item) => {
      if (!(key in storage)) {
        return false;
      } else {
        storage[key] = item;
        return item;
      }
    },
    
    patch: (key, item) => {
      if (!(key in storage)) {
        return false;
      } else {
        let orig = storage[key];
        let keys = Object.keys(item);
        for (let key of keys) {
          orig[key] = item[key];
        }
        storage[key] = orig;
        return storage[key];
      }
    },
    
    delete: (key) => {
      if (!(key in storage)) {
        return false;
      } else {
        delete storage[key];
        return true;
      }
    }
  };
};
