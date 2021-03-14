let config = {
  apiKey: "AIzaSyDk2Z-6M30g1M1f_PXKjGPHthTPGhTfvGQ",

  databaseURL: "https://aliencut-fdfd5.firebaseio.com",
  storageBucket: "bucket.appspot.com",
};
firebase.initializeApp(config);

// Get a reference to the database service
let database = firebase.database();

export let eventsRef = database.ref("events");

// var leadsRef = database.ref("leads");
// leadsRef.on("value", function (snapshot) {
//   snapshot.forEach(function (childSnapshot) {
//     var childData = childSnapshot.val();
//     console.log(childData);
//   });
// });
