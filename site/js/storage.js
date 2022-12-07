import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';

// Config object gotten aaccording to https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyC5PsCRQVDqghFNErIpeFxd7p7CKRD9U6I",
    authDomain: "filipinotown-9390e.firebaseapp.com",
    projectId: "filipinotown-9390e",
    storageBucket: "filipinotown-9390e.appspot.com",
    messagingSenderId: "446726603100",
    appId: "1:446726603100:web:5877b3ac823592bd8f8199",
    measurementId: "G-HYGPS1DCDR",
  };
const firebaseApp = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(firebaseApp);


async function loadNotes(onSuccess, onFailure) {
    try {
      // const notes = JSON.parse(localStorage.getItem('notes'));
      const notesDoc = doc(firestoreDb, "filipinotown-notes", "notes");
      const result = await getDoc(notesDoc);
      const docData = result.data() || {};
      const notes = docData.content || {};
      onSuccess(notes);
    } catch {
      if (onFailure) {
        onFailure();
      }
    }
  }

  async function saveNote(id, note, app, onSuccess, onFailure) {
    // Save in memory
    app.notes[id] = note;
    /*
      For example, app.notes might look something like this...
      app.notes = {
        "1": "this is the note for tree 1",
        "56": "this is the note for tree 56",
        "8235": "this is the note for tree 8235"
      }
    */
    // Save locally.
    // localStorage.setItem('notes', JSON.stringify(app.notes));
    // Save in the cloud.
    try {
      const notesDoc = doc(firestoreDb, "filipinotown-notes", "notes");
      await setDoc(notesDoc, { content: app.notes });
      if (onSuccess) {
        onSuccess(notesDoc);
      }
    } catch (e) {
      alert(`Shoot, I failed to save the notes in firestore. ${e}`);
      if (onFailure) {
        onFailure(e);
      }
    }
  }

  export {
    loadNotes,
    saveNote,
  };