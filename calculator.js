
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
    if(operation[operator]%1!=0) //if the result is in decimal, then only have 11 decimals
        return Number((operation[operator]).toFixed(11));
    return operation[operator];
}


const numberList= [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'zero',
    'dot'
]

const operatorList = [
    'plus',
    'minus',
    'multiply',
    'divide'
]
const screen = document.getElementById('screen');
let displayValue='';

let isResOnDisplay= false;
const numbersDiv= document.querySelector('.numbers');
const listOfNumbers= Array.from(numbersDiv.children);

let num1= 0;
let num2= '';
let operator= '';
let flag = false;
let finalRes= 0;
let isDot=false;
let operatorAlreadyAdded = false;

//display 
const fDisplay = (elem)=>{
    if(typeof elem==='object')
       screen.textContent+= elem.textContent;
    else 
        screen.textContent+=elem;

    return screen.textContent;

}

//clear screen
const clearScreen= ()=>{
    screen.textContent = '';
}

//reset variables
const resetVar = ()=>{
    num1= 0;
    num2= '';
    operator= '';
    flag = false;
    isDot=false;
}



const handleNumberInput= (numberElem)=>{
    // multiple operators handling
    operatorAlreadyAdded = false;
        
    //stop multiple decimal points
    
    if((numberElem=== dot || numberElem==='.') && isDot)
        return;
    else {
        if(isResOnDisplay) //if there is prev result on screen
     {
        resetVar();
        screen.textContent='';
        isResOnDisplay=false;
    }

     //if first number and operator already input
     if(flag) 
        num2+= typeof numberElem ==='object'? numberElem.textContent : numberElem;
        
     displayValue= fDisplay(numberElem);

     if(numberElem === dot || numberElem==='.') // set isDot to true for the first entry of dot.
         isDot=true;
    }
}



const handleOperatorInput = (operatorElem) =>{
    if(operatorAlreadyAdded)
            return;
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
    operatorAlreadyAdded = true;
    
    if(typeof operatorElem==='object')
        operator= operatorElem.textContent;
    else
        operator= operatorElem;
    displayValue= fDisplay(operatorElem);
}


const handleEquals = ()=>{
            clearScreen();
            if(num2==='')
               {    if(operator==='*' || operator==='/')
                        num2=1;
                    else
                        num2=0;
                }
            if(num2==='0' && operator==='/')
               finalRes= 'ERROR';
            else
                finalRes= operate(Number(num1), Number(num2), operator );
            screen.textContent= /*'Ans: '+*/ finalRes;
                isResOnDisplay=true;
}

const allCLear = ()=>{
            clearScreen();
            resetVar();
            finalRes=0;
}
const backSpace = ()=>{
    if(!isResOnDisplay)
            {   
                if(screen.textContent.slice(-1)==='.')
                    isDot=false;
                screen.textContent=screen.textContent.slice(0,-1);
                
            }
            else
                {
                    allCLear();
                }
}

//handling click input
document.addEventListener('click', (e)=>{

    //display numbers
    if(numberList.includes(e.target.id))
        {
            handleNumberInput(e.target)
        }
    //display operators
    else if(operatorList.includes(e.target.id))
    {
        handleOperatorInput(e.target);
    }
    //show the result
    else if(e.target.id==='equals')
        {
            handleEquals();
        }
    //all clear
    else if (e.target.id==='allClear')
        {
            allCLear();
        }
    //delete i.e backspace
    else if (e.target.id==='delete')
        {
            backSpace();
        }
})



//keyboard support

document.addEventListener('keypress', (e)=> {
    if((Number(e.key)>=0 && Number(e.key)<=9)|| e.key==='.')
        handleNumberInput(e.key)

    else if(e.key==='+' || e.key==='-' || e.key==='*' || e.key==='/')
        handleOperatorInput(e.key)
        
    else if (e.key==='Enter')
        handleEquals();
    else if (e.key==='Backspace')
        backSpace();
})