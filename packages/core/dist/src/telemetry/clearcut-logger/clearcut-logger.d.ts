/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Buffer } from 'buffer';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { StartSessionEvent, EndSessionEvent, UserPromptEvent, ToolCallEvent, ApiRequestEvent, ApiResponseEvent, ApiErrorEvent, FlashFallbackEvent, LoopDetectedEvent, NextSpeakerCheckEvent, SlashCommandEvent, MalformedJsonResponseEvent } from '../types.js';
import { Config } from '../../config/config.js';
export interface LogResponse {
    nextRequestWaitMs?: number;
}
export declare class ClearcutLogger {
    private static instance;
    private config?;
    private readonly events;
    private last_flush_time;
    private flush_interval_ms;
    private constructor();
    static getInstance(config?: Config): ClearcutLogger | undefined;
    enqueueLogEvent(event: any): void;
    createLogEvent(name: string, data: object[]): object;
    flushIfNeeded(): void;
    flushToClearcut(): Promise<LogResponse>;
    decodeLogResponse(buf: Buffer): LogResponse | undefined;
    logStartSessionEvent(event: StartSessionEvent): void;
    logNewPromptEvent(event: UserPromptEvent): void;
    logToolCallEvent(event: ToolCallEvent): void;
    logApiRequestEvent(event: ApiRequestEvent): void;
    logApiResponseEvent(event: ApiResponseEvent): void;
    logApiErrorEvent(event: ApiErrorEvent): void;
    logFlashFallbackEvent(event: FlashFallbackEvent): void;
    logLoopDetectedEvent(event: LoopDetectedEvent): void;
    logNextSpeakerCheck(event: NextSpeakerCheckEvent): void;
    logSlashCommandEvent(event: SlashCommandEvent): void;
    logMalformedJsonResponseEvent(event: MalformedJsonResponseEvent): void;
    logEndSessionEvent(event: EndSessionEvent): void;
    getProxyAgent(): HttpsProxyAgent<string> | undefined;
    shutdown(): void;
}
