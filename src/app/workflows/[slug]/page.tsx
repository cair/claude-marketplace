import { getAllWorkflows, getWorkflow } from "@/lib/content";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  return getAllWorkflows().map((w) => ({ slug: w.slug }));
}

export default async function WorkflowPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const workflow = getWorkflow(slug);
  if (!workflow) notFound();

  return (
    <article>
      <h1>{workflow.name}</h1>
      <p>{workflow.description}</p>
      <dl>
        <dt>Version</dt><dd>{workflow.version}</dd>
        <dt>Author</dt><dd>{workflow.author}</dd>
        <dt>Category</dt><dd>{workflow.category}</dd>
        {workflow.skills_used && <><dt>Skills used</dt><dd>{workflow.skills_used.join(", ")}</dd></>}
        {workflow.requires_mcp && <><dt>Requires MCP</dt><dd>{workflow.requires_mcp.join(", ")}</dd></>}
      </dl>
      <MDXRemote source={workflow.content} />
    </article>
  );
}
