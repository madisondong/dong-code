import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { Colors } from '../colors.js';
import { RadioButtonSelect } from './shared/RadioButtonSelect.js';
import { SettingScope } from '../../config/settings.js';
import { AuthType } from '@dong-code/dong-code-core';
import { validateAuthMethod, setOpenAIApiKey, setOpenAIBaseUrl, setOpenAIModel, } from '../../config/auth.js';
import { OpenAIKeyPrompt } from './OpenAIKeyPrompt.js';
function parseDefaultAuthType(defaultAuthType) {
    if (defaultAuthType &&
        Object.values(AuthType).includes(defaultAuthType)) {
        return defaultAuthType;
    }
    return null;
}
export function AuthDialog({ onSelect, settings, initialErrorMessage, }) {
    const [errorMessage, setErrorMessage] = useState(initialErrorMessage || null);
    const [showOpenAIKeyPrompt, setShowOpenAIKeyPrompt] = useState(false);
    const items = [
        { label: 'Qwen OAuth', value: AuthType.QWEN_OAUTH },
        { label: 'OpenAI', value: AuthType.USE_OPENAI },
    ];
    const initialAuthIndex = Math.max(0, items.findIndex((item) => {
        if (settings.merged.selectedAuthType) {
            return item.value === settings.merged.selectedAuthType;
        }
        const defaultAuthType = parseDefaultAuthType(process.env.GEMINI_DEFAULT_AUTH_TYPE);
        if (defaultAuthType) {
            return item.value === defaultAuthType;
        }
        if (process.env.GEMINI_API_KEY) {
            return item.value === AuthType.USE_GEMINI;
        }
        if (process.env.QWEN_OAUTH_TOKEN) {
            return item.value === AuthType.QWEN_OAUTH;
        }
        return item.value === AuthType.LOGIN_WITH_GOOGLE;
    }));
    const handleAuthSelect = (authMethod) => {
        const error = validateAuthMethod(authMethod);
        if (error) {
            if (authMethod === AuthType.USE_OPENAI && !process.env.OPENAI_API_KEY) {
                setShowOpenAIKeyPrompt(true);
                setErrorMessage(null);
            }
            else {
                setErrorMessage(error);
            }
        }
        else {
            setErrorMessage(null);
            onSelect(authMethod, SettingScope.User);
        }
    };
    const handleOpenAIKeySubmit = (apiKey, baseUrl, model) => {
        setOpenAIApiKey(apiKey);
        setOpenAIBaseUrl(baseUrl);
        setOpenAIModel(model);
        setShowOpenAIKeyPrompt(false);
        onSelect(AuthType.USE_OPENAI, SettingScope.User);
    };
    const handleOpenAIKeyCancel = () => {
        setShowOpenAIKeyPrompt(false);
        setErrorMessage('OpenAI API key is required to use OpenAI authentication.');
    };
    useInput((_input, key) => {
        if (showOpenAIKeyPrompt) {
            return;
        }
        if (key.escape) {
            // Prevent exit if there is an error message.
            // This means they user is not authenticated yet.
            if (errorMessage) {
                return;
            }
            if (settings.merged.selectedAuthType === undefined) {
                // Prevent exiting if no auth method is set
                setErrorMessage('You must select an auth method to proceed. Press Ctrl+C twice to exit.');
                return;
            }
            onSelect(undefined, SettingScope.User);
        }
    });
    if (showOpenAIKeyPrompt) {
        return (_jsx(OpenAIKeyPrompt, { onSubmit: handleOpenAIKeySubmit, onCancel: handleOpenAIKeyCancel }));
    }
    return (_jsxs(Box, { borderStyle: "round", borderColor: Colors.Gray, flexDirection: "column", padding: 1, width: "100%", children: [_jsx(Text, { bold: true, children: "Get started" }), _jsx(Box, { marginTop: 1, children: _jsx(Text, { children: "How would you like to authenticate for this project?" }) }), _jsx(Box, { marginTop: 1, children: _jsx(RadioButtonSelect, { items: items, initialIndex: initialAuthIndex, onSelect: handleAuthSelect, isFocused: true }) }), errorMessage && (_jsx(Box, { marginTop: 1, children: _jsx(Text, { color: Colors.AccentRed, children: errorMessage }) })), _jsx(Box, { marginTop: 1, children: _jsx(Text, { color: Colors.AccentPurple, children: "(Use Enter to Set Auth)" }) }), _jsx(Box, { marginTop: 1, children: _jsx(Text, { children: "Terms of Services and Privacy Notice for Qwen Code" }) }), _jsx(Box, { marginTop: 1, children: _jsx(Text, { color: Colors.AccentBlue, children: 'https://github.com/QwenLM/Qwen3-Coder/blob/main/README.md' }) })] }));
}
//# sourceMappingURL=AuthDialog.js.map