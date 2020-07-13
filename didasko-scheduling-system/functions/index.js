const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.auth().createUser({
    email: 'user@example.com',
    emailVerified: false,
    phoneNumber: '+11234567890',
    password: 'secretPassword',
    displayName: 'John Doe',
    photoURL: 'http://www.example.com/12345678/photo.png',
    disabled: false
  }).then(userRecord => {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log('Successfully created new user:', userRecord.uid);
      return null;
    }).catch(error => {
      console.log('Error creating new user:', error);
    });
