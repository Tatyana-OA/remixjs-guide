import { Outlet } from "@remix-run/react";

const BlogLayout = () => {
  return (
    <div>
      <header className="text-center font-bold p-6 bg-slate-300">
        Blog Layout Navigation
      </header>
      <Outlet />
    </div>
  );
};

export default BlogLayout;
