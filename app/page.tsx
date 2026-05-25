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
  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: "", userPersona: "", recipientName: "", connection: "Family", birthdate: "", interests: []},
  ]);
  const [persona, setPersona] = useState("");
  const handleAddGift = () => {
    const processedTags = rawInterests
      .split(" ")
      .filter(tag => tag.startsWith("#"))
      .map(tag => tag.replace("#", "").toLowerCase().trim());
  }
  
  return (
    <>
      <h1>GiftBetter Core Dashboard</h1>

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
    </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium p-2 rounded-lg mt-4 w-full" onClick={handleAddGift}>Generate gift ideas!</button>
  </div>
        <div>
          {recipients.map((individualItem, index) => (
            <GiftCard 
              key={index}
              id={individualItem.id}
              userPersona={individualItem.userPersona}
              recipientName={individualItem.recipientName}
              connection={individualItem.connection}
              birthdate={individualItem.birthdate}
              interests={individualItem.interests}

            />
          ))}
        </div>
      
    </>
  );
}
