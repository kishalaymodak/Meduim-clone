import Avatar from "./Avatar";
import { Link } from "react-router-dom";

interface BlogCardsProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}
function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardsProps) {
  return (
    <>
      <Link to={`/blog/${id}`}>
        <div className="border-b-2 pb-6  border-slate-200 w-screen cursor-pointer max-w-screen-md pt-4">
          <div className="flex gap-2 items-center ">
            <Avatar name={authorName.toUpperCase()} />
            <div className=" ">{authorName.toUpperCase()}</div>
            <div className="mb-2">.</div>
            <div className=" text-slate-400">{publishedDate}</div>
          </div>
          <div className=" pt-2 ">
            <h1 className=" text-3xl font-bold  ">{title}</h1>
            <p className=" text-lg  pt-2">{content.slice(0, 100) + "..."}</p>
          </div>

          <div className=" text-slate-400 text-sm pt-4">
            {`${Math.ceil(content.length / 100)} minutes`}
          </div>
        </div>
      </Link>
    </>
  );
}

export default BlogCard;
