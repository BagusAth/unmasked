import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";

import Landing from "./pages/Landing";
import Mask from "./pages/Mask";
import Load from "./pages/Load";
import Need from "./pages/Need";
import Action from "./pages/Action";
import Summary from "./pages/Summary";
import Canvas from "./pages/Canvas";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/mask" element={<Mask />} />
          <Route path="/load" element={<Load />} />
          <Route path="/need" element={<Need />} />
          <Route path="/action" element={<Action />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/canvas" element={<Canvas />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;