//import useSWR from "swr";
import Link from "next/link";

//const fetcher = (...args) => fetch(...args).then((res) => res.json());

function TagList({ docs }) {
  // const { data, error } = useSWR("/api/docs", fetcher);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  return (
    <ul className="flex flex-wrap items-center my-5">
      {docs.tags.map((v, i) => {
        return (
          <li
            key={i}
            className="px-3 py-1 mb-2 mr-3 border rounded-full hover:bg-teal-300 hover:text-white"
          >
            {/* <Link href={`/category/${v.id}`}> */}
            <a className="no-underline">{v.id}</a>
            {/* </Link> */}
          </li>
        );
      })}
    </ul>
  );
}

export default TagList;
