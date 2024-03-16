import AppBar from "../component/AppBar";
import axios from "axios";
import { useState } from "react";
import { Backend_url } from "../config";
import { useNavigate } from "react-router-dom";
function Publish() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <AppBar />
      <div className=" flex justify-center mt-4">
        <div className=" max-w-screen-lg w-full">
          <div className=" pt-4">
            <div>
              <div className=" pb-4">
                <label className="block mb-2 text-2xl font-semibold text-gray-900 ">
                  Create Your Blog
                </label>
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                  placeholder="Title"
                />
              </div>

              <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
                <div className="px-4 py-2 bg-white rounded-t-lg ">
                  <label className="sr-only">Your Blog</label>
                  <textarea
                    id="comment"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    className="w-full px-0 text-sm text-gray-900 outline-none bg-white border-0 "
                    placeholder="Write your Blog here..."
                    required
                  />
                </div>
                <div className="flex items-center justify-between px-3 py-2 border-t ">
                  <button
                    onClick={async () => {
                      const response = await axios.post(
                        `${Backend_url}/api/v1/blog`,
                        {
                          title,
                          content: description,
                        },
                        {
                          headers: {
                            Authorization: localStorage.getItem("token"),
                          },
                        }
                      );

                      navigate(`/blog/${response.data.id}`);
                    }}
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
                  >
                    Publish Blog
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Publish;
