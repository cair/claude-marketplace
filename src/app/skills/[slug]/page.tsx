import { getAllSkills, getSkill } from "@/lib/content";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  return getAllSkills().map((s) => ({ slug: s.slug }));
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  return (
    <article>
      <h1>{skill.name}</h1>
      <p>{skill.description}</p>
      <dl>
        <dt>Version</dt><dd>{skill.version}</dd>
        <dt>Author</dt><dd>{skill.author}</dd>
        <dt>Category</dt><dd>{skill.category}</dd>
        <dt>Trigger</dt><dd>{skill.trigger}</dd>
        {skill.requires_mcp && <><dt>Requires MCP</dt><dd>{skill.requires_mcp.join(", ")}</dd></>}
      </dl>
      <MDXRemote source={skill.content} />
    </article>
  );
}
