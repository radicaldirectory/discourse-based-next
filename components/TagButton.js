function TagButton({ tag, onToggleTags, active }) {
  return (
    <button
      onClick={(e) => onToggleTags(tag, e)}
      className={`px-3 py-1 mb-2 mr-3 border rounded-full ${
        active && "bg-teal-500"
      } hover:bg-teal-300 hover:text-white`}
    >
      <a className="no-underline">{tag}</a>
    </button>
  );
}

export default TagButton;
