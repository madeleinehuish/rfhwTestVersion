//function keypress is modified from a function I located on Stack Overflow
//function purpose is to wait for keypresses (I added the functionality for ctrl-c)
module.exports = async () => {

  process.stdin.setRawMode(true);
  return new Promise(resolve => process.stdin.once('data', (key) => {
		if (key[0]===3) process.exit();
    process.stdin.setRawMode(false)
    resolve()
  })
	)
};
