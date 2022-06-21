
/* We  import / declare / call  all the Node JS modules we need */

// http
const http = require("http"); 

// ***** node fetch module *****
// To use the module in code (for versions prior to version 3.0)
const fetch = require('node-fetch');
// If you're using ESM, you'll import the module in a different manner:
//import fetch from 'node-fetch';

// node task schedduler module
const schedule = require('node-schedule');

// node cron task schedduler module
const cron = require('node-cron');

// csv parser module
const csv = require('csv-parser');

// file system module
const fs = require('fs');

// ...


// tthe url we are going to use to send data
const export_url = "https://hook.integromat.com/lb5g8s0cj3duczsbikrlvtmydzwaxa6j";


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



// Execute a cron job every hour when, the minute is 01 (e.g. 19:01, 20:01, 21:01, etc.).
const job = schedule.scheduleJob('1 * * * *', function(){
    // console.log("\n");
    // console.log('Execute a cron job every hour when, the minute is 01 (e.g. 19:01, 20:01, 21:01, etc.)');
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    console.log("\n");
    console.log('running a task every hour : ', dateTime);

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

        fetch(export_url, {
            method: 'POST',
            body: JSON.stringify(billing_list),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(json => console.log(json));

    })
    .on("error", function (error) {
        console.log("\n");
        console.log(error.message);
    });
});



// ******************************************** Testing ********************************************

// Execute a cron job every 1 Minute = */1 * * * *
const job_5 = schedule.scheduleJob('*/1 * * * *', function(){

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    console.log("\n");
    console.log('running a task every minute : ', dateTime);
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

        fetch(export_url, {
            method: 'POST',
            body: JSON.stringify(billing_list),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(json => console.log(json));

    })
    .on("error", function (error) {
        console.log("\n");
        console.log(error.message);
    });

});

