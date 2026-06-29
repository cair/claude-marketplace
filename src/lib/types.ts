export type Category = "coding" | "research" | "writing" | "data" | "devops" | "agent" | "other";

export interface SkillMeta {
  name: string;
  description: string;
  version: string;
  author: string;
  category: Category;
  tags?: string[];
  trigger: string;
  models?: string[];
  requires_mcp?: string[];
  homepage?: string;
}

export interface WorkflowMeta {
  name: string;
  description: string;
  version: string;
  author: string;
  category: string;
  tags?: string[];
  skills_used?: string[];
  requires_mcp?: string[];
  homepage?: string;
}

export interface Skill extends SkillMeta {
  slug: string;
  content: string;
}

export interface Workflow extends WorkflowMeta {
  slug: string;
  content: string;
}
