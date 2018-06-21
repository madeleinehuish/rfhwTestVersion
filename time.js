//get current date and time (I put this code here to keep things a little cleaner in index.js)
const date = new Date();
const day = date.getDay();
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
let hour = date.getHours();
const minutes = date.getMinutes();
if (minutes < 10) {
  minutes = '0' + minutes;
}
let hour12 = hour;
let twelve;
if(hour>=12) {
  hour12 = hour - 12;
  twelve = 'PM'
} else twelve = 'AM';
const timeCurrent = hour12 + ':' + minutes + twelve;
const dayCurrent = days[day];

module.exports = { day, hour, timeCurrent, dayCurrent };
