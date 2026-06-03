import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const navigate = useNavigate({ from: "/" });

  useEffect(() => {
    const now = Temporal.Now.plainTimeISO();
    if (now.hour < 19) {
      void navigate({ to: "/workout" });
    } else {
      void navigate({ to: "/plan" });
    }
  }, [navigate]);

  return <div>Index Page</div>;
}
