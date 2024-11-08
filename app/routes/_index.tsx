import type { MetaFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";

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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {blogs.map((blog) => (
        <div className="p-3 shadow-md rounded-sm cursor-pointer" key={blog.id}>
          <h2 className="font-bold uppercase pb-2">{blog.title}</h2>
          <p>{blog.body}</p>
        </div>
      ))}
    </div>
  );
}
