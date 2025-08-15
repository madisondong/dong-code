/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { isValidColor, resolveColor } from './color-utils.js';
export const lightTheme = {
    type: 'light',
    Background: '#FAFAFA',
    Foreground: '#3C3C43',
    LightBlue: '#89BDCD',
    AccentBlue: '#3B82F6',
    AccentPurple: '#8B5CF6',
    AccentCyan: '#06B6D4',
    AccentGreen: '#3CA84B',
    AccentYellow: '#D5A40A',
    AccentRed: '#DD4C4C',
    DiffAdded: '#C6EAD8',
    DiffRemoved: '#FFCCCC',
    Comment: '#008000',
    Gray: '#97a0b0',
    GradientColors: ['#4796E4', '#847ACE', '#C3677F'],
};
export const darkTheme = {
    type: 'dark',
    Background: '#1E1E2E',
    Foreground: '#CDD6F4',
    LightBlue: '#ADD8E6',
    AccentBlue: '#89B4FA',
    AccentPurple: '#CBA6F7',
    AccentCyan: '#89DCEB',
    AccentGreen: '#A6E3A1',
    AccentYellow: '#F9E2AF',
    AccentRed: '#F38BA8',
    DiffAdded: '#28350B',
    DiffRemoved: '#430000',
    Comment: '#6C7086',
    Gray: '#6C7086',
    GradientColors: ['#4796E4', '#847ACE', '#C3677F'],
};
export const ansiTheme = {
    type: 'ansi',
    Background: 'black',
    Foreground: 'white',
    LightBlue: 'blue',
    AccentBlue: 'blue',
    AccentPurple: 'magenta',
    AccentCyan: 'cyan',
    AccentGreen: 'green',
    AccentYellow: 'yellow',
    AccentRed: 'red',
    DiffAdded: 'green',
    DiffRemoved: 'red',
    Comment: 'gray',
    Gray: 'gray',
};
export class Theme {
    name;
    type;
    colors;
    /**
     * The default foreground color for text when no specific highlight rule applies.
     * This is an Ink-compatible color string (hex or name).
     */
    defaultColor;
    /**
     * Stores the mapping from highlight.js class names (e.g., 'hljs-keyword')
     * to Ink-compatible color strings (hex or name).
     */
    _colorMap;
    /**
     * Creates a new Theme instance.
     * @param name The name of the theme.
     * @param rawMappings The raw CSSProperties mappings from a react-syntax-highlighter theme object.
     */
    constructor(name, type, rawMappings, colors) {
        this.name = name;
        this.type = type;
        this.colors = colors;
        this._colorMap = Object.freeze(this._buildColorMap(rawMappings)); // Build and freeze the map
        // Determine the default foreground color
        const rawDefaultColor = rawMappings['hljs']?.color;
        this.defaultColor =
            (rawDefaultColor ? Theme._resolveColor(rawDefaultColor) : undefined) ??
                ''; // Default to empty string if not found or resolvable
    }
    /**
     * Gets the Ink-compatible color string for a given highlight.js class name.
     * @param hljsClass The highlight.js class name (e.g., 'hljs-keyword', 'hljs-string').
     * @returns The corresponding Ink color string (hex or name) if it exists.
     */
    getInkColor(hljsClass) {
        return this._colorMap[hljsClass];
    }
    /**
     * Resolves a CSS color value (name or hex) into an Ink-compatible color string.
     * @param colorValue The raw color string (e.g., 'blue', '#ff0000', 'darkkhaki').
     * @returns An Ink-compatible color string (hex or name), or undefined if not resolvable.
     */
    static _resolveColor(colorValue) {
        return resolveColor(colorValue);
    }
    /**
     * Builds the internal map from highlight.js class names to Ink-compatible color strings.
     * This method is protected and primarily intended for use by the constructor.
     * @param hljsTheme The raw CSSProperties mappings from a react-syntax-highlighter theme object.
     * @returns An Ink-compatible theme map (Record<string, string>).
     */
    _buildColorMap(hljsTheme) {
        const inkTheme = {};
        for (const key in hljsTheme) {
            // Ensure the key starts with 'hljs-' or is 'hljs' for the base style
            if (!key.startsWith('hljs-') && key !== 'hljs') {
                continue; // Skip keys not related to highlighting classes
            }
            const style = hljsTheme[key];
            if (style?.color) {
                const resolvedColor = Theme._resolveColor(style.color);
                if (resolvedColor !== undefined) {
                    // Use the original key from the hljsTheme (e.g., 'hljs-keyword')
                    inkTheme[key] = resolvedColor;
                }
                // If color is not resolvable, it's omitted from the map,
                // this enables falling back to the default foreground color.
            }
            // We currently only care about the 'color' property for Ink rendering.
            // Other properties like background, fontStyle, etc., are ignored.
        }
        return inkTheme;
    }
}
/**
 * Creates a Theme instance from a custom theme configuration.
 * @param customTheme The custom theme configuration.
 * @returns A new Theme instance.
 */
