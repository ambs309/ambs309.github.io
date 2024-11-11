const countButton = document.getElementById('count-button');
const countDisplay = document.querySelector('#counter h2');
let count = 0;

countButton.addEventListener('click', () => {
  count++;
  countDisplay.textContent = count;
});

const aboutSection = document.getElementById('about');

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


const colorInput = document.getElementById('bg-color');

colorInput.addEventListener('change', () => {
  document.body.style.backgroundColor = colorInput.value;
});
