import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate()

  useEffect(()=>{
    if(!userInfo){
        navigate('/login')
    }
  },[userInfo, navigate])

  if(!userInfo) return null

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
