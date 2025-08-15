/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { detectIde, getIdeDisplayName, } from '../ide/detect-ide.js';
import { ideContext, IdeContextNotificationSchema } from '../ide/ideContext.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
const logger = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug: (...args) => console.debug('[DEBUG] [IDEClient]', ...args),
};
export var IDEConnectionStatus;
(function (IDEConnectionStatus) {
    IDEConnectionStatus["Connected"] = "connected";
    IDEConnectionStatus["Disconnected"] = "disconnected";
    IDEConnectionStatus["Connecting"] = "connecting";
})(IDEConnectionStatus || (IDEConnectionStatus = {}));
/**
 * Manages the connection to and interaction with the IDE server.
 */
export class IdeClient {
    client = undefined;
    state = {
        status: IDEConnectionStatus.Disconnected,
    };
    static instance;
    currentIde;
    currentIdeDisplayName;
    constructor(ideMode) {
        this.currentIde = detectIde();
        if (this.currentIde) {
            this.currentIdeDisplayName = getIdeDisplayName(this.currentIde);
        }
        if (!ideMode) {
            return;
        }
        this.init().catch((err) => {
            logger.debug('Failed to initialize IdeClient:', err);
        });
    }
    static getInstance(ideMode) {
        if (!IdeClient.instance) {
            IdeClient.instance = new IdeClient(ideMode);
        }
        return IdeClient.instance;
    }
    getCurrentIde() {
        return this.currentIde;
    }
    getConnectionStatus() {
        return this.state;
    }
    setState(status, details) {
        this.state = { status, details };
        if (status === IDEConnectionStatus.Disconnected) {
            logger.debug('IDE integration is disconnected. ', details);
            ideContext.clearIdeContext();
        }
    }
    getPortFromEnv() {
        const port = process.env['GEMINI_CLI_IDE_SERVER_PORT'];
        if (!port) {
            this.setState(IDEConnectionStatus.Disconnected, 'Gemini CLI Companion extension not found. Install via /ide install and restart the CLI in a fresh terminal window.');
            return undefined;
        }
        return port;
    }
    validateWorkspacePath() {
        const ideWorkspacePath = process.env['GEMINI_CLI_IDE_WORKSPACE_PATH'];
        if (!ideWorkspacePath) {
            this.setState(IDEConnectionStatus.Disconnected, 'IDE integration requires a single workspace folder to be open in the IDE. Please ensure one folder is open and try again.');
            return false;
        }
        if (ideWorkspacePath !== process.cwd()) {
            this.setState(IDEConnectionStatus.Disconnected, `Gemini CLI is running in a different directory (${process.cwd()}) from the IDE's open workspace (${ideWorkspacePath}). Please run Gemini CLI in the same directory.`);
            return false;
        }
        return true;
    }
    registerClientHandlers() {
        if (!this.client) {
            return;
        }
        this.client.setNotificationHandler(IdeContextNotificationSchema, (notification) => {
            ideContext.setIdeContext(notification.params);
        });
        this.client.onerror = (_error) => {
            this.setState(IDEConnectionStatus.Disconnected, 'Client error.');
        };
        this.client.onclose = () => {
            this.setState(IDEConnectionStatus.Disconnected, 'Connection closed.');
        };
    }
    async reconnect(ideMode) {
        IdeClient.instance = new IdeClient(ideMode);
    }
    async establishConnection(port) {
        let transport;
        try {
            this.client = new Client({
                name: 'streamable-http-client',
                // TODO(#3487): use the CLI version here.
                version: '1.0.0',
            });
            transport = new StreamableHTTPClientTransport(new URL(`http://localhost:${port}/mcp`));
            this.registerClientHandlers();
            await this.client.connect(transport);
            this.setState(IDEConnectionStatus.Connected);
        }
        catch (error) {
            this.setState(IDEConnectionStatus.Disconnected, `Failed to connect to IDE server: ${error}`);
            if (transport) {
                try {
                    await transport.close();
                }
                catch (closeError) {
                    logger.debug('Failed to close transport:', closeError);
                }
            }
        }
    }
    async init() {
        if (this.state.status === IDEConnectionStatus.Connected) {
            return;
        }
        if (!this.currentIde) {
            this.setState(IDEConnectionStatus.Disconnected, 'Not running in a supported IDE, skipping connection.');
            return;
        }
        this.setState(IDEConnectionStatus.Connecting);
        if (!this.validateWorkspacePath()) {
            return;
        }
        const port = this.getPortFromEnv();
        if (!port) {
            return;
        }
        await this.establishConnection(port);
    }
    dispose() {
        this.client?.close();
    }
    getDetectedIdeDisplayName() {
        return this.currentIdeDisplayName;
    }
    setDisconnected() {
        this.setState(IDEConnectionStatus.Disconnected);
    }
}
//# sourceMappingURL=ide-client.js.map