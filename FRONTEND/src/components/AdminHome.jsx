import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUser } from "../slices/adminApiSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { userDetails } from "../slices/authSlice";

function AdminHome() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  console.log("users list", users);

  const { adminInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!adminInfo) {
      navigate("/admin");
    }
  }, [adminInfo, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await listUser();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = search
    ? users.filter(
        (user) =>
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  const handleDelete = async (user) => {
    try {
      await deleteUser(user);
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
      toast.success("User Delete success");
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  };

  const handleEdit = async (user) => {
    try {
      console.log(user, "before dispatch");
      dispatch(userDetails(user));
      navigate("/admin/editUser");
    } catch (error) {
      throw new Error("Failed to edit user");
    }
  };

  return (
    <div>
      <h1 className="font-bold text-4xl mt-5 text-gray-500 text-center mb-10">
        Users List
      </h1>

      <div className="flex justify-center items-center">
        {" "}
        {/* Parent container with flexbox */}
        <div className="absolute inset-y-0 start-0 flex justify-center items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-200 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-1/3 p-4 ps-10 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Usernames, Emails..."
          required
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mt-10 ml-32 mr-32">
        <table className="table-auto border-collapse rounded-sm w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left bg-gray-300">
                Username
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left bg-gray-300">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left bg-gray-300">
                Phone No
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left bg-gray-300">
                Edit
              </th>
              <th className="border border-gray-300  px-4 py-2 text-left bg-gray-300">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  {" "}
                  {/* Add a unique key for each table row */}
                  <td className="border border-gray-300 px-4 py-2">
                    {user.username}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.phone}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 mt-2 text-center me-2 mb-2"
                    >
                      <EditIcon />
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDelete(user)}
                      className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-3 py-2.5 mt-2 text-center me-2 mb-2"
                    >
                      <DeleteOutlineIcon />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="border border-gray-300 px-4 py-2" colSpan="5">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminHome;
