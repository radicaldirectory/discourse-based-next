const Results = ({ categories }) => {
  return (
    <>
    <h1>Here is the list of categories:</h1>

    <ul>
      {categories.map((value, index) => {
        return <li key={index}>{value.name}</li>
      })}
    </ul>
  </>
  );
};

Results.getInitialProps = async () => {
  const res = await fetch(
    `https://radical.directory/categories.json`
  );
  const results = await res.json();

  return results.category_list;
}

export default Results;