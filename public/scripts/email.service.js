angular.module("aquaticsApp").service('EmailService', function ($http, $location, $rootScope){
  // console.log('EmailService is loaded');

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
  // console.log('the emailDataObject is', emailDataObject);


  return $http.post('/emails', emailDataObject).then(function(response) {
    // console.log('back from emails.' , response.data);

  }).then(function() {
  });

};

//getEmails function//get call from DB where contact info is stored
this.getEmails = function () {

return $http.get('/user').then(function(response) {
    // ctrl.contactList = user.username;
  });
};

ctrl.getEmails();


function formatDate(dt) {
  // console.log('this is the dt', dt);
      var dt = new Date(dt);
       var month = dt.getMonth() + 1;
       if (month.length = 1) {
           month = '0' + month;
       }
       var year = dt.getFullYear();
       var date = dt.getDate();

       return month + '-' + date + '-' + year;
   }

this.sendCancelEmail = function (dateObj, facilityInfo, userContactData) {
  var date = formatDate(dateObj.date);
  // console.log('this is the new formatted date', date);
  var sendingEmail = true;

  var emailDataObject = {
    id: dateObj.facility_availibility_id,
    cancelledDate: date,
    startTime: dateObj.start_time,

    facilityName: facilityInfo.name,
    facilityAddress: facilityInfo.street_address + ' ' + facilityInfo.city +', ' + facilityInfo.state + ' '+ facilityInfo.zip,

    contacts: userContactData.username,
    contactPerson: userContactData.first_name + ' ' + userContactData.last_name + ' ' + userContactData.phone_number,
  };
  // console.log('the emailDataObject is', emailDataObject);


  return $http.post('/emails/cancel', emailDataObject).then(function(response) {
    // console.log('back from emails.' , response.data);

  }).then(function() {
    // $location.path('/');
  });

};

});
