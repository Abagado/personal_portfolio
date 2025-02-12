import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Skills} from "./pages/Skills";
import {Projects} from "./pages/Projects";
import {Contact} from "./pages/Contact";
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="w-screen">
        <Header />
        <div className="mt-[90px]"> {/* Отступ для фиксированного Header */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer/>
        </div>
      </div>
    </Router>
  );
}

export default App;