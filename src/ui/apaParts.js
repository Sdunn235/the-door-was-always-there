// Splits an APA string like 'Title. *Journal, 53*(1), 1–2.' into pieces so the
// template can italicize the *starred* parts without using v-html.
// Returns [{ text, italic }, ...].
export function apaParts(apa) {
    return apa.split('*').map(function (text, i) {
        return { text: text, italic: i % 2 === 1 };
    }).filter(function (part) {
        return part.text !== '';
    });
}

// True for text Shawn still has to write.
export function isPlaceholder(text) {
    return typeof text === 'string' && text.indexOf('[PLACEHOLDER') === 0;
}

// What the player sees: Claude's drafts drop the '[PLACEHOLDER] ' prefix on screen
// (they still get the yellow "Draft" tag). Unwritten slots like '[PLACEHOLDER: ...]' show as-is.
export function displayText(text) {
    return isPlaceholder(text) ? text.replace(/^\[PLACEHOLDER\]\s*/, '') : text;
}
