"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Den Fehler an einen Fehlerberichterstattungsdienst protokollieren
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Etwas ist schief gelaufen!</h2>
      <button
        onClick={
          // Versuchen zu beheben, indem das Segment neu gerendert wird
          () => reset()
        }
      >
        Erneut versuchen
      </button>
    </div>
  );
}
