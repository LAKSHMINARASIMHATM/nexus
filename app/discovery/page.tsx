"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Search, Mic, Camera, ArrowLeft, Grid, List as ListIcon, Filter, Moon, Sun, Share2, TrendingUp, Star, Sparkles, FileText, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserMenu } from "@/components/auth/user-menu";

function DiscoveryContent() {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setIsDarkMode(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleDarkMode = () => {
        const newDark = !isDarkMode;
        setIsDarkMode(newDark);
        if (newDark) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    };

    const handleCategoryClick = (category: string) => {
        // Redirect to search with category filter
        router.push(`/search?q=${encodeURIComponent(category)}&category=${encodeURIComponent(category.toLowerCase())}`);
    };

    const handleContentClick = (title: string, type?: string) => {
        // Redirect to search with the content title
        const searchQuery = type ? `${type}: ${title}` : title;
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    };

    const categories = [
        {
            name: "Neural Architecture",
            count: "1.2k",
            color: "blue",
            description: "Advanced neural network architectures, deep learning models, and AI research papers",
            latestDoc: {
                title: "Transformer Architecture Evolution: A Comprehensive Survey",
                author: "Dr. Elena Rodriguez",
                date: "2024-01-12",
                wordCount: 15420,
                readTime: "45 min"
            }
        },
        {
            name: "Deep Space Bio",
            count: "850",
            color: "purple",
            description: "Astrobiology, space exploration research, and extraterrestrial biology findings",
            latestDoc: {
                title: "Mars Colonization: Biological Challenges and Solutions",
                author: "Prof. James Chen",
                date: "2024-01-10",
                wordCount: 8750,
                readTime: "28 min"
            }
        },
        {
            name: "Web3 Ecosystems",
            count: "2.4k",
            color: "emerald",
            description: "Blockchain technology, decentralized finance, and cryptocurrency ecosystems",
            latestDoc: {
                title: "DeFi Protocol Security: Best Practices and Common Vulnerabilities",
                author: "Alex Thompson",
                date: "2024-01-11",
                wordCount: 12300,
                readTime: "38 min"
            }
        },
        {
            name: "Sustainable Cities",
            count: "1.1k",
            color: "orange",
            description: "Urban planning, green infrastructure, and sustainable development initiatives",
            latestDoc: {
                title: "Smart City Integration: IoT and Urban Analytics",
                author: "Maria Garcia",
                date: "2024-01-09",
                wordCount: 9800,
                readTime: "32 min"
            }
        },
        {
            name: "Quantum Computing",
            count: "430",
            color: "cyan",
            description: "Quantum mechanics, quantum algorithms, and quantum computing applications",
            latestDoc: {
                title: "Quantum Supremacy: Practical Applications and Limitations",
                author: "Dr. Robert Kim",
                date: "2024-01-08",
                wordCount: 11200,
                readTime: "35 min"
            }
        },
        {
            name: "Ethical AI",
            count: "920",
            color: "pink",
            description: "AI ethics, responsible AI development, and machine learning governance",
            latestDoc: {
                title: "AI Bias Detection and Mitigation Strategies",
                author: "Dr. Sarah Williams",
                date: "2024-01-07",
                wordCount: 7600,
                readTime: "24 min"
            }
        }
    ];

    return (
        <div className="bg-mesh min-h-screen transition-colors duration-300 relative font-immersive">
            <div className="fixed inset-0 bg-dots pointer-events-none"></div>

            <header className="sticky top-0 z-50 glass-panel !border-x-0 !border-t-0 !rounded-none">
                <div className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <h1 className="text-xl font-bold tracking-[0.2em] uppercase">Discovery</h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="p-2 rounded-xl hover:bg-white/10 transition-colors" onClick={toggleDarkMode}>
                            <Moon className="h-5 w-5 dark:hidden text-slate-700" />
                            <Sun className="h-5 w-5 hidden dark:block text-yellow-400" />
                        </button>
                        <UserMenu />
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-8 py-12 relative z-10">
                <div className="mb-16">
                    <h2 className="text-4xl font-bold mb-4 tracking-tight">Explore the Nexus Catalog</h2>
                    <p className="text-slate-500 max-w-2xl text-lg">
                        Jump into trending topics, curated collections, and the latest discoveries within our distributed neural index.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {categories.map((cat, i) => (
                        <div key={i} className="group cursor-pointer" onClick={() => handleCategoryClick(cat.name)}>
                            <div className="glass-panel p-8 rounded-[2rem] border-white/10 card-hover-immersive flex flex-col h-full">
                                <div className={`w-12 h-12 rounded-2xl bg-${cat.color}-500/10 border border-${cat.color}-500/20 flex items-center justify-center text-${cat.color}-500 mb-6 group-hover:scale-110 transition-transform`}>
                                    <Share2 className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">{cat.name}</h3>
                                <p className="text-slate-400 text-sm mb-4 flex-1">
                                    {cat.description}
                                </p>
                                <div className="bg-white/5 rounded-xl p-3 mb-4 border border-white/10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold text-slate-500">Latest Document:</span>
                                    </div>
                                    <h4 className="font-semibold text-sm text-slate-700 line-clamp-1 group-hover:text-blue-500 transition-colors cursor-pointer">
                                        {cat.latestDoc.title}
                                    </h4>
                                    <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
                                        <span>{cat.latestDoc.author}</span>
                                        <span>•</span>
                                        <span>{cat.latestDoc.date}</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-slate-400">
                                        <span>{cat.latestDoc.wordCount.toLocaleString()} words</span>
                                        <span>•</span>
                                        <span>{cat.latestDoc.readTime}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{cat.count} Documents</span>
                                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowLeft className="h-4 w-4 rotate-180" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-20">
                    {/* Trending Section */}
                    <section className="glass-panel rounded-[3rem] p-12 border-white/10">
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-4">
                                <Badge className="bg-blue-500 text-white border-none py-1 px-4">Trending Now</Badge>
                                <h3 className="text-2xl font-bold">Latest Intelligence</h3>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                                <button className="p-2 bg-white/10 rounded-lg"><Grid className="h-4 w-4" /></button>
                                <button className="p-2 hover:bg-white/5 rounded-lg"><ListIcon className="h-4 w-4" /></button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    title: "Neural Link Protocol V1.0 - Integration Guide",
                                    author: "Dr. Michael Chang",
                                    date: "2 hours ago",
                                    wordCount: 5420,
                                    readTime: "18 min",
                                    category: "Technical Documentation",
                                    abstract: "Comprehensive guide for implementing neural link protocols in distributed systems, covering architecture patterns and best practices..."
                                },
                                {
                                    title: "Neural Link Protocol V2.0 - Integration Guide",
                                    author: "Sarah Johnson",
                                    date: "4 hours ago",
                                    wordCount: 6180,
                                    readTime: "22 min",
                                    category: "Technical Documentation",
                                    abstract: "Advanced implementation strategies for neural link protocols with enhanced security features and performance optimizations..."
                                },
                                {
                                    title: "Neural Link Protocol V3.0 - Integration Guide",
                                    author: "Prof. David Lee",
                                    date: "6 hours ago",
                                    wordCount: 7350,
                                    readTime: "26 min",
                                    category: "Technical Documentation",
                                    abstract: "Next-generation neural link protocol specifications with quantum-resistant encryption and zero-knowledge proofs..."
                                },
                                {
                                    title: "Neural Link Protocol V4.0 - Integration Guide",
                                    author: "Emily Rodriguez",
                                    date: "8 hours ago",
                                    wordCount: 8920,
                                    readTime: "31 min",
                                    category: "Technical Documentation",
                                    abstract: "Cutting-edge neural link protocol implementation with AI-driven optimization and adaptive routing mechanisms..."
                                },
                                {
                                    title: "Neural Link Protocol V5.0 - Integration Guide",
                                    author: "Dr. Alex Kumar",
                                    date: "10 hours ago",
                                    wordCount: 10200,
                                    readTime: "36 min",
                                    category: "Technical Documentation",
                                    abstract: "Latest neural link protocol with breakthrough features including real-time neuro-adaptive learning and predictive analytics..."
                                }
                            ].map((item, i) => (
                                <div key={i} className="group flex items-center gap-8 p-6 hover:bg-white/5 rounded-3xl transition-all border border-transparent hover:border-white/10 cursor-pointer" onClick={() => handleContentClick(item.title, 'article')}>
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                                        <FileText className="h-8 w-8 text-slate-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h4 className="font-bold text-lg mb-1 group-hover:text-blue-500 transition-colors cursor-pointer">{item.title}</h4>
                                            <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400">
                                                {item.category}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-slate-400 line-clamp-2 mb-2">{item.abstract}</p>
                                        <div className="flex items-center gap-4 text-xs text-slate-500">
                                            <span>{item.author}</span>
                                            <span>•</span>
                                            <span>{item.wordCount.toLocaleString()} words</span>
                                            <span>•</span>
                                            <span>{item.readTime}</span>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Last Indexed</p>
                                        <p className="text-xs font-bold">{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Popular Section */}
                    <section className="glass-panel rounded-[3rem] p-12 border-white/10">
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-4">
                                <Badge className="bg-emerald-500 text-white border-none py-1 px-4">Most Popular</Badge>
                                <h3 className="text-2xl font-bold">Community Favorites</h3>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                                <button className="p-2 bg-white/10 rounded-lg"><Grid className="h-4 w-4" /></button>
                                <button className="p-2 hover:bg-white/5 rounded-lg"><ListIcon className="h-4 w-4" /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "Quantum Computing Basics",
                                    views: "45.2k",
                                    category: "Technology",
                                    author: "Dr. Rachel Green",
                                    date: "1 day ago",
                                    wordCount: 8750,
                                    readTime: "32 min",
                                    rating: 4.8,
                                    abstract: "Fundamental concepts of quantum computing, including qubits, superposition, and quantum gates..."
                                },
                                {
                                    title: "Sustainable Urban Planning",
                                    views: "38.7k",
                                    category: "Environment",
                                    author: "Prof. Mark Thompson",
                                    date: "2 days ago",
                                    wordCount: 12300,
                                    readTime: "45 min",
                                    rating: 4.7,
                                    abstract: "Comprehensive guide to sustainable city design, green infrastructure, and urban ecology..."
                                },
                                {
                                    title: "AI Ethics Framework",
                                    views: "32.1k",
                                    category: "Philosophy",
                                    author: "Dr. Lisa Wang",
                                    date: "3 days ago",
                                    wordCount: 9800,
                                    readTime: "36 min",
                                    rating: 4.9,
                                    abstract: "Ethical considerations in AI development, including bias mitigation and responsible AI practices..."
                                },
                                {
                                    title: "Web3 Infrastructure",
                                    views: "28.9k",
                                    category: "Finance",
                                    author: "James Mitchell",
                                    date: "4 days ago",
                                    wordCount: 11200,
                                    readTime: "41 min",
                                    rating: 4.6,
                                    abstract: "Building scalable Web3 applications, smart contracts, and decentralized systems..."
                                }
                            ].map((item, i) => (
                                <div key={i} className="group p-6 hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/10 cursor-pointer" onClick={() => handleContentClick(item.title)}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                            <TrendingUp className="h-6 w-6 text-emerald-500" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-xs border-emerald-500/30 text-emerald-400">
                                                {item.category}
                                            </Badge>
                                            <div className="flex items-center gap-1 text-xs text-amber-500">
                                                <Star className="h-3 w-3 fill-current" />
                                                <span className="font-semibold">{item.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-lg mb-2 group-hover:text-emerald-500 transition-colors cursor-pointer">{item.title}</h4>
                                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">{item.abstract}</p>
                                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                                        <span>{item.author}</span>
                                        <span>{item.wordCount.toLocaleString()} words</span>
                                        <span>{item.readTime}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>{item.views} views</span>
                                        <span>Updated {item.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Recent Section */}
                    <section className="glass-panel rounded-[3rem] p-12 border-white/10">
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-4">
                                <Badge className="bg-purple-500 text-white border-none py-1 px-4">Recently Added</Badge>
                                <h3 className="text-2xl font-bold">Fresh Discoveries</h3>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                                <button className="p-2 bg-white/10 rounded-lg"><Grid className="h-4 w-4" /></button>
                                <button className="p-2 hover:bg-white/5 rounded-lg"><ListIcon className="h-4 w-4" /></button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                {
                                    title: "Neural Architecture Optimization",
                                    time: "2 hours ago",
                                    type: "Research Paper",
                                    author: "Dr. Jennifer Liu",
                                    institution: "MIT AI Lab",
                                    wordCount: 6800,
                                    readTime: "24 min",
                                    keywords: ["neural networks", "optimization", "deep learning"]
                                },
                                {
                                    title: "Deep Space Biology Findings",
                                    time: "5 hours ago",
                                    type: "Scientific Report",
                                    author: "Prof. Carlos Martinez",
                                    institution: "NASA Research Center",
                                    wordCount: 9200,
                                    readTime: "33 min",
                                    keywords: ["astrobiology", "space research", "extraterrestrial life"]
                                },
                                {
                                    title: "Web3 Security Protocols",
                                    time: "8 hours ago",
                                    type: "Technical Guide",
                                    author: "Alexandra Chen",
                                    institution: "Blockchain Security Institute",
                                    wordCount: 7600,
                                    readTime: "27 min",
                                    keywords: ["blockchain", "security", "smart contracts"]
                                },
                                {
                                    title: "Sustainable Energy Solutions",
                                    time: "12 hours ago",
                                    type: "Case Study",
                                    author: "Dr. Robert Green",
                                    institution: "Environmental Research Group",
                                    wordCount: 5400,
                                    readTime: "19 min",
                                    keywords: ["renewable energy", "sustainability", "climate change"]
                                },
                                {
                                    title: "Quantum Computing Applications",
                                    time: "1 day ago",
                                    type: "Tutorial",
                                    author: "Dr. Maria Rodriguez",
                                    institution: "Quantum Computing Institute",
                                    wordCount: 8100,
                                    readTime: "29 min",
                                    keywords: ["quantum computing", "algorithms", "quantum mechanics"]
                                }
                            ].map((item, i) => (
                                <div key={i} className="group flex items-center gap-6 p-4 hover:bg-white/5 rounded-2xl transition-all cursor-pointer" onClick={() => handleContentClick(item.title, item.type)}>
                                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                                        <Sparkles className="h-5 w-5 text-purple-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className="font-semibold mb-1 group-hover:text-purple-500 transition-colors cursor-pointer">{item.title}</h4>
                                            <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-400">
                                                {item.type}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                                            <span>{item.author}</span>
                                            <span>•</span>
                                            <span>{item.institution}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-slate-400">
                                            <span>{item.wordCount.toLocaleString()} words</span>
                                            <span>•</span>
                                            <span>{item.readTime}</span>
                                            <span>•</span>
                                            <span>{item.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            {item.keywords.map((keyword, idx) => (
                                                <span key={idx} className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                        <Bookmark className="h-4 w-4 text-slate-400" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Featured Section */}
                    <section className="glass-panel rounded-[3rem] p-12 border-white/10">
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-4">
                                <Badge className="bg-amber-500 text-white border-none py-1 px-4">Featured</Badge>
                                <h3 className="text-2xl font-bold">Editor's Choice</h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {[
                                {
                                    title: "The Future of Neural Networks",
                                    description: "An in-depth analysis of emerging trends and breakthrough technologies in neural network architecture...",
                                    author: "Dr. Sarah Chen",
                                    institution: "Stanford AI Lab",
                                    readTime: "15 min read",
                                    rating: 4.9,
                                    wordCount: 12500,
                                    publishDate: "2024-01-08",
                                    category: "Research Paper",
                                    featuredReason: "Groundbreaking research on next-generation neural architectures"
                                },
                                {
                                    title: "Sustainable Computing Practices",
                                    description: "Comprehensive guide to implementing eco-friendly solutions in modern computing infrastructure...",
                                    author: "Tech Sustainability Lab",
                                    institution: "Green Computing Initiative",
                                    readTime: "12 min read",
                                    rating: 4.8,
                                    wordCount: 9800,
                                    publishDate: "2024-01-07",
                                    category: "Technical Guide",
                                    featuredReason: "Essential reading for environmentally conscious developers"
                                }
                            ].map((item, i) => (
                                <div key={i} className="group cursor-pointer" onClick={() => handleContentClick(item.title)}>
                                    <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 mb-6 relative overflow-hidden border border-amber-500/20">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Star className="h-24 w-24 text-amber-500/30 fill-current" />
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <Badge className="bg-amber-500 text-white border-none">Featured</Badge>
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-xl mb-3 group-hover:text-amber-500 transition-colors cursor-pointer">{item.title}</h4>
                                    <p className="text-slate-400 mb-4 line-clamp-2">{item.description}</p>
                                    <div className="flex items-center justify-between text-sm mb-3">
                                        <div className="flex items-center gap-4 text-slate-500">
                                            <span>{item.author}</span>
                                            <span>•</span>
                                            <span>{item.institution}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-amber-500">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="font-semibold">{item.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                                        <span>{item.wordCount.toLocaleString()} words</span>
                                        <span>{item.readTime}</span>
                                        <span>{item.publishDate}</span>
                                    </div>
                                    <div className="bg-amber-500/10 rounded-lg p-2 border border-amber-500/20">
                                        <p className="text-xs text-amber-700 font-medium">
                                            <span className="font-bold">Why featured:</span> {item.featuredReason}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default function DiscoveryPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-mesh">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">Synchronizing...</span>
            </div>
        </div>}>
            <DiscoveryContent />
        </Suspense>
    );
}
