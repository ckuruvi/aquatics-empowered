angular.module("aquaticsApp").service('EmailService', function ($http, $location, $rootScope){
  console.log('EmailService is loaded');

var ctrl = this;
this.sendEmail = function (newUser) {

  var sendingEmail = true;

  var emailDataObject = {
    id: newUser.id,
    facilityName: newUser.name,
    facilityAddress: newUser.address + ' ' + newUser.city +' ' + newUser.state + ' '+ newUser.zip,
    facilityDescription: newUser.description,
    accessibility: newUser.accessible,
    level: newUser.level,
    cost: newUser.cost,

    photo: newUser.image_url,
    contacts: newUser.email,
    contactPerson: newUser.firstName + ' ' + newUser.lastName + ' ' + newUser.phone,
  };
  console.log('the emailDataObject is', emailDataObject);


  return $http.post('/emails', emailDataObject).then(function(response) {
    console.log('back from emails.' , response.data);

  }).then(function() {
    $location.path('/')
  });

};

//getEmails function//get call from DB where contact info is stored
this.getEmails = function () {
  console.log("trying to get data");
return $http.get('/user').then(function(response) {
    // ctrl.contactList = user.username;
  });
};

ctrl.getEmails();

// this.getFacilittRegData = function () {
//   console.log("trying to get data");
// return  $http.get('/user').then(function(response) {
//
//
//     console.log('got data from facility who registered', response);
//     ctrl.id = response.data[0].id;
//     ctrl.name = response.data[0].name
//     ctrl.street_address = response.data[0].street_address;
//     ctrl.city = response.data[0].city;
//     ctrl.state = response.data[0].state;
//     ctrl.zip = response.data[0].zip;
//     ctrl.description = response.data[0].description;
//     ctrl.level = response.data[0].level;
//     ctrl.cost = response.data[0].cost;
//     ctrl.handicap_accessibility = response.data[0].handicap_accessibility;
//     ctrl.image = response.data[0].image_url
//
//
//     }).catch(function(err){
//         console.log('Error getting data');
//       });
//
//   };
// ctrl.getFacilityData();






});
