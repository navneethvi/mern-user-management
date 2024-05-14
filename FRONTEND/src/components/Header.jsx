import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      setShowDropdown(false)
    } catch (error) {
      toast.error(error?.data);
      console.error("Error occurred:", error);
    }
  };

  useEffect(()=>{
    setShowDropdown(false)
  },[])

  return (
    <div className="h-14 bg-black w-full flex items-center justify-between">
      <Link to={'/'}>
      <h1 className="ml-10 mt-2 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          MyApp
        </span>
      </h1>
      </Link>

      {userInfo ? (
        <div className="relative inline-block mr-10">
          <button
            className="flex items-center focus:outline-none"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              className="h-7 mr-1 rounded-full"
              src={userInfo.image}
              alt=""
            />
            {userInfo ? (
              <p className="text-white mr-4">{userInfo.username}</p>
            ) : (
              <p></p>
            )}
          </button>

          {showDropdown && (
            <div className="absolute z-10 bg-white rounded-lg shadow-lg mt-2 left-0 w-28">
              <Link to={'/profile'}>
              <button onClick={()=>{setShowDropdown(false)}} className="block py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 w-full text-left focus:outline-none">
                Profile
              </button>
              </Link>
              <button 
                className="block py-2 px-4 text-sm text-gray-800 hover:bg-gray-100 w-full text-left focus:outline-none"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="mr-20">
          <Link to={'/login'}>
            {" "}
            <button className="mt-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 h-10">
              Login <LoginIcon />
            </button>
          </Link>
          <Link to={'/register'}>
            <button className="mt-2 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 ml-6 h-10">
              Register <AppRegistrationIcon />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
