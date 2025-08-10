"use client";

import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }: any) {
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded-md">
      <h2 className="font-bold text-lg">Something went wrong</h2>
      <p className="text-sm">{error.message}</p>
    </div>
  );
}

export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
    >
      {children}
    </ErrorBoundary>
  );
}
