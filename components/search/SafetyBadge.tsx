"use client";

import { Shield, ShieldAlert, ShieldCheck, ShieldX, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type SafetyStatus = 'safe' | 'warning' | 'danger' | 'unknown';

interface SafetyBadgeProps {
    status: SafetyStatus;
    score: number;
    threatTypes?: string[];
    isHttps?: boolean;
    className?: string;
    showLabel?: boolean;
}

export function SafetyBadge({
    status,
    score,
    threatTypes = [],
    isHttps = true,
    className,
    showLabel = true
}: SafetyBadgeProps) {
    const getStatusConfig = () => {
        switch (status) {
            case 'safe':
                return {
                    icon: ShieldCheck,
                    label: 'Safe',
                    color: 'text-green-500',
                    bg: 'bg-green-500/10',
                    border: 'border-green-500/30',
                    badge: 'bg-green-500/10 border-green-500/30 text-green-500',
                };
            case 'warning':
                return {
                    icon: ShieldAlert,
                    label: 'Suspicious',
                    color: 'text-yellow-500',
                    bg: 'bg-yellow-500/10',
                    border: 'border-yellow-500/30',
                    badge: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500',
                };
            case 'danger':
                return {
                    icon: ShieldX,
                    label: 'Dangerous',
                    color: 'text-red-500',
                    bg: 'bg-red-500/10',
                    border: 'border-red-500/30',
                    badge: 'bg-red-500/10 border-red-500/30 text-red-500',
                };
            default:
                return {
                    icon: Shield,
                    label: 'Unknown',
                    color: 'text-slate-400',
                    bg: 'bg-slate-500/10',
                    border: 'border-slate-500/30',
                    badge: 'bg-slate-500/10 border-slate-500/30 text-slate-400',
                };
        }
    };

    const config = getStatusConfig();
    const Icon = config.icon;

    return (
        <div className={cn("inline-flex items-center gap-1.5", className)}>
            <Badge
                variant="outline"
                className={cn(
                    "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all",
                    config.badge,
                    status === 'danger' && "animate-pulse"
                )}
            >
                <Icon className="h-3 w-3 mr-1" />
                {showLabel && config.label}
            </Badge>

            {isHttps && status === 'safe' && (
                <Lock className="h-3 w-3 text-green-500" />
            )}

            {!isHttps && (
                <Badge
                    variant="outline"
                    className="px-1.5 py-0.5 rounded-md text-[9px] bg-orange-500/10 border-orange-500/30 text-orange-500"
                    title="Not HTTPS"
                >
                    HTTP
                </Badge>
            )}
        </div>
    );
}

interface DetailedSafetyBadgeProps extends SafetyBadgeProps {
    showScore?: boolean;
    showThreats?: boolean;
}

export function DetailedSafetyBadge({
    status,
    score,
    threatTypes = [],
    isHttps = true,
    showScore = true,
    showThreats = true,
    className
}: DetailedSafetyBadgeProps) {
    const getStatusConfig = () => {
        switch (status) {
            case 'safe':
                return { color: 'text-green-500', label: 'Safe' };
            case 'warning':
                return { color: 'text-yellow-500', label: 'Suspicious' };
            case 'danger':
                return { color: 'text-red-500', label: 'Dangerous' };
            default:
                return { color: 'text-slate-400', label: 'Unknown' };
        }
    };

    const config = getStatusConfig();

    return (
        <div className={cn("flex flex-col gap-1 text-xs", className)}>
            <SafetyBadge
                status={status}
                score={score}
                threatTypes={threatTypes}
                isHttps={isHttps}
            />

            {showScore && (
                <div className="text-[10px] text-slate-500">
                    Safety Score: <span className={cn("font-bold", config.color)}>{score}/100</span>
                </div>
            )}

            {showThreats && threatTypes.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                    {threatTypes.map((threat, i) => (
                        <Badge
                            key={i}
                            variant="outline"
                            className="px-1.5 py-0 rounded text-[9px] bg-red-500/10 border-red-500/30 text-red-500"
                        >
                            {threat}
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
}
