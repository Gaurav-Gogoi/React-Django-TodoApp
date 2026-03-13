import React from "react";

function Note({ note, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex justify-between items-start hover:shadow-md transition">

      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {note.title}
        </h3>

        <p className="text-gray-600 mt-1">
          {note.content}
        </p>
      </div>

      <button
        onClick={() => onDelete(note.id)}
        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
      >
        Delete
      </button>

    </div>
  );
}

export default Note;