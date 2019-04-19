let math_it_up = {
		'+': function(x, y) { return x + y},
		'-': function(x, y) { return x - y},
		'*': function(x, y) { return x * y},
		'/': function(x, y) { return x / y},
    's': function(x) {return Math.sin(x)},
		'c': function(x) {return Math.cos(x)},
		't': function(x) {return Math.tan(x)},
	}
let trig = {
	's': 'sin',
	'c': 'cos',
	't': 'tan',
}
export function evalPostfix(postfix) {
	let stack = [];
	for(let i = 0; i < postfix.length; i++) {
		if(postfix[i] === ' ') continue;
		if(postfix[i] === '+' ||
	   	 postfix[i] === '-' ||
	     postfix[i] === '*' ||
	     postfix[i] === '/') {
			let v2 = stack.pop();
			let v1 = stack.pop();
			let v = math_it_up[postfix[i]](v1, v2);
			stack.push(v);
		}
    else if(postfix[i] === 's' || postfix[i] === 'c' || postfix[i] === 't'){
			let v = stack.pop();
			v = math_it_up[postfix[i]](v);
			stack.push(v);
			i+=2; //skip rest of the symbols, 'an' in 'tan', etc
		}
    else{ //a number
			let startIndex = i;
			while((isNaN(postfix[i]) === false && postfix[i] !== ' ') || postfix[i] === '.') i++;
			let v = parseFloat(postfix.substring(startIndex, i));
			stack.push(v);
			i--;
		}
	}
	return stack.pop();
}
function checkNeg(infix) { //return a modified infix which understands neg numbers
	let negPos = [];
	let negLen = 0;
	for(let i = 0; i < infix.length; i++) {
			if(infix[i] === '-'){
				let prev = i - 1;
				while(prev >= 0 && infix[prev] === ' ') prev--;
				if(prev < 0 || infix[prev] === '(') { //negative sign either at the beginning or after a '('
					negPos.push(i + negLen);
					negLen++;
				}
			}
	}
	for(let i = 0; i < negPos.length; i++) {
		infix = infix.slice(0,negPos[i]) + '0' +infix.slice(negPos[i]);
	}
	return infix;
}
export function infixToPostfix(infix) {
	let postfix='';
	let stack = [];
	infix = checkNeg(infix);
	for(let i = 0; i < infix.length; i++) {
		if(infix[i] === ' ') continue;
		if((isNaN(infix[i]) === false && infix[i] !== ' ')  || infix[i] === '.') { //a number
			let startIndex = i;
			while((isNaN(infix[i]) === false && infix[i] !== ' ') || infix[i] === '.') i++;
			postfix += infix.substring(startIndex, i);
			postfix += ' ';
			i--; //forloop will increment to next non-dighit index
		}
		else if(infix[i] === '(') stack.push(infix[i]);
		else if(infix[i] === ')') {
			while(true){
				let op = stack.pop();
				if(op === '(') break;
				postfix += op;
				postfix += ' ';
			}
		}
    else if(infix[i] === 's' || infix[i] === 'c' || infix[i] === 't'){
			let tri = trig[infix[i]];
			stack.push(tri);
			i+=2;
		}
		else { //operator
			if(stack.length === 0) stack.push(infix[i]);
			else {
				let lastElem;
				if(infix[i] === '*' || infix[i] === '/'){
					while(true){
						lastElem = stack.slice(-1)[0];
						if(lastElem === '*' || lastElem === '/' || lastElem === 'sin'
							|| lastElem === 'cos' || lastElem === 'tan') {
							stack.pop();
							postfix += lastElem;
							postfix += ' ';
						}else break;
					}
				}else{ // '+' '-'
					while(true){
						lastElem = stack.slice(-1)[0];
						if(lastElem === '(' || lastElem === undefined) break;
						else {
							stack.pop();
							postfix += lastElem;
							postfix += ' ';
						}
					}
				}
				stack.push(infix[i]);
			}
		}
	}
	while(stack.length !==0){
		let op = stack.pop();
		postfix += op;
		postfix += ' ';
	}
	return postfix;
}
