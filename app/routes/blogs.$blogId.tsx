import { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { blogId } = params;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${blogId}`
  );
  const data = await response.json();
  return data;
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  console.log(params);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.blogId}`,
    { body: JSON.stringify({ title, body, id: params.blogId }), method: "PUT" }
  );

  const data = await response.json();

  return data;
};

const Blog = () => {
  const { title, body, id } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = !(navigation.state === "idle");
  return (
    <div
      key={id}
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <Link
        to="/"
        className="italic font-semibold text-gray-600 hover:text-gray-900"
      >
        Home
      </Link>
      <h2 className="text-2xl font-bold text-gray-900 my-4 capitalize">
        {title}
      </h2>
      <p className="text-gray-700 leading-relaxed">{body}</p>

      <Form className="mt-6" method="put">
        <input
          name="title"
          type="text"
          placeholder="Update your post title"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
        />
        <textarea
          name="body"
          placeholder="Update your post body"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
        />
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {isSubmitting ? "Submitting..." : "Update"}
        </button>
      </Form>
    </div>
  );
};

export default Blog;
