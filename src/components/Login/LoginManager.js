import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';

export const initializeLoginFramework = () =>{
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }
}

export   const handelGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(googleProvider)
    .then(result =>{
      console.log(result.user);
      const {displayName,email,photoURL} = result.user;
      const signedInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success:true
      }
      return signedInUser
    //   console.log(displayName,email,photoURL);
    })
    .catch(error =>{
      console.log(error)
      console.log(error.message)
    })
  }


export   const handelFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
      return firebase.auth().signInWithPopup(fbProvider).then((result) => {
      const {displayName,email,photoURL} = result.user;
      const signedInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success:true
      }
      return signedInUser
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  export const handelSingOut = () => {
   return firebase.auth().signOut()
    .then(() =>{
      const signedOutUser = {
        isSignIn : false,
        name:'',
        email:'',
        photo: ''
      }
      return signedOutUser
    })
    .catch(error => console.log(error))
  }

  export const createUserWithEmailAndPassword = (name, email, password) => {
   return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const newUserInfo = response.user
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name)
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
      const newUserInfo = response.user
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo
    //   console.log('sign in info', response.user);
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(function() {
      console.log('user name Updated successfully')
    }).catch(function(error) {
      console.log(error)
    });
  }