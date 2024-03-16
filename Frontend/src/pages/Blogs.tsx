import AppBar from "../component/AppBar";
import BlogCard from "../component/BlogCard";
import Skeliton from "../component/Skeliton";
import { useBlogs } from "../hooks/Index";

function Blogs() {
  const { loading, blog } = useBlogs();
  if (loading) {
    return (
      <div>
        <AppBar />
        <div className="flex justify-center">
          <div className=" ">
            <Skeliton />
            <Skeliton />
            <Skeliton />
            <Skeliton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <AppBar />
      <div className="flex justify-center">
        <div className=" ">
          {blog.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate=""
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Blogs;
