import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';
import { Search, ArrowRight, Mic, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Search3DBackground = dynamic(() => import('./Search3DBackground'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 -z-10 bg-background" />
});

interface HeroProps {
  onSearch: (query: string) => void;
  defaultValue?: string;
}

export default function ImmersiveHero({ onSearch, defaultValue = "" }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.from(titleRef.current, {
      y: 80,
      opacity: 0,
      duration: 1.2,
      delay: 0.3,
    })
      .from(searchRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
      }, "-=0.6");

  }, { scope: containerRef });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const query = formData.get('search') as string;
    if (query?.trim()) {
      onSearch(query);
    }
  };

  // Handle voice search
  const handleMicClick = async () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Please try Chrome, Edge, or Safari.');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      const input = document.querySelector('input[name="search"]') as HTMLInputElement;
      if (input) {
        input.value = transcript;
        onSearch(transcript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Handle camera search (image search)
  const handleCameraClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        // In a real implementation, you would upload the image to an OCR service
        // For now, we'll just use the filename as a mock search
        const filename = file.name.replace(/\.[^/.]+$/, "");
        const searchQuery = `image: ${filename}`;
        const inputElement = document.querySelector('input[name="search"]') as HTMLInputElement;
        if (inputElement) {
          inputElement.value = searchQuery;
          onSearch(searchQuery);
        }
      }
    };
    input.click();
  };

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4 py-20">
      <Search3DBackground />

      {/* Decorative top line */}
      <div className="absolute top-32 left-0 right-0 h-1 bg-foreground/30 transform -rotate-2" />
      <div className="absolute top-40 left-1/4 w-32 h-1 bg-foreground/20" />
      <div className="absolute top-36 right-1/4 w-24 h-1 bg-foreground/20 transform -rotate-3" />

      <div className="z-10 w-full max-w-6xl relative">
        {/* Overlapping text layers - top section */}
        <div className="absolute -top-20 left-0 right-0">
          <div className="text-6xl md:text-8xl font-display font-black text-foreground/8 pointer-events-none select-none leading-none transform -rotate-3">
            UNFILTERED SEARCH
          </div>
        </div>

        {/* Main navigation/section text on left */}
        <div className="absolute -left-8 top-1/4 space-y-1 text-lg md:text-2xl font-display font-black text-foreground/60 leading-tight">
          <div className="pointer-events-none">NEXUS.COM</div>
          <div className="text-sm font-body font-bold tracking-wider pointer-events-none">—</div>
          <button
            onClick={() => router.push('/search')}
            className="hover:text-foreground transition-all cursor-pointer flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-foreground/10 hover:scale-105 transform duration-200"
          >
            <span className="w-2 h-2 bg-current rounded-full transition-transform group-hover:scale-125"></span>
            SEARCH
          </button>
          <button
            onClick={() => router.push('/discovery')}
            className="hover:text-foreground transition-all cursor-pointer flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-foreground/10 hover:scale-105 transform duration-200"
          >
            <span className="w-2 h-2 bg-current rounded-full transition-transform group-hover:scale-125"></span>
            DISCOVER
          </button>
          <button
            onClick={() => router.push('/recommendations/local')}
            className="hover:text-foreground transition-all cursor-pointer flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-foreground/10 hover:scale-105 transform duration-200"
          >
            <span className="w-2 h-2 bg-current rounded-full transition-transform group-hover:scale-125"></span>
            EXPLORE
          </button>
          <div className="text-xs font-mono font-bold pointer-events-none">COMING SOON</div>
        </div>

        {/* Center content */}
        <div className="text-center space-y-12 relative">
          {/* Large background text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <h1 className="text-[20vw] font-display font-black text-foreground/4 select-none leading-none tracking-tighter whitespace-nowrap">
              HATWAR
            </h1>
          </div>

          {/* Main title */}
          <h1 ref={titleRef} className="text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter relative z-10">
            NEXUS
          </h1>

          {/* Subtitle and secondary text */}
          <div className="space-y-4 relative z-10">
            <p className="text-xl md:text-2xl font-body font-bold text-foreground/70">
              A search engine that doesn't hide.
              <br />
              <span className="text-foreground font-black">Direct results. Zero compromise.</span>
            </p>
          </div>

          {/* Search box */}
          <div ref={searchRef} className="w-full max-w-2xl mx-auto relative group z-10">
            <div className="absolute -inset-1 border-4 border-foreground/20 bg-foreground/2" />

            <form onSubmit={handleSearch} className="relative flex items-center bg-background border-2 border-foreground p-2">
              <Search className="w-6 h-6 ml-4 text-foreground/60" />
              <Input
                name="search"
                defaultValue={defaultValue}
                className="border-none bg-transparent h-14 text-lg px-4 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-foreground/40 font-mono font-semibold"
                placeholder="What are you searching for?"
              />
              <div className="flex items-center gap-2 mr-2">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className={`text-foreground/60 hover:text-foreground transition-colors ${isListening ? 'text-red-500 hover:text-red-600 animate-pulse' : ''}`}
                  onClick={handleMicClick}
                  disabled={isListening}
                >
                  <Mic className="w-5 h-5" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className={`text-foreground/60 hover:text-foreground transition-colors ${isCameraActive ? 'text-blue-500 hover:text-blue-600' : ''}`}
                  onClick={handleCameraClick}
                  disabled={isCameraActive}
                >
                  <Camera className="w-5 h-5" />
                </Button>
                <Button type="submit" size="icon" className="bg-foreground hover:bg-foreground/80 text-background border-none">
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </form>
          </div>

          {/* Stats boxes */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-sm font-mono font-bold text-foreground/60 relative z-10">
            <div className="brutalist-box p-4">
              <div className="text-foreground font-black text-lg">12M+</div>
              <div>Searches Daily</div>
            </div>
            <div className="brutalist-box p-4">
              <div className="text-foreground font-black text-lg">99.9%</div>
              <div>Uptime</div>
            </div>
            <div className="brutalist-box p-4">
              <div className="text-foreground font-black text-lg">0ms</div>
              <div>Tracking</div>
            </div>
          </div>
        </div>

        {/* Right side text - large overlapping */}
        <div className="absolute -right-12 top-1/3 space-y-0 pointer-events-none">
          <div className="text-7xl md:text-9xl font-display font-black text-foreground/6 leading-none">
            TRUTH
          </div>
          <div className="text-6xl md:text-8xl font-display font-black text-foreground/8 -mt-4 leading-none">
            RESULTS
          </div>
        </div>

        {/* Bottom decorative lines */}
        <div className="absolute -bottom-32 left-0 right-0 space-y-2">
          <div className="h-1 bg-foreground/30 w-3/4 transform rotate-2" />
          <div className="h-1 bg-foreground/20 w-1/3 ml-auto transform -rotate-1" />
          <div className="h-1 bg-foreground/25 w-1/2" />
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-foreground/40 flex justify-center p-1">
          <div className="w-1 h-2 bg-foreground/60 animate-scroll" />
        </div>
      </div>
    </section>
  );
}
