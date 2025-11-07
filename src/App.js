import Home from "./pages/Home";
import Feature from "./pages/Feature"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import Scratch from "./pages/Scratch";



function App() {
  useEffect(() => {
  const handleBeforeUnload = () => {
    sessionStorage.clear();
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, []);

  return (
    <Router>
    <div className="App">
      <h1>App.js</h1>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path=':id' element={<Feature />}></Route>
        <Route path="scratch" element={<Scratch />}></Route>
      </Routes>


    </div>
    </Router>
  );
}

export default App;

