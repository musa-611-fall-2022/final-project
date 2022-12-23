import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';

// Config object gotten aaccording to https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyC7suOtksCNMwlMdWTYqPEkvU9qEKAI2LU",
  authDomain: "final-project-e7285.firebaseapp.com",
  projectId: "final-project-e7285",
  storageBucket: "final-project-e7285.appspot.com",
  messagingSenderId: "138535656771",
  appId: "1:138535656771:web:5a7d6d37c6aecd6781e3f6",
  measurementId: "G-WJJJSF5XP1",
};
const firebaseApp = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(firebaseApp);

function downloadInventory(onSuccess, onFailure) {
  fetch('data/NPS_-_National_Register_of_Historic_Places_Locations2.geojson')
  .then(resp => {
    if (resp.status === 200) {
      const data = resp.json();
      return data;
    } else {
      alert('Oh no, I failed to download the data.');
      if (onFailure) { onFailure() }
    }
  })
  .then(onSuccess);
}

async function loadNotes(onSuccess, onFailure) {
  try {
    const notesDoc = doc(firestoreDb, "house-inventory-notes", "notes");
    const result = await getDoc(notesDoc);
    const notes = result.data().notes;
    localStorage.setItem('notes', JSON.stringify(notes));
    onSuccess(notes);
  } catch {
    if (onFailure) {
      onFailure();
    }
  }
}

async function saveNotes(notes, onSuccess, onFailure) {
  // Save locally.
  localStorage.setItem('notes', JSON.stringify(notes));

  // Save in the cloud.
  try {
    const notesDoc = doc(firestoreDb, "house-inventory-notes", "notes");
    await setDoc(notesDoc, { notes });
    console.log("Document written with ID: ", notesDoc.id);
    if (onSuccess) {
      onSuccess(notesDoc);
    }
  } catch (e) {
    console.error("Error adding document: ", e);
    if (onFailure) {
      onFailure(e);
    }
  }
}

export {
  downloadInventory,
  loadNotes,
  saveNotes,
};