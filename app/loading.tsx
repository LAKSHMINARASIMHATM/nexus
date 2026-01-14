export default function Loading() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="space-y-4 text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-foreground/20 border-t-foreground" />
                <p className="font-mono text-sm tracking-widest text-foreground/60 animate-pulse">
                    INITIALIZING NEXUS...
                </p>
            </div>
        </div>
    );
}
