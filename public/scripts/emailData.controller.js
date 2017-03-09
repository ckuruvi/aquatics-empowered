angular.module('aquaticsApp').controller('EmailDataController', function(FacilitiesService, $http, $location){
console.log('Email controller loaded');

var ctrl = this;

ctrl.sendEmail = function () {

  ctrl.sendingEmail = true;

  var emailDataObject = {
    id: ctrl.id,
    facilityName: ctrl.name,
    facilityAddress: ctrl.street_address + ' ' + ctrl.city +' ' + ctrl.state + ' '+ ctrl.zip,
    facilityDescription: ctrl.description,
    accessibility: ctrl.handicap_accessibility,
    level: ctrl.level,
    cost: ctrl.cost,

    photo: ctrl.image_url,
    // contacts: ctrl.contactList,
  };

  console.log('the emailDataObject is', emailDataObject);


  $http.post('/emails', emailDataObject).then(function(response) {
    console.log('back from emails.' , response.data);

  }).then(function() {
    $location.path('/home')
  });

};

//getEmails function//get call from DB where contact info is stored
ctrl.getEmails = function () {
  console.log("trying to get data");
  $http.get('/facility').then(function(response) {
    ctrl.contactList = response.data.name;
  });
};

ctrl.getEmails();



ctrl.getFacilityData = function () {
  console.log("trying to get data");
  $http.get('/facility').then(function(response) {


    console.log('got data from facility profile', response);
    ctrl.id = response.data[0].id;
    ctrl.name = response.data[0].name
    ctrl.street_address = response.data[0].street_address;
    ctrl.city = response.data[0].city;
    ctrl.state = response.data[0].state;
    ctrl.zip = response.data[0].zip;
    ctrl.description = response.data[0].description;
    ctrl.level = response.data[0].level;
    ctrl.cost = response.data[0].cost;
    ctrl.handicap_accessibility = response.data[0].handicap_accessibility


    }).catch(function(err){
        console.log('Error getting data');
      });

  };
ctrl.getFacilityData();



});
