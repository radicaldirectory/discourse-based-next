function TagButton({ tag, onToggleTags, active, disabled, hidden }) {
  return (
    <button
      onClick={(e) => onToggleTags(tag, e)}
      className={`px-3 py-1 mb-2 mr-3 border rounded-full hover:bg-teal-300 hover:text-white border-pink-700 sm:border-pink-300
      ${active && "bg-teal-400 text-white border-none"} 
      ${disabled && "opacity-50"}
      ${hidden}
      `}
      disabled={disabled}
    >
      <a className="no-underline">{tag}</a>
    </button>
  );
}

export default TagButton;
