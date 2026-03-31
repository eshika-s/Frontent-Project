import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NoteCard from "../Components/NoteCard";

const initialNotes = [
  { id: 1, title: "Data Structures & Algorithms", subject: "CSE", university: "Delhi University (DU)", time: "Just now" },
  { id: 2, title: "Database Management Systems", subject: "IT", university: "AKTU (UPTU)", time: "2 mins ago" },
  { id: 3, title: "Operating System Internals", subject: "CSE", university: "GGSIPU", time: "5 mins ago" }
];

const newNotePool = [
  { title: "Machine Learning Basics", subject: "CSE - AI/ML", university: "IIT Bombay" },
  { title: "Computer Networks", subject: "IT/CSE", university: "NIT Trichy" },
  { title: "Engineering Mathematics IV", subject: "Common", university: "BITS Pilani" },
  { title: "Design & Analysis of Algorithms", subject: "CSE", university: "IIIT Hyderabad" },
  { title: "React Development", subject: "Web Dev", university: "Jadavpur University" },
  { title: "Thermodynamics II", subject: "Mechanical", university: "Delhi Technological University (DTU)" },
  { title: "Digital Signal Processing", subject: "ECE", university: "NSUT Delhi" },
  { title: "Structural Logic", subject: "Civil Engg.", university: "IIT Kanpur" },
  { title: "Microprocessors & Microcontrollers", subject: "ECE/EEE", university: "VIT Vellore" },
  { title: "Fluid Mechanics", subject: "Mechanical", university: "NIT Surathkal" },
  { title: "Cloud Computing Internals", subject: "CSE/IT", university: "SRM Institute" },
];

const mockUniversities = [
  "IIT Delhi", "NIT Trichy", "BITS Pilani", "IIIT Hyderabad",
  "Delhi Technological University (DTU)", "NSUT Delhi",
  "IIT Kanpur", "VIT Vellore", "NIT Surathkal", "SRM Institute", "Jadavpur University"
];

const mockTitles = [
  "Unit 1 & 2 Complete Notes",
  "Midterm Preparation Notes",
  "Hand-written Lecture Notes",
  "End Semester Question Bank",
  "Important Topics Summary",
  "Formula Sheet & Quick Revision",
  "Topper's Personal Notes",
  "Previous Year Solved Papers"
];

function Notes() {
  const [notes, setNotes] = useState(initialNotes);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subjectQuery = searchParams.get("subject");
  const universityQuery = searchParams.get("university");

  useEffect(() => {
    if (subjectQuery) {
      // Subject specific mode: Generate ~8-10 notes for this specific subject across different colleges
      const specificNotes = mockUniversities.slice(0, 7 + Math.floor(Math.random() * 4)).map((uni, idx) => ({
        id: `sub-${idx}`,
        title: `${mockTitles[idx % mockTitles.length]}`,
        subject: subjectQuery.toUpperCase(),
        university: uni,
        time: `${Math.floor(Math.random() * 24 + 1)} hrs ago`
      }));
      setNotes(specificNotes);
    } else if (universityQuery) {
      // University specific mode: Generate ~8-10 notes for different subjects from this specific university
      const mockSubjects = ["Data Structures", "Operating Systems", "Computer Networks", "DBMS", "Machine Learning", "Thermodynamics", "Digital Logic", "Fluid Mechanics"];
      const specificNotes = mockSubjects.slice(0, 6 + Math.floor(Math.random() * 3)).map((sub, idx) => ({
        id: `uni-${idx}`,
        title: `${mockTitles[idx % mockTitles.length]}`,
        subject: sub,
        university: universityQuery.toUpperCase(),
        time: `${Math.floor(Math.random() * 24 + 1)} hrs ago`
      }));
      setNotes(specificNotes);
    } else {
      // Live feed mode
      setNotes(initialNotes);
      const interval = setInterval(() => {
        const randomNote = newNotePool[Math.floor(Math.random() * newNotePool.length)];
        const newEntry = {
          id: Date.now(),
          ...randomNote,
          time: "Just now"
        };
        setNotes(prev => [newEntry, ...prev].slice(0, 15)); // Keep max 15 notes
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [subjectQuery, universityQuery]);

  return (
    <div className="container fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>{subjectQuery ? `Study Material: ${subjectQuery.toUpperCase()}` : universityQuery ? `Notes from: ${universityQuery.toUpperCase()}` : "Recent Notes"}</h2>
        {!(subjectQuery || universityQuery) && <div className="live-indicator">Live Feed</div>}
        {(subjectQuery || universityQuery) && (
          <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Found {notes.length} verified documents
          </span>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {notes.map((note, index) => (
          <div key={note.id} style={{ animationDelay: `${index * 0.05}s` }} className="fade-in">
            <NoteCard note={note} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
