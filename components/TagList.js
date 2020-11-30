import TagButton from "@components/TagButton";
import { forceArray } from "@lib/utils";

function TagList({ optionTags, onToggleTags, queryTags }) {
  const activeTags = forceArray(queryTags);
  const maxTags = activeTags.length > 1;
  return (
    <div className="flex flex-wrap items-center my-5">
      {optionTags?.map((tag, index) => (
        <TagButton
          key={index}
          tag={tag.id}
          onToggleTags={onToggleTags}
          active={tag.active}
          disabled={!tag.active && maxTags}
        />
      ))}
    </div>
  );
}

export default TagList;
