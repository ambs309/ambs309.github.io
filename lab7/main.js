
let counter=0;
const heading = document.querySelector('h2');

function count(){
    counter++
  heading.innerHTML = counter
}

const button = document.querySelector('button');
button.addEventListener('click', count);

