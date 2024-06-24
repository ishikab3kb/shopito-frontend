import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Header from "./Components/header/Header";
import Footer from "./Components/footer/Footer";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./redux/features/auth/authSlice";
import Profile from "./Pages/profile/Profile";
// import { Spinner } from "./Components/loader/Loader";
// import Loader from "./Components/loader/Loader";


function App() {
  // by setting the following to tru. every time you send http request to backend and you need to send some form of token or  some form of credentials  this will automatically set that to true and you'll be able to make request and send the token or the required credentials. So its better we will put it here then to add to every http request(most required for the protect function related routes)
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    dispatch(getLoginStatus());
  },[dispatch])

  return (
    <>
      <BrowserRouter>
        {/* <Loader></Loader> */}
        <ToastContainer></ToastContainer>
        <Header></Header>
        {/* <Spinner></Spinner> */}
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
