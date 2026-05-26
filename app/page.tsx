"use client";

import {useState} from "react";
import GiftCard from "../components/GiftCard";

interface Recipient {
  id: string;
  userPersona: string;
  recipientName: string;
  connection: "Family" | "Friend" | "Colleague" | "Other"
  birthdate: string;
  interests: string[];
}

export default function Home() {
  const [rawInterests, setrawInterests] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [connection, setConnection] = useState<"Family" | "Friend" | "Colleague" | "Other">("Family");
  const [birthdate, setBirthdate] = useState("");
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [persona, setPersona] = useState("");
  const handleAddGift = () => {
  if (!recipientName.trim()) return; 

  const processedTags = rawInterests
    .split(" ")
    .filter(tag => tag.startsWith("#"))
    .map(tag => tag.replace("#", "").toLowerCase().trim());

  const newRecipient: Recipient = {
    id: Date.now().toString(),
    recipientName: recipientName,
    connection: connection,
    userPersona: persona,
    birthdate: birthdate,
    interests: processedTags, 
  };

  setRecipients([...recipients, newRecipient]); 

  setRecipientName("");
  setrawInterests("");
  setPersona("");
  setBirthdate("");
};

const [searchQuery, setSearchQuery] = useState("");
const [activeFilter, setActiveFilter] = useState<"All" | "Family" | "Colleague" | "Friend" | "Other">("Family");


const filteredRecipients = recipients.filter((person) => {

  const matchesSearch = person.recipientName
    .toLowerCase()
    .includes(searchQuery.toLowerCase());


  const matchesConnection = activeFilter === "All" || person.connection === activeFilter;

  return matchesSearch && matchesConnection;
});

  return (
    <div className="px-4 md: px-8 py-6 w-full">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
      
        <div className="bg-neutral-900 p-6 rounded-xl">
          <div className="flex flex-col gap-2 mb-4">
            <label>Who are you gifting today?</label>
            <input type="text" className="bg-neutral-800 text-white p-2 rounded" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label>Connection / Category</label>
            <select
              value={connection}
              onChange = {(e) => setConnection(e.target.value as any)}
              className="bg-neutral-800 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600">
              <option value="Family">Family</option>
              <option value="Friend">Friend</option>
              <option value="Colleague">Colleague</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label>Your Persona/Notes:</label>
            <textarea
              rows={4}
              className="bg-neutral-800 text-white p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Describe you current lifestyle, vibe, or overarching themes... "
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
            />
          </div>
  
          <div className="flex flex-col gap-2 mb-4">
            <label>Enter the recipient's interests:</label>
            <textarea
              rows={4}
              className="bg-neutral-800 text-white p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Type out the recipient's interests in the format #[interest]..."
              value={rawInterests}
              onChange={(e) => setrawInterests(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col gap-2 mb-4">
            <label>Birthdate</label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="bg-neutral-800 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium p-2 rounded-lg mt-4 w-full" onClick={handleAddGift}>Generate Card!</button>
      
  </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2 mb-6 items-center justify-center">
            <input type="text" value={searchQuery} placeholder="Type a name here..." className="bg-neutral-800 text-white p-2 rounded-lg text-xs w-full max-w-xs" onChange={(e) => setSearchQuery(e.target.value)} />
            <button className="bg-neutral-800 text-neutral-400 hover:bg-blue-600 hover:text-white transition-colors text-xs font-regular rounded-full px-3 py-1" onClick={() => setActiveFilter("All")}>All</button>
            <button className="bg-neutral-800 text-neutral-400 hover:bg-blue-600 hover:text-white transition-colors text-xs font-regular rounded-full px-3 py-1" onClick={() => setActiveFilter("Family")}>Family</button>
            <button className="bg-neutral-800 text-neutral-400 hover:bg-blue-600 hover:text-white transition-colors text-xs font-regular rounded-full px-3 py-1" onClick={() => setActiveFilter("Friend")}>Friend</button>
            <button className="bg-neutral-800 text-neutral-400 hover:bg-blue-600 hover:text-white transition-colors text-xs font-regular rounded-full px-3 py-1" onClick={() => setActiveFilter("Colleague")}>Colleague</button>
            <button className="bg-neutral-800 text-neutral-400 hover:bg-blue-600 hover:text-white transition-colors text-xs font-regular rounded-full px-3 py-1" onClick={() => setActiveFilter("Other")}>Other</button>
          </div>
          {filteredRecipients.map((individualItem, index) => (
            <GiftCard 
              key={individualItem.id || index}
              id={individualItem.id}
              userPersona={individualItem.userPersona}
              recipientName={individualItem.recipientName}
              connection={individualItem.connection}
              birthdate={individualItem.birthdate}
              interests={individualItem.interests}

            />
          ))}
        </div>

        </div>
      </div>
  );
}

