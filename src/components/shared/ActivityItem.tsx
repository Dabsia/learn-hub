import React from "react";
import { BookOpen, CheckCircle2, PlayCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import { formatDistanceToNow } from "date-fns";

const iconMap = {
  enrolled: BookOpen,
  completed: CheckCircle2,
  lesson: PlayCircle,
};

const colorMap = {
  enrolled: "bg-primary/10 text-primary",
  completed: "bg-green-100 text-green-600",
  lesson: "bg-amber-100 text-amber-600",
};

export default function ActivityItem({ type, title, subtitle, date }) {
  const Icon = iconMap[type] || BookOpen;
  const color = colorMap[type] || colorMap.enrolled;

  return (
    <div className="flex items-start gap-3 py-3">
      <div className={cn("p-2 rounded-xl flex-shrink-0", color)}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {date && (
        <span className="text-xs text-muted-foreground flex-shrink-0">
          {formatDistanceToNow(new Date(date), { addSuffix: true })}
        </span>
      )}
    </div>
  );
}
