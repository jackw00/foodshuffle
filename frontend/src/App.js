import Home from "./pages/Home";
import NewFood from './pages/NewFood';
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Logout from "./pages/Logout";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/newFood" element= {<NewFood/>} />
          <Route path="/" element = {<SignIn/>} />
          <Route path="/logout" element = {<Logout/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
 
