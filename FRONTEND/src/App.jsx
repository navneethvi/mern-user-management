import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
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
// import axios from "axios";

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dash" element={<AdminHome />} />
        <Route path="/admin/editUser" element={<AdminEditUser />} />
      </Routes>
    </>
  );
}

function App() {
  // axios.interceptors.request.use((request)=>{
  //   console.log(request, "from interceptor");
  // })

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
