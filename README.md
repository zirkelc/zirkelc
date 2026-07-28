<p align="center">
  <samp>
    <a href="https://zirkelc.dev">blog</a> /
    <a href="https://twitter.com/zirkelc_">twitter</a> /
    <a href="https://dev.to/zirkelc">dev.to</a> /
    <a href="https://www.linkedin.com/in/christian-zirkel/">linkedin</a>
  </samp>
</p>

### Hi there 👋

I'm Chris, a software engineer at heart and co-founder of [flyweight.io](https://flyweight.io). 

Projects are grouped by topic, tagged by type: `npm` `chrome` `vscode` `plugin` `action` `cli` `web`

### Featured

Start here. The ones people use most and I work on most.

- **[AI Retry](https://github.com/zirkelc/ai-retry)** `npm`: Intelligent retry and fallback mechanisms for AI SDK models
- **[AWS Signature V4](https://github.com/zirkelc/aws-signature-v4)** `npm`: Sign HTTP requests with AWS Signature Version 4 (SigV4)
- **[Chunkdown](https://github.com/zirkelc/chunkdown)** `npm`: A tree-based markdown text splitter for RAG applications

### AI

Building blocks for apps that talk to LLMs, most of them built around the [AI SDK](https://ai-sdk.dev).

- [AI Retry](https://github.com/zirkelc/ai-retry) `npm`: Intelligent retry and fallback mechanisms for AI SDK models
- [AI Tool Set](https://github.com/zirkelc/ai-tool-set) `npm`: Manage tool activations with type-safe, chainable tool sets
- [AI Test Kit](https://github.com/zirkelc/ai-test-kit) `npm`: Mock models, content builders and stream helpers for testing AI SDK apps
- [AI Resumable Stream](https://github.com/zirkelc/ai-resumable-stream) `npm`: Resume and stop UI message streams
- [AI Stream Utils](https://github.com/zirkelc/ai-stream-utils) `npm`: Filter and transform UI messages while streaming to the client
- [AI Assert Schema](https://github.com/zirkelc/ai-assert-schema) `npm`: Assert schemas (Zod, ArkType, JSON schema) for compatibility against your AI models
- [Chunkdown](https://github.com/zirkelc/chunkdown) `npm`: A tree-based markdown text splitter that understands document structure to create semantically meaningful chunks for RAG applications
- [Chunk Visualizer](https://github.com/zirkelc/chunk-visualizer) `web`: A web-based playground to visualize and compare chunks from different text splitting libraries

### AWS

Pieces I kept rewriting across years of serverless projects, packaged up.

- [AWS Signature V4](https://github.com/zirkelc/aws-signature-v4) `npm`: Sign HTTP requests with AWS Signature Version 4 (SigV4), via [aws-sigv4-fetch](https://github.com/zirkelc/aws-signature-v4/tree/main/packages/aws-sigv4-fetch) and [aws-sigv4-sign](https://github.com/zirkelc/aws-signature-v4/tree/main/packages/aws-sigv4-sign)
- [Amazon S3 URL](https://github.com/zirkelc/amazon-s3-url) `npm`: A simple formatter and parser for the various Amazon S3 URL formats
- [Middy Store](https://github.com/zirkelc/middy-store) `npm`: Middleware for AWS Step Functions that automatically stores and retrieves payloads exceeding the 256KB maximum input or output size
- [S3 Downloader](https://github.com/zirkelc/vscode-s3-extension) `vscode`: Quick commands to download and open S3 URIs directly in VSCode
- [Serverless Exports Plugin](https://github.com/zirkelc/serverless-exports-plugin) `plugin`: Exports environment variables and stack outputs from your Serverless project to a local file
- [Serverless CloudWatch Logs Insights Plugin](https://github.com/zirkelc/serverless-cloudwatch-logs-insights) `plugin`: Automatically creates CloudWatch Logs Insights queries for all Lambda functions in your Serverless project

### Shopify

Helpers for the rough edges of Shopify's APIs.

- [Shopify Search Query Builder](https://github.com/zirkelc/shopify-search-query) `npm`: A tool for constructing queries for Shopify's GraphQL API search syntax
- [Shopify Currencies.js](https://github.com/zirkelc/shopify-currencies.js) `npm`: A simple wrapper to access Shopify's currency conversion rates from Node.js

### X

Fixes for the things that annoy me every day on x.com.

- [Clipped Page](https://github.com/zirkelc/clipped-page) `chrome` `web`: Clip any post on x.com into a self-contained, shareable URL that renders anywhere, no account or app required
- [Better X](https://github.com/zirkelc/better-x) `chrome`: Small but useful enhancements to x.com

### Development & Testing

Tooling for the loop around the code, not the code itself.

- [Git Pull Run](https://github.com/zirkelc/git-pull-run) `cli`: Automatically runs commands like `npm install` when fetching changes from git, but only if certain files have been modified
- [expect.toMatchSchema()](https://github.com/zirkelc/expect-match-schema) `npm`: Check data against any standard schema (Zod, Valibot, ArkType)
- [Snapshot Serializers](https://github.com/zirkelc/snapshot-serializers) `npm`: A collection of snapshot serializers for Jest and Vitest that help manage dynamic values in test snapshots

### TypeScript & Utils

Small, focused libraries that lean on the type system.

- [Millis.js](https://github.com/zirkelc/millis-js) `npm`: A tiny and dependency-free library for date time arithmetic with a chainable and immutable API
- [Uniquely Typed](https://github.com/zirkelc/uniquely-typed) `npm`: A library to create opaque types with unique symbols
- [Create Typed Env](https://github.com/zirkelc/create-typed-env) `npm`: A library to create a type-safe proxy for accessing environment variables with optional fallback values for development and testing

### Templates

Repos I start new projects from, so I don't redo the setup every time.

- [Package TypeScript Template](https://github.com/zirkelc/template-typescript-package): Opinionated setup for a single package TypeScript project
- [Serverless TypeScript Template](https://github.com/zirkelc/template-serverless-typescript): Opinionated setup for a Serverless TypeScript project
- [VSCode Extension Template](https://github.com/zirkelc/template-vscode-extension): Opinionated setup for a VSCode extension with TypeScript

### Hacks & PoC

Hackathon builds and proofs of concept. Fun to make, not maintained.

- [expect.toMatchPrompt()](https://github.com/zirkelc/expect-match-prompt) `npm`: An AI prompt matcher for Jest and Vitest
- [Lambdalet.AI](https://github.com/zirkelc/lambdalet) `web`: An AI-powered bookmarking and read-it-later service that sends the current page's HTML from a bookmarklet to an AWS Lambda function, which invokes an LLM to extract the main content and saves it to a Notion database
- [PromptThis.AI](https://github.com/zirkelc/PromptThis.AI) `chrome`: A Chrome extension created for the [Google Chrome Built-in AI Challenge](https://googlechromeai.devpost.com/) that seamlessly integrates AI capabilities into your browsing experience
- [AdaGPT](https://github.com/zirkelc/AdaGPT) `action`: A GitHub Action created for the [GitHub + DEV 2023 Hackathon](https://dev.to/devteam/github-dev-2023-hackathon-winners-announced-236o) with OpenAI integration that responds to comments on issues and pull requests
- [Highlights](https://github.com/zirkelc/highlights) `web`: Extracts highlighted text from images using OpenCV and OCR (Tesseract) directly in the browser, without a backend API. Based on the original [Python implementation](https://dev.to/zirkelc/extract-highlighted-text-from-a-book-using-python-e15)
- [Lambda Readability](https://github.com/zirkelc/lambda-readability) `web`: Extracts readable content from a web page by running Chromium and Readability.js on AWS Lambda
- [Puppeteer Language Experiment](https://github.com/zirkelc/puppeteer-language-experiment) `web`: Tests various methods to change the browser language using Puppeteer with Chrome
