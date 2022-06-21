//
const schedule = require('node-schedule');
const cron = require('node-cron');
const csv = require('csv-parser');
const fs = require('fs');

// ...

console.log("\n");
console.log(" ********** It is running **********");
console.log("\n");

//

// this variable will be a list of objects containing the LearnerId and the sum of their QuotedPrice 
var sum_list = []
/*
    [ 
        { 
            learner: "learner1@gmail.com", 
            totalQuoted: 520€, 
        }, 
        {...}, 
        {...} 
    ] 

*/

var billing_list = [];

// sum of all  quotedPrice

fs.createReadStream('extract_caspratique.csv')
    .pipe(csv())
    .on('data', (row) => {

        var billing = {}

        // console.log(row);

        // console.log("\n");

        // console.log(row['LearnerId'], " : ", parseFloat(row['QuotedPrice']));

        billing[row['LearnerId']] = parseFloat(row['QuotedPrice']);

        console.log("\n");

        console.log(billing);

        billing_list.push(billing);

        // for // LearnerId 
        // Object.keys(row).forEach(key => {
        //     console.log(key, row[LearnerId]);
        // });

        /*
            const person = {
                firstName: "John",
                lastName: "Doe"
            };

        */


        console.log("\n");

    })
    .on('end', () => {
        console.log("\n");
        console.log('CSV file successfully processed');

        console.log("\n");
        console.log("*************** Billing list ***************");

        console.log(billing_list);
    })
    .on("error", function (error) {
        console.log("\n");
        console.log(error.message);
    });


console.log("\n");
console.log("*************** Billing list ***************");

console.log(billing_list);


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
