import { Link, useNavigate } from "react-router-dom";
import Inputbox from "./Inputbox";
import { useState } from "react";
import { SignUpInput } from "@kishalay/medum-common";
import axios from "axios";
import { Backend_url } from "../config";
function Auth({ type }: { type: "Sign Up" | "Sign In" }) {
  const [postIput, setPostInput] = useState<SignUpInput>({
    name: "",
    email: "",
    password: "",
  });

  const Navigate = useNavigate();
  async function SendRequest() {
    try {
      const response = await axios.post(
        `${Backend_url}/api/v1/user/${
          type === "Sign Up" ? "signup" : "signin"
        }`,
        postIput
      );
      const jwt = response.data.jwt;

      localStorage.setItem("token", "Bearer " + jwt);
      Navigate("/blogs");
    } catch (e) {
      console.log(e);

      alert("Error while signing-up");
    }
  }
  return (
    <>
      <div className=" h-screen flex justify-center flex-col">
        <div className=" flex  justify-center">
          <div className="px-10">
            <div className=" flex items-center flex-col">
              <div className=" text-5xl font-bold"> Create an Account</div>
              <div className=" text-2xl font-semibold text-slate-600">
                {type === "Sign Up"
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <span className=" underline">
                  <Link to={type === "Sign Up" ? "/signin" : "/signup"}>
                    {type === "Sign Up" ? "Login" : "Sign Up"}
                  </Link>
                </span>
              </div>
            </div>
            <div className=" flex flex-col pt-4">
              {type === "Sign Up" ? (
                <Inputbox
                  lable="Name"
                  placeholder="Kishalay"
                  onChange={(e) => {
                    setPostInput({
                      ...postIput,
                      name: e.target.value,
                    });
                  }}
                />
              ) : null}
              <Inputbox
                lable="Email"
                placeholder="Kishalay123@gmail.com"
                onChange={(e) => {
                  setPostInput({
                    ...postIput,
                    email: e.target.value,
                  });
                }}
              />
              <Inputbox
                lable="Password"
                type="password"
                placeholder=""
                onChange={(e) => {
                  setPostInput({
                    ...postIput,
                    password: e.target.value,
                  });
                }}
              />
              <button
                type="button"
                onClick={SendRequest}
                className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                {type === "Sign Up" ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
