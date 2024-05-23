import { range } from "lodash";
import { random } from "lodash";

function shuffleArray(arr, setter) {
  const nextArr = arr;
  nextArr.sort(() => Math.random() - 0.5);
  setter(nextArr);
}

function populateUrls(url, num) {
  const ints = range(num).map(() => random(0, 1026));
  const nextUrls = range(num).map((index) => {
    return `${url}${ints[index]}/`;
  });
  return nextUrls;
}

async function fetcher(urls) {
  const response = await Promise.all(
    urls.map(async (url) => {
      const result = await fetch(url);
      return await result.json();
    })
  );
  return response;
}

export { shuffleArray, populateUrls, fetcher };
