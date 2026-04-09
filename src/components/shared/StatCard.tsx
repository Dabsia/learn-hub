import React from "react";
import { cn } from "../../lib/utils";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor,
}) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={cn("p-3 rounded-xl", iconColor || "bg-primary/10")}>
            <Icon
              className={cn(
                "w-5 h-5",
                iconColor ? "text-current" : "text-primary"
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
