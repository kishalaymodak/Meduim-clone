import axios from "axios";
import { useEffect, useState } from "react";
import { Backend_url } from "../config";

export interface Blog {
  id: string;
  content: string;
  title: string;
  author: {
    name: string;
  };
}
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${Backend_url}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data.blogs);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blog,
  };
};

export const usePost = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${Backend_url}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setPost(response.data.blog);

        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    post,
  };
};
