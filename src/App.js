import logo from "./logo.svg";
import "./App.css";
import { FormBook } from "./components/FormBook";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <FormBook />
      </div>
    </div>
  );
}

export default App;
