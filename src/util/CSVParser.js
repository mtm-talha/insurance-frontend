class CSVParser {
	#data;
	#testData;
	static validPattern = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
	static quoteEscapePattern = /(\"|\')/g;
	output;
	#includesHeader;
	#skipComments;
	#quote;
	#seperator;
	#newLine;
	constructor(data, {
		seperator = ',',
		quote = '"',
		newLine = '\r\n',
		includesHeader = true,
		skipComments = true
	} = {}) {
		if (data.length < 1) {
			this.#error('Data Contents cannot be empty');
		}
		this.#includesHeader = Boolean(includesHeader);
		this.#skipComments = Boolean(skipComments);
		this.#quote = String(`${quote}`);
		this.#data = data;
		this.#newLine = String(newLine);
		this.#seperator = seperator;
		let props = this.#detectCSV(this.#data);
		if (props === null) {
			this.#error('Invalid CSV Contents');
		}
		this.#newLine = String(props.newline);
		this.#seperator = props.delimiter;
		this.output = new Promise(resolve => {
			this.#fixData();
			resolve(this.#sanitize(this.#parse()));
		});
	}
	#detectCSV(chunk) {
		let delimiters = [',', ';', '\t', '|', this.#seperator];
		let newlines =['\n', '\r', '\r\n', this.#newLine];
		let lines = chunk.split(/[\n\r]+/g);
		let delimiter = this.#determineMost(lines[0], delimiters);
		let newline = this.#determineMost(chunk, newlines);

		if (!delimiter) {
			if (this.#isQuoted(lines[0])) return { newline: newline };
			return null;
		}

		return {
			delimiter: delimiter,
			newline: newline
		}
	}

	#determineMost(chunk, items) {
		let ignoreString = false;
		let itemCount = Object.fromEntries(items.map(i => [i, 0]));
		let maxValue = 0;
		let maxChar;
		let currValue;
		for (let i = 0; i < chunk.length; i++) {
			if (chunk[i] === '"') ignoreString = !ignoreString;
			else if (!ignoreString && chunk[i] in itemCount) {
				currValue = ++itemCount[chunk[i]];
				if (currValue > maxValue) {
					maxValue = currValue;
					maxChar = chunk[i];
				}
			}
		}
		return maxChar;
	}

	#isQuoted(chunk) {
		let nextQuote = false;
		if (chunk[0] !== '"') return false;
		if (chunk[chunk.length - 1] !== '"') return false;
		for (let i = 1; i < chunk.length - 1; i++) {
			if (chunk[i] === '"') nextQuote = !nextQuote;
			else if (nextQuote) return false;
		}
		return !nextQuote;
	}
	async outputAsObj() {
		const { header, data } = await this.output;
		return data.map(row => Object.fromEntries(row.map((cell, idx) => [header[idx], cell])));
	}
	#error(error) {
		if (typeof bootbox !== null) {
			bootbox.alert(error);
		} else {
			window.alert(error);
		}
		throw new Error(error);
	}
	#testWithoutEscaped() {
		if (!CSVParser.validPattern.test(this.#testData)) {
			return null;
		}
		return true;
	}
	#testWithEscaped() {
		if (!CSVParser.quoteEscapePattern.test(this.#testData)) {
			return null;
		}
		return true;
	}
	#fixData() {
		this.#data = this.#data.split(this.#newLine).filter(k => {
			return (k.length !== 0) && !(this.#skipComments && k[0] === '#');
		}).join(this.#newLine);
	}
	#parse() {
		let pos = '', row = [''], output = [row], i = 0, range = 0, step = true, char;
		for (char of this.#data) {
			if (this.#quote === char) {
				//	if (step && char === pos) row[i] += char;
				step = !step;
			} else if (this.#seperator === char && step) char = row[++i] = '';
			if (this.#newLine === '\r\n') {
				if ('\n' === char && step) {
					if ('\r' === pos) row[i] = row[i].slice(0, -1);
					row = output[++range] = [char = '']; i = 0;
				} else row[i] += char;
				pos = char;
			}
			else {
				if (this.#newLine === char && step) {
					row = output[++range] = [char = '']; i = 0;
				} else row[i] += char;
				pos = char;
			}
		}
		return output;
	}
	#sanitize(inputArr) {
		const headerLength = inputArr[0].length;
		const rx = {
			trimmer: new RegExp(`^\\s*[${this.#quote}](.*)[${this.#quote}]\\s*$`),
			escaper: new RegExp(`[${this.#quote}][${this.#quote}]`, 'g')
		};
		inputArr = inputArr.map((row, ri) => {
			if (Array.isArray(row) || row.replace(/(\r\n|\n|\r)/gm, "") !== "") {
				if (row.length !== headerLength && row.length !== 0) {
					if (!(row.length === 1 && row.includes(this.#newLine))) {
						this.#error(`Row ${ri} has Incorrect Columns. Row Value is ${inputArr[ri].join()}`)
					}
				}
				return row.map(cell => cell
					.replace(rx.trimmer, "$1")
					.replace(rx.escaper, this.#quote)
				);
			}
		});
		let header = [];
		if (this.#includesHeader) {
			header = inputArr.shift();
		} else {
			for (let i = 0; i < inputArr[0].length; i++) {
				header.push('Column-' + i);
			}
		}
		return {
			header: header,
			data: inputArr,
			colCount: headerLength,
			rowCount: inputArr.length,
			cellCount: headerLength * inputArr.length
		};
	}
}