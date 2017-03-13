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


});
