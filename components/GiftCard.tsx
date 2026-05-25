interface GiftCardProps {
    id: string;
    userPersona: string;
    birthdate: string;
    interests: string[];
    recipientName: string;
    connection: string;
}

export default function GiftCard({ id, userPersona, recipientName, connection, birthdate, interests }: GiftCardProps) {
    return (
        <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 mt-4">
            
            <h3 className="text-xl font-bold text-white">
                {recipientName}
            </h3>
            
        
            <span className="text-xs font-semibold px-2 py-1 rounded bg-purple-900 text-purple-200 inline-block mt-1 mb-2">
                {connection}
            </span>

            
            <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-200 inline-block mt-1 mb-2">
                {birthdate}
            </span>

            
            <div className="flex flex-wrap gap-2 mt-2">
                {(interests || []).map((tag, idx) => (
                    <span key={idx} className="text-xs bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full">
                        #{tag}
                     </span>
                ))}
            </div>
        </div>
