import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
   <>
   <Analytics />
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
    </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
