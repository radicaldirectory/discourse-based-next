import CategoryList from "@components/CategoryList";
import Link from "next/link";

function Layout(props) {
  return (
    <div className="w-full min-h-screen py-4 bg-gradient-to-tr from-pink-200 to-pink-600">
      <div className="flex flex-col justify-center p-8 m-auto overflow-hidden font-sans bg-white border shadow-xl md:w-9/12 lg:w-7/12 sm:rounded-lg">
        <Link href={"/"}>
          <a>
            <h1 className="text-6xl font-black text-center">
              Radical Directory
            </h1>
          </a>
        </Link>
        <CategoryList categories={props.categories} />
        {props.children}
      </div>
    </div>
  );
}

export default Layout;
