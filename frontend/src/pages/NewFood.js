import { useState } from 'react';
import app from '../axiosConfig.js';
import '../index.css';
import Navbar from '../components/Navbar.js';

export default function NewFood() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  var user = '';

  //add foods
  const addFood = () => {
    console.log("addFood")
    app.post('/create', {
      category: category,
      name: name,
      description: description,
      username: user
    })
  }

  //authorization
  const checkAuth = () => {
    if(localStorage.getItem('user') == ''){
      return true
    } else {
      user = localStorage.getItem('user') 
    }
  }

  if(checkAuth()) {
    return ( 
    <div className="flex flex-col items-center justify-center bg-3 min-h-screen">
      <h1 className="font-bold text-3xl mb-4">Food Shuffle</h1>
      <h1 className="font-medium text-xl mb-2">You must create an account or login to access this page.</h1>
      <button className="bg-4 my-5 hover:bg-5 font-bold py-2 px-8 text-lg shadow border rounded"><a href="/">Login or Sign Up</a></button>

    </div>
    )
  }
  
  return (
    <>
    <Navbar />
    <div className="bg-4 flex flex-col items-center justify-center">
        <h2 className="font-bold text-3xl p-5 underline">Add New Foods</h2>
        <form className="w-full max-w-md bg-3 rounded-2xl p-5 mx-10 flex flex-col">
          <label className="p-2 font-bold text-lg">Category: </label>
          <select className="p-2 shadow border rounded" name="category" onChange={(event) => {setCategory(event.target.value)}}>
            <option value=""></option>
            <option value="meat">Meat</option>
            <option value="vege">Vegetable</option>
            <option value="side">Side</option>
          </select>
          <label className="block p-2 font-bold text-lg text-left">Food Name: </label>
          <input className="block p-2 shadow border rounded" type="text" onChange= {(event) => {setName(event.target.value)}}></input>
          <label className="block p-2 font-bold text-lg">Description: </label>
          <input className="block p-2 shadow border rounded" type="text" onChange= {(event) => {setDescription(event.target.value)}}></input>
          <button className="bg-1 my-5 hover:bg-5 font-bold py-2 px-8 text-lg shadow border rounded" onClick={addFood}>Add Food</button>
        </form>
    </div>
    <div className="bg-4 min-h-screen"></div>
    </>
  );
}