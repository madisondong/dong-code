/**
 * @license
 * Copyright 2025 Qwen
 * SPDX-License-Identifier: Apache-2.0
 */
import { OpenAIContentGenerator } from '../core/openaiContentGenerator.js';
import { IQwenOAuth2Client } from './qwenOAuth2.js';
import { Config } from '../config/config.js';
import { GenerateContentParameters, GenerateContentResponse, CountTokensParameters, CountTokensResponse, EmbedContentParameters, EmbedContentResponse } from '@google/genai';
/**
 * Qwen Content Generator that uses Qwen OAuth tokens with automatic refresh
 */
export declare class QwenContentGenerator extends OpenAIContentGenerator {
    private qwenClient;
    private currentToken;
    private currentEndpoint;
    private refreshPromise;
    constructor(qwenClient: IQwenOAuth2Client, model: string, config: Config);
    /**
     * Get the current endpoint URL with proper protocol and /v1 suffix
     */
    private getCurrentEndpoint;
    /**
     * Override error logging behavior to suppress auth errors during token refresh
     */
    protected shouldSuppressErrorLogging(error: unknown, _request: GenerateContentParameters): boolean;
    /**
     * Override to use dynamic token and endpoint
     */
    generateContent(request: GenerateContentParameters, userPromptId: string): Promise<GenerateContentResponse>;
    /**
     * Override to use dynamic token and endpoint
     */
    generateContentStream(request: GenerateContentParameters, userPromptId: string): Promise<AsyncGenerator<GenerateContentResponse>>;
    /**
     * Override to use dynamic token and endpoint
     */
    countTokens(request: CountTokensParameters): Promise<CountTokensResponse>;
    /**
     * Override to use dynamic token and endpoint
     */
    embedContent(request: EmbedContentParameters): Promise<EmbedContentResponse>;
    /**
     * Execute operation with a valid token, with retry on auth failure
     */
    private withValidToken;
    /**
     * Execute operation with a valid token for streaming, with retry on auth failure
     */
    private withValidTokenForStream;
    /**
     * Get token with retry logic
     */
    private getTokenWithRetry;
    /**
     * Get a valid access token, refreshing if necessary
     */
    private getValidToken;
    /**
     * Force refresh the access token
     */
    private refreshToken;
    private performTokenRefresh;
    /**
     * Check if an error is related to authentication/authorization
     */
    private isAuthError;
    /**
     * Get the current cached token (may be expired)
     */
    getCurrentToken(): string | null;
    /**
     * Clear the cached token and endpoint
     */
    clearToken(): void;
}
