# Dong Code - AI-Powered Science Book Creation Tool

<div align="center">

![Dong Code Screenshot](./docs/assets/dong-screenshot.png)


**AI-powered command-line tool for science book authors and developers**

[Installation](#installation) • [Quick Start](#quick-start) • [Science Book Creation](#science-book-creation) • [Features](#key-features) • [Documentation](./docs/)

</div>

Dong Code is a powerful command-line AI workflow tool specifically designed to help science book authors and developers create high-quality content. It provides intelligent assistance for research, writing, code generation, and content organization.

## 🚀 Installation

### Prerequisites

Ensure you have [Node.js version 20](https://nodejs.org/en/download) or higher installed.

```bash
# Check your Node.js version
node --version
```

### Install from GitHub Repository

```bash
# Clone the repository
git clone https://github.com/madisondong/dong-code.git
cd dong-code

# Install dependencies
npm install

# Install globally
npm install -g .
```

### Alternative: Install from npm (if available)

```bash
npm install -g @dong-code/dong-code@latest
dong --version
```

## 🎯 Science Book Creation Guide

Dong Code is specifically designed to help science book authors streamline their writing process. Here are comprehensive examples of how to use it for different aspects of science book creation:

### 📚 Research and Content Planning

```bash
# Start Dong Code
dong

# Research assistance
> Help me research the latest developments in quantum computing for my book chapter
> Find key papers and studies on climate change impacts from the last 5 years
> Create an outline for a chapter on machine learning fundamentals
> Suggest experiments and demonstrations for a physics textbook
```

### 🔬 Scientific Content Writing

```bash
# Technical writing assistance
> Write a clear explanation of photosynthesis for high school students
> Create a step-by-step guide for a chemistry experiment
> Help me explain complex mathematical concepts in simple terms
> Generate code examples for a programming textbook
```

### 📊 Data Analysis and Visualization

```bash
# Data processing for your book
> Analyze this dataset and create visualizations for my statistics chapter
> Generate Python code to demonstrate statistical concepts
> Create interactive examples for my data science book
> Help me write code to simulate scientific phenomena
```

### 🔍 Code Generation for Educational Examples

```bash
# Educational programming examples
> Create a Python script that demonstrates Newton's laws of motion
> Generate interactive examples for teaching algorithms
> Write code to visualize molecular structures
> Create simulation code for ecological systems
```

### 📝 Documentation and References

```bash
# Academic writing support
> Help me format citations in APA style
> Create a bibliography from my research notes
> Generate a glossary of scientific terms
> Help me write clear learning objectives for each chapter
```

## 🛠️ Quick Start

```bash
# Start Dong Code
dong

# Example commands for science book authors
> Help me outline a chapter on renewable energy
> Create a Python script to demonstrate data analysis concepts
> Write clear explanations of complex scientific theories
> Generate interactive examples for my textbook
```

### Session Management

Control your token usage with configurable session limits:

```bash
# Create settings file
mkdir -p ~/.dong
echo '{"sessionTokenLimit": 32000}' > ~/.dong/settings.json
```

**Session Commands:**
- `/compress` - Compress conversation history
- `/clear` - Clear conversation history
- `/status` - Check token usage

## 🔐 Authorization

### Option 1: Qwen OAuth (Recommended)

```bash
# Easy setup with browser authentication
qwen
```

**Benefits:**
- ✅ 2,000 requests/day free
- ✅ Automatic credential management
- ✅ No configuration required

### Option 2: API Key Setup

Create a `.env` file in your project:

```env
OPENAI_API_KEY=your_api_key_here
OPENAI_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
OPENAI_MODEL=qwen3-coder-plus
```

## 📖 Science Book Creation Examples

### 1. Research and Literature Review

```text
> I'm writing a chapter on artificial intelligence in healthcare. Help me:
> - Find recent breakthroughs in medical AI
> - Identify key researchers and institutions
> - Create a timeline of important developments
> - Suggest case studies to include
```

### 2. Technical Content Development

```text
> For my physics textbook, help me:
> - Write clear explanations of quantum mechanics concepts
> - Create step-by-step problem-solving examples
> - Generate code to simulate physical phenomena
> - Design hands-on experiments for students
```

### 3. Code Examples and Demonstrations

```text
> Create educational code examples for my computer science book:
> - Python scripts demonstrating algorithms
> - Interactive data visualization examples
> - Machine learning tutorials with real datasets
> - Web development projects for beginners
```

### 4. Assessment and Learning Materials

```text
> Help me create educational materials:
> - Multiple choice questions for each chapter
> - Programming exercises with solutions
> - Lab manual instructions
> - Study guides and review materials
```

## 🎨 Advanced Features for Authors

### Content Organization

```bash
# Project structure management
> Help me organize my book chapters and sections
> Create a content outline with learning objectives
> Generate a table of contents with proper hierarchy
> Plan the flow of concepts from basic to advanced
```

### Code Documentation

```bash
# Educational code documentation
> Add detailed comments to this code example
> Create step-by-step explanations for complex algorithms
> Generate user-friendly error messages
> Write installation and setup instructions
```

### Interactive Content

```bash
# Create engaging learning materials
> Design interactive quizzes for my online textbook
> Generate code that students can modify and experiment with
> Create visualizations that explain complex concepts
> Develop hands-on projects for practical learning
```

## 🔧 Development Workflow

### Code Generation

```bash
# Generate educational code
> Create a Python class for teaching object-oriented programming
> Write a simulation of the solar system for astronomy students
> Generate code to demonstrate statistical analysis
> Create interactive web applications for learning
```

### Testing and Validation

```bash
# Ensure code quality
> Write unit tests for my educational code examples
> Validate that my code examples work correctly
> Check for potential errors in my demonstrations
> Ensure my code follows best practices for teaching
```

## 📋 Popular Commands for Science Authors

### Content Creation
```text
> Write an introduction to [scientific topic] for [audience level]
> Create a hands-on experiment for teaching [concept]
> Generate code examples demonstrating [scientific principle]
> Design a lesson plan for [topic] with learning objectives
```

### Research and Analysis
```text
> Summarize recent research on [topic] for my book
> Find key papers and studies related to [subject]
> Create a literature review outline for [field]
> Identify gaps in current understanding of [phenomenon]
```

### Educational Design
```text
> Design assessment questions for [learning objective]
> Create a progression of concepts from basic to advanced
> Generate real-world applications of [theory]
> Develop interactive exercises for [skill development]
```

## 🚀 Getting Started with Your Science Book

1. **Install Dong Code** using the installation instructions above
2. **Set up authentication** with Qwen OAuth or API keys
3. **Start with research** - use Dong Code to explore your topic
4. **Create outlines** - get help organizing your content structure
5. **Write content** - use AI assistance for clear explanations
6. **Generate examples** - create code and demonstrations
7. **Review and refine** - use Dong Code for editing and improvement



## 📄 License

[LICENSE](./LICENSE)

---

**Happy writing!** Dong Code is here to help you create amazing science books that inspire and educate the next generation of scientists and engineers.
