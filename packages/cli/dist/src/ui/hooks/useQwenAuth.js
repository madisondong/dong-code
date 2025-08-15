/**
 * @license
 * Copyright 2025 Qwen
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useCallback, useEffect } from 'react';
import { AuthType, qwenOAuth2Events, QwenOAuth2Event, } from '@dong-code/dong-code-core';
export const useQwenAuth = (settings, isAuthenticating) => {
    const [qwenAuthState, setQwenAuthState] = useState({
        isQwenAuthenticating: false,
        deviceAuth: null,
        authStatus: 'idle',
        authMessage: null,
    });
    const isQwenAuth = settings.merged.selectedAuthType === AuthType.QWEN_OAUTH;
    // Set up event listeners when authentication starts
    useEffect(() => {
        if (!isQwenAuth || !isAuthenticating) {
            // Reset state when not authenticating or not Qwen auth
            setQwenAuthState({
                isQwenAuthenticating: false,
                deviceAuth: null,
                authStatus: 'idle',
                authMessage: null,
            });
            return;
        }
        setQwenAuthState((prev) => ({
            ...prev,
            isQwenAuthenticating: true,
            authStatus: 'idle',
        }));
        // Set up event listeners
        const handleDeviceAuth = (deviceAuth) => {
            setQwenAuthState((prev) => ({
                ...prev,
                deviceAuth: {
                    verification_uri: deviceAuth.verification_uri,
                    verification_uri_complete: deviceAuth.verification_uri_complete,
                    user_code: deviceAuth.user_code,
                    expires_in: deviceAuth.expires_in,
                },
                authStatus: 'polling',
            }));
        };
        const handleAuthProgress = (status, message) => {
            setQwenAuthState((prev) => ({
                ...prev,
                authStatus: status,
                authMessage: message || null,
            }));
        };
        // Add event listeners
        qwenOAuth2Events.on(QwenOAuth2Event.AuthUri, handleDeviceAuth);
        qwenOAuth2Events.on(QwenOAuth2Event.AuthProgress, handleAuthProgress);
        // Cleanup event listeners when component unmounts or auth finishes
        return () => {
            qwenOAuth2Events.off(QwenOAuth2Event.AuthUri, handleDeviceAuth);
            qwenOAuth2Events.off(QwenOAuth2Event.AuthProgress, handleAuthProgress);
        };
    }, [isQwenAuth, isAuthenticating]);
    const cancelQwenAuth = useCallback(() => {
        // Emit cancel event to stop polling
        qwenOAuth2Events.emit(QwenOAuth2Event.AuthCancel);
        setQwenAuthState({
            isQwenAuthenticating: false,
            deviceAuth: null,
            authStatus: 'idle',
            authMessage: null,
        });
    }, []);
    return {
        ...qwenAuthState,
        isQwenAuth,
        cancelQwenAuth,
    };
};
//# sourceMappingURL=useQwenAuth.js.map