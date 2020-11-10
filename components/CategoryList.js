import Link from "next/link";

function CategoryList({ categories }) {
  return (
    <ul className="flex items-center mx-auto my-5 space-x-4">
      {categories.map((v, i) => {
        return (
          <li key={i}>
            <Link href={`/category/${v.id}`}>
              <a className="no-underline btn-blue">{v.name}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default CategoryList;
