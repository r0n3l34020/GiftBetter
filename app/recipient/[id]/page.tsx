"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Recipient {
  id: string;
  recipientName: string;
  connection: "Family" | "Friend" | "Colleague" | "Other";
  birthdate: string;
  interests: string[];
}

export default function RecipientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [recipient, setRecipient] = useState<Recipient | null>(null);

  useEffect(() => {
    const savedCards = localStorage.getItem("gift_recipients");
    if (savedCards) {
      const allRecipients: Recipient[] = JSON.parse(savedCards);
      
      const matchedProfile = allRecipients.find((person) => person.id === params.id);
      
      if (matchedProfile) {
        setRecipient(matchedProfile);
      }
    }
  }, [params.id]);

  if (!recipient) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-950 text-neutral-400 font-mono text-xs">
        System Error: Scanning database profiles for ID [{params.id}]...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 md:p-12 font-sans select-none">
      <div className="max-w-4xl mx-auto">
        
        
        <button 
          onClick={() => router.push("/")}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-purple-400 transition-colors mb-8 focus:outline-none"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span> Return to Matrix
        </button>

        
        <div className="bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-2xl shadow-xl shadow-black/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6 mb-6">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-neutral-100 mb-1">
                {recipient.recipientName}
              </h1>
              <span className="inline-block bg-purple-950/60 border border-purple-800/40 text-purple-300 text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-md">
                {recipient.connection} Connection
              </span>
            </div>
            
            {recipient.birthdate && (
              <div className="text-right">
                <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-500">Target Anniversary</p>
                <p className="text-sm font-mono font-bold text-neutral-300">{recipient.birthdate}</p>
              </div>
            )}
          </div>

          
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
              Parsed Interest Vectors
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {recipient.interests.length > 0 ? (
                recipient.interests.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="bg-neutral-800 border border-neutral-700/60 text-neutral-300 text-xs px-3 py-1 rounded-lg font-medium"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                <span className="text-xs italic text-neutral-600">No profile tags provided.</span>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
