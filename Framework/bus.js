const functions = [];

function addFunction(func, oneTime, name) {
	functions.push({
		func: func,
		oneTime: oneTime ? oneTime : false,
		name: name ? name : "Function " + functions.length
	});
}

function execFunctions() {
	functions.forEach( func => {
		try {
			func.func();
			if (func.oneTime) {
				removeFunction(func);
			}
		} catch (err)
		{
			console.log("Error executing \`" + func.name + "\`. Removing...");
			removeFunction(func);
		}
	});
}

function removeFunction(func) {
	functions.splice(functions.indexOf(func), 1); 
}

function getFunctions() {
	var result = "**Functions: ** \n\`\`\`\n";
	result += functions.map(es => { return "[" + functions.indexOf(es) + "] - " + es.name }).join('\n');
	result += "\n\`\`\`";
	return result;
}

module.exports = {addFunction, execFunctions, removeFunction, getFunctions};