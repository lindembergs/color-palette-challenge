let colorPalette = getData();

async function getData() {
  const response = await fetch("../data.json");
  console.log(response);
  const data = await response.json();
  console.log(data);
}
getData();
