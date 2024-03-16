import { Blog } from "../hooks/Index";
import AppBar from "./AppBar";
import Avatar from "./Avatar";

function Post({ blog }: { blog: Blog }) {
  return (
    <div>
      <AppBar />
      <div className=" flex justify-center">
        <div className=" grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
          <div className=" col-span-8">
            <div className=" text-5xl font-extrabold">{blog.title}</div>
            <div className=" text-2xl pt-4"> {blog.content} </div>
          </div>

          <div className="  col-span-4">
            <div className=" text-lg text-slate-600">Author</div>
            <div className=" flex gap-3 pt-2">
              <Avatar size="big" name={blog.author.name} />
              <div className=" text-xl font-bold">{blog.author.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
