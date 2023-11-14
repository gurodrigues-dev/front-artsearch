import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home/Home";
import ArtistInfo from "./pages/ArtistInfo/ArtistInfo";

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artistInfo/" element={<ArtistInfo />} />
          <Route path="/artistInfo/:nameParams" element={<ArtistInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  ); 
}
  
export default App;
