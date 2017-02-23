var self = module.exports = {

  someProperty: 'I am public',

  addFive: function addFive(num) {
    return sum(num, 5);
  },

  toggleZ: function toggleZ() {
    return z = !z;
  }

};