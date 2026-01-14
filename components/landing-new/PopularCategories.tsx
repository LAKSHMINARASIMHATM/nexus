import { Monitor, Microscope, Briefcase, HeartPulse, GraduationCap, Cpu } from "lucide-react";

const categories = [
    { name: "Tech", icon: Monitor, color: "blue", query: "technology programming" },
    { name: "Science", icon: Microscope, color: "teal", query: "science research" },
    { name: "Business", icon: Briefcase, color: "amber", query: "business finance" },
    { name: "Health", icon: HeartPulse, color: "red", query: "health medicine" },
    { name: "School", icon: GraduationCap, color: "indigo", query: "education learning" },
    { name: "AI", icon: Cpu, color: "violet", query: "artificial intelligence ml" }
];

export default function PopularCategories() {
    return (
        <section className="py-24 px-6 relative z-10 border-t border-white/10 bg-black/20 backdrop-blur-md">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40 mb-12 text-center">
                    Popular Categories
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((cat, i) => (
                        <a
                            key={i}
                            href={`/search?q=${encodeURIComponent(cat.query)}`}
                            className="flex flex-col items-center gap-4 p-6 glass-panel rounded-2xl group transition-all hover:bg-white/10 border-white/10"
                        >
                            <div className={`w-14 h-14 rounded-full bg-${cat.color}-500/10 border border-${cat.color}-500/30 flex items-center justify-center text-${cat.color}-400 group-hover:scale-110 transition-transform`}>
                                <cat.icon className="w-7 h-7" />
                            </div>
                            <span className="text-sm font-bold tracking-wide text-white">{cat.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
