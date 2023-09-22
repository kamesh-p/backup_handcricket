import "./App.css";
import Dicee from "./componenets/Dices";
import Batting from "./componenets/Batting";
import Bowling from "./componenets/Bowling";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dicee />} />
          <Route path="/batting" element={<Batting />} />
          <Route path="/bowling" element={<Bowling />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