export function createCustomTheme(customTheme) {
    // Generate CSS properties mappings based on the custom theme colors
    const rawMappings = {
        hljs: {
            display: 'block',
            overflowX: 'auto',
            padding: '0.5em',
            background: customTheme.Background,
            color: customTheme.Foreground,
        },
        'hljs-keyword': {
            color: customTheme.AccentBlue,
        },
        'hljs-literal': {
            color: customTheme.AccentBlue,
        },
        'hljs-symbol': {
            color: customTheme.AccentBlue,
        },
        'hljs-name': {
            color: customTheme.AccentBlue,
        },
        'hljs-link': {
            color: customTheme.AccentBlue,
            textDecoration: 'underline',
        },
        'hljs-built_in': {
            color: customTheme.AccentCyan,
        },
        'hljs-type': {
            color: customTheme.AccentCyan,
        },
        'hljs-number': {
            color: customTheme.AccentGreen,
        },
        'hljs-class': {
            color: customTheme.AccentGreen,
        },
        'hljs-string': {
            color: customTheme.AccentYellow,
        },
        'hljs-meta-string': {
            color: customTheme.AccentYellow,
        },
        'hljs-regexp': {
            color: customTheme.AccentRed,
        },
        'hljs-template-tag': {
            color: customTheme.AccentRed,
        },
        'hljs-subst': {
            color: customTheme.Foreground,
        },
        'hljs-function': {
            color: customTheme.Foreground,
        },
        'hljs-title': {
            color: customTheme.Foreground,
        },
        'hljs-params': {
            color: customTheme.Foreground,
        },
        'hljs-formula': {
            color: customTheme.Foreground,
        },
        'hljs-comment': {
            color: customTheme.Comment,
            fontStyle: 'italic',
        },
        'hljs-quote': {
            color: customTheme.Comment,
            fontStyle: 'italic',
        },
        'hljs-doctag': {
            color: customTheme.Comment,
        },
        'hljs-meta': {
            color: customTheme.Gray,
        },
        'hljs-meta-keyword': {
            color: customTheme.Gray,
        },
        'hljs-tag': {
            color: customTheme.Gray,
        },
        'hljs-variable': {
            color: customTheme.AccentPurple,
        },
        'hljs-template-variable': {
            color: customTheme.AccentPurple,
        },
        'hljs-attr': {
            color: customTheme.LightBlue,
        },
        'hljs-attribute': {
            color: customTheme.LightBlue,
        },
        'hljs-builtin-name': {
            color: customTheme.LightBlue,
        },
        'hljs-section': {
            color: customTheme.AccentYellow,
        },
        'hljs-emphasis': {
            fontStyle: 'italic',
        },
        'hljs-strong': {
            fontWeight: 'bold',
        },
        'hljs-bullet': {
            color: customTheme.AccentYellow,
        },
        'hljs-selector-tag': {
            color: customTheme.AccentYellow,
        },
        'hljs-selector-id': {
            color: customTheme.AccentYellow,
        },
        'hljs-selector-class': {
            color: customTheme.AccentYellow,
        },
        'hljs-selector-attr': {
            color: customTheme.AccentYellow,
        },
        'hljs-selector-pseudo': {
            color: customTheme.AccentYellow,
        },
        'hljs-addition': {
            backgroundColor: customTheme.AccentGreen,
            display: 'inline-block',
            width: '100%',
        },
        'hljs-deletion': {
            backgroundColor: customTheme.AccentRed,
            display: 'inline-block',
            width: '100%',
        },
    };
    return new Theme(customTheme.name, 'custom', rawMappings, customTheme);
}
/**
 * Validates a custom theme configuration.
 * @param customTheme The custom theme to validate.
 * @returns An object with isValid boolean and error message if invalid.
 */
export function validateCustomTheme(customTheme) {
    // Check required fields
    const requiredFields = [
        'name',
        'Background',
        'Foreground',
        'LightBlue',
        'AccentBlue',
        'AccentPurple',
        'AccentCyan',
        'AccentGreen',
        'AccentYellow',
        'AccentRed',
        // 'DiffAdded' and 'DiffRemoved' are not required as they were added after
        // the theme format was defined.
        'Comment',
        'Gray',
    ];
    const recommendedFields = [
        'DiffAdded',
        'DiffRemoved',
    ];
    for (const field of requiredFields) {
        if (!customTheme[field]) {
            return {
                isValid: false,
                error: `Missing required field: ${field}`,
            };
        }
    }
    const missingFields = [];
    for (const field of recommendedFields) {
        if (!customTheme[field]) {
            missingFields.push(field);
        }
    }
    // Validate color format (basic hex validation)
    const colorFields = [
        'Background',
        'Foreground',
        'LightBlue',
        'AccentBlue',
        'AccentPurple',
        'AccentCyan',
        'AccentGreen',
        'AccentYellow',
        'AccentRed',
        'DiffAdded',
        'DiffRemoved',
        'Comment',
        'Gray',
    ];
    for (const field of colorFields) {
        const color = customTheme[field];
        if (color !== undefined && !isValidColor(color)) {
            return {
                isValid: false,
                error: `Invalid color format for ${field}: ${color}`,
            };
        }
    }
    // Validate theme name
    if (customTheme.name && !isValidThemeName(customTheme.name)) {
        return {
            isValid: false,
            error: `Invalid theme name: ${customTheme.name}`,
        };
    }
    return {
        isValid: true,
        warning: missingFields.length > 0
            ? `Missing field(s) ${missingFields.join(', ')}`
            : undefined,
    };
}
/**
 * Checks if a theme name is valid.
 * @param name The theme name to validate.
 * @returns True if the theme name is valid.
 */
function isValidThemeName(name) {
    // Theme name should be non-empty and not contain invalid characters
    return name.trim().length > 0 && name.trim().length <= 50;
}
//# sourceMappingURL=theme.js.map