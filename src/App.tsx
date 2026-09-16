import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Mask from "./pages/Mask";
import Load from "./pages/Load";
import Need from "./pages/Need";
import Action from "./pages/Action";
import Summary from "./pages/Summary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/mask" element={<Mask />} />
        <Route path="/load" element={<Load />} />
        <Route path="/need" element={<Need />} />
        <Route path="/action" element={<Action />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;