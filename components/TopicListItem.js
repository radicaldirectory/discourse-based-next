import Link from "next/link";

const TopicListItem = ({ value }) => {
  return (
    <li className="topic-list-item">
      <Link href={`/topic/${value.id}`}>
        <a className="no-underline">{value.title}</a>
      </Link>
    </li>
  );
};

export default TopicListItem;
