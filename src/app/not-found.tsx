'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home } from "lucide-react";
import { siteConfig } from '@/lib/site';

export default function NotFound() {
  return (
    <div className="container mx-auto flex h-full max-w-2xl flex-1 flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight">404</h1>
      <p className="mt-4 text-2xl text-muted-foreground">
        {siteConfig.notFound.title}
      </p>
      <p className="mt-2 text-muted-foreground">
        {siteConfig.notFound.description}
      </p>
      <Button asChild className="mt-8">
        <Link href="/">
          <Home className="mr-2" />
          {siteConfig.notFound.button}
        </Link>
      </Button>
    </div>
  );
}
