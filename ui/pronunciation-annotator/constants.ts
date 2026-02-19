export const DEFAULT_PHRASES = ["sliotar", "hurling", "camogie"];
export const PRONUNCIATION_PATTERN = new RegExp(`\\b(${DEFAULT_PHRASES.join("|")})\\b`, "i");
