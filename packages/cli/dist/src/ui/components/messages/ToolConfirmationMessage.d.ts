/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { ToolCallConfirmationDetails, Config } from '@dong-code/dong-code-core';
export interface ToolConfirmationMessageProps {
    confirmationDetails: ToolCallConfirmationDetails;
    config?: Config;
    isFocused?: boolean;
    availableTerminalHeight?: number;
    terminalWidth: number;
}
export declare const ToolConfirmationMessage: React.FC<ToolConfirmationMessageProps>;
