'use client';

// Error code from the auth passed in query string as ?error=

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      Error happend:
      <span>{error.message}</span>
    </div>
  );
}
