// save the updated list as ALIEN GIGS (serate)
// open QUOKKA and execute the js file
// the result is printed in the console

const fs = require("fs");
const csvToObj = require("csv-to-js-parser").csvToObj;
const data = fs.readFileSync("#ALIEN DATA.csv").toString();

const description = {
	id: { type: "number", group: 1 },
	date: { type: "string", group: 1 },
	location: { type: "string", group: 1 },
	city: { type: "string", group: 1 },
	province: { type: "string", group: 1 },
	country: { type: "string", group: 1 },
	cancelled: { type: "string", group: 1 },
};

let obj = csvToObj(data, ",", description);

console.log(obj);
