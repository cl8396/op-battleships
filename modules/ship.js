function createShip(length) {
  if (length <= 0) {
    throw new Error('Invalid length. Must be greater than 0');
  }

  let numberOfHits = 0;

  const hit = () => numberOfHits++;

  const isSunk = () => {
    return numberOfHits >= length ? true : false;
  };

  return { hit, isSunk };
}

export default createShip;
