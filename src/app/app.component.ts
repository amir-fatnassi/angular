import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(){
    var firebaseConfig = {
      apiKey: "AIzaSyDeyu5kQFnqefWE3FeWOgYmk4IaxB5Dpck",
      authDomain: "angular-87684.firebaseapp.com",
      databaseURL: "https://angular-87684.firebaseio.com",
      projectId: "angular-87684",
      storageBucket: "angular-87684.appspot.com",
      messagingSenderId: "875364166698",
      appId: "1:875364166698:web:edb6f79dc0971004d66753",
      measurementId: "G-TSENPWYLN2"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }
}
