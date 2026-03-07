const fs = require("fs");
const path = require("path");

const src = process.env.GUTENBERG_RULE_FILE || path.join(__dirname, "gutenberg-rule.txt");
const out = path.join(__dirname, "../data/rules-benedict.md");

let raw = "";
try {
  raw = fs.readFileSync(src, "utf-8");
} catch (e) {
  console.error("Source file not found, using fallback. Run after fetching Gutenberg.", e.message);
  process.exit(1);
}

// Content starts after "*** START" and TABLE OF CONTENTS; first section is ## PROLOGUE
const startMarker = "## PROLOGUE";
const endMarker = "*** END OF THE PROJECT GUTENBERG";
const startIdx = raw.indexOf(startMarker);
const endIdx = raw.indexOf(endMarker);
if (startIdx === -1 || endIdx === -1) {
  console.error("Could not find PROLOGUE or END marker");
  process.exit(1);
}
const content = raw.slice(startIdx, endIdx).trim();

// Split by ## PROLOGUE or ## CHAPTER N
const parts = content.split(/\n(?=## (?:PROLOGUE|CHAPTER \d+))/);
const sections = [];
for (const part of parts) {
  const trimmed = part.trim();
  if (!trimmed) continue;
  const prologueMatch = trimmed.match(/^## PROLOGUE\s*\n([\s\S]*)/);
  const chapterMatch = trimmed.match(/^## CHAPTER (\d+) ([^\n]+)\n([\s\S]*)/);
  if (prologueMatch) {
    sections.push({ n: 0, title: "Prologue", body: prologueMatch[1].trim() });
  } else if (chapterMatch) {
    const num = parseInt(chapterMatch[1], 10);
    const title = chapterMatch[2].trim();
    sections.push({ n: num, title: `Chapter ${num}: ${title}`, body: chapterMatch[3].trim() });
  }
}

const frontMatter = `---
source: Benedict of Nursia
title: The Rule of Saint Benedict
translation: Leonard J. Doyle (Project Gutenberg #50040)
---

`;
const md = frontMatter + sections.map((s) => {
  if (s.n === 0) return `# Prologue\n\n${s.body}`;
  return `# ${s.title}\n\n${s.body}`;
}).join("\n\n");

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md, "utf-8");
const lastN = sections.length ? (sections[sections.length - 1].n) : 0;
console.log("Wrote", out, "with", sections.length, "sections (Prologue + Chapters 1-" + lastN + ")");
