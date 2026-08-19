import { Calendar, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function EventMeta({
  event,
  className,
  compact = false,
}: {
  event: {
    date?: string;
    time?: string;
    location?: string;
  };
  className?: string;
  compact?: boolean;
}) {
  return (
    <dl
      className={cn(
        "flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[0.75rem] uppercase tracking-wider text-ink-faint",
        className,
      )}
    >
      {event.date && (
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Date</dt>
          <Calendar className="h-3.5 w-3.5 text-ink-faint" aria-hidden />
          <dd>{event.date}</dd>
        </div>
      )}
      {!compact && event.time && (
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Time</dt>
          <Clock className="h-3.5 w-3.5 text-ink-faint" aria-hidden />
          <dd>{event.time}</dd>
        </div>
      )}
      {!compact && event.location && (
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Location</dt>
          <MapPin className="h-3.5 w-3.5 text-ink-faint" aria-hidden />
          <dd className="normal-case tracking-normal">{event.location}</dd>
        </div>
      )}
    </dl>
  );
}