import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claude Marketplace — CAIR",
  description: "Community marketplace for Claude Code skills and agentic workflows, curated by CAIR.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <a href="/">Claude Marketplace</a>
            <div>
              <a href="/skills">Skills</a>
              <a href="/workflows">Workflows</a>
              <a href="https://github.com/cair/claude-marketplace" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
