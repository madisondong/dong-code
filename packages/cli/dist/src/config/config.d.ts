/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { Config, FileDiscoveryService, FileFilteringOptions } from '@dong-code/dong-code-core';
import { Settings } from './settings.js';
import { Extension } from './extension.js';
export interface CliArgs {
    model: string | undefined;
    sandbox: boolean | string | undefined;
    sandboxImage: string | undefined;
    debug: boolean | undefined;
    prompt: string | undefined;
    promptInteractive: string | undefined;
    allFiles: boolean | undefined;
    all_files: boolean | undefined;
    showMemoryUsage: boolean | undefined;
    show_memory_usage: boolean | undefined;
    yolo: boolean | undefined;
    telemetry: boolean | undefined;
    checkpointing: boolean | undefined;
    telemetryTarget: string | undefined;
    telemetryOtlpEndpoint: string | undefined;
    telemetryLogPrompts: boolean | undefined;
    telemetryOutfile: string | undefined;
    allowedMcpServerNames: string[] | undefined;
    experimentalAcp: boolean | undefined;
    extensions: string[] | undefined;
    listExtensions: boolean | undefined;
    ideModeFeature: boolean | undefined;
    openaiLogging: boolean | undefined;
    openaiApiKey: string | undefined;
    openaiBaseUrl: string | undefined;
    proxy: string | undefined;
    includeDirectories: string[] | undefined;
}
export declare function parseArguments(): Promise<CliArgs>;
export declare function loadHierarchicalGeminiMemory(currentWorkingDirectory: string, debugMode: boolean, fileService: FileDiscoveryService, settings: Settings, extensionContextFilePaths?: string[], memoryImportFormat?: 'flat' | 'tree', fileFilteringOptions?: FileFilteringOptions): Promise<{
    memoryContent: string;
    fileCount: number;
}>;
export declare function loadCliConfig(settings: Settings, extensions: Extension[], sessionId: string, argv: CliArgs): Promise<Config>;
