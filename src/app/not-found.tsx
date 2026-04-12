'use client';

import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto flex h-full max-w-2xl flex-1 flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight">404</h1>
      <p className="mt-4 text-2xl text-muted-foreground">
        Page Not Found
      </p>
      <p className="mt-2 text-muted-foreground">
        Sorry, we couldn't find the page you were looking for.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">
          <Home className="mr-2" />
          Go to Homepage
        </Link>
      </Button>
    </div>
  );
}
