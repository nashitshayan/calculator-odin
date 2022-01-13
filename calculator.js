
// calc functions - multiply and divide by 10^11 is done to make sure JS doesn't give weird results, hopefully.
const fAdd= (num1, num2)=> ((num1*Math.pow(10,11))+(num2*Math.pow(10,11)))/Math.pow(10,11);
const fSubtract= (num1, num2)=> ((num1*Math.pow(10,11))-(num2*Math.pow(10,11)))/Math.pow(10,11);
const fMultiply= (num1, num2)=> ((num1*Math.pow(10,11))*(num2*Math.pow(10,11)))/Math.pow(10,22);
const fDivide= (num1, num2)=> Number((num1/num2).toFixed(11));




const operate = (num1, num2, operator)=>{
    let operation= {
        '+': fAdd(num1,num2),
        '-': fSubtract(num1,num2),
        '*': fMultiply(num1,num2),
        '/': fDivide(num1,num2),
    }
    if(operation[operator]%1!=0)
        return Number((operation[operator]).toFixed(11));
    return operation[operator];
}

//console.log(typeof Number(operate(2,3,'/').toFixed(9)))
//grabbing number and operator btns
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const zero = document.getElementById('zero');
const dot = document.getElementById('dot');

const plus= document.getElementById('plus');
const minus = document.getElementById('minus');
const multiply = document.getElementById('multiply');
const divide = document.getElementById('divide');
const equals = document.getElementById('equals');
const del = document.getElementById('delete');
const allClear = document.getElementById('allClear');

const screen = document.getElementById('screen');
let displayValue='';

const fDisplay = (elem)=>{
     screen.textContent+= elem.textContent;
     return screen.textContent;
}
const fAllClear= ()=>{
    screen.textContent = '';
}
const resetVar = ()=>{
    num1= 0;
    num2= '';
    operator= '';
    flag = false;
    isDot=false;
}

let isResOnDisplay= false;
const numbersDiv= document.querySelector('.numbers');
const listOfNumbers= Array.from(numbersDiv.children);

listOfNumbers.forEach(numberElem => {
  
    numberElem.addEventListener('click', ()=>{
        //stop multiple decimal points
        if(numberElem=== dot && isDot)
        {
            return;
        }
        else {
            if(isResOnDisplay)
         {
             resetVar();
            screen.textContent='';
            isResOnDisplay=false;
        }
        if(flag)
        {
            num2+=numberElem.textContent;
        }
        displayValue= fDisplay(numberElem);
        if(numberElem === dot) // set isDot to true for the first entry of dot.
            {
                isDot=true;
            }
        }
        console.log(num1, num2)
    })
})


 let num1= 0;
 let num2= '';
 let operator= '';
 let flag = false;
 let finalRes= 0;
 let isDot=false;


//operators
const setTheNumbers = () =>{
    isDot=false;
    if(finalRes!=0 && operator != '' ) //result of prev calculation will be taken as num1 for next calculation
    {
        num1= finalRes;
        num2= '';
        isResOnDisplay=false;
        finalRes=0;
    }
    else if(operator != '')
        {
            num1= operate(Number(num1), Number(num2), operator );
            num2='';}
    else
        num1= displayValue;
    
    flag= true;
    finalRes=0;
}
plus.addEventListener('click', ()=>{
    setTheNumbers();
    operator= plus.textContent;
    displayValue= fDisplay(plus);
    console.log(num1, num2)
    
})
minus.addEventListener('click', ()=>{
    setTheNumbers();
    operator= minus.textContent;
    displayValue= fDisplay(minus);
    console.log(num1, num2)
})
multiply.addEventListener('click', ()=>{
    setTheNumbers();
    operator= multiply.textContent;
    displayValue= fDisplay(multiply);
    console.log(num1, num2)
})
divide.addEventListener('click', ()=>{
    setTheNumbers();
    operator= divide.textContent;
    displayValue= fDisplay(divide);
    console.log(num1, num2)
})


equals.addEventListener('click', ()=>{
    fAllClear();
    if(num2==='')
       num2=1;
    if(num2==='0' && operator==='/')
       finalRes= 'ERROR';
    else
        finalRes= operate(Number(num1), Number(num2), operator );
    screen.textContent= /*'Ans: '+*/ finalRes;
        isResOnDisplay=true;
})

allClear.addEventListener('click', ()=> {
    fAllClear();
    resetVar();
    finalRes=0;
})


console.log(typeof 0.1);

