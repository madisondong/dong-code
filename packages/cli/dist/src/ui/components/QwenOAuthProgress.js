import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * @license
 * Copyright 2025 Qwen
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import Spinner from 'ink-spinner';
import Link from 'ink-link';
import qrcode from 'qrcode-terminal';
import { Colors } from '../colors.js';
export function QwenOAuthProgress({ onTimeout, onCancel, deviceAuth, authStatus, authMessage, }) {
    const defaultTimeout = deviceAuth?.expires_in || 300; // Default 5 minutes
    const [timeRemaining, setTimeRemaining] = useState(defaultTimeout);
    const [dots, setDots] = useState('');
    const [qrCodeData, setQrCodeData] = useState(null);
    useInput((input, key) => {
        if (authStatus === 'timeout') {
            // Any key press in timeout state should trigger cancel to return to auth dialog
            onCancel();
        }
        else if (key.escape) {
            onCancel();
        }
    });
    // Generate QR code when device auth is available
    useEffect(() => {
        if (!deviceAuth) {
            setQrCodeData(null);
            return;
        }
        // Generate QR code string
        const generateQR = () => {
            try {
                qrcode.generate(deviceAuth.verification_uri_complete, { small: true }, (qrcode) => {
                    setQrCodeData(qrcode);
                });
            }
            catch (error) {
                console.error('Failed to generate QR code:', error);
                setQrCodeData(null);
            }
        };
        generateQR();
    }, [deviceAuth]);
    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    onTimeout();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [onTimeout]);
    // Animated dots
    useEffect(() => {
        const dotsTimer = setInterval(() => {
            setDots((prev) => {
                if (prev.length >= 3)
                    return '';
                return prev + '.';
            });
        }, 500);
        return () => clearInterval(dotsTimer);
    }, []);
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    // Handle timeout state
    if (authStatus === 'timeout') {
        return (_jsxs(Box, { borderStyle: "round", borderColor: Colors.AccentRed, flexDirection: "column", padding: 1, width: "100%", children: [_jsx(Text, { bold: true, color: Colors.AccentRed, children: "Qwen OAuth Authentication Timeout" }), _jsx(Box, { marginTop: 1, children: _jsx(Text, { children: authMessage ||
                            `OAuth token expired (over ${defaultTimeout} seconds). Please select authentication method again.` }) }), _jsx(Box, { marginTop: 1, children: _jsx(Text, { color: Colors.Gray, children: "Press any key to return to authentication type selection." }) })] }));
    }
    if (!deviceAuth) {
        return (_jsxs(Box, { borderStyle: "round", borderColor: Colors.Gray, flexDirection: "column", padding: 1, width: "100%", children: [_jsx(Box, { children: _jsxs(Text, { children: [_jsx(Spinner, { type: "dots" }), " Waiting for Qwen OAuth authentication..."] }) }), _jsxs(Box, { marginTop: 1, justifyContent: "space-between", children: [_jsxs(Text, { color: Colors.Gray, children: ["Time remaining: ", formatTime(timeRemaining)] }), _jsx(Text, { color: Colors.AccentPurple, children: "(Press ESC to cancel)" })] })] }));
    }
    return (_jsxs(Box, { borderStyle: "round", borderColor: Colors.AccentBlue, flexDirection: "column", padding: 1, width: "100%", children: [_jsx(Text, { bold: true, color: Colors.AccentBlue, children: "Qwen OAuth Authentication" }), _jsx(Box, { marginTop: 1, children: _jsx(Text, { children: "Please visit this URL to authorize:" }) }), _jsx(Link, { url: deviceAuth.verification_uri_complete, fallback: false, children: _jsx(Text, { color: Colors.AccentGreen, bold: true, children: deviceAuth.verification_uri_complete }) }), qrCodeData && (_jsxs(_Fragment, { children: [_jsx(Box, { marginTop: 1, children: _jsx(Text, { children: "Or scan the QR code below:" }) }), _jsx(Box, { marginTop: 1, children: _jsx(Text, { children: qrCodeData }) })] })), _jsx(Box, { marginTop: 1, children: _jsxs(Text, { children: [_jsx(Spinner, { type: "dots" }), " Waiting for authorization", dots] }) }), _jsxs(Box, { marginTop: 1, justifyContent: "space-between", children: [_jsxs(Text, { color: Colors.Gray, children: ["Time remaining: ", formatTime(timeRemaining)] }), _jsx(Text, { color: Colors.AccentPurple, children: "(Press ESC to cancel)" })] })] }));
}
//# sourceMappingURL=QwenOAuthProgress.js.map