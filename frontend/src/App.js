import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screen/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route extact path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
