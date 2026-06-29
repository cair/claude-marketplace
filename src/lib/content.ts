import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Skill, Workflow } from "./types";

const contentDir = path.join(process.cwd(), "content");

function readEntries<T extends { slug: string; content: string }>(
  subdir: string,
  filename: string
): T[] {
  const dir = path.join(contentDir, subdir);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .map((slug) => {
      const filePath = path.join(dir, slug, filename);
      if (!fs.existsSync(filePath)) return null;
      const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
      return { ...data, slug, content } as T;
    })
    .filter(Boolean) as T[];
}

export function getAllSkills(): Skill[] {
  return readEntries<Skill>("skills", "skill.md");
}

export function getSkill(slug: string): Skill | null {
  const skills = getAllSkills();
  return skills.find((s) => s.slug === slug) ?? null;
}

export function getAllWorkflows(): Workflow[] {
  return readEntries<Workflow>("workflows", "workflow.md");
}

export function getWorkflow(slug: string): Workflow | null {
  const workflows = getAllWorkflows();
  return workflows.find((w) => w.slug === slug) ?? null;
}
