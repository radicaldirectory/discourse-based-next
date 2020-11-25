function Static({ staticCategories }) {
  return (
    <>
    <h1>Here is the list of categories:</h1>

    <ul>
      {staticCategories.categories.map((value, index) => {
        return <li key={index}>{value.name}</li>
      })}
    </ul>
  </>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `https://radical.directory/categories.json`
  );
  const results = await res.json();
  const staticCategories = results.category_list;

  return {
    props: {
      staticCategories,
    },
  }
}

export default Static;