let math_it_up = {
		'+': function(x, y) { return x + y},
		'-': function(x, y) { return x - y},
		'*': function(x, y) { return x * y},
		'/': function(x, y) { return x / y}
	}
export function evalPostfix(postfix) {
	let stack = new Array();
	for(let i = 0; i < postfix.length; i++) {
		if(postfix[i] == ' ') continue;
		if(postfix[i] == '+' ||
	   	 postfix[i] == '-' ||
	     postfix[i] == '*' ||
	     postfix[i] == '/') {
			let v2 = stack.pop();
			let v1 = stack.pop();
			let v = math_it_up[postfix[i]](v1, v2);
			stack.push(v);
		}else{ //a number
			let startIndex = i;
			while((isNaN(postfix[i]) == false && postfix[i] != ' ') || postfix[i] == '.') i++;
			let v = parseFloat(postfix.substring(startIndex, i));
			stack.push(v);
			i--;
		}
	}
	return stack.pop();
}

export function infixToPostfix(infix) {
	let postfix='';
	let stack = new Array();
	for(let i=0; i < infix.length; i++) {
		if(infix[i] == ' ') continue;
		if((isNaN(infix[i]) == false && infix[i] != ' ')  || infix[i] == '.') { //a number
			let startIndex = i;
			while((isNaN(infix[i]) == false && infix[i] != ' ') || infix[i] == '.') i++;
			postfix += infix.substring(startIndex, i);
			postfix += ' ';
			i--; //forloop will increment to next non-dighit index
		}
		else if(infix[i] == '(') stack.push(infix[i]);
		else if(infix[i] == ')') {
			while(true){
				let op = stack.pop();
				if(op == '(') break;
				postfix += op;
				postfix += ' ';
			}
		}
		else { //operator
			if(stack.length == 0) stack.push(infix[i]);
			else {
				let lastElem;
				if(infix[i] == '*' || infix[i] == '/'){
					while(true){
						lastElem = stack.slice(-1)[0];
						if(lastElem == '*' || lastElem == '/') {
							stack.pop();
							postfix += lastElem;
							postfix += ' ';
						}else break;
					}
				}else{ // '+' '-'
					while(true){
						lastElem = stack.slice(-1)[0];
						if(lastElem == '(' || lastElem == undefined) break;
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
	while(stack.length !=0){
		let op = stack.pop();
		postfix += op;
		postfix += ' ';
	}
	return postfix;
}
