import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
	apiKey: 'AIzaSyBo8bsmNDuWtsMPSKfsWAkTl4p0TTPcLH4',
	authDomain: 'qnotepad-f226a.firebaseapp.com',
	databaseURL: 'https://qnotepad-f226a.firebaseio.com',
	projectId: 'qnotepad-f226a',
	storageBucket: 'qnotepad-f226a.appspot.com',
	messagingSenderId: '687130689058',
	appId: '1:687130689058:web:62ee63dd9a7aa1ce44147b',
	measurementId: 'G-KTMLNP9WSG'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const firebaseAuth = firebase.auth();

const users = db.collection('users');
const surahs = db.collection('surahs');
const surah_notes = db.collection('surah_notes');
const ayahs = db.collection('ayahs');
const topics = db.collection('topics');

export { users, surahs, surah_notes, ayahs, topics, firebaseAuth };
