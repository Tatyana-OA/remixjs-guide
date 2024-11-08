import type { MetaFunction } from "@remix-run/node";
import { json, Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
    {
      name: "keywords",
      content: "React, Remix",
    },
  ];
};

export const loader = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10"
  );
  const data: { id: string; title: string; body: string; userId: string }[] =
    await response.json();
  console.log(data);
  return json({ blogs: data });
};

export default function Index() {
  const { blogs } = useLoaderData<typeof loader>();
  return (
    <>
      <h1 className="text-center pb-4 text-2xl italic">
        Random Blog Posts From A Dummy API!
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {blogs.map((blog) => (
          <Link
            to={`/blogs/${blog.id}`}
            className="p-4 shadow-lg rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all duration-200"
            key={blog.id}
          >
            <h2 className="font-semibold text-gray-800 uppercase pb-3">
              {blog.title}
            </h2>
            <p className="text-gray-600">{blog.body}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
