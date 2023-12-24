let originalColors = [];
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    ([array[i], array[j]] = [array[j]]), array[i];
  }
  return array;
}
function shuffleColors() {
  const scrambledColors = shuffleArray([...originalColors]);
  showColors(scrambledColors);
}
// criando uma função para buscar na "api" e carregar a paleta de acordo com o index random do Array, .then utiliza promisses, correto? também é possivel utilizar async await, correto?.
function loadRandomPalette() {
  fetch("../data.json")
    .then((response) => response.json())
    .then((data) => {
      const palettes = data;
      const randomIndex = Math.floor(Math.random() * palettes.length);
      const palette = palettes[randomIndex];

      const paletteName = document.querySelector(".header h2");
      paletteName.textContent = palette.name;

      originalColors = [...palette.colorPalette];

      showColors(originalColors);

      const randomButton = document.querySelector(".btn-random");
      randomButton.addEventListener("click", shuffleColors); // Adicionando evento de clique corretamente
    })
    .catch((error) => {
      console.error("Erro ao carregar as paletas de cores:", error);
    });
}

function showColors(colors) {
  const listItems = document.querySelectorAll(".ul-colors li");
  listItems.forEach((item, index) => {
    const colorBox = item.querySelector(".exadecimal");
    colorBox.textContent = colors[index];

    const colorCode = colors[index];

    item.style.backgroundColor = colorCode;
  });
}
window.addEventListener("load", loadRandomPalette);
