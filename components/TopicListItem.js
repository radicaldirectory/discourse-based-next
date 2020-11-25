import Link from "next/link";

const TopicListItem = ({ topic }) => {
  return (
    <div className="topic-list-item">
      <Link href={`/topic/${topic.id}`}>
        <a className="no-underline">{topic.title}</a>
      </Link>
    </div>
  );
};

export default TopicListItem;
