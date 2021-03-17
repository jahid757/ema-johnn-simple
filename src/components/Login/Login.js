import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { useState } from 'react';


if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
  }

function Login() {
  const [newUser,setNewUser] = useState(false)
  const [user,setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    password: '',
    error: '',
    photoURL: '',
    success:false
  })

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();

  const handelSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
    .then(result =>{
      console.log(result.user);
      const {displayName,email,photoURL} = result.user;
      const signedInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
      console.log(displayName,email,photoURL);
    })
    .catch(error =>{
      console.log(error)
      console.log(error.message)
    })
  }

  const handelSingOut = () => {
    firebase.auth().signOut()
    .then(() =>{
      const signedOutUser = {
        isSignIn : false,
        name:'',
        email:'',
        photo: ''
      }
      setUser(signedOutUser)
    })
    .catch(error => console.log(error))
  }

  const handelFbSignIn = () => {
      firebase.auth().signInWithPopup(fbProvider).then((result) => {
      const {displayName,email,photoURL} = result.user;
      const signedInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser);
    })
    .catch((error) => {
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  const handelBlur = (e) => {
    let isFieldValid ;
    if(e.target.name === 'name'){
      isFieldValid = e.target.value
    }
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value)
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = {...user}
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo); 
    }
  }

  const handelSignUp = (e) =>{
    // register
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          const newUserInfo = {...user}
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo)
          updateUserName(user.name)
        })
        .catch((error) => {
          const newUserInfo = {...user};
          newUserInfo.error = error.message
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    //Log in

    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((response) => {
          const newUserInfo = {...user}
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo)
          console.log('sign in info', response.user);
        })
        .catch((error) => {
          const newUserInfo = {...user};
          newUserInfo.error = error.message
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
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

  return (
    <div className="App">
      {
        user.isSignIn ? <button onClick={handelSingOut}>Sign Out</button> : <button onClick={handelSignIn}>Sign in</button>
      }
      <br/>
      <br/>
      <button onClick={handelFbSignIn}> <i className="fab fa-facebook"></i> Log in With Facebook</button>
      {
        user.isSignIn && <div>
          <h2>Welcome {user.name}</h2>
          <p>Email : {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }
      <h1>Our Custom Login System</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="newUser"/>
      <label htmlFor="newUser"> New User Registration</label>
      <form onSubmit={handelSignUp}>
        {newUser && <input type="text" name="name" onBlur={handelBlur} placeholder="Name"/>}
        <br/>
        <input type="email" onBlur={handelBlur} name="email" id="email" placeholder="Email" required/>
        <br/>
        <input type="password" onBlur={handelBlur} name="password" id="pass" placeholder="Password" required/>
        <br/>
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"}/>
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {
        user.success && <p style={{color: 'green'}}>User {newUser ? 'Created' : 'Log in'} Successful</p>
      }
    </div>
  );
}

export default Login;
