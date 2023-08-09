import { useState, useEffect } from 'react';
import app from '../axiosConfig.js';
import linkedInLogo from '../img/linkedin.png';
import githubLogo from '../img/github.png';
import Navbar from '../components/Navbar.js';

export default function Home() {
  
    const [meatList, setMeatList] = useState([])
    const [vegeList, setVegeList] = useState([])
    const [sideList, setSideList] = useState([])
  
    const [randMeat, setRandMeat] = useState('')
    const [randVege, setRandVege] = useState('')
    const [randSide, setRandSide] = useState('')
  
    const [newName, setNewName] = useState([])

    var user = ''  
  
    //select foods
    const showMeat = () => {
      app.post('/showMeat', {username: user}).then((response) => {
        setMeatList(response.data)
      })
    }
    const showVege = () => {
      app.post('/showVege', {username: user}).then((response) => {
        setVegeList(response.data)
      })
    }
    const showSide = () => {
      app.post('/showSide', {username: user}).then((response) => {
        setSideList(response.data)
      })
    }
    
    //delete foods
    const deleteFood = (id, category) => {
      app.delete(`/deleteFood/${id}`).then((response) => {
        if(category == "meat"){
          setMeatList(meatList.filter((val) => {
            return val.id != id
          }))
        } else if(category == "vege"){
          setVegeList(vegeList.filter((val) => {
            return val.id != id
          }))
        } else if(category == "side") {
          setSideList(sideList.filter((val) => {
            return val.id != id
          }))
        }
      })
    }
  
    //generate foods
    const pickMeat = () => {
      app.post('http://localhost:3001/pickMeat', {username: user}).then((response) => {
        if(response.data[0] != null) {
          setRandMeat(response.data[0].name)
        }
      })
    }
    const pickVege = () => {
      app.post('/pickVege', {username: user}).then((response) => {
        if(response.data[0] != null) {
          setRandVege(response.data[0].name)
        }      
      })
    }
    const pickSide = () => {
      app.post('/pickSide', {username: user}).then((response) => {
        if(response.data[0] != null) {
          setRandSide(response.data[0].name)
        }    
      })
    }
  
    //update foods
    const updateFood = (id) => {
      app.put('/updateName', {
        name: newName,
        id: id
      }).then((response) => {
        alert('Updated! - Refresh to see new results')
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
       <div className="bg-2 min-h-screen">
        <Navbar />
        <h1 className="p-10 text-5xl underline text-center font-bold">Food Shuffle</h1>
        <h1 className="text-3xl font-bold text-center">Meal Generator</h1>
        <div className="bg-2 p-5">
            <div className="flex flex-row my-5 mx-2">
              <button onClick={pickMeat} className="w-1/2 mx-5 bg-1 hover:bg-5 font-bold py-2 px-3 text-lg shadow border rounded">Choose Meat</button>
              <p id="randMeatName" className="w-1/2 font-bold text-lg border rounded-3xl text-center p-2">{randMeat}</p>
            </div>
            <div className="flex flex-row my-5 mx-2">
              <button onClick={pickVege} className="w-1/2 mx-5 bg-1 hover:bg-5 font-bold py-2 px-3 text-lg shadow border rounded">Choose Vegetable</button>
              <p id="randVegeName" className="w-1/2 font-bold text-lg border rounded-3xl text-center p-2">{randVege}</p>
            </div>
            <div className="flex flex-row my-5 mx-2">
              <button onClick={pickSide} className="w-1/2 mx-5 bg-1 hover:bg-5 font-bold py-2 px-3 text-lg shadow border rounded">Choose Side</button>
              <p id="randSideName"className="w-1/2 font-bold text-lg border rounded-3xl text-center p-2" >{randSide}</p>
            </div>
        </div>
        <div className="flex flex-col items-end justify-center mr-5 mb-5">
          <button onClick={() => {pickMeat(); pickVege(); pickSide();}} className="bg-1 hover:bg-5 font-bold py-2 px-8 text-lg shadow border rounded">Choose All 3</button>
        </div>
        
        <div className="bg-3">
            <h1 className="p-10 text-3xl underline font-bold text-center">See Foods</h1>
            <div className="flex flex-wrap">
              <div className="w-full sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 flex flex-col p-5 border">
                  <button className="mb-7 bg-1 hover:bg-5 font-bold py-2 px-4 text-lg shadow border rounded" onClick={showMeat}>Show Meats</button>
                  {meatList.map((val, key) => {
                      return (
                          <div className="vegeDisplay mb-10">
                            <p className="font-bold"><span className="underline">Name:</span><span className="">&nbsp;&nbsp;{val.name} </span></p>
                            <p className=""><span className="underline">Description:</span><span className="">&nbsp;&nbsp;{val.description} </span></p>
                            
                            <input className="shadow rounded text-center" type="text" placeholder="New Name" onChange={(event) => {setNewName(event.target.value)}}/>
                            <button className="hover:text-change font-semibold py-2 px-3 text-sm" onClick={() => {updateFood(val.id)}}>Update!</button>
                            <button className="hover:text-delete font-semibold py-2 text-sm" onClick={() => {deleteFood(val.id, val.category)}}>Delete Meat</button>
                          </div>
                      )
                  })}
              </div>
              <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 flex flex-col p-5 border-t border-b">
                <button className="mb-7 bg-1 hover:bg-5 font-bold py-2 px-4 text-lg shadow border rounded" onClick={showVege}>Show Vegetables</button>
                {vegeList.map((val, key) => {
                    return (
                        <div className="vegeDisplay mb-10">
                          <p className="font-bold"><span className="underline">Name:</span><span className="">&nbsp;&nbsp;{val.name} </span></p>
                          <p className=""><span className="underline">Description:</span><span className="">&nbsp;&nbsp;{val.description} </span></p>
                          
                          <input className="shadow rounded text-center" type="text" placeholder="New Name" onChange={(event) => {setNewName(event.target.value)}}/>
                          <button className="hover:text-change font-semibold py-2 px-3 text-sm" onClick={() => {updateFood(val.id)}}>Update!</button>
                          <button className="hover:text-delete font-semibold py-2 text-sm" onClick={() => {deleteFood(val.id, val.category)}}>Delete Vegetable</button>

                        </div>
                    )
                })}
              </div>
              <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 flex flex-col p-5 border">
                <button className="mb-7 bg-1 hover:bg-5 font-bold py-2 px-4 text-lg shadow border rounded" onClick={showSide}>Show Sides</button>
                {sideList.map((val, key) => {
                    return (
                        <div className="mb-10">
                          <p className="font-bold"><span className="underline">Name:</span><span className="">&nbsp;&nbsp;{val.name} </span></p>
                          <p className=""><span className="underline">Description:</span><span className="">&nbsp;&nbsp;{val.description} </span></p>
                          
                          <input className="shadow rounded text-center" type="text" placeholder="New Name" onChange={(event) => {setNewName(event.target.value)}}/>
                          <button className="hover:text-change font-semibold py-2 px-3 text-sm" onClick={() => {updateFood(val.id)}}>Update!</button>
                          <button className="hover:text-delete font-semibold py-2 text-sm" onClick={() => {deleteFood(val.id, val.category)}}>Delete Side</button>
                        </div>
                    )
                })}
              </div>
            </div>
        </div>
        <div className="bg-4 flex flex-row justify-center items-center">
          <p>Food Shuffle</p>
          <a target="_blank" href="https://linkedin.com/in/jackwardlaw"><img src={linkedInLogo} className="object-fill h-4 w-4 mx-2" alt="LinkedIn"/></a>
          <a target="_blank" href="https://github.com/jackw00"><img src={githubLogo} className="object-fill h-4 w-4" alt="GitHub"/></a>

        </div>
      </div> 
    )
}