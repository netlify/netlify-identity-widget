/** @type {import("@netlify/functions").Handler} */
export const handler = (event) => {
  console.log("I got called!", event);
  return {
    statusCode: 200
  };
};
