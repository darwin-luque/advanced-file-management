"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col space-y-1.5 p-6">
      <h2 className="text-2xl font-semibold leading-none tracking-tight">
        It seems something went wrong
      </h2>
      {error.message && (
        <p className="text-sm text-muted-foreground">
          {error.message}
        </p>
      )}
      {error.digest && (
        <p className="text-sm text-muted-foreground">
          Error ID: {error.digest}
        </p>
      )}
      <div className="flex items-center p-6 pt-0">
        <Button size="lg" onClick={reset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Try again
        </Button>
      </div>
    </div>
  );
}
