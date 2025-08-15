/**
 * @license
 * Copyright 2025 Qwen
 * SPDX-License-Identifier: Apache-2.0
 */
import { CountTokensResponse, GenerateContentResponse, GenerateContentParameters, CountTokensParameters, EmbedContentResponse, EmbedContentParameters } from '@google/genai';
import { ContentGenerator } from './contentGenerator.js';
import OpenAI from 'openai';
import { Config } from '../config/config.js';
export declare class OpenAIContentGenerator implements ContentGenerator {
    protected client: OpenAI;
    private model;
    private config;
    private streamingToolCalls;
    constructor(apiKey: string, model: string, config: Config);
    /**
     * Hook for subclasses to customize error handling behavior
     * @param error The error that occurred
     * @param request The original request
     * @returns true if error logging should be suppressed, false otherwise
     */
    protected shouldSuppressErrorLogging(_error: unknown, _request: GenerateContentParameters): boolean;
    /**
     * Check if an error is a timeout error
     */
    private isTimeoutError;
    generateContent(request: GenerateContentParameters, userPromptId: string): Promise<GenerateContentResponse>;
    generateContentStream(request: GenerateContentParameters, userPromptId: string): Promise<AsyncGenerator<GenerateContentResponse>>;
    private streamGenerator;
    /**
     * Combine streaming responses for logging purposes
     */
    private combineStreamResponsesForLogging;
    countTokens(request: CountTokensParameters): Promise<CountTokensResponse>;
    embedContent(request: EmbedContentParameters): Promise<EmbedContentResponse>;
    private convertGeminiParametersToOpenAI;
    private convertGeminiToolsToOpenAI;
    private convertToOpenAIFormat;
    /**
     * Clean up orphaned tool calls from message history to prevent OpenAI API errors
     */
    private cleanOrphanedToolCalls;
    /**
     * Merge consecutive assistant messages to combine split text and tool calls
     */
    private mergeConsecutiveAssistantMessages;
    private convertToGeminiFormat;
    private convertStreamChunkToGeminiFormat;
    /**
     * Build sampling parameters with clear priority:
     * 1. Config-level sampling parameters (highest priority)
     * 2. Request-level parameters (medium priority)
     * 3. Default values (lowest priority)
     */
    private buildSamplingParameters;
    private mapFinishReason;
    /**
     * Convert Gemini request format to OpenAI chat completion format for logging
     */
    private convertGeminiRequestToOpenAI;
    /**
     * Clean up orphaned tool calls for logging purposes
     */
    private cleanOrphanedToolCallsForLogging;
    /**
     * Merge consecutive assistant messages to combine split text and tool calls for logging
     */
    private mergeConsecutiveAssistantMessagesForLogging;
    /**
     * Convert Gemini response format to OpenAI chat completion format for logging
     */
    private convertGeminiResponseToOpenAI;
    /**
     * Map Gemini finish reasons to OpenAI finish reasons
     */
    private mapGeminiFinishReasonToOpenAI;
}
