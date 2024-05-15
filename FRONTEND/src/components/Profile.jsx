import { useEffect, Fragment, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../slices/userApiSlice";
// import Loader from "./Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import axios from "axios";

function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateUser] = useUpdateUserMutation();

  const fileInputRef = useRef(null);
  console.log(userInfo.image, "user");
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    setUsername(userInfo.username);
    setEmail(userInfo.email);
    setPhone(userInfo.phone);
  }, [userInfo, navigate]);

  const handleUpdateProfile = async (data) => {
    try {
      console.log(data, "------------");
      const res = await updateUser(data).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated");
      navigate("/");
    } catch (error) {
      toast.error(error.data);
    }
  };

  const handleSubmit = async (e) => {
    console.log(image, "image");
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const formData = new FormData();
        formData.append("_id", userInfo._id);
        formData.append("username", username);
        formData.append("email", email);
        formData.append("phone", phone);
        if (password) formData.append("password", password);

        formData.append("image", image);
        console.log(formData, "formdata.image");
        const res = await axios.post(
          "http://localhost:5000/api/editProfile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res, "response");

        if (res.status === 200) {
          dispatch(setCredentials({ ...res.data }));
          navigate("/");
          toast.success("User updated");
        }
        // await handleUpdateProfile(formData);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  console.log(`http://localhost:5000/images/${userInfo.image}`, "sssssssssssssssssssssssssss");

  const handleProfileChange = (event) => {
    const image = event?.target?.files?.[0];
    console.log(image, "image from new function");
    setImage(image);
  };
  return (
    <Fragment>
      <div className="container flex justify-center items-center h-full mt-8">
        <div className="max-w-md w-full mx-auto bg-white-900 border border-gray-300 rounded-lg p-8">
          <form
            className="max-w-md w-full mx-auto rounded-lg p-8 h-full bg-white-900"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="mb-8 flex justify-center">
              <div className="h-24 w-24 rounded-full overflow-hidden cursor-pointer">
                {image ? (
                  <img
                  className="h-full w-full object-cover"
                  src={URL.createObjectURL(image)}
                  alt="Profile"
                />
                ):(
                  <img
                    className="h-full w-full object-cover"
                    src={`http://localhost:5000/images/${userInfo.image}`}
                    alt="Profile"
                  />
                )}
              </div>
            </div>

            <h1 className="text-3lg font-normal text-gray-900 dark:text-black md:text-3xl lg:text-3xl text-center mb-6">
              Edit Profile
            </h1>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id="floating_username"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Username
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email address
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="floating_password"
                id="floating_password"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Phone No
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="phone"
                id="floating_phone_no"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                autoComplete="new-password"
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Password
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="repeat_password"
                id="floating_repeat_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                autoComplete="new-password"
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Confirm password
              </label>
            </div>

            <div className="mb-4">
              <label
                htmlFor="profile-image"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Image
              </label>
              <input
                type="file"
                id="profile-image"
                ref={fileInputRef}
                accept="image/*"
                className="mt-1 block w-full"
                onChange={(e) => handleProfileChange(e)}
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 flex justify-center items-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mx-auto"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Profile;
