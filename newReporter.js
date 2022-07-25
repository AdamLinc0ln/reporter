const http = require('http')
const axios = require('axios')
const {sendKeys} = require("../../automation_tests/resources/classes/classes");
const {string} = require("yargs");
let newSpecReporter = {
    logInfo: {},
    jasmineStarted: function(suiteInfo){
        console.log('Running suite with ' + suiteInfo.totalSpecsDefined),
        this.setData('jasmineStarted', suiteInfo.totalSpecsDefined, this.logInfo);
    },
    suiteStarted: function(result){
        console.log('Suite started: ' + result.description + ' whose full description is: ' + result.fullName);
        let suiteString = 'Suite started: ' + result.description + ' whose full description is: ' + result.fullName;
        this.setData('suiteStarted', suiteString, this.logInfo);
        //console.log("this is the data holder string: " + dataHolder);
        //dataHolder = 'Suite started: ' + result.description + ' whose full description is: ' + result.fullName;

    },
    specStarted: function(result){
        console.log('Spec started: ' + result.description
            + ' whose full description is: ' + result.fullName);
        let specString = 'Spec start ' + result.description + ' whose full description is: ' + result.fullName;
        this.setData('Spec started', specString, this.logInfo)
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
        //call post request from here
        postRequest(this.getData());
        //post request needs to take the data object
    },
    setData: function(step, data, obj){
        obj[step] = data;
    },
    getData: function(){
        return this.logInfo;
    }
}

async function postRequest(parameter){
    for(var i = 0; i < newSpecReporter.getData().length; i++){
        console.log(newSpecReporter.getData().length[i].message);
    }
    console.log(parameter);
    let payload = JSON.stringify(parameter);
    let res = await axios.post('http://localhost:5000/api/goals', payload);

    let data = res.data;
    console.log(data);
}

module.exports = newSpecReporter;