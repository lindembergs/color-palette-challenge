const paletteName = document.querySelector(".header h2");
let originalColors = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
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

    const copyButton = item.querySelector(".btn-copy");
    copyButton.addEventListener("click", () => handleCopyClick(colors[index]));
  });
}

function handleCopyClick(copyColor) {
  navigator.clipboard
    .writeText(copyColor)
    .then(() => {
      const tooltip = document.createElement("div");
      tooltip.innerHTML = `<div class="tooltip">
      <img src="img/green-ball.jpg" alt="bolinha verde do tooltip" />
      <p>Cor copiada para a área de transferência!</p>
    </div>`;

      tooltip.style.position = "fixed";
      tooltip.style.background = "#fff";
      tooltip.style.color = "black";
      tooltip.style.padding = "5px 10px";
      tooltip.style.borderRadius = "5px";
      tooltip.style.top = "95%";
      tooltip.style.left = "80%";
      tooltip.style.transform = "translate(-50%, -50%)";
      tooltip.style.zIndex = "2";

      document.body.appendChild(tooltip);

      paletteName.style.color = copyColor;

      setTimeout(() => {
        document.body.removeChild(tooltip);
      }, 2000);
    })
    .catch((err) => {
      console.error("Erro ao copiar para a área de transferência: ", err);
    });
}

window.addEventListener("load", loadRandomPalette);
