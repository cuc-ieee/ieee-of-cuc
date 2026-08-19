import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        size === "default" && "max-w-[76rem]",
        size === "narrow" && "max-w-3xl",
        size === "wide" && "max-w-[86rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}