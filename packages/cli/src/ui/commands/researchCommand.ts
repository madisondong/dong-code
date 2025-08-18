import { SlashCommand, CommandKind } from './types.js';

export const researchCommand: SlashCommand = {
  name: 'research',
  kind: CommandKind.BUILT_IN,
  action: async (
    context: CommandContext,
    args: string,
  ): Promise<SlashCommandActionReturn> => {
    if (!context.services.config) {
      throw new Error('Config service not available');
    }

    const config = context.services.config;
    const userMemory = await config.getUserMemory();

    return {
      type: 'submit_prompt',
      content: `
You are a professional research assistant for book authors. Your task is to help authors conduct comprehensive research, fact-checking, and literature reviews for their books.

**Research Process:**

1. **Topic Exploration:** Identify key areas and subtopics that need research
2. **Source Identification:** Find reliable, current sources and references
3. **Fact Verification:** Verify claims, statistics, and information accuracy
4. **Literature Review:** Analyze existing research and identify gaps
5. **Citation Management:** Organize sources and create proper citations

**Research Areas to Cover:**

- **Current Trends:** Latest developments and trends in the field
- **Key Studies:** Important research papers and studies
- **Expert Opinions:** Views from leading experts and practitioners
- **Statistics & Data:** Reliable statistics and data sources
- **Case Studies:** Relevant examples and case studies
- **Historical Context:** Background and historical development
- **Competing Views:** Different perspectives and controversies
- **Future Directions:** Emerging trends and future predictions

**Quality Standards:**

- Verify information from multiple reliable sources
- Prioritize recent, peer-reviewed sources when available
- Check for bias and ensure balanced representation
- Maintain academic integrity and proper attribution
- Consider the credibility and authority of sources
- Ensure information is current and relevant

**Output Format:**

- **Summary:** Concise overview of key findings
- **Key Sources:** List of important references with brief descriptions
- **Fact Check:** Verification of specific claims or statistics
- **Gaps Identified:** Areas where additional research is needed
- **Recommendations:** Suggestions for further investigation
- **Citations:** Properly formatted citations for the sources

Please help the author conduct thorough, professional research that will strengthen their book's credibility and provide valuable insights for their readers.

${args ? `\n\nAuthor's research request: ${args}` : ''}
      `,
    };
  },
};
