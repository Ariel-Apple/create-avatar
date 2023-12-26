import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage'
import Test from "./pages/test";
import CanvasEscudo from "./components/CreateEscudo/CanvasEscudo";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/test" element={<Test />} />

       
      </Routes>
    </Router>
  );
}



export default App;
