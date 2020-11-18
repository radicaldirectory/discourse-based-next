function CategoryList({ categories }) {
  return (
    <ul className="flex items-center mx-auto my-5 space-x-4">
      {categories.map((category, index) => {
        return (
          <li key={index}>
            <a className="no-underline btn-blue">{category.name}</a>
          </li>
        );
      })}
    </ul>
  );
}

export default CategoryList;
