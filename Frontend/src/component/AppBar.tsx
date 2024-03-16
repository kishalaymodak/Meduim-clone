import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { jwtDecode } from "jwt-decode";

function AppBar() {
  interface jwt {
    id: string;
    name: string;
  }
  const data = jwtDecode<jwt>(localStorage.getItem("token") || "");
  const name = data.name;
  return (
    <div className="  flex justify-between items-center px-10 border-b py-2 cursor-pointer">
      <Link to={"/blogs"}>
        <div className=" text-2xl">medium</div>
      </Link>
      <div>
        <Link to={"/publish"}>
          <button
            type="button"
            className=" mr-4 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Create New Blog
          </button>
        </Link>

        <Avatar size={"big"} name={name.toUpperCase()}></Avatar>
      </div>
    </div>
  );
}

export default AppBar;
