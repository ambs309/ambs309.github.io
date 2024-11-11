// 1. Selecionar os elementos com querySelector apenas uma vez
const item1 = document.querySelector('ol li:nth-child(1) p');
const item2Text = document.querySelector('ol li:nth-child(2) p');
const redButton = document.querySelector('ol li:nth-child(2) button:nth-child(2)');
const greenButton = document.querySelector('ol li:nth-child(2) button:nth-child(3)');
const blueButton = document.querySelector('ol li:nth-child(2) button:nth-child(4)');
const textArea3 = document.querySelector('#f3');
const textArea4 = document.querySelector('#f4');
const submitButton = document.querySelector('ol li:nth-child(4) button');
const countButton = document.querySelector('ol li:nth-child(5) button');
const body = document.body;


item1.addEventListener('mouseover', () => {
  item1.textContent = "Obrigado por passares!";
});
item1.addEventListener('mouseout', () => {
  item1.textContent = "Passa por aqui!";
});


redButton.addEventListener('click', () => {
  item2Text.style.color = 'red';
});
greenButton.addEventListener('click', () => {
  item2Text.style.color = 'green';
});
blueButton.addEventListener('click', () => {
  item2Text.style.color = 'blue';
});


textArea3.addEventListener('input', () => {
  textArea3.style.backgroundColor = getRandomColor();
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


submitButton.addEventListener('click', () => {
  const colorValue = textArea4.value.trim().toLowerCase();
  if (isValidColor(colorValue)) {
    body.style.backgroundColor = colorValue;
  } else {
    alert("Cor inválida! Por favor, insira uma cor válida em inglês.");
  }
});

function isValidColor(color) {
  const tempElement = document.createElement('div');
  tempElement.style.color = color;
  return tempElement.style.color !== '';
}


let counter = 0;
countButton.addEventListener('click', () => {
  counter++;
  countButton.textContent = `Conta! (${counter})`;
});
