"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, ShieldX, ExternalLink, ArrowLeft, Flag } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SafetyBadge } from "./SafetyBadge";

interface SafetyWarningModalProps {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    safetyStatus: 'safe' | 'warning' | 'danger' | 'unknown';
    safetyScore: number;
    threatTypes: string[];
    onProceed: () => void;
    onReport?: () => void;
}

export function SafetyWarningModal({
    isOpen,
    onClose,
    url,
    safetyStatus,
    safetyScore,
    threatTypes = [],
    onProceed,
    onReport,
}: SafetyWarningModalProps) {
    const [countdown, setCountdown] = useState(3);
    const [canProceed, setCanProceed] = useState(false);

    useEffect(() => {
        if (isOpen && safetyStatus === 'danger') {
            setCountdown(3);
            setCanProceed(false);

            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        setCanProceed(true);
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        } else {
            setCanProceed(true);
        }
    }, [isOpen, safetyStatus]);

    const getDangerLevel = () => {
        if (safetyStatus === 'danger') {
            return {
                title: 'Dangerous Website Detected',
                icon: ShieldX,
                color: 'text-red-500',
                bg: 'bg-red-500/10',
                description: 'This website has been flagged as potentially malicious. Proceeding may put your personal information and device at risk.',
            };
        } else if (safetyStatus === 'warning') {
            return {
                title: 'Suspicious Website',
                icon: AlertTriangle,
                color: 'text-yellow-500',
                bg: 'bg-yellow-500/10',
                description: 'This website shows signs of suspicious activity. Exercise caution if you choose to proceed.',
            };
        }
        return {
            title: 'Unknown Website',
            icon: AlertTriangle,
            color: 'text-slate-500',
            bg: 'bg-slate-500/10',
            description: 'We couldn\'t verify the safety of this website. Proceed with caution.',
        };
    };

    const danger = getDangerLevel();
    const Icon = danger.icon;

    try {
        var urlObj = new URL(url);
        var displayUrl = urlObj.hostname;
    } catch {
        var displayUrl = url;
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={`max-w-2xl ${safetyStatus === 'danger' ? 'border-red-500/50' : 'border-yellow-500/50'}`}>
                <DialogHeader>
                    <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${danger.bg} ${safetyStatus === 'danger' ? 'animate-pulse' : ''}`}>
                            <Icon className={`h-8 w-8 ${danger.color}`} />
                        </div>
                        <div className="flex-1">
                            <DialogTitle className="text-2xl font-bold mb-2">
                                {danger.title}
                            </DialogTitle>
                            <DialogDescription className="text-base leading-relaxed">
                                {danger.description}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* URL Display */}
                    <div className="glass-panel rounded-xl p-4 border border-white/10">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                            Target URL
                        </div>
                        <div className="font-mono text-sm break-all text-foreground/80">
                            {url}
                        </div>
                    </div>

                    {/* Safety Information */}
                    <div className="glass-panel rounded-xl p-4 border border-white/10">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                            Safety Analysis
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">Safety Status</span>
                                <SafetyBadge
                                    status={safetyStatus}
                                    score={safetyScore}
                                    threatTypes={threatTypes}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-500">Safety Score</span>
                                <span className={`text-lg font-bold ${danger.color}`}>
                                    {safetyScore}/100
                                </span>
                            </div>

                            {threatTypes.length > 0 && (
                                <div>
                                    <span className="text-sm text-slate-500 block mb-2">Detected Threats</span>
                                    <div className="flex flex-wrap gap-2">
                                        {threatTypes.map((threat, i) => (
                                            <Badge
                                                key={i}
                                                variant="outline"
                                                className="bg-red-500/10 border-red-500/30 text-red-500 text-xs"
                                            >
                                                {threat}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Warning Tips */}
                    <div className={`rounded-xl p-4 ${danger.bg} border ${safetyStatus === 'danger' ? 'border-red-500/30' : 'border-yellow-500/30'}`}>
                        <div className="text-xs font-bold uppercase tracking-wider mb-2 ${danger.color}">
                            ⚠️ Safety Tips
                        </div>
                        <ul className="text-sm space-y-1 text-foreground/70">
                            <li>• Do not enter passwords or personal information</li>
                            <li>• Do not download files from this site</li>
                            <li>• Verify the URL carefully for typos or suspicious characters</li>
                            <li>• Consider using a different, verified source</li>
                        </ul>
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Go Back to Safety
                    </Button>

                    {onReport && (
                        <Button
                            variant="ghost"
                            onClick={onReport}
                            className="flex items-center gap-2"
                        >
                            <Flag className="h-4 w-4" />
                            Report Issue
                        </Button>
                    )}

                    <Button
                        variant={safetyStatus === 'danger' ? 'destructive' : 'default'}
                        onClick={() => {
                            onProceed();
                            onClose();
                        }}
                        disabled={!canProceed}
                        className="flex items-center gap-2"
                    >
                        <ExternalLink className="h-4 w-4" />
                        {!canProceed && safetyStatus === 'danger'
                            ? `Wait ${countdown}s to Proceed`
                            : 'Proceed Anyway (Not Recommended)'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
