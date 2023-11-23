export const fetchFuntcion = async (url: string) => {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    // console.log('erro');
  }
};
