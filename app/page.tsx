"use client";
import {useEffect} from "react";
import {useState} from "react";
import GiftCard from "../components/GiftCard";

interface Recipient {
  id: string;
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

  useEffect(() => {
    const savedCards = localStorage.getItem("gift_recipients");
    const savedPersona = localStorage.getItem("user_persona");
    if(savedPersona) setPersona(savedPersona);
    if (savedCards) setRecipients(JSON.parse(savedCards));
    
  }, []);

  useEffect(() => {
    if (recipients.length>0) {
      localStorage.setItem("gift_recipients", JSON.stringify(recipients));
    }
    if (persona.trim()) {
      localStorage.setItem("user_persona", persona);
    }
  }, [recipients, persona]);

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
    birthdate: birthdate,
    interests: processedTags, 
  };

  setRecipients([...recipients, newRecipient]); 

  setRecipientName("");
  setrawInterests("");
  setBirthdate("");

};


const [searchQuery, setSearchQuery] = useState("");
const [activeFilter, setActiveFilter] = useState<"All" | "Family" | "Colleague" | "Friend" | "Other">("All");


const filteredRecipients = recipients.filter((person) => {

  const matchesSearch = person.recipientName
    .toLowerCase()
    .includes(searchQuery.toLowerCase());


  const matchesConnection = activeFilter === "All" || person.connection === activeFilter;

  return matchesSearch && matchesConnection;
});

  return (
    <div className="px-4 md:px-8 py-6 w-full">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">

        {persona && (
          <div className="fixed top-6 left-6 z-50 group">
            <div className="w-12 h-12 group-hover:w-96 group-hover:h-auto bg-neutral-950 border border-purple-500/40 rounded-full group-hover:rounded-2xl flex flex-col items-center justify-center overflow-hidden transition-all duration-300 ease-out shadow-xl shadow-black/80">
              
              <div className="flex items-center justify-center w-12 h-12 shrink-0 group-hover:hidden text-xl cursor-pointer animate-pulse">
                🧠
              </div>

              <div className="hidden group-hover:flex flex-col w-full p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <div className="flex justify-between items-center mb-4 border-b border-purple-500/20 pb-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                    🔮 System Profile
                  </h3>
                  <button 
                    onClick={() => { setPersona(""); localStorage.removeItem("user_persona"); }}
                    className="text-[10px] bg-purple-950/40 border border-purple-800/60 text-purple-300 hover:bg-red-950/60 hover:border-red-800/60 hover:text-red-300 transition-all px-2.5 py-1 rounded-md uppercase font-bold tracking-wider"
                  >
                    Reset
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">
                    Active Identity Notes
                  </label>
                  <textarea
                    rows={5}
                    className="w-full bg-neutral-900/60 text-xs text-neutral-300 p-3 rounded-xl border border-neutral-800/80 focus:outline-none focus:border-purple-500/50 resize-none font-mono italic leading-relaxed placeholder:text-neutral-600 transition-all shadow-inner"
                    placeholder="Type or paste a new overarching theme/lifestyle note here..."
                    value={persona}
                    onChange={(e) => setPersona(e.target.value)}
                  />
                </div>
              </div>

            </div>
          </div>
        )}
      
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
          {!persona && (
          <div className="flex flex-col gap-2 mb-4">
            <label>Your Persona/Notes:</label>
            <textarea
              rows={4}
              className="bg-neutral-800 text-white p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Describe you current lifestyle, vibe, or overarching themes... "
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
            />
          </div>)}
  
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
              userPersona={persona}
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

