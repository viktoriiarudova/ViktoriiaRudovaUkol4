import React from "react";

// Definice typů pro uživatele a datumy
type UserRecord = {
  name: string;
  answer: "yes" | "no" | "if-needed";
};

type DateRecord = {
  timestamp: number;
  records: UserRecord[];
};

type EventProps = {
  location?: string;
  id: string;
  title: string;
  dates: DateRecord[];
};

// Mapování odpovědí na symboly
const answerSymbols: Record<UserRecord["answer"], string> = {
  yes: "✅",
  no: "❌",
  "if-needed": "🤔",
};

// Komponenta pro vykreslení řádku tabulky
const VotingRow: React.FC<{ user: UserRecord; dates: DateRecord[] }> = ({ user, dates }) => (
  <tr>
    <td>{user.name}</td>
    {dates.map((date) => {
      const userVote = date.records.find((record) => record.name === user.name);
      return <td key={date.timestamp}>{userVote ? answerSymbols[userVote.answer] : "—"}</td>;
    })}
  </tr>
);

// Komponenta pro vykreslení celé tabulky hlasování
const VotingTable: React.FC<{ dates: DateRecord[] }> = ({ dates }) => {
  if (dates.length === 0) {
    return <p>No available dates for voting.</p>;
  }

  // Unikátní seznam všech účastníků
  const allUsers = Array.from(new Set(dates.flatMap((date) => date.records.map((r) => r.name))))
    .map((name) => ({ name }));

  return (
    <table border={1} cellPadding={8} cellSpacing={0}>
      <thead>
        <tr>
          <th>Participant</th>
          {dates.map((date) => (
            <th key={date.timestamp}>{new Date(date.timestamp).toLocaleDateString()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {allUsers.map((user) => (
          <VotingRow key={user.name} user={user} dates={dates} />
        ))}
      </tbody>
    </table>
  );
};

// Hlavní komponenta Event
const Event: React.FC<EventProps> = ({ location, title, dates }) => {
  return (
    <div>
      <h2>{title}</h2>
      {location && <p>Location: {location}</p>}
      <VotingTable dates={dates} />
    </div>
  );
};

export default Event;
