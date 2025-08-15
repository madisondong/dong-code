/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { AuthType, UserTierId } from '@dong-code/dong-code-core';
export declare function parseAndFormatApiError(error: unknown, authType?: AuthType, userTier?: UserTierId, currentModel?: string, fallbackModel?: string): string;
