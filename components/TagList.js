import TagButton from "@components/TagButton";
import { forceArray } from "@lib/utils";

function TagList({ optionTags, onToggleTags, queryTags }) {
  const activeTags = forceArray(queryTags);
  return (
    <div className="flex flex-wrap items-center my-5">
      {optionTags.map((tag, index) => (
        <TagButton
          key={index}
          tag={tag.id}
          onToggleTags={onToggleTags}
          active={tag.active}
        />
      ))}
    </div>
  );
}

export default TagList;
