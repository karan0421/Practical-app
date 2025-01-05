import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./component/Nav";
import Signup from "./component/Signup";
import Login from "./component/Login";
import ProductManagement from "./component/ProductManagement";
import Slide from "./component/Slide";
import Cat from "./component/Cat";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Nav />}>
            <Route path="Signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="ProductManagement" element={<ProductManagement />} />
            <Route path="Slide" element={<Slide />} />
            <Route path="Cat" element={<Cat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
