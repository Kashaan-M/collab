const a = ['a', 'z', 'y', 'j', 'b', 'w', 'n', 'P', 'J', 'O', 'B', 'U', 't'];
// activation code of the form '2a5w5'
let createActiveCode = () => {
  return `${Math.floor(Math.random() * 9)}${
    a[Math.floor(Math.random() * a.length)]
  }${Math.floor(Math.random() * 9)}${
    a[Math.floor(Math.random() * a.length)]
  }${Math.floor(Math.random() * 9)}`;
};
module.exports = createActiveCode;
