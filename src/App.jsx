import { useState } from "react";
import "./App.css";
import Navbar from "./component/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateForm from "./component/CreateForm";
import ReadAllUsers from "./component/ReadAllUsers";
import UpdateUser from "./component/UpdateUser";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<CreateForm/>}/>
          <Route path="/users" element={<ReadAllUsers/>}/>
          <Route path="/edit/:id" element={<UpdateUser/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
