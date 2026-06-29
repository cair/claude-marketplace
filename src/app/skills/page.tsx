import { getAllSkills } from "@/lib/content";

export default function SkillsPage() {
  const skills = getAllSkills();

  return (
    <div>
      <h1>Skills</h1>
      <ul>
        {skills.map((s) => (
          <li key={s.slug}>
            <a href={`/skills/${s.slug}`}>
              <strong>{s.name}</strong>
            </a>
            <span> v{s.version} by {s.author}</span>
            <p>{s.description}</p>
            <div>{s.tags?.map((t) => <span key={t}>{t}</span>)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
