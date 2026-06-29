import { getAllSkills, getAllWorkflows } from "@/lib/content";

export default function HomePage() {
  const skills = getAllSkills();
  const workflows = getAllWorkflows();

  return (
    <div>
      <h1>Claude Marketplace</h1>
      <p>Community skills and workflows for Claude Code, curated by CAIR.</p>

      <section>
        <h2>Skills ({skills.length})</h2>
        <ul>
          {skills.map((s) => (
            <li key={s.slug}>
              <a href={`/skills/${s.slug}`}>{s.name}</a> — {s.description}
            </li>
          ))}
        </ul>
        <a href="/skills">Browse all skills →</a>
      </section>

      <section>
        <h2>Workflows ({workflows.length})</h2>
        <ul>
          {workflows.map((w) => (
            <li key={w.slug}>
              <a href={`/workflows/${w.slug}`}>{w.name}</a> — {w.description}
            </li>
          ))}
        </ul>
        <a href="/workflows">Browse all workflows →</a>
      </section>
    </div>
  );
}
