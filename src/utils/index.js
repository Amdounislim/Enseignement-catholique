export const sleep = (ms = 1000, callback = () => {}) =>
  new Promise(async (resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, ms);
  });
