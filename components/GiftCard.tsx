import { useState } from "react";

export default function GiftCard({ recipientName, connection, userPersona, birthdate, interests }: any) {
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-white">{recipientName}</h3>
          <span className="text-xs bg-purple-900/50 text-purple-300 px-2.5 py-1 rounded-full">
            {connection}
          </span>
        </div>

        <button className="text-sm text-blue-400 hover:underline" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Hide Details" : "View Details"}
        </button>
      </div>


      
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-neutral-800 text-sm text-neutral-400 space-y-2">
          {userPersona && <p><strong className="text-neutral-200">Notes:</strong> {userPersona}</p>}
          {birthdate && <p><strong className="text-neutral-200">Birthdate:</strong> {birthdate}</p>}
          
          <div className="flex flex-wrap gap-1 mt-2">
            {interests.map((tag: string, i: number) => (
              <span key={i} className="text-xs bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
