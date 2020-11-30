import CategoryList from "@components/CategoryList";
// import Link from "next/link";

function Layout(props) {
  return (
    <div className="w-full min-h-screen py-4 bg-gradient-to-tr from-pink-200 to-white">
      <div className="flex flex-col justify-center p-4 m-auto overflow-hidden font-sans sm:border sm:shadow-xl sm:bg-white sm:w-11/12 md:w-9/12 lg:w-7/12">
        {/* <CategoryList categories={props.categories} /> */}

        {props.children}
        <p className="mt-5 text-lg text-center text-gray-700 sm:text-xl">
          this site is a preview of a grassroots media project in development
          called <b>Radical Directory</b>
        </p>
        <p className="mt-5 text-lg text-center text-gray-700 sm:text-xl">
          official launch will be in 2021
        </p>
        <p className="my-5 text-lg text-center text-gray-700 sm:text-xl">
          for more info or to get involved, contact us at{" "}
          <i>radicaldirectory@protonmail.com</i>
        </p>
      </div>
    </div>
  );
}

export default Layout;
