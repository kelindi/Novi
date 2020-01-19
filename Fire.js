import firebase from 'firebase'; // 4.8.1

class Fire {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyATuudGX4Qc-KEz792-6sSD9FUAvgYSZ7A",
            authDomain: "uofthacks-4a4ba.firebaseapp.com",
            databaseURL: "https://uofthacks-4a4ba.firebaseio.com",
            projectId: "uofthacks-4a4ba",
            storageBucket: "uofthacks-4a4ba.appspot.com",
            messagingSenderId: "244500316018",
            appId: "1:244500316018:web:0f00349257d58f6310e7eb",
            measurementId: "G-B6NCZ6VVLN"
      });
    }
  }

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
