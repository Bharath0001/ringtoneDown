import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import MovieRingtonePage from "./pages/MovieRingtonePage";


function App() { 
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/movie/:movieId" element={ <MovieRingtonePage /> } />
      </Routes>
    </Router>
  );
}

export default App;
