import { useState, useEffect } from "react";
import api from "../services/api";
import { smartColor } from "../utils/color";

export default function NoteCard({ note, reload }) {
  const [localNote, setLocalNote] = useState(note);
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tags, setTags] = useState(note.tags?.join(", ") || "");

  // 🔑 THIS FIXES THE LIST ISSUE
  useEffect(() => {
    setLocalNote(note);
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags?.join(", ") || "");
    setIsEditing(false);
  }, [note]);

  const remove = async () => {
  if (!window.confirm("Delete this note?")) return;
  await api.delete(`/notes/${note._id}`);
  reload(note._id); 
};


  const update = async () => {
    const payload = {
      title,
      content,
      tags: tags
        .split(",")
        .map(t => t.trim())
        .filter(Boolean)
    };

    const res = await api.put(`/notes/${note._id}`, payload);

    // instant UI update
    setLocalNote(res.data);
    setIsEditing(false);
    reload();
  };

  const bg = smartColor(localNote.title + localNote.tags.join(""));

  return (
    <div
      className="note-card"
      style={{
        background: bg,
        borderRadius: "16px",
        padding: "1.2rem 1.3rem",
        border: "1px solid rgba(15,23,42,0.08)",
      }}
    >
      <div className="note-card-header">
        {isEditing ? (
          <input
            className="form-control mb-2"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        ) : (
          <h5>{localNote.title}</h5>
        )}

        <div>
          {!isEditing && (
            <button
              type="button"
              className="note-delete-btn me-2"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit
            </button>
          )}
          <button
            type="button"
            className="note-delete-btn"
            onClick={remove}
          >
            🗑 Delete
          </button>
        </div>
      </div>

      {isEditing ? (
        <>
          <textarea
            className="form-control mb-2"
            value={content}
            onChange={e => setContent(e.target.value)}
          />

          <input
            className="form-control mb-2"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="tags (comma separated)"
          />

          <div className="d-flex gap-2">
            <button
              className="btn btn-sm btn-dark w-100"
              onClick={update}
            >
              Save
            </button>
            <button
              className="btn btn-sm btn-outline-secondary w-100"
              onClick={() => {
                setIsEditing(false);
                setTitle(localNote.title);
                setContent(localNote.content);
                setTags(localNote.tags.join(", "));
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="note-card-content">{localNote.content}</p>

          {localNote.tags?.length > 0 && (
            <div className="tags">
              {localNote.tags.map((t, i) => (
                <span key={i} className="tag">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
