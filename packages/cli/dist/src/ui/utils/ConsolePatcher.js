/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import util from 'util';
export class ConsolePatcher {
    originalConsoleLog = console.log;
    originalConsoleWarn = console.warn;
    originalConsoleError = console.error;
    originalConsoleDebug = console.debug;
    params;
    constructor(params) {
        this.params = params;
    }
    patch() {
        console.log = this.patchConsoleMethod('log', this.originalConsoleLog);
        console.warn = this.patchConsoleMethod('warn', this.originalConsoleWarn);
        console.error = this.patchConsoleMethod('error', this.originalConsoleError);
        console.debug = this.patchConsoleMethod('debug', this.originalConsoleDebug);
    }
    cleanup = () => {
        console.log = this.originalConsoleLog;
        console.warn = this.originalConsoleWarn;
        console.error = this.originalConsoleError;
        console.debug = this.originalConsoleDebug;
    };
    formatArgs = (args) => util.format(...args);
    patchConsoleMethod = (type, originalMethod) => (...args) => {
        if (this.params.debugMode) {
            originalMethod.apply(console, args);
        }
        if (type !== 'debug' || this.params.debugMode) {
            this.params.onNewMessage({
                type,
                content: this.formatArgs(args),
                count: 1,
            });
        }
    };
}
//# sourceMappingURL=ConsolePatcher.js.map