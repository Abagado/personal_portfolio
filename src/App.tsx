import { BrowserRouter as Router } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AnimatedRoutes } from "./components/AnimatedRoutes";

function App() {
  return (
    <Router>
      <div className="w-screen">
        <Header />
        <div className="mt-[90px]">
          <AnimatedRoutes />
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;

