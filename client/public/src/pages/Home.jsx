import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/notes?search=${search}`);
      setNotes(res.data);
      if (res.data.length > 0 && !selectedNote) {
        setSelectedNote(res.data[0]);
      }
    } catch (e) {
      console.error("Error loading notes:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleReload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSelect = (note) => {
    setSelectedNote(note);
  };

  const handleReload = async (deletedId = null) => {
  setLoading(true);
  try {
    const res = await api.get(`/notes?search=${search}`);
    const newNotes = res.data;
    setNotes(newNotes);

    // 🔑 HANDLE DELETE CASE
    if (deletedId) {
      if (newNotes.length === 0) {
        setSelectedNote(null);
      } else {
        // select next available note
        setSelectedNote(newNotes[0]);
      }
      return;
    }

    // 🔑 NORMAL RELOAD (edit / create)
    if (selectedNote) {
      const updated = newNotes.find(
        (n) => n._id === selectedNote._id
      );
      setSelectedNote(updated || newNotes[0] || null);
    } else if (newNotes.length > 0) {
      setSelectedNote(newNotes[0]);
    }
  } catch (e) {
    console.error("Error loading notes:", e);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="app-shell">
      <Navbar />

      <div className="app-header">
        <div>
          <h1 className="header-title">Notes</h1>
          <p className="header-subtitle">{notes.length} notes</p>
        </div>
        <div className="search-bar">
          <SearchBar setSearch={setSearch} />
        </div>
      </div>

      <div className="split-layout">
        {/* LEFT: form then list */}
        <aside className="left-pane">
          <div className="note-form-wrapper">
            <NoteForm reload={handleReload} />
          </div>

          <div className="notes-list">
            {loading ? (
              <div className="empty-state">Loading…</div>
            ) : notes.length === 0 ? (
              <div className="empty-state">No notes yet. Create one above.</div>
            ) : (
              notes.map((note) => (
                <button
                  key={note._id}
                  className={
                    "note-list-item" +
                    (selectedNote && selectedNote._id === note._id
                      ? " note-list-item--active"
                      : "")
                  }
                  onClick={() => handleSelect(note)}
                >
                  <h4>{note.title}</h4>
                  <p>{note.content}</p>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* RIGHT: full note */}
        <main className="note-detail">
          {selectedNote ? (
            <NoteCard note={selectedNote} reload={handleReload} />
          ) : (
            <div className="empty-state">Select a note to view it here.</div>
          )}
        </main>
      </div>
    </div>
  );
}

