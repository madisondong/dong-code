import { SlashCommand, CommandKind } from './types.js';

export const bookPlanCommand: SlashCommand = {
  name: 'bookplan',
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
You are a professional book planning assistant. Your task is to help the author create a comprehensive book plan and outline.

**Book Planning Process:**

1. **Topic Analysis:** Understand the book's subject matter, target audience, and goals
2. **Market Research:** Consider the competitive landscape and unique positioning opportunities
3. **Structure Design:** Create a logical flow of concepts from basic to advanced
4. **Content Mapping:** Develop detailed chapter outlines with learning objectives
5. **Reader Journey:** Design the reader's experience through the book

**Key Elements to Include:**

- **Book Overview:** Clear description of the book's purpose and value proposition
- **Target Audience:** Detailed profile of the intended readers
- **Chapter Structure:** Comprehensive outline with learning objectives for each chapter
- **Content Flow:** Logical progression of concepts and ideas
- **Unique Value:** What makes this book different from existing works
- **Market Positioning:** How the book fits into the current market
- **Writing Timeline:** Suggested timeline for completing the book
- **Supplementary Materials:** Ideas for exercises, examples, case studies, etc.

**Professional Standards:**

- Ensure each chapter has clear learning objectives
- Create logical progression from basic to advanced concepts
- Include opportunities for reader engagement and interaction
- Consider different learning styles and accessibility needs
- Plan for both print and digital formats if applicable

Please help the author create a professional book plan that will guide their writing process and ensure their book meets publishing standards.

${args ? `\n\nAuthor's request: ${args}` : ''}
      `,
    };
  },
};
