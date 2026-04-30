import { getPrisma } from "@/lib/db";
import { FiMessageSquare, FiExternalLink } from "react-icons/fi";
import Image from "next/image";

function normalizeSuggestionImageUrl(src: string | null | undefined) {
  if (!src || typeof src !== "string") return "/images/clothings/cloth-1.jpg";

  const cleanedSrc = src.startsWith("#/") ? src.slice(1) : src;
  if (
    cleanedSrc.startsWith("/") ||
    cleanedSrc.startsWith("http://") ||
    cleanedSrc.startsWith("https://")
  ) {
    return cleanedSrc;
  }

  return `/${cleanedSrc}`;
}

export default async function AdminSuggestionsPage() {
  const suggestions = await getPrisma().suggestion.findMany({
    include: { user: true },
    orderBy: { id: "desc" }, 
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {suggestions.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-rose-100">
            <p className="text-gray-400 font-medium">
              No design suggestions yet.
            </p>
          </div>
        )}
        <header>
          <h1 className="text-2xl font-black text-darkRose2 uppercase tracking-tight">
            Design Suggestions
          </h1>
          <p className="text-sm text-gray-500">
            Bespoke requests and style inspirations from users
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="group bg-white rounded-2xl border border-rose-100 overflow-hidden shadow-lg shadow-rose-900/5 hover:shadow-rose-900/10 transition-all"
            >
              <div className="relative h-64 w-full bg-gray-100">
                <Image
                  src={normalizeSuggestionImageUrl(suggestion.imageUrl)}
                  alt="Customer suggestion"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-rose-600 shadow-sm border border-rose-50 uppercase tracking-widest">
                    New Request
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-rose-50 p-2 rounded-lg">
                    <FiMessageSquare className="text-rose-600" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed italic line-clamp-3">
                    &quot;{suggestion.description}&quot;
                  </p>
                </div>

                <div className="pt-4 border-t border-rose-50 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-darkRose2 uppercase tracking-tighter">
                      Requested By
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                      {suggestion.user.firstname} {suggestion.user.surname}
                    </p>
                  </div>
                  <button className="p-2 hover:bg-rose-50 rounded-full text-rose-600 transition-colors">
                    <FiExternalLink size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
