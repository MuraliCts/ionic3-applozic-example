import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

declare var applozic;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.loginApplozic({
      firstName: 'David',
      lastName: 'Allen',
      id: '0814fa90-1f1b-49c8-89e8-38d6ba00608f'
    });
  }

  loginApplozic(patient) {

    let contacts = [
      {'userId': patient.id, 'displayName': patient.firstName + " " + patient.lastName}
    ];

    applozic.addContacts(contacts, function () {
      const alUser = {
        'userId': '0814fa90-1f1b-49c8-89e8-38d6ba00608f',   //Replace it with the userId of the logged in user NOTE : userId need to be string and  +,*,? are not allowed chars in userId.
        // 'password': 'password',  //Put password here
        'authenticationTypeId': 1,
        'applicationId': 'caremon21b4cd536d4ccfd45f1209b',  //replace "applozic-sample-app" with Application Key from Applozic Dashboard
        'displayName': patient.firstName + " " + patient.lastName //Set   the display name of user to show in chat screen
      };
      applozic.login(alUser, function () {
        // alert(alUser.userId + "loggied in successfully")
        applozic.registerPushNotification(function (res) {
          console.log("registered successfully" + res);
          // alert("registered successfully" + res);
        }, function (err) {
          console.log("registered errors" + err);
        });

        //  applozic.launchChatWithUserId('7fa8499f-5480-40b6-88cf-c137f1f85d02', function() {
        //   // applozic.launchChatWithUserId('0814fa90-1f1b-49c8-89e8-38d6ba00608', function() {
        //   console.log("success");
        // }, function () {
        //   console.log("error");
        // });
        //  applozic.showAllRegisteredUsers(true, function(res) {
        //   alert(res);
        // }, function() {});
      }, function (err) {
        console.log("login errors" + err);
      });
    }, function () {

    });
  }

  launchChat() {
    applozic.launchChat(function (res) {
      console.log("chat" + res);
      alert("chat" + res);

      applozic.showAllRegisteredUsers(true, function () {
      }, function () {
      });
    }, function (err) {
      console.log("chat errors" + err);
    });
  }

}
