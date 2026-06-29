#!/usr/bin/env node
// Validates all skill and workflow markdown files against their JSON schemas.

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const skillSchema = JSON.parse(fs.readFileSync(path.join(__dirname, "../schemas/skill.schema.json"), "utf8"));
const workflowSchema = JSON.parse(fs.readFileSync(path.join(__dirname, "../schemas/workflow.schema.json"), "utf8"));

const validateSkill = ajv.compile(skillSchema);
const validateWorkflow = ajv.compile(workflowSchema);

let errors = 0;

function validateDir(dir, validator, label) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    const mdPath = path.join(dir, entry, `${label}.md`);
    if (!fs.existsSync(mdPath)) continue;
    const { data } = matter(fs.readFileSync(mdPath, "utf8"));
    if (!validator(data)) {
      console.error(`\n✗ ${mdPath}`);
      for (const err of validator.errors) {
        console.error(`  ${err.instancePath} ${err.message}`);
      }
      errors++;
    } else {
      console.log(`✓ ${mdPath}`);
    }
  }
}

validateDir(path.join(__dirname, "../content/skills"), validateSkill, "skill");
validateDir(path.join(__dirname, "../content/workflows"), validateWorkflow, "workflow");

if (errors > 0) {
  console.error(`\n${errors} validation error(s) found.`);
  process.exit(1);
} else {
  console.log("\nAll content valid.");
}
