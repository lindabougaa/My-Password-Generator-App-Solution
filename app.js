// ****************************** BUTTON DISABLED AT FIRST (length = 0) ****************************** //

const button = document.querySelector('.generate');

button.disabled = true;
button.style.opacity = '0.1'
button.classList.remove('hovered');

// ************************************ STYLING RANGE ************************************ //
//                                             +                                           //
// ************************************ STRENGTH LEVEL ************************************ //

const range = document.querySelector("#range");
const lengthNumber = document.querySelector('#number');

const tooweak = document.querySelector('div[class="tooweak"]');
const weak = document.querySelector('div[class="weak"]');
const medium = document.querySelector('div[class="medium"]');
const strong = document.querySelector('div[class="strong"]');
const empty = document.querySelector('.empty');

range.addEventListener('change', () => {

    const rangeProgress = (range.value / range.max) * 100;
    range.style.background = `linear-gradient(to right, #a3ffae ${rangeProgress}%, #191820 ${rangeProgress}%)`;
    lengthNumber.textContent = range.value;

    empty.classList.add('hide');

    function strengthChange(x, y, z) {
            x.classList.add('show');
            y.classList.remove('show');
            z.classList.remove('show');
    }

    if(range.value == 0) {

        empty.classList.remove('hide');
        tooweak.classList.remove('show');

    /* When length get back to 0 => button disabled */
        button.disabled = true;
        button.style.opacity = '0.1'
        button.classList.remove('hovered'); 

    } else if (range.value > 0) {

        button.disabled = false;
        button.style.opacity = '1'
        button.classList.add('hovered'); 

        if(range.value <= 5) {
            strengthChange(tooweak, weak);
        } else if(range.value <= 10) {
            strengthChange(weak, tooweak, medium); 
        } else if (range.value <= 15) {
            strengthChange(medium, weak, strong);
        } else {
            strengthChange(strong, medium);
        }
    } 
}) 

// ********************************* GENERATE RANDOM PASSWORD ******************************** //
//                                              +                                              //
// ********************************  COPY TO USER CLIPBOARD ********************************** //

const copyIcon = document.querySelector('#copy');
const copyText = document.querySelector('#copied');
const password = document.querySelector('#password');

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

    /* when a password has been generated, then we can copy it */
    copy.addEventListener('click', () => {
        navigator.clipboard.writeText(password.innerHTML);
        copyText.classList.add('show');
    })
})

// ****************** AT LEAST ONE CHECKBOX HAS TO BE CHECKED ****************** // 
// ! TOO LONG // 

let values = {
    upperCase : upperCase.checked,
    lowerCase : lowerCase.checked,
    num : num.checked,
    sym : sym.checked
}

if (values.upperCase == true && values.lowerCase == false && values.num == false && values.sym == false) {
    upperCase.disabled = true;
}

upperCase.addEventListener('click', () => {
    lowerCase.disabled = false; 
    num.disabled = false; 
    sym.disabled = false;

    values.upperCase = upperCase.checked
    
    if (values.upperCase == true && values.lowerCase == false && values.num == false && values.sym == false) {
        upperCase.disabled = true;
    }
    if (values.lowerCase == true && values.upperCase == false && values.num == false && values.sym == false) {
        lowerCase.disabled = true;
    }
    if (values.num == true && values.lowerCase == false && values.upperCase == false && values.sym == false) {
        num.disabled = true;
    }
    if (values.sym == true && values.lowerCase == false && values.upperCase == false && values.num == false) {
        sym.disabled = true;
    }
})

lowerCase.addEventListener('click', () => {
    upperCase.disabled = false; 
    num.disabled = false; 
    sym.disabled = false;

    values.lowerCase = lowerCase.checked
    
    if (values.lowerCase == true && values.upperCase == false && values.num == false && values.sym == false) {
        lowerCase.disabled = true;
    }
    if (values.upperCase == true && values.lowerCase == false && values.num == false && values.sym == false) {
        upperCase.disabled = true;
    }
    if (values.num == true && values.lowerCase == false && values.upperCase == false && values.sym == false) {
        num.disabled = true;
    }
    if (values.sym == true && values.lowerCase == false && values.upperCase == false && values.num == false) {
        sym.disabled = true;
    }
})

num.addEventListener('click', () => {
    upperCase.disabled = false; 
    lowerCase.disabled = false; 
    sym.disabled = false;
    
    values.num = num.checked
    
    if (values.num == true && values.upperCase == false && values.lowerCase == false && values.sym == false) {
        num.disabled = true;
    }
    if (values.upperCase == true && values.lowerCase == false && values.num == false && values.sym == false) {
        upperCase.disabled = true;
    }
    if (values.lowerCase == true && values.num == false && values.upperCase == false && values.sym == false) {
        lowerCase.disabled = true;
    }
    if (values.sym == true && values.lowerCase == false && values.upperCase == false && values.num == false) {
        sym.disabled = true;
    }
})

sym.addEventListener('click', () => {
    upperCase.disabled = false; 
    lowerCase.disabled = false; 
    num.disabled = false;
    
    values.sym = sym.checked
    
    if (values.sym == true && values.upperCase == false && values.lowerCase == false && values.num == false) {
        sym.disabled = true;
    }
    if (values.upperCase == true && values.lowerCase == false && values.num == false && values.sym == false) {
        upperCase.disabled = true;
    }
    if (values.lowerCase == true && values.num == false && values.upperCase == false && values.sym == false) {
        lowerCase.disabled = true;
    }
    if (values.num == true && values.lowerCase == false && values.upperCase == false && values.sym == false) {
        num.disabled = true;
    }
})




