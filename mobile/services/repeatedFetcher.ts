export const repeatedFetcher = async (url: string) => {
  try {
    console.log("Request: start =", url);
    let response = await fetch(url);
    const responseJson = await response.json();
    console.log("Request: Finish =", url);
    return responseJson;
  } catch (error) {
    console.log("Request: Error =", url);
    return new Promise((res) => {
      setTimeout(() => {
        const result = repeatedFetcher(url);
        res(result);
      }, 4000);
    });
  }
};
