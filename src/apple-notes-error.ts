export const APPLE_EVENT_NOT_PERMITTED = -1743;
export const APPLE_NOTES_AUTHORIZATION_INSTRUCTIONS =
    "授权步骤：打开“系统设置 → 隐私与安全性 → 自动化 → Obsidian”，勾选“备忘录”，然后重启 Obsidian。";

export class AppleNotesAuthorizationError extends Error {
    constructor() {
        super("Apple Notes access is not authorized");
        this.name = "AppleNotesAuthorizationError";
    }
}

export function extractAppleScriptErrorNumber(stderr: unknown): number | null {
    if (typeof stderr !== "string") return null;

    const match = stderr.match(/\((-?\d+)\)\s*$/);
    if (!match) return null;

    const errorNumber = Number(match[1]);
    return Number.isSafeInteger(errorNumber) ? errorNumber : null;
}

export function isAppleNotesAuthorizationDenied(stderr: unknown): boolean {
    return extractAppleScriptErrorNumber(stderr) === APPLE_EVENT_NOT_PERMITTED;
}

export function normalizeAppleNotesExecutionError(error: Error, stderr: unknown): Error {
    return isAppleNotesAuthorizationDenied(stderr)
        ? new AppleNotesAuthorizationError()
        : error;
}
