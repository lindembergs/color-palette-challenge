let originalColors = [];
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
      console.log(paletteName);
    });
}

loadRandomPalette();
