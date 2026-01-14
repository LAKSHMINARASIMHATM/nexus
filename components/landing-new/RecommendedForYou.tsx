import { ArrowRight, Sparkles } from "lucide-react";

const recommendations = [
    {
        category: "Technology",
        readTime: "5 min read",
        title: "The Future of AI: Beyond Large Language Models",
        description: "Exploring the next frontier of artificial intelligence and how multi-modal agents are reshaping our digital world.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        color: "blue"
    },
    {
        category: "Science",
        readTime: "12 min read",
        title: "Deep Sea Exploration: The Silent Frontier",
        description: "New discoveries at the bottom of the Mariana Trench reveal life forms previously thought impossible.",
        image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?auto=format&fit=crop&q=80&w=800",
        color: "emerald"
    },
    {
        category: "Design",
        readTime: "8 min read",
        title: "Sustainable Urbanism in 2024",
        description: "How modern cities are integrating nature to fight rising temperatures and improve resident well-being.",
        image: "https://images.unsplash.com/photo-1449156006000-0e104f479426?auto=format&fit=crop&q=80&w=800",
        color: "purple"
    }
];

export default function RecommendedForYou() {
    return (
        <section className="py-24 px-6 z-10 relative">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold flex items-center gap-3 text-crisp text-white font-display">
                        <Sparkles className="text-blue-400 w-8 h-8" />
                        Recommended for You
                    </h2>
                    <button className="px-6 py-2 rounded-full glass-panel text-sm font-semibold hover:bg-white/10 flex items-center gap-2 transition-all text-white border-white/10">
                        Explore all <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recommendations.map((item, i) => (
                        <div
                            key={i}
                            className="group card-hover-immersive glass-panel rounded-2xl overflow-hidden flex flex-col cursor-pointer border-white/10"
                        >
                            <div className="aspect-video relative overflow-hidden">
                                <img
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    src={item.image}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest bg-${item.color}-500/20 text-${item.color}-300 border border-${item.color}-500/30 rounded`}>
                                        {item.category}
                                    </span>
                                    <span className="text-xs text-white/40">{item.readTime}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-crisp group-hover:text-blue-300 transition-colors text-white">
                                    {item.title}
                                </h3>
                                <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
