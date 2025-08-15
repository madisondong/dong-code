/**
 * @license
 * Copyright 2025 Qwen
 * SPDX-License-Identifier: Apache-2.0
 */
import React from 'react';
import { DeviceAuthorizationInfo } from '../hooks/useQwenAuth.js';
interface QwenOAuthProgressProps {
    onTimeout: () => void;
    onCancel: () => void;
    deviceAuth?: DeviceAuthorizationInfo;
    authStatus?: 'idle' | 'polling' | 'success' | 'error' | 'timeout' | 'rate_limit';
    authMessage?: string | null;
}
export declare function QwenOAuthProgress({ onTimeout, onCancel, deviceAuth, authStatus, authMessage, }: QwenOAuthProgressProps): React.JSX.Element;
export {};
