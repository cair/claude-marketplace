import { getAllWorkflows } from "@/lib/content";

export default function WorkflowsPage() {
  const workflows = getAllWorkflows();

  return (
    <div>
      <h1>Workflows</h1>
      <ul>
        {workflows.map((w) => (
          <li key={w.slug}>
            <a href={`/workflows/${w.slug}`}>
              <strong>{w.name}</strong>
            </a>
            <span> v{w.version} by {w.author}</span>
            <p>{w.description}</p>
            {w.skills_used && <p>Uses: {w.skills_used.join(", ")}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
