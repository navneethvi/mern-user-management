import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import SignupPage from "./userPages/Signup";
import LoginPage from "./userPages/Login";
import Home from "./userPages/Home";
import Header from "./components/Header";
import ErrorPage from "./userPages/ErrorPage";
import AdminLogin from "./components/AdminLogin";
import AdminHome from "./components/AdminHome";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Profile";
import AdminEditUser from "./components/AdminEditUser";

function App() {
  return (
    <Router>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<ErrorPage/>} />
        <Route path="/admin" element={<AdminLogin/>}/>
        <Route path="/admin/dash" element={<AdminHome/>}/>
        <Route path="/admin/editUser" element={<AdminEditUser/>}/>
      </Routes>
    </Router>
  );
}

export default App;
