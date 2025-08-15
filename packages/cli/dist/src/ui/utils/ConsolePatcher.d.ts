/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ConsoleMessageItem } from '../types.js';
interface ConsolePatcherParams {
    onNewMessage: (message: Omit<ConsoleMessageItem, 'id'>) => void;
    debugMode: boolean;
}
export declare class ConsolePatcher {
    private originalConsoleLog;
    private originalConsoleWarn;
    private originalConsoleError;
    private originalConsoleDebug;
    private params;
    constructor(params: ConsolePatcherParams);
    patch(): void;
    cleanup: () => void;
    private formatArgs;
    private patchConsoleMethod;
}
export {};
