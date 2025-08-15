/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { MCPServerConfig, BugCommandSettings, TelemetrySettings, AuthType } from '@dong-code/dong-code-core';
import { CustomTheme } from '../ui/themes/theme.js';
export declare const SETTINGS_DIRECTORY_NAME = ".qwen";
export declare const USER_SETTINGS_DIR: string;
export declare const USER_SETTINGS_PATH: string;
export declare const DEFAULT_EXCLUDED_ENV_VARS: string[];
export declare function getSystemSettingsPath(): string;
export declare function getWorkspaceSettingsPath(workspaceDir: string): string;
export type DnsResolutionOrder = 'ipv4first' | 'verbatim';
export declare enum SettingScope {
    User = "User",
    Workspace = "Workspace",
    System = "System"
}
export interface CheckpointingSettings {
    enabled?: boolean;
}
export interface SummarizeToolOutputSettings {
    tokenBudget?: number;
}
export interface AccessibilitySettings {
    disableLoadingPhrases?: boolean;
}
export interface Settings {
    theme?: string;
    customThemes?: Record<string, CustomTheme>;
    selectedAuthType?: AuthType;
    useExternalAuth?: boolean;
    sandbox?: boolean | string;
    coreTools?: string[];
    excludeTools?: string[];
    toolDiscoveryCommand?: string;
    toolCallCommand?: string;
    mcpServerCommand?: string;
    mcpServers?: Record<string, MCPServerConfig>;
    allowMCPServers?: string[];
    excludeMCPServers?: string[];
    showMemoryUsage?: boolean;
    contextFileName?: string | string[];
    accessibility?: AccessibilitySettings;
    telemetry?: TelemetrySettings;
    usageStatisticsEnabled?: boolean;
    preferredEditor?: string;
    bugCommand?: BugCommandSettings;
    checkpointing?: CheckpointingSettings;
    autoConfigureMaxOldSpaceSize?: boolean;
    /** The model name to use (e.g 'gemini-9.0-pro') */
    model?: string;
    enableOpenAILogging?: boolean;
    fileFiltering?: {
        respectGitIgnore?: boolean;
        respectGeminiIgnore?: boolean;
        enableRecursiveFileSearch?: boolean;
    };
    hideWindowTitle?: boolean;
    hideTips?: boolean;
    hideBanner?: boolean;
    maxSessionTurns?: number;
    sessionTokenLimit?: number;
    maxFolderItems?: number;
    summarizeToolOutput?: Record<string, SummarizeToolOutputSettings>;
    vimMode?: boolean;
    memoryImportFormat?: 'tree' | 'flat';
    ideModeFeature?: boolean;
    ideMode?: boolean;
    disableAutoUpdate?: boolean;
    disableUpdateNag?: boolean;
    memoryDiscoveryMaxDirs?: number;
    excludedProjectEnvVars?: string[];
    dnsResolutionOrder?: DnsResolutionOrder;
    sampling_params?: Record<string, unknown>;
    systemPromptMappings?: Array<{
        baseUrls: string[];
        modelNames: string[];
        template: string;
    }>;
    contentGenerator?: {
        timeout?: number;
        maxRetries?: number;
    };
}
export interface SettingsError {
    message: string;
    path: string;
}
export interface SettingsFile {
    settings: Settings;
    path: string;
}
export declare class LoadedSettings {
    constructor(system: SettingsFile, user: SettingsFile, workspace: SettingsFile, errors: SettingsError[]);
    readonly system: SettingsFile;
    readonly user: SettingsFile;
    readonly workspace: SettingsFile;
    readonly errors: SettingsError[];
    private _merged;
    get merged(): Settings;
    private computeMergedSettings;
    forScope(scope: SettingScope): SettingsFile;
    setValue<K extends keyof Settings>(scope: SettingScope, key: K, value: Settings[K]): void;
}
export declare function setUpCloudShellEnvironment(envFilePath: string | null): void;
export declare function loadEnvironment(settings?: Settings): void;
/**
 * Loads settings from user and workspace directories.
 * Project settings override user settings.
 */
export declare function loadSettings(workspaceDir: string): LoadedSettings;
export declare function saveSettings(settingsFile: SettingsFile): void;
