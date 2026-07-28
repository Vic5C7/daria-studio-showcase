import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { pricingContent, type Language } from "../data/siteContent";

const maxNotes = 10;

type NotesInputProps = {
  idPrefix: string;
  language: Language;
  notes: string[];
  onChange: (notes: string[]) => void;
};

export function NotesInput({ idPrefix, language, notes, onChange }: NotesInputProps) {
  const [draftNote, setDraftNote] = useState("");
  const hasReachedLimit = notes.length >= maxNotes;

  const addNote = () => {
    const trimmedNote = draftNote.trim();

    if (!trimmedNote || hasReachedLimit) {
      return;
    }

    onChange([...notes, trimmedNote]);
    setDraftNote("");
  };

  const deleteNote = (noteIndex: number) => {
    onChange(notes.filter((_, index) => index !== noteIndex));
  };

  return (
    <div className="notes-block">
      <label className="field-label" htmlFor={`${idPrefix}-note-input`}>
        {pricingContent.notesTitle[language]}
      </label>

      <div className="notes-input-row">
        <input
          id={`${idPrefix}-note-input`}
          type="text"
          value={draftNote}
          onChange={(event) => setDraftNote(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addNote();
            }
          }}
          placeholder={pricingContent.notesPlaceholder[language]}
          disabled={hasReachedLimit}
        />
        <button
          className="note-add-button"
          type="button"
          onClick={addNote}
          disabled={!draftNote.trim() || hasReachedLimit}
        >
          <Plus size={16} aria-hidden="true" />
          <span>{pricingContent.addNote[language]}</span>
        </button>
      </div>

      <p className="helper-note">
        {hasReachedLimit
          ? pricingContent.notesMaxReached[language]
          : pricingContent.notesLimit[language]}
      </p>

      {notes.length > 0 && (
        <ul className="notes-list">
          {notes.map((note, index) => (
            <li key={`${note}-${index}`}>
              <span>{note}</span>
              <button
                type="button"
                onClick={() => deleteNote(index)}
                aria-label={`${pricingContent.deleteNote[language]} ${note}`}
                title={pricingContent.deleteNote[language]}
              >
                <Trash2 size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
