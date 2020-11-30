import CategoryList from "@components/CategoryList";
// import Link from "next/link";

function Layout(props) {
  return (
    <div className="w-full min-h-screen py-4 bg-gradient-to-tr from-pink-200 to-white">
      <div className="flex flex-col justify-center p-8 m-auto overflow-hidden font-sans bg-white border shadow-xl md:w-9/12 lg:w-7/12">
        {/* <CategoryList categories={props.categories} /> */}

        {props.children}
        <hr className="my-6" />
        <p className="mt-5 text-2xl text-center text-gray-700">
          this site is a preview of a grassroots media project in development
          called <b>Radical Directory</b>
        </p>
        <p className="mt-5 text-2xl text-center text-gray-700">
          official launch will be in coming months
        </p>
        <p className="my-5 text-2xl text-center text-gray-700">
          for more info or to get involved, contact us at{" "}
          <i>radicaldirectory@protonmail.com</i>
        </p>
      </div>
    </div>
  );
}

export default Layout;
