
// calc functions - multiply and divide by 10^11 is done to make sure JS doesn't give weird results, hopefully.
const add= (num1, num2)=> ((num1*Math.pow(10,11))+(num2*Math.pow(10,11)))/Math.pow(10,11);
const subtract= (num1, num2)=> ((num1*Math.pow(10,11))-(num2*Math.pow(10,11)))/Math.pow(10,11);
const multiply= (num1, num2)=> ((num1*Math.pow(10,11))*(num2*Math.pow(10,11)))/Math.pow(10,22);
const divide= (num1, num2)=> (num1/num2);




const operate = (num1, num2, operator)=>{
    let operation= {
        '+': add(num1,num2),
        '-': subtract(num1,num2),
        '*': multiply(num1,num2),
        '/': divide(num1,num2),
    }
    return operation[operator];
}


console.log(operate(2,3,'*'));
