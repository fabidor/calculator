let digits=document.querySelectorAll('.numbers');
let operators = document.querySelectorAll('.ops');
let equals = document.querySelectorAll('.equals');
let clean=document.querySelectorAll('.clear');
const viewer=document.querySelector('.viewport');
const calcText=document.createElement('div');
calcText.classList.add("calcText");
let displayDig='';
let numbers =[];
let operations = [];

function clear(){
    displayDig ="";
    calcText.textContent =displayDig;
    numbers = [];
    operations =[];
}

function growNumber(digit){
    if(displayDig.length > 10){
        return;
    }
    if(digit.id === "."){
        if (!displayDig.includes(".")){
            displayDig += ".";
        } else{
            return;
        }
    } else if(digit.id == "-"){
        if(displayDig[0] == "-"){
            displayDig = displayDig.substring(1,displayDig.length);
        } else{
            let neg="-";
            displayDig=neg.concat(displayDig);
        }
    } else{
        displayDig += digit.id;
    }
    calcText.textContent= displayDig;
    viewer.appendChild(calcText);
}

function beginOperation(op){
    if(displayDig == ''){
        return;
    }
    numbers.push(parseFloat(displayDig));
    displayDig='';
    operations.push(op.id);
}

function sum(firstVal, secondVal){
    return (firstVal + secondVal);
}
function product(firstVal, secondVal){
    return (firstVal*secondVal);
}
function difference(firstVal, secondVal){
    return(firstVal-secondVal);
}
function quotient(firstVal, secondVal){
    if(secondVal==0){
        return "OOPS";
    }
    return(firstVal/secondVal);
}
function performOperation(firstVal, secondVal, op){
    if (op == '+'){
        return sum(firstVal, secondVal);
    } else if(op == "*"){
        return product(firstVal, secondVal)
    } else if(op=="-"){
        return difference(firstVal, secondVal);
    } else if(op =="/"){
        return quotient(firstVal, secondVal);
    }
}

function runOperations(){
    if(displayDig != ''){
        numbers.push(parseFloat(displayDig));
        displayDig ="";
    }
    while(numbers.length > 1){
        let firstVal = numbers.shift();
        let secondVal = numbers.shift();
        let op = operations.shift();
        console.log(firstVal);
        numbers.unshift(performOperation(firstVal, secondVal, op));
    }
    console.log(numbers);
    displayDig=numbers.shift().toString();
    if(displayDig.length >10){
        displayDig=displayDig.substring(0,11);
    }
    operations=[];
    calcText.textContent=displayDig;
}
digits.forEach(digit => digit.addEventListener('click', () => growNumber(digit)))
operators.forEach(op => op.addEventListener('click', () => beginOperation(op)));
equals.forEach(equal => equal.addEventListener('click', runOperations));
clean.forEach(clearButt => clearButt.addEventListener('click', clear));
