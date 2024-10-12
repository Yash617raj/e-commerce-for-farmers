import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Test from './pages/Test';
import SignIn from "./pages/SignIn";
import SignUp from './pages/SignUp';
import PrivateRoute from "./components/PrivateRoute";
import ProductListing from "./pages/ProductListing";
import Shop from "./pages/Shop";
import Header from "./components/Header";

function App() {

  return (
    <>
      <BrowserRouter >
          <Routes>
            <Route path="/header" element={<Header />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/test" element={<Test />}></Route>
            <Route path="/sign-in" element={<SignIn />}></Route>
            <Route path="/sign-up" element={<SignUp />}></Route>
            <Route element={<PrivateRoute />}>
              <Route path="/productlisting" element={< ProductListing />}></Route>
              <Route path="/shopping" element={<Shop />}></Route>
            </Route>
          </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App
