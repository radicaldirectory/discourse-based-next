import { Markup } from "interweave";

function TopicContent({ topic }) {
  const mainContent = topic.posts[0];

  return (
    <div className="self-center mt-5 prose topic-content lg:prose-lg">
      <h1>{topic.title}</h1>
      <Markup content={mainContent.cooked} />
    </div>
  );
}

export default TopicContent;
