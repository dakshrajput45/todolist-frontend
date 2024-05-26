import { Route,Routes } from "react-router-dom";
import AddTask from "./Pages/AddTaks";
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import Tasks from "./Pages/Tasks";
import NavBar from "./Components/NavBar";
import { useState } from "react";


function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  return (
    <div className="flex md:justify-center md:items-center">
      <div>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      </div>
        <div>
          <Routes>
            <Route path="/" element={<LogIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/tasks" element={<Tasks isLoggedIn={isLoggedIn} />}/>
            <Route path="/signup" element={<SignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/addtask" element={<AddTask isLoggedIn={isLoggedIn} />}/>
          </Routes>
        </div>
    </div>
  );
}

export default App;
