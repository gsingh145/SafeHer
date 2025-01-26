import { initializeApp } from "firebase/app";
import { getDatabase, ref, onChildAdded } from "firebase/database";
import firebaseConfig from "./firebaseConfig";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/**
 * Listen for new entries in the specified path of the Firebase Realtime Database
 * @param {string} path - Path in the database to listen for changes
 * @param {Function} callback - Callback function to execute with the new data
 */
export const listenForNewEntries = (path, callback) => {
  const dbRef = ref(database, path);
  onChildAdded(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      callback(data); // Pass new data to the callback function
    }
  });
};

export default database;
