export default function SearchBar({ setSearch }) {
  return (
    <input
      className="form-control glass mb-3"
      placeholder="Search notes, tags, content..."
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
