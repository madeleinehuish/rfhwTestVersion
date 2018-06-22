//Awesome Food Truck App!!!!

const _ = require('lodash');
const axios = require('axios');

//pull in code from time module
const { day, hour, timeCurrent, dayCurrent } = require('./time');

//pull in code from keypress module
const keypress = require('./keypress');

//create the url to call api with given day
const baseUrl = 'https://data.sfgov.org/resource/bbb8-hzi6.json';
const query = `${baseUrl}?dayorder=${day}`;

//calling api with async/await syntax with query above then filtering by current time
const fetchTrucks = async () => {
	const res = await axios.get(query);
	const truckArray = await res.data;

	const truckFiltered = truckArray.filter(truck => {
		const start24 = Number(truck.start24.substr(0,2));
		const end24 = Number(truck.end24.substr(0,2));

		return start24 <= hour && hour < end24;

	})

	//sort list alphabetically with Lodash
	const alphabetical = _.sortBy(truckFiltered, ['applicant']);

	//print out list of trucks
	console.log('\n','\x1b[32m',`Trucks open in SF at ${timeCurrent} on ${dayCurrent}`, '\n', '\x1b[0m');

	for(let i = 0; i < alphabetical.length; i++) {

		if (i%10 === 0 && i!==0) {  //only 10 at a time
			console.log('\x1b[32m','Press any key for more or ctrl-C to exit','\x1b[0m', '\n');
			await keypress();
		}
		console.log(alphabetical[i].applicant, '\n', alphabetical[i].locationdesc, '\n');
		if(i===alphabetical.length-1) process.exit();
	}
}

fetchTrucks();
