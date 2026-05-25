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
  const [name, setName] = useState("");
  const [days, setDays] = useState("");
  const [recipients, setRecipients] = useState<Recipient[]>([
    { id: "", userPersona: "", recipientName: "", connection: "Family", birthdate: "", interests: []},
  ]);
  const handleAddGift = () => {
    const newGift: Recipient = {
      title: "Gift for " + name,
      description: "Due in " + days + " days"
    };

    setGifts([...gifts, newGift]);

    setName("")
    setDays("")
  }
  
  return (
    <>
      <h1>GiftBetter Core Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-neutral-900 p-6 rounded-xl">
          <div className="flex flex-col gap-2 mb-4">
            <label>Who are you gifting today?</label>
            <input type="text" className="bg-neutral-800 text-white p-2 rounded" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label>How many days are left until their Birthday?</label>
            <input type="number" className="bg-neutral-800 text-white p-2 rounded" value={days} onChange={(e) => setDays(e.target.value)} />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium p-2 rounded-lg mt-4 w-full" onClick={handleAddGift}>Generate gift ideas!</button>
      </div>

        <div>
          {gifts.map((individualItem, index) => (
            <GiftCard 
              key={index}
              title={individualItem.title} 
              description={individualItem.description} 
            />
          ))}
        </div>
      </div>
    </>
  );
}
