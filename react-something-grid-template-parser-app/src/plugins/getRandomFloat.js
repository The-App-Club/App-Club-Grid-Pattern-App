const getRandomFloat = (min, max, decimals) => {
  // https://bobbyhadz.com/blog/javascript-get-random-float-in-range#get-a-random-float-in-a-range
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
};

export {getRandomFloat};
