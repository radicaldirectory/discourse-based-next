function TagButton({ tag, onToggleTags, active, disabled }) {
  return (
    <button
      onClick={(e) => onToggleTags(tag, e)}
      className={`px-3 py-1 mb-2 mr-3 border rounded-full hover:bg-teal-300 hover:text-white ${
        active && "bg-teal-500"
      } ${disabled && "opacity-50"}`}
      disabled={disabled}
    >
      <a className="no-underline">{tag}</a>
    </button>
  );
}

export default TagButton;
