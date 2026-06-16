// 1 USD = 83 INR (approx, you can update)
const USD_TO_INR = 83;

export const convertToINR = (usdPrice) => {
  return Math.round(usdPrice * USD_TO_INR);
};

export const formatINR = (usdPrice) => {
  return `₹${convertToINR(usdPrice).toLocaleString('en-IN')}`;
};