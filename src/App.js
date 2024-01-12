import {BrowserRouter, Routes, Route} from "react-router-dom"

import Home from "./Pages/Home"
import Personality from "./Pages/Personality"
import Match from "./Pages/Match"
import Lifestyle from "./Pages/Lifestyle"
import Final from "./Pages/final"

function App() {
  
 
  return (
    <BrowserRouter>
    
     <div className="App">

      </div>
      <Routes>
      <Route exact path = "/" element={<Home />} ></Route>
      <Route path = "/personality" element={<Personality />}></Route>
      <Route path = "/match" element={<Match />}></Route>
      <Route path = "/lifestyle" element={<Lifestyle />}></Route>
      <Route path = "/final" element={<Final />}></Route>
      </Routes>

    </BrowserRouter>
   
  );
}

export default App;
