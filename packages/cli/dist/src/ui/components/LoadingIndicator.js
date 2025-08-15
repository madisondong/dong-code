import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
import { useStreamingContext } from '../contexts/StreamingContext.js';
import { StreamingState } from '../types.js';
import { GeminiRespondingSpinner } from './GeminiRespondingSpinner.js';
import { formatDuration } from '../utils/formatters.js';
export const LoadingIndicator = ({ currentLoadingPhrase, elapsedTime, rightContent, thought, }) => {
    const streamingState = useStreamingContext();
    if (streamingState === StreamingState.Idle) {
        return null;
    }
    const primaryText = thought?.subject || currentLoadingPhrase;
    return (_jsx(Box, { marginTop: 1, paddingLeft: 0, flexDirection: "column", children: _jsxs(Box, { children: [_jsx(Box, { marginRight: 1, children: _jsx(GeminiRespondingSpinner, { nonRespondingDisplay: streamingState === StreamingState.WaitingForConfirmation
                            ? '⠏'
                            : '' }) }), primaryText && _jsx(Text, { color: Colors.AccentPurple, children: primaryText }), _jsx(Text, { color: Colors.Gray, children: streamingState === StreamingState.WaitingForConfirmation
                        ? ''
                        : ` (esc to cancel, ${elapsedTime < 60 ? `${elapsedTime}s` : formatDuration(elapsedTime * 1000)})` }), _jsx(Box, { flexGrow: 1 }), rightContent && _jsx(Box, { children: rightContent })] }) }));
};
//# sourceMappingURL=LoadingIndicator.js.map