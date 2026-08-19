import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArrowLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = cn(
    "group inline-flex items-center gap-2 text-sm font-medium text-blue transition-colors duration-300 hover:text-blue-bright",
    className,
  );
  const arrow = (
    <ArrowRight
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
      aria-hidden
    />
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
      {arrow}
    </Link>
  );
}