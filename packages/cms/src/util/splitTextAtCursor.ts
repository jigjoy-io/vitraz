export const splitTextAtCursor = (text, caretPosition) => {
    const beforeCursor = text.slice(0, caretPosition).trim();
    const afterCursor = text.slice(caretPosition).trim();
    return { beforeCursor, afterCursor };
};