// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js';
import { getFirestore, doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIzEGVgdAALeCYPOcBWVCmHg0YTFxiWvE",
  authDomain: "finalproject-da52a.firebaseapp.com",
  projectId: "finalproject-da52a",
  storageBucket: "finalproject-da52a.appspot.com",
  messagingSenderId: "326607841169",
  appId: "1:326607841169:web:d91b16bb004c3492db1c30",
  measurementId: "G-4T2NZCJVJV",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(firebaseApp);
  

  const commentEl = document.getElementById('notebox');


  async function loadcomments(onSuccess, onFailure) {
    try {
      // const notes = JSON.parse(localStorage.getItem('notes'));
      const notesDoc = doc(firestoreDb, "gallery-comment-notes", "notes");
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

  async function savenote(galleryID,note, app, onSuccess, onFailure) {
    // Save in memory  

    app.notes[galleryID] = note;
  /* if(app.notes==null){
    
    app.notes[galleryID]={
      type: "FeatureCollection",
      features: [],
    };
    
    app.notes.features.push( {
      "type": "Feature",
      "properties": {
          "ID":galleryID,
          "comment":note,
      },
    });
  }else{
    app.notes.features.properties['comment']=note;
  }*/
  
    // Save locally.
   localStorage.setItem('notes', JSON.stringify(app.notes));
  
    // Save in the cloud.
    try {
      const notesDoc = doc(firestoreDb, "gallery-comment-notes", "notes");
      await setDoc(notesDoc, { content: app.notes[galleryID] });
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


function showcommentinform(gallery,app) {
    const galleryID = gallery.properties['ID'];
    const note = app.notes[galleryID] || '';
   /* let note;
    if(app.notes==null){
    note = 'no comment.' ;}else{
      note=app.notes.features.properties['comment'] ;
    }*/
    commentEl .value = note;
  }
  
  function getFormContent() {
    const note = commentEl.value;
    return note;
  }

  export {
    showcommentinform,
    getFormContent,
    savenote,
    loadcomments,
  };