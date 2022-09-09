class CSVWriter {
	#quote;
	#newLine;
	#seperator;
	#allowTrailingComma;
	#cellMapper = null;
	#allData = null;
	#includeHeader = true;
	#outputType = 'plain/text';
	csvString = '';
	constructor({ header = null, data = null } = {}, {
		seperator = ',',
		quote = '"',
		newLine = '\r\n',
		includeHeader = true,
		allowTrailingComma = true,
		cellMapper = null
	} = {}) {
		this.#quote = String(quote);
		this.#newLine = String(newLine);
		this.allowTrailingComma = Boolean(allowTrailingComma);
		this.#seperator = seperator;
		this.#includeHeader = Boolean(includeHeader);

		if (typeof cellMapper === 'function') { this.#cellMapper = cellMapper; }
		if (!Array.isArray(header)) { this.#error('INVALID HEADER'); }
		if (!Array.isArray(data)) { this.#error('INVALID DATA'); }
		for (let i = 0, j = data.length; i < j; i++) {
			if (header.length !== data[i].length) {
				this.error(`Invalid Row Length Row Number ${i + 1} Consisting Data ${data[i].join()}`);
			}
		}
		this.#allData = this.#includeHeader ? [header, ...data] : data;
		this.csvString = new Promise((resolve, reject) => {
			resolve(this.#provide());
		});
	}
	#stdCellMapper(v, colIdx, rowIdx, lastRowIdx) {
		v = String(v);
		if (lastRowIdx === colIdx && v === '') {
			return this.#allowTrailingComma ? '' : `${this.#quote}${this.#quote}`;
		}
		return v.includes(this.#quote) ? v.replace(this.#quote, `${this.#quote}${this.#quote}`) : v;
	};
	#fixData() {
		let headerLength = this.#allData[0].length;
		this.#allData.forEach((element, i) => {
			if (!Array.isArray(element)) {
				this.error(`Invalid Row on Row Number ${i}`);
			}
			if (headerLength !== element.length) {
				this.#error(`Row ${i} has Incorrect Columns. Row Value is ${element.join()}`);
			}
		});
		const cellMapper = (this.#cellMapper === null)
			? (v, colIdx, rowIdx, lastRowIdx) => this.#stdCellMapper(v, colIdx, rowIdx, lastRowIdx)
			: (v, colIdx, rowIdx, lastRowIdx) => this.#stdCellMapper(this.#cellMapper(v, colIdx, rowIdx, lastRowIdx), colIdx, rowIdx, lastRowIdx);

		const seperator = this.#seperator;
		this.#allData = this.#allData.map(function (row, rowIdx) {
			return row.map(function (cell, colIdx) {
				return cellMapper(cell, colIdx, rowIdx, row.length - 1);
			}).join(seperator);
		}).join(this.#newLine);
	}

	#provide() {
		this.#fixData();
		return this.#allData;
	}
	async getDataUrl() {
		const csvStr = await this.csvString;
		return `data:text/csv;base64,${window.btoa(unescape(encodeURIComponent(csvStr)))}`;
	}
	async getBlob() {
		const csvStr = await this.csvString;
		return new Blob([csvStr], {
			type: 'text/csv'
		});
	}
	#error(error) {
		throw new Error(error);
	}
}