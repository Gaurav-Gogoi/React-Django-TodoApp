import React from "react";
import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css"



function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Notes
      </h1>
  
      <div className="grid md:grid-cols-2 gap-8">
  
        {/* Notes Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Notes</h2>
  
          <div className="space-y-3">
            {notes.map((note) => (
              <Note note={note} onDelete={deleteNote} key={note.id} />
            ))}
          </div>
        </div>
  
        {/* Create Note */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Create Note
          </h2>
  
          <form onSubmit={createNote} className="space-y-4">
  
            <input
              type="text"
              placeholder="Title"
              className="w-full border p-3 rounded-lg"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
  
            <textarea
              placeholder="Write your note..."
              className="w-full border p-3 rounded-lg"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
  
            <button
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              Create Note
            </button>
  
          </form>
        </div>
  
      </div>
    </div>
  );
}

export default Home;
