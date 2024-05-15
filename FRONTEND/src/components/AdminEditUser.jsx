import { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";

const AdminEditUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const  userForEdit  = useSelector((state) => state.auth.userForEdit);

  console.log(userForEdit, "after selector");

  useEffect(() => {
    if (userForEdit
    ) {
      setUsername(userForEdit.username);
      setEmail(userForEdit.email);
      setPhone(userForEdit.phone);
    }
  }, [userForEdit]);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateUser] = useUpdateUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const updatedUser = { _id: userForEdit._id, username, email, phone };
        const result = await updateUser(updatedUser).unwrap();
        dispatch(setCredentials(result));
        toast.success("User updated successfully");
        navigate("/admin/dash");
    } catch (error) {
        toast.error("Failed to update user");
    }
};

  return (
    <Fragment>
      <div className="container flex justify-center items-center h-full mt-8">
        <div className="max-w-md w-full mx-auto bg-white-900 border border-gray-300 rounded-lg p-8">
          <form
            className="max-w-md w-full mx-auto rounded-lg p-8 h-full bg-white-900"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3lg font-normal text-gray-900 dark:text-black md:text-3xl lg:text-3xl text-center mb-6">
              Edit User Profile
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
};

export default AdminEditUser;
