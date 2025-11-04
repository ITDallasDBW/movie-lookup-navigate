import Home from "./pages/Home";
import Feature from "./pages/Feature"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <h1>App.js</h1>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path=':id' element={<Feature />}></Route>
      </Routes>


    </div>
    </Router>
  );
}

export default App;

