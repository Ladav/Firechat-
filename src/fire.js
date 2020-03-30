import firebase from 'firebase';

import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA1-hAxRLsgc9EMmT3jvgo2eFmf51ZJFMs",
  authDomain: "firechat-bfc22.firebaseapp.com",
  databaseURL: "https://firechat-bfc22.firebaseio.com",
  projectId: "firechat-bfc22",
  storageBucket: "firechat-bfc22.appspot.com",
  messagingSenderId: "578478783755",
  appId: "1:578478783755:web:8f1d3385f8e2b02684760e",
  measurementId: "G-9Y0QNKHK9H"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const signUp = (email, password) => auth().createUserWithEmailAndPassword(email, password);
export const signIn = (email, password) => auth().signInWithEmailAndPassword(email, password);

export const signInWithGoogle = () => {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export const db = firebase.database();
export const usersRef = db.ref('users');
export const activeRef = db.ref('active');
export const chatRef = db.ref('chat');
export const conversationRef = db.ref('conversation');

export const createNewUser = async (user) => {
  const time = new Date().getTime();
  usersRef.child(user.uid).set({
    uid: user.uid,
    email: user.email,
    time
  });
};
export const addUserToActive = async (user) => {
  const time = new Date().getTime();
  activeRef.child(user.uid).set({
    uid: user.uid,
    email: user.email,
    time
  });
};

export const sendMessage = async (user, cid, msg, type, name = '*.*') => { //cid=chatid
  if(!cid) return;
  const currentConversationRef = db.ref('conversation/' + cid);
  const msgId = currentConversationRef.push().key;
  const time = new Date().getTime();
  await currentConversationRef.child(msgId).set({
    uid: user.uid,    // creator of the msg
    email: user.email,
    message: msg,
    time: time,
    type: type,
    name: name
  });
};

export const storage = firebase.storage();

export default firebase;