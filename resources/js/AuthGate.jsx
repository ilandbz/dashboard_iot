import { useEffect, useState } from "react";

export default function AuthGate({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/auth/check", { credentials: "same-origin" });
        if (res.ok) {
          setReady(true);
        } else {
          window.location.href = "/login";
        }
      } catch {
        window.location.href = "/login";
      }
    })();
  }, []);

  if (!ready) return null; // evita parpadeo
  return children;
}
