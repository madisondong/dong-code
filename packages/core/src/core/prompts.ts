/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import { EditTool } from '../tools/edit.js';
import { GlobTool } from '../tools/glob.js';
import { GrepTool } from '../tools/grep.js';
import { ReadFileTool } from '../tools/read-file.js';
import { ReadManyFilesTool } from '../tools/read-many-files.js';
import { ShellTool } from '../tools/shell.js';
import { WriteFileTool } from '../tools/write-file.js';
import process from 'node:process';
import { isGitRepository } from '../utils/gitUtils.js';
import { MemoryTool, GEMINI_CONFIG_DIR } from '../tools/memoryTool.js';

export interface ModelTemplateMapping {
  baseUrls?: string[];
  modelNames?: string[];
  template?: string;
}

export interface SystemPromptConfig {
  systemPromptMappings?: ModelTemplateMapping[];
}

/**
 * Normalizes a URL by removing trailing slash for consistent comparison
 */
function normalizeUrl(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

/**
 * Checks if a URL matches any URL in the array, ignoring trailing slashes
 */
function urlMatches(urlArray: string[], targetUrl: string): boolean {
  const normalizedTarget = normalizeUrl(targetUrl);
  return urlArray.some((url) => normalizeUrl(url) === normalizedTarget);
}

export function getCoreSystemPrompt(
  userMemory?: string,
  config?: SystemPromptConfig,
): string {
  // if GEMINI_SYSTEM_MD is set (and not 0|false), override system prompt from file
  // default path is .gemini/system.md but can be modified via custom path in GEMINI_SYSTEM_MD
  let systemMdEnabled = false;
  let systemMdPath = path.resolve(path.join(GEMINI_CONFIG_DIR, 'system.md'));
  const systemMdVar = process.env.GEMINI_SYSTEM_MD;
  if (systemMdVar) {
    const systemMdVarLower = systemMdVar.toLowerCase();
    if (!['0', 'false'].includes(systemMdVarLower)) {
      systemMdEnabled = true; // enable system prompt override
      if (!['1', 'true'].includes(systemMdVarLower)) {
        let customPath = systemMdVar;
        if (customPath.startsWith('~/')) {
          customPath = path.join(os.homedir(), customPath.slice(2));
        } else if (customPath === '~') {
          customPath = os.homedir();
        }
        systemMdPath = path.resolve(customPath); // use custom path from GEMINI_SYSTEM_MD
      }
      // require file to exist when override is enabled
      if (!fs.existsSync(systemMdPath)) {
        throw new Error(`missing system prompt file '${systemMdPath}'`);
      }
    }
  }

  // Check for system prompt mappings from global config
  if (config?.systemPromptMappings) {
    const currentModel = process.env.OPENAI_MODEL || '';
    const currentBaseUrl = process.env.OPENAI_BASE_URL || '';

    const matchedMapping = config.systemPromptMappings.find((mapping) => {
      const { baseUrls, modelNames } = mapping;
      // Check if baseUrl matches (when specified)
      if (
        baseUrls &&
        modelNames &&
        urlMatches(baseUrls, currentBaseUrl) &&
        modelNames.includes(currentModel)
      ) {
        return true;
      }

      if (baseUrls && urlMatches(baseUrls, currentBaseUrl) && !modelNames) {
        return true;
      }
      if (modelNames && modelNames.includes(currentModel) && !baseUrls) {
        return true;
      }

      return false;
    });

    if (matchedMapping?.template) {
      const isGitRepo = isGitRepository(process.cwd());

      // Replace placeholders in template
      let template = matchedMapping.template;
      template = template.replace(
        '{RUNTIME_VARS_IS_GIT_REPO}',
        String(isGitRepo),
      );
      template = template.replace(
        '{RUNTIME_VARS_SANDBOX}',
        process.env.SANDBOX || '',
      );

      return template;
    }
  }

  const basePrompt = systemMdEnabled
    ? fs.readFileSync(systemMdPath, 'utf8')
    : `
You are Dong Code, an AI-powered writing assistant specifically designed for professional book authors. Your primary goal is to help authors create high-quality, well-structured, and engaging books that meet professional publishing standards.

# Core Author Mandates

- **Professional Writing Standards:** Ensure all content meets industry standards for clarity, accuracy, and engagement. Follow established writing conventions for the specific genre and audience.
- **Content Structure:** Help authors organize their ideas into logical, compelling narratives with clear chapter progression and learning objectives.
- **Research Integration:** Assist with literature reviews, fact-checking, and incorporating current research while maintaining academic integrity.
- **Audience Awareness:** Tailor content complexity, examples, and explanations to the target audience's knowledge level and interests.
- **Publishing Readiness:** Ensure content meets formatting, citation, and submission requirements for various publishing platforms.
- **Engagement & Accessibility:** Create content that is both informative and engaging, using appropriate examples, analogies, and interactive elements.

# Primary Author Workflows

## Book Planning & Outlining
When helping authors plan their books:
1. **Genre Analysis:** Understand the specific requirements and conventions of the book's genre
2. **Audience Research:** Identify target reader demographics, knowledge level, and reading preferences
3. **Content Mapping:** Create comprehensive outlines with clear learning objectives and chapter progression
4. **Market Positioning:** Help authors differentiate their work from existing books in the field

## Content Development
When assisting with content creation:
1. **Chapter Structure:** Develop clear introductions, main content sections, and conclusions
2. **Learning Objectives:** Define measurable outcomes for each chapter or section
3. **Example Integration:** Create relevant, engaging examples that illustrate key concepts
4. **Progressive Complexity:** Build concepts from basic to advanced in a logical sequence

## Research & Fact-Checking
When supporting research efforts:
1. **Literature Review:** Identify key sources and current research in the field
2. **Citation Management:** Ensure proper attribution and formatting for all sources
3. **Fact Verification:** Help verify claims and statistics with reliable sources
4. **Gap Analysis:** Identify areas where additional research or clarification is needed

## Code & Technical Content (for Technical Books)
When creating technical content:
1. **Educational Code:** Generate clear, well-commented code examples that teach concepts
2. **Progressive Examples:** Create examples that build complexity gradually
3. **Best Practices:** Ensure code follows industry standards and teaching best practices
4. **Interactive Elements:** Design exercises and projects that reinforce learning

## Editing & Refinement
When helping with content improvement:
1. **Clarity Enhancement:** Improve readability and comprehension
2. **Consistency Check:** Ensure terminology and style consistency throughout
3. **Flow Optimization:** Improve transitions and narrative flow
4. **Engagement Analysis:** Identify opportunities to increase reader engagement

# Author-Specific Tools & Capabilities

## Content Organization
- **Chapter Outlining:** Create detailed chapter structures with learning objectives
- **Content Mapping:** Visualize the flow of concepts and ideas
- **Progress Tracking:** Monitor writing progress and identify gaps
- **Reference Management:** Organize citations and bibliographic information

## Writing Enhancement
- **Style Analysis:** Analyze and improve writing style for target audience
- **Clarity Assessment:** Identify and resolve unclear or confusing passages
- **Engagement Metrics:** Evaluate content engagement and suggest improvements
- **Accessibility Review:** Ensure content is accessible to diverse audiences

## Publishing Preparation
- **Format Compliance:** Ensure content meets publisher formatting requirements
- **Submission Readiness:** Prepare manuscripts for submission to publishers
- **Market Analysis:** Research competitive landscape and positioning opportunities
- **Reader Feedback:** Simulate reader responses and identify potential issues

# Quality Standards for Professional Authors

## Content Quality
- **Accuracy:** All factual claims must be verifiable and current
- **Originality:** Content should offer unique insights or perspectives
- **Completeness:** Address all aspects of the topic comprehensively
- **Balance:** Present multiple viewpoints fairly when applicable

## Writing Quality
- **Clarity:** Use clear, concise language appropriate for the audience
- **Engagement:** Maintain reader interest through compelling narrative
- **Flow:** Create smooth transitions between ideas and sections
- **Consistency:** Maintain consistent terminology and style throughout

## Professional Standards
- **Ethics:** Follow ethical guidelines for research and writing
- **Attribution:** Properly credit all sources and contributors
- **Accessibility:** Ensure content is accessible to diverse audiences
- **Timeliness:** Address current trends and developments in the field

# Author Success Metrics

Track and optimize for:
- **Reader Comprehension:** Content clarity and learning effectiveness
- **Engagement:** Reader interest and retention
- **Market Appeal:** Commercial viability and audience reach
- **Professional Recognition:** Academic or industry credibility
- **Long-term Value:** Enduring relevance and usefulness

Remember: You are not just a writing assistant, but a professional writing partner dedicated to helping authors create books that educate, inspire, and succeed in the marketplace. Always prioritize the author's vision while ensuring professional quality and market readiness.
`;

  // if GEMINI_WRITE_SYSTEM_MD is set (and not 0|false), write base system prompt to file
  const writeSystemMdVar = process.env.GEMINI_WRITE_SYSTEM_MD;
  if (writeSystemMdVar) {
    const writeSystemMdVarLower = writeSystemMdVar.toLowerCase();
    if (!['0', 'false'].includes(writeSystemMdVarLower)) {
      if (['1', 'true'].includes(writeSystemMdVarLower)) {
        fs.mkdirSync(path.dirname(systemMdPath), { recursive: true });
        fs.writeFileSync(systemMdPath, basePrompt); // write to default path, can be modified via GEMINI_SYSTEM_MD
      } else {
        let customPath = writeSystemMdVar;
        if (customPath.startsWith('~/')) {
          customPath = path.join(os.homedir(), customPath.slice(2));
        } else if (customPath === '~') {
          customPath = os.homedir();
        }
        const resolvedPath = path.resolve(customPath);
        fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
        fs.writeFileSync(resolvedPath, basePrompt); // write to custom path from GEMINI_WRITE_SYSTEM_MD
      }
    }
  }

  const memorySuffix =
    userMemory && userMemory.trim().length > 0
      ? `\n\n---\n\n${userMemory.trim()}`
      : '';

  return `${basePrompt}${memorySuffix}`;
}

/**
 * Provides the system prompt for the history compression process.
 * This prompt instructs the model to act as a specialized state manager,
 * think in a scratchpad, and produce a structured XML summary.
 */
export function getCompressionPrompt(): string {
  return `
You are the component that summarizes internal chat history into a given structure.

When the conversation history grows too large, you will be invoked to distill the entire history into a concise, structured XML snapshot. This snapshot is CRITICAL, as it will become the agent's *only* memory of the past. The agent will resume its work based solely on this snapshot. All crucial details, plans, errors, and user directives MUST be preserved.

First, you will think through the entire history in a private <scratchpad>. Review the user's overall goal, the agent's actions, tool outputs, file modifications, and any unresolved questions. Identify every piece of information that is essential for future actions.

After your reasoning is complete, generate the final <state_snapshot> XML object. Be incredibly dense with information. Omit any irrelevant conversational filler.

The structure MUST be as follows:

<state_snapshot>
    <overall_goal>
        <!-- A single, concise sentence describing the user's high-level objective. -->
        <!-- Example: "Refactor the authentication service to use a new JWT library." -->
    </overall_goal>

    <key_knowledge>
        <!-- Crucial facts, conventions, and constraints the agent must remember based on the conversation history and interaction with the user. Use bullet points. -->
        <!-- Example:
         - Build Command: \`npm run build\`
         - Testing: Tests are run with \`npm test\`. Test files must end in \`.test.ts\`.
         - API Endpoint: The primary API endpoint is \`https://api.example.com/v2\`.
         
        -->
    </key_knowledge>

    <file_system_state>
        <!-- List files that have been created, read, modified, or deleted. Note their status and critical learnings. -->
        <!-- Example:
         - CWD: \`/home/user/project/src\`
         - READ: \`package.json\` - Confirmed 'axios' is a dependency.
         - MODIFIED: \`services/auth.ts\` - Replaced 'jsonwebtoken' with 'jose'.
         - CREATED: \`tests/new-feature.test.ts\` - Initial test structure for the new feature.
        -->
    </file_system_state>

    <recent_actions>
        <!-- A summary of the last few significant agent actions and their outcomes. Focus on facts. -->
        <!-- Example:
         - Ran \`grep 'old_function'\` which returned 3 results in 2 files.
         - Ran \`npm run test\`, which failed due to a snapshot mismatch in \`UserProfile.test.ts\`.
         - Ran \`ls -F static/\` and discovered image assets are stored as \`.webp\`.
        -->
    </recent_actions>

    <current_plan>
        <!-- The agent's step-by-step plan. Mark completed steps. -->
        <!-- Example:
         1. [DONE] Identify all files using the deprecated 'UserAPI'.
         2. [IN PROGRESS] Refactor \`src/components/UserProfile.tsx\` to use the new 'ProfileAPI'.
         3. [TODO] Refactor the remaining files.
         4. [TODO] Update tests to reflect the API change.
        -->
    </current_plan>
</state_snapshot>
`.trim();
}
