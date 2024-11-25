// Elementos da página
const botoesCores = document.querySelectorAll('li:nth-child(2) button');
const textoItem2 = document.querySelector('li:nth-child(2) p');
const areaTexto3 = document.querySelector('#f3');
const areaTexto4 = document.querySelector('#f4');
const botaoSubmeter = document.querySelector('li:nth-child(4) button');
const contadorCliqueSpan = document.querySelector('#clickCounter');
const botaoContar = document.querySelector('.count-button');
const formulario = document.querySelector('#messageForm');
const mensagemSaida = document.querySelector('#outputMessage');
const contadorAutomaticoSpan = document.querySelector('#autoCounter');


const item1 = document.querySelector('li:nth-child(1) p');
item1.addEventListener('mouseover', () => {
  item1.textContent = "Obrigado por passares!";
});
item1.addEventListener('mouseout', () => {
  item1.textContent = "Passa por aqui!";
});


botoesCores.forEach(botao => {
  botao.addEventListener('click', () => {
    const cor = botao.dataset.color; 
    textoItem2.style.color = cor; 
  });
});


areaTexto3.addEventListener('input', () => {
  areaTexto3.style.backgroundColor = gerarCorAleatoria();
});

function gerarCorAleatoria() {
  const caracteres = '0123456789ABCDEF';
  let cor = '#';
  for (let i = 0; i < 6; i++) {
    cor += caracteres[Math.floor(Math.random() * 16)];
  }
  return cor;
}


botaoSubmeter.addEventListener('click', () => {
  const valorCor = areaTexto4.value.trim().toLowerCase();
  if (validarCor(valorCor)) {
    document.body.style.backgroundColor = valorCor;
  } else {
    alert("Cor inválida! Por favor, insira uma cor válida em inglês.");
  }
});


function validarCor(cor) {
  const elementoTemp = document.createElement('div');
  elementoTemp.style.color = cor;
  return elementoTemp.style.color !== '';
}

let contadorAutomatico = 0;
setInterval(() => {
  contadorAutomatico++;
  contadorAutomaticoSpan.textContent = contadorAutomatico;
}, 1000);


let contadorCliques = 0;
botaoContar.addEventListener('click', () => {
  contadorCliques++;
  contadorCliqueSpan.textContent = contadorCliques;
});


formulario.addEventListener('submit', (evento) => {
  evento.preventDefault(); 
  const nome = document.querySelector('#name').value.trim();
  const idade = document.querySelector('#age').value.trim();
  if (nome && idade) {
    mensagemSaida.textContent = `Olá ${nome}, tens ${idade} anos.`;
  } else {
    mensagemSaida.textContent = 'Por favor, preencha todos os campos.';
  }
});


if (!localStorage.getItem('contadorCliques')) {
  localStorage.setItem('contadorCliques', 0);
}
let contadorPersistido = parseInt(localStorage.getItem('contadorCliques'));


document.addEventListener('DOMContentLoaded', () => {
  contadorCliqueSpan.textContent = contadorPersistido;
});


botaoContar.addEventListener('click', () => {
  contadorPersistido++;
  localStorage.setItem('contadorCliques', contadorPersistido);
  contadorCliqueSpan.textContent = contadorPersistido;
});
