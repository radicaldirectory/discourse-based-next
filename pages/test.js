import { useSWRInfinite } from "swr";
import { fetcher, queryStringify2 } from "@lib/utils";

const getKey = (index) => {
  console.log(`index: ${index}`);
  return `/api/docs?${queryStringify2("", [], index)}`;
};

export default function Test() {
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher, {
    initialSize: 1,
  });

  console.log("data:");
  console.log(data);

  console.log(`size: ${size}`);

  const loadMoreHandler = () => {
    setSize(size + 1);
  };

  return (
    <button
      className="ml-2 btn-blue"
      disabled={false}
      onClick={loadMoreHandler}
    >
      load more
    </button>
  );
}
