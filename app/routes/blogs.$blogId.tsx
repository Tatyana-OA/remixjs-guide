import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { blogId } = params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${blogId}`
  );
  const data = await response.json();
  console.log(data);
  return data;
};

const Blog = () => {
  const { title, body, id } = useLoaderData<typeof loader>();
  return (
    <div
      key={id}
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <Link to="/" className="italic font-semibold">
        Home
      </Link>
      <h2 className="text-2xl font-bold text-gray-900 my-4 capitalize">
        {title}
      </h2>
      <p className="text-gray-700 leading-relaxed">{body}</p>
    </div>
  );
};

export default Blog;
