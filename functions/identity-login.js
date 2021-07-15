/** @type {import("@netlify/functions").Handler} */
exports.handler = (event) => {
  console.log("I got called!", event);
  return {
    statusCode: 200
  };
};
