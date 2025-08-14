"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function DemoGatePage() {
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get("redirect");
    setRedirectTo(to || "/");
  }, []);

  const handleContinue = () => {
    // Set a short-lived cookie to acknowledge demo mode
    document.cookie = `nf_demo_ack=1; path=/; max-age=31536000`; // 1 year
    window.location.href = redirectTo || "/";
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-xl w-full rounded-xl p-8 border" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent)' }}>
            <span className="text-white font-bold">N</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">NewsFlow Demo</h1>
        </div>
        <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
          This is a demo build. The backend is still in development and all data shown here is
          sample/fake data for demonstration purposes only.
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-8" style={{ color: 'var(--text-secondary)' }}>
          <li>No accounts are created and authentication is simulated.</li>
          <li>Search, following, and AI chat use dummy data and mocked responses.</li>
          <li>Some images and links may be placeholders.</li>
        </ul>
        <div className="flex items-center gap-3">
          <Button variant="primary" onClick={handleContinue} className="flex-1">
            Continue to demo
          </Button>
          <Link href="https://github.com/chaitanya-699/newsflow_frontend" target="_blank" className="text-sm underline" style={{ color: 'var(--accent)' }}>
            Learn more
          </Link>
        </div>
      </div>
    </main>
  );
}


