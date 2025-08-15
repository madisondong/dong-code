/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { DetectedIde } from '../ide/detect-ide.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
export type IDEConnectionState = {
    status: IDEConnectionStatus;
    details?: string;
};
export declare enum IDEConnectionStatus {
    Connected = "connected",
    Disconnected = "disconnected",
    Connecting = "connecting"
}
/**
 * Manages the connection to and interaction with the IDE server.
 */
export declare class IdeClient {
    client: Client | undefined;
    private state;
    private static instance;
    private readonly currentIde;
    private readonly currentIdeDisplayName;
    constructor(ideMode: boolean);
    static getInstance(ideMode: boolean): IdeClient;
    getCurrentIde(): DetectedIde | undefined;
    getConnectionStatus(): IDEConnectionState;
    private setState;
    private getPortFromEnv;
    private validateWorkspacePath;
    private registerClientHandlers;
    reconnect(ideMode: boolean): Promise<void>;
    private establishConnection;
    init(): Promise<void>;
    dispose(): void;
    getDetectedIdeDisplayName(): string | undefined;
    setDisconnected(): void;
}
