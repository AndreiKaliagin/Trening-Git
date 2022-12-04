  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB4cP2AR7N9e0hPbWafSOnRDYKVa5_DiKk",
    authDomain: "dackmooncurse.firebaseapp.com",
    databaseURL: "https://dackmooncurse-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dackmooncurse",
    storageBucket: "dackmooncurse.appspot.com",
    messagingSenderId: "116473652638",
    appId: "1:116473652638:web:b9a7ae56bd6956a637a28f"
});

  const dbContext = firebaseApp.database();
  const auth = firebaseApp.auth();

