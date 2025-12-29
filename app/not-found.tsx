import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-display text-6xl md:text-8xl font-bold gradient-text mb-6">
          404
        </h1>
        <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button variant="hero" size="lg" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
