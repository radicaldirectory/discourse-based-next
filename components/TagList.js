import TagButton from "@components/TagButton";
import { forceArray } from "@lib/utils";
import { useState } from "react";

function TagList({ optionTags, onToggleTags, queryTags }) {
  const activeTags = forceArray(queryTags);
  const maxTags = activeTags.length > 1;
  const [showTags, setShowTags] = useState(7);

  return (
    <div className="flex mb-5">
      <div
        className={`flex flex-wrap items-center h-48 mt-5 overflow-hidden sm:h-full ${
          showTags ? "h-full" : ""
        }`}
      >
        {optionTags?.map((tag, index) => {
          return (
            <TagButton
              key={index}
              tag={tag.id}
              onToggleTags={onToggleTags}
              active={tag.active}
              disabled={!tag.active && maxTags}
              hidden={index > showTags ? "hidden sm:block" : ""}
            />
          );
        })}
        <button
          className={`px-3 py-1 mb-2 mr-3 text-center text-pink-900 border border-pink-900 rounded-full sm:hidden sm:border-gray-300 ${
            showTags > optionTags.length ? "hidden" : ""
          }`}
          onClick={() => setShowTags(() => showTags + 7)}
        >
          more...
        </button>
      </div>
    </div>
  );
}

export default TagList;
