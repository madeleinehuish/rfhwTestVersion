//Awesome Food Truck App!!!!

const _ = require('lodash');
const axios = require('axios');

//pull in code from time module
const { day, hour, timeCurrent, dayCurrent } = require('./time');

//function keypress is modified from a function I located on Stack Overflow
//function purpose is to wait for keypresses (I added the functionality for ctrl-c)
const keypress = async () => {

  process.stdin.setRawMode(true);
  return new Promise(resolve => process.stdin.once('data', (key) => {
		if (key[0]===3) process.exit();
    process.stdin.setRawMode(false)
    resolve()
  })
	)
};

//create the url to call api
const baseUrl = 'https://data.sfgov.org/resource/bbb8-hzi6.json';
const query = `${baseUrl}?dayorder=${day}`;

//calling api with async/await syntax by date then filtering by current time
//see bottom of file for alternate way to call this function with older syntax
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
	console.log(`Trucks open in SF at ${timeCurrent} on ${dayCurrent}`, '\n');

	for(let i = 0; i < alphabetical.length; i++) {

		if (i%10 === 0 && i!==0) {
			console.log('Press any key for more or ctrl-C to exit');
			await keypress();
		}
		console.log(alphabetical[i].applicant, '\n', alphabetical[i].locationdesc, '\n');
		if(i===alphabetical.length-1) process.exit();
	}
}

fetchTrucks();

//this is an older way of calling api with axios without async/await syntax (useful for older versions of Node):
// axios.get(query)
// 		 .then(res=>{
//
// 			 truckArray = res.data;
// 			 let truckFiltered = truckArray.filter(obj=>{
//
// 				 const start24 = Number(obj.start24.substr(0,2));
// 				 const end24 = Number(obj.end24.substr(0,2));
//
// 				 return start24 <= hour && hour < end24;
//
// 			 })
// 			 console.log('filtered: ', truckFiltered.length);
//
// 		 })
