// ****************** COPY TO USER CLIPBOARD ****************** //
const copyIcon = document.querySelector('#copy');
const copyText = document.querySelector('#copied');
const password = document.querySelector('#password');

copy.addEventListener('click', () => {
    navigator.clipboard.writeText(password.innerHTML);
    copyText.classList.add('show');
})

// ****************** STYLING RANGE ****************** //
//                        +                            //
// ****************** STRENGTH LEVEL ****************** //

const range = document.querySelector("#range");
const lengthNumber = document.querySelector('#number');

const tooweak = document.querySelector('div[class="tooweak"]');
const weak = document.querySelector('div[class="weak"]');
const medium = document.querySelector('div[class="medium"]');
const strong = document.querySelector('div[class="strong"]');
const empty = document.querySelector('.empty');


range.addEventListener('input', () => {
 
    const rangeProgress = (range.value / range.max) * 100;
    range.style.background = `linear-gradient(to right, #a3ffae ${rangeProgress}%, #191820 ${rangeProgress}%)`;
    lengthNumber.textContent = range.value;

    empty.classList.add('hide');
    
    function strengthChange(x, y, z) {
            x.classList.add('show');
            y.classList.remove('show');
            z.classList.remove('show');
    }

    if(range.value <= 5) {
        strengthChange(tooweak, weak);
    } else if(range.value <= 10) {
        strengthChange(weak, tooweak, medium); 
    } else if (range.value <= 15) {
        strengthChange(medium, weak, strong);
    } else {
        strengthChange(strong, medium);
    }
}) 

// ****************** GENERATE PASSWORD ****************** //
const button = document.querySelector('.generate');

const upperCase = document.querySelector('#upper');
const lowerCase = document.querySelector('#lower');
const num = document.querySelector('#num');
const sym = document.querySelector('#sym');

function generateRandomPassword () {
    let characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?#@&$';
    let userChoice = [];

    function checked(start, end) {
        for(let i = 0; i < characters.length; i++) {
            if(characters.slice(start, end).split('').includes(characters[i])) {
                userChoice.push(characters[i]);
            }
        }
    }

    if(upperCase.checked === true) {
       checked(0, 26);
    }

    if(lowerCase.checked === true) {
       checked(26, 52);
    }

    if(num.checked === true) {
       checked(52, 62);
    }

    if(sym.checked === true) {
        checked(62, characters.length);
    }

    userChoice = userChoice.join('');

    let result = '';
    let counter = 0;
    while (counter < range.value) {
      result += userChoice.charAt(Math.floor(Math.random() * userChoice.length));
      counter += 1;
    }

    password.textContent = result;
    password.style.opacity = '1';
}

button.addEventListener('click', () => {
    generateRandomPassword();
    copyText.classList.remove('show');
})

// ****************** AT LEAST ONE CHECKBOX HAVE TO BE CHECKED ****************** //










