import Header from "../components/Header";
import { useSelector } from "react-redux";

function Home() {
  const { userInfo } = useSelector((state) => state.auth);

  console.log(userInfo);

  return (
    <div>
      <h1 className="flex justify-center item-center mt-2 mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-3xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Welcome, {userInfo.username}
        </span>
      </h1>
    </div>
  );
}

export default Home;
