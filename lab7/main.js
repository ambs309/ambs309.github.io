const countButton = document.querySelector('button');
const countDisplay = document.querySelector('h2');
let count = 0;

countButton.addEventListener('click', () => {
  count++;
  countDisplay.textContent = count;
});

const aboutSection = document.querySelector('#about');

aboutSection.addEventListener('dblclick', () => {
  aboutSection.style.backgroundColor = aboutSection.style.backgroundColor === 'lightblue' ? 'white' : 'lightblue';
});

const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
  link.addEventListener('mouseover', () => {
    link.style.color = 'blue';
  });
  
  link.addEventListener('mouseout', () => {
    link.style.color = '';
  });
});

const headerText = document.querySelector('header h1');

document.addEventListener('keydown', (event) => {
  headerText.textContent = `Key Pressed: ${event.key}`;
});

const colorInput = document.createElement('input');
colorInput.type = 'color';
colorInput.style.display = 'block';
colorInput.style.margin = '20px auto';
document.body.appendChild(colorInput);

colorInput.addEventListener('change', () => {
  document.body.style.backgroundColor = colorInput.value;
});
