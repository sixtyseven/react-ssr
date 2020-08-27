import "isomorphic-fetch";

export default (resourceType) => {
  console.log(`load data ${resourceType}`);
  return fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // only keep 10 first results
      return data.filter((_, idx) => idx < 10);
    });
};

export function getInitCounter() {
  return Promise.resolve((resolve, reject) => {
    setTimeout(() => {
      resolve(52);
    }, 5000);
  });
}
