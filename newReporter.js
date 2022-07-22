const http = require('http')
const axios = require('axios')
const {sendKeys} = require("../../automation_tests/resources/classes/classes");
const {string} = require("yargs");
let dataHolder;
let newSpecReporter = {

    jasmineStarted: function(suiteInfo){
        console.log('Running suite with ' + suiteInfo.totalSpecsDefined)
    },
    suiteStarted: function(result){
        console.log('Suite started: ' + result.description + ' whose full description is: ' + result.fullName);
        dataHolder = 'Suite started: ' + result.description + ' whose full description is: ' + result.fullName;
        console.log("this is the data holder string: " + dataHolder);

    },
    specStarted: function(result){
        console.log('Spec started: ' + result.description
            + ' whose full description is: ' + result.fullName);
    },
    specDone: function (result){
        console.log('Spec: ' + result.description + ' was ' + result.status);

        for(var i = 0; i < result.failedExpectations.length; i++) {
            console.log('Failure: ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }

        console.log(result.passedExpectations.length);
    },
    suiteDone: function(result){
        console.log('Suite: ' + result.description + ' was ' + result.status);
        for(var i = 0; i < result.failedExpectations.length; i++) {
            console.log('Suite ' + result.failedExpectations[i].message);
            console.log(result.failedExpectations[i].stack);
        }
    },
    jasmineDone: function(result){
        console.log('Finished suite: ' + result.status);
        for(var i = 0; i < result.failedExpectations.length; i++){
            console.log('Global ' + result.failedExpectations.length[i].message);
            console.log(result.failedExpectations[i].stack);
        }
    }

}
async function postRequest(){
    let payload = { text: 'Goal sent from automation'};
    let res = await axios.post('http://localhost:5000/api/goals', payload);

    let data = res.data;
    console.log(data);
}

postRequest();


// axios.post('http://localhost:5000/api/goals', "Some text example").then((res)=>{
//     console.log(`Status: ${res.status}`);
//     console.log(`Body: ${res.data}`);
// }).catch((err) => {
//     console.log(err);
// });



/*const sendHTTPRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) =>{
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        xhr.responseType = 'json';
        if(data){
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onerror = () => {
            reject('Something went wrong!');
        };

        xhr.send(JSON.stringify(data));
    });
    return promise;
};

const getData = () => {
    sendHTTPRequest('GET','http://localhost:5000/api/goals').then(responseData => {
        console.log(responseData);
    });
};

const sendData = () => {
    sendHTTPRequest('POST', 'http://localhost:5000/api/goals', dataHolder).then(responseData => {
        console.log(responseData);
    }).catch(err => {
        console.log(err);
    });
};
sendData();*/

//create a test holder object

//put some test info into the object

//make http post request to local server

//check mongodb for info
module.exports = newSpecReporter;