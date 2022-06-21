//
const schedule = require('node-schedule');
const cron = require('node-cron');
const csv = require('csv-parser');
const fs = require('fs');

// ...


// this variable will be a list of objects containing the LearnerId and the sum of their QuotedPrice 
var billing_list = []
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


// this variable will be an object for the extracted data
// containing the LearnerID as key and the sum of all their QuotedPrice as value 
var sum_list = {};
/*
    { 
        'fenolle.lenenr@orange.fr': 140,
        'noloe_123@gmail.fr': 778,
        'Cenolle.cerre0112@gmail.com': 175,
        'veooro@gmail.fr': 1710,
        ...,
        ...,
        ...
    }
*/


// fs.createReadStream('extract_caspratique.csv')
//     .pipe(csv())
//     .on('data', (row) => {

//         // this here works, but is not totaly safe : 'key" in my_object
//         // row['LearnerId'] in sum_list ? sum_list[row['LearnerId']] += parseFloat(row['QuotedPrice']) : sum_list[row['LearnerId']] = parseFloat(row['QuotedPrice']);

//         // this one is better : my_object.hasOwnProperty('key')
//         sum_list.hasOwnProperty(row['LearnerId']) ? sum_list[row['LearnerId']] += parseFloat(row['QuotedPrice']) : sum_list[row['LearnerId']] = parseFloat(row['QuotedPrice']);

//     })
//     .on('end', () => {
//         console.log("\n");
//         console.log('CSV file successfully processed');

//         // console.log("\n");
//         // console.log("*************** ALL Sum List Object ***************");

//         // console.log(sum_list);

//         Object.entries(sum_list).forEach(entry => {
//             const [key, value] = entry;
//             // console.log(key, value);

//             billing_list.push({
//                 learner: key,
//                 totalQuoted: value
//             })
//         });

//         console.log("\n");
//         console.log("******************** Final Billing List format ********************");
//         console.log(billing_list);

//     })
//     .on("error", function (error) {
//         console.log("\n");
//         console.log(error.message);
//     });



// Execute a cron job every hour when, the minute is 01 (e.g. 19:01, 20:01, 21:01, etc.).
const job = schedule.scheduleJob('1 * * * *', function(){
    console.log("\n");
    console.log('The answer to life, the universe, and everything!');
});


// Schedule tasks to be run on the server every hour, when the minute is 02 (e.g. 19:02, 20:02, 21:02, etc.).
cron.schedule('2 * * * *', function() {
    console.log("\n");
    console.log('running a task every hour');
});


// Execute a cron job every 1 Minute = */1 * * * *
const job_5 = schedule.scheduleJob('*/1 * * * *', function(){
    console.log("\n");
    console.log('running a task every minute');
    console.log("\n");
    
    fs.createReadStream('extract_caspratique.csv')
    .pipe(csv())
    .on('data', (row) => {

        // this here works, but is not totaly safe : 'key" in my_object
        // row['LearnerId'] in sum_list ? sum_list[row['LearnerId']] += parseFloat(row['QuotedPrice']) : sum_list[row['LearnerId']] = parseFloat(row['QuotedPrice']);

        // this one is better : my_object.hasOwnProperty('key')
        sum_list.hasOwnProperty(row['LearnerId']) ? sum_list[row['LearnerId']] += parseFloat(row['QuotedPrice']) : sum_list[row['LearnerId']] = parseFloat(row['QuotedPrice']);

    })
    .on('end', () => {
        console.log("\n");
        console.log('CSV file successfully processed');

        // console.log("\n");
        // console.log("*************** ALL Sum List Object ***************");

        // console.log(sum_list);

        Object.entries(sum_list).forEach(entry => {
            const [key, value] = entry;
            // console.log(key, value);

            billing_list.push({
                learner: key,
                totalQuoted: value
            })
        });

        console.log("\n");
        console.log("******************** Final Billing List format ********************");
        console.log(billing_list);

    })
    .on("error", function (error) {
        console.log("\n");
        console.log(error.message);
    });

});

