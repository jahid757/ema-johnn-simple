import './Login.css'
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handelFbSignIn, handelGoogleSignIn, handelSingOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

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
  initializeLoginFramework();

  const [loggedInUser,setLoggedInUser] = useContext(UserContext)
  const history = useHistory();
  const location = useLocation()
  const { from } = location.state || { from: {pathname: "/"} };

  const googleSignIn = () => {
    handelGoogleSignIn()
    .then(response => {
      handelResponse(response,true);
    })
  }
  
  const fbSignIn = () => {
    handelFbSignIn()
    .then(response => {
      handelResponse(response,true);
    })
  }

  const singOut = () => {
    handelSingOut()
    .then(response => {
      handelResponse(response,false);
    })
    
  }

  const handelResponse = (response,redirect) =>{
    setUser(response)
    setLoggedInUser(response)
    if(redirect){
      history.replace(from)
    }
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
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then((response) =>{
        handelResponse(response,true);
      })
    }

    //Log in

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email,user.password)
      .then(response =>{
        handelResponse(response,true);
      })
    }
    e.preventDefault();
  }



  return (
    <div className="Login">
      
      {
        user.isSignIn && <div>
          <h2>Welcome {user.name}</h2>
          <p>Email : {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }

      <h1>{newUser ? "Sign Up" : "Sign In"}</h1>

      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="newUser"/>
      <label htmlFor="newUser">New User</label>

      <form onSubmit={handelSignUp} className="form">
        {newUser && <input type="text" name="name" onBlur={handelBlur} placeholder="Name"/>}
        <input type="email" onBlur={handelBlur} name="email" id="email" placeholder="Email" required/>
        <input type="password" onBlur={handelBlur} name="password" id="pass" placeholder="Password" required/>
        <input type="submit" value={newUser ? "Sign Up" : "Sign In"}/>
      </form>

      <p style={{color: 'red'}}>{user.error}</p>

      {/* social Login Start */}

      {
        user.isSignIn ? <button className="google" onClick={singOut}><i className="fas fa-sign-out-alt"></i> Sign Out</button> : <button className="google" onClick={googleSignIn}> <i className="fab fa-google"></i> Sign in</button>
      }
      <button className="facebook" onClick={fbSignIn}> <i className="fab fa-facebook"></i> Sign in</button>

      {/* social Login End */}

      {
        user.success && <p style={{color: 'green'}}>User {newUser ? 'Created' : 'Log in'} Successful</p>
      }

    </div>
  );
}

export default Login;
