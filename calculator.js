
// calc functions - multiply and divide by 10^11 is done to make sure JS doesn't give weird results, hopefully.
const add= (num1, num2)=> ((num1*100000000000)+(num2*100000000000))/100000000000;
const subtract= (num1, num2)=> ((num1*100000000000)-(num2*100000000000))/100000000000;
const multiply= (num1, num2)=>((num1*100000000000)*(num2*100000000000))/100000000000;
const divide= (num1, num2)=> ((num1*100000000000)/(num2*100000000000))/100000000000;

console.log(subtract(0.2,0.1));

