exports.handler = async () => {
  if (count === 0) {
    var count = 0;
  } else {
    count += 1;
  }
  console.log('CHECK OUT ALL MY COUNTS', count);
  return {
    statusCode: 200,
    body: 'OK Rocking and a rolling',
  };
};
