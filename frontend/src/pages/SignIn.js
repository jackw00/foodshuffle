import { useState, useEffect} from 'react';
import app from '../axiosConfig.js';
import '../index.css';
import UnauthNavbar from '../components/UnauthNavbar';
import {Navigate} from 'react-router-dom';

export default function SignIn() {

  const [usernameReg, setUsernameReg] = useState('')
  const [passwordReg, setPasswordReg] = useState('')

  const [usernameLogin, setUsernameLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')

  const [loginStatus, setLoginStatus] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  var user = ''

  app.defaults.withCredentials = true;
  const register = () => {
    app.post('/register', {
      username: usernameReg,
      password: passwordReg
    }).then((response) => {
      if(response.data.code = 'ER_DUP_ENTRY') {
        alert('This username already exists. Try a different one.')
      } else {
        
      }
    })
  }

  const login = () => {
    app.post('/login', {
      username: usernameLogin,
      password: passwordLogin
    }).then((response) => {
        setUsernameLogin('')
        setPasswordLogin('')
        if(response.data.loggedIn) {
            setLoginStatus("Welcome " + response.data.result[0].username + "!")
            setLoggedIn(true)
            localStorage.setItem('user', response.data.result[0].username)
        } else {
            setLoginStatus(response.data.message)
        }
    })
  }

  //check if already logged in
  const checkAuth = () => {
    if(localStorage.getItem('user') == ''){
      return true
    } else {
      user = localStorage.getItem('user') 
    }
  }

  if(!checkAuth()) {
    return ( 
    <div className="flex flex-col items-center justify-center bg-3 min-h-screen">
      <h1 className="font-bold text-3xl mb-4">Food Shuffle</h1>
      <h1 className="font-medium text-xl mb-2">Welcome back {user}!</h1>
      <button className="bg-4 my-5 hover:bg-5 font-bold py-2 px-8 text-lg shadow border rounded"><a href="/home">Click here to go to your dashboard.</a></button>
      <button className="font-medium mt-6"><a href="/logout">Not {user}? Click here to logout.</a></button>
    </div>
    )
  }

  return (
    <>
        <UnauthNavbar />
      <div className="flex flex-col items-center bg-3 min-h-screen">
        <h1 className="m-6 mt-8 text-3xl font-bold">Food Shuffle</h1>
        <p className="text-l font-medium text-center max-w-2xl m-2">Welcome to Food Shuffle. Can't decide what to eat? Let us help! Start by creating an account. Then, add all your favorite foods, categorized as a meat, side, or vegetable - and that's it! You can randomly generate what to eat by category or all at once. You can see a list of all your current foods, and update, delete, or add foods at any time. Have fun!"</p>
        <div className=''>
          <h1 className="text-xl font-bold text-center m-4">New Account:</h1>
          <label className='p-2 font-medium text-lg'>Username</label>
          <input className="block p-2 shadow border rounded" type="text" placeholder="New Username" onChange={(e)=> {setUsernameReg(e.target.value)}}></input>
          <label className=' p-2 font-medium text-lg'>Password</label>
          <input className="block p-2 shadow border rounded" type="text" placeholder="New Password" onChange={(e)=> {setPasswordReg(e.target.value)}}></input>
          <button className="bg-1 my-5 hover:bg-5 font-bold py-1 px-4 text-sm shadow border rounded" onClick={register}>Register</button>
        </div>
        <div className=''>
            <h1 className='text-xl font-bold text-center m-4'>Login:</h1>
            <label className='p-2 font-medium text-lg'>Username</label>
            <input className="block p-2 shadow border rounded" type="text" placeholder="Username" onChange={(e) => {setUsernameLogin(e.target.value)}} />
            <label className='p-2 font-medium text-lg'>Password</label>
            <input className="block p-2 shadow border rounded" type="password" placeholder="Password" onChange={(e) => {setPasswordLogin(e.target.value)}}/>
            <button className='bg-1 my-5 hover:bg-5 font-bold py-1 px-4 text-sm shadow border rounded' onClick={login}>Login</button>
        </div>
        <h1 className='font-medium text-lg m-2'>{loginStatus}</h1>
        <h1 className='font-medium italic mb-20'>{loggedIn && <button><a href="/home">Click here to go to your dashboard.</a></button>}</h1>
      </div>

    </>
  );
}