import Layout from "@components/Layout";
import TagList from "@components/TagList";
import { getCategories } from "@api/categories";
import { getDocs } from "@api/docs";

//TODO get rid of seperate category-list pages; set category in State

export default function IndexPage({ categories, docs }) {
  return (
    <Layout categories={categories}>
      <div className="mt-5">
        <h1>List of tags:</h1>
        <TagList docs={docs} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const categories = await getCategories();
  const docs = await getDocs();

  return {
    props: {
      categories,
      docs,
    },
  };
}
