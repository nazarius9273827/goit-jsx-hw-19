export default function Button({ onClick }) {
  return (
    <button type="button" className="load-more" onClick={onClick}>
      Load more
    </button>
  );
}
