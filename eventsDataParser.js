// save the updated list as ALIEN GIGS (serate)

const fs = require("fs");
const csvToObj = require("csv-to-js-parser").csvToObj;
const data = fs.readFileSync("ALIEN GIGS (serate) - Sheet1.csv").toString();

const description = {
	id: { type: "string", group: 1 },
	date: { type: "string", group: 1 },
	location: { type: "string", group: 1 },
	city: { type: "string", group: 1 },
	province: { type: "string", group: 1 },
};

let obj = csvToObj(data, ",", description);

console.log(obj);
