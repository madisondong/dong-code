/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { ThoughtSummary } from '@dong-code/dong-code-core';
import React from 'react';
interface LoadingIndicatorProps {
    currentLoadingPhrase?: string;
    elapsedTime: number;
    rightContent?: React.ReactNode;
    thought?: ThoughtSummary | null;
}
export declare const LoadingIndicator: React.FC<LoadingIndicatorProps>;
export {};
