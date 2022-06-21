//
const schedule = require('node-schedule');
const cron = require('node-cron');
const csv = require('csv-parser');
const fs = require('fs');

// ...

console.log("\n");
console.log(" ********** It is running **********");
console.log("\n");


fs.createReadStream('extract_caspratique.csv')
    .pipe(csv())
    .on('data', (row) => {
        console.log(row);
    })
    .on('end', () => {
        console.log("\n");
        console.log('CSV file successfully processed');
    });



// Execute a cron job when the minute is 01 (e.g. 19:01, 20:01, 21:01, etc.).

const job = schedule.scheduleJob('1 * * * *', function(){
    console.log("\n");
    console.log('The answer to life, the universe, and everything!');
});


// Schedule tasks to be run on the server every hour.
cron.schedule('2 * * * *', function() {
    console.log("\n");
    console.log('running a task every hour');
});
