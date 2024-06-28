const myPromise = new Promise((fulfill, reject) => {
  const myResult = false;
  setTimeout(() => {
    if (myResult === true) {
      fulfill("This Promise was fulfilled.");
    } else {
      reject(new Error("This Promise has been rejected."));
    }
  }, 1000);
});

myPromise
  .then((fulfilledResult) => console.log(fulfilledResult))
  .catch((rejectedResult) => console.log(rejectedResult))
  .finally(() => console.log("The Promise has settled."));
// > "Error: This Promise has been rejected."
// > "The Promise has settled."

const firstPromise = new Promise((fulfill, reject) => fulfill("Successful. "));
const secondPromise = new Promise((fulfill, reject) => fulfill("Successful. "));
const thirdPromise = new Promise((fulfill, reject) => fulfill("Successful. "));
const failedPromise = new Promise((fulfill, reject) => reject("Failed."));
const successfulPromises = [firstPromise, secondPromise, thirdPromise];
const oneFailedPromise = [failedPromise, ...successfulPromises];

Promise.all(successfulPromises)
  .then((allValues) => {
    console.log(allValues);
  })
  .catch((failValue) => {
    console.error(failValue);
  });
// > Array(3) [ "Successful. ", "Successful. ", "Successful. " ]

Promise.all(oneFailedPromise)
  .then((allValues) => {
    console.log(allValues);
  })
  .catch((failValue) => {
    console.error(failValue);
  });
// > "Failed."

async function myFunction() {
  const myPromise = new Promise((fulfill, reject) => {
    setTimeout(() => fulfill("Successful. "), 5000);
  });
  const myPromisedResult = await myPromise;
  return myPromisedResult;
}

myFunction()
  .then((myResult) => console.log(myResult))
  .catch((myFailedResult) => console.error(myFailedResult));
// > "Successful."
