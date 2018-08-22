exports.set = (name, value) => {
  if (typeof(localStorage) === 'object') { // Does browser support localStorage
    // Set cache location in localStorage
    localStorage.setItem(name, value);
    return true;
  }
  return false;
};

exports.get = (name) => {
  if (typeof(localStorage) === 'object') { // Does browser support localStorage
    // Get cache location in localStorage
    let item = localStorage.getItem(name);
    if (item !== null) { // Is there a cache
      // Return parsed cache
      return item;
    }
  }
  return null;
};

exports.delete = (name) => {
  if (typeof(localStorage) === 'object') { // Does browser support localStorage
    // Delete item
    localStorage.removeItem(name);
  }
  return null;
};
