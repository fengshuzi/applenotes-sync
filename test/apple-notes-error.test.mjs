import assert from "node:assert/strict";
import test from "node:test";
import {
    APPLE_EVENT_NOT_PERMITTED,
    APPLE_NOTES_AUTHORIZATION_INSTRUCTIONS,
    AppleNotesAuthorizationError,
    extractAppleScriptErrorNumber,
    isAppleNotesAuthorizationDenied,
    normalizeAppleNotesExecutionError,
} from "../src/apple-notes-error.ts";

test("provides the exact macOS Apple Notes authorization path", () => {
    assert.equal(
        APPLE_NOTES_AUTHORIZATION_INSTRUCTIONS,
        "授权步骤：打开“系统设置 → 隐私与安全性 → 自动化 → Obsidian”，勾选“备忘录”，然后重启 Obsidian。",
    );
});

test("uses Apple's documented Apple Event permission error number", () => {
    assert.equal(APPLE_EVENT_NOT_PERMITTED, -1743);
});

test("recognizes an English osascript permission error", () => {
    const stderr = "execution error: Not authorized to send Apple events to Notes. (-1743)\n";
    assert.equal(extractAppleScriptErrorNumber(stderr), -1743);
    assert.equal(isAppleNotesAuthorizationDenied(stderr), true);
});

test("recognizes a localized permission error by number only", () => {
    const stderr = "执行错误：不允许向备忘录发送 Apple 事件。(-1743)\n";
    assert.equal(extractAppleScriptErrorNumber(stderr), -1743);
    assert.equal(isAppleNotesAuthorizationDenied(stderr), true);
});

test("does not misclassify other AppleScript errors as authorization denial", () => {
    for (const stderr of [
        "execution error: Notes got an error: Can't get folder. (-1728)\n",
        "execution error: Application isn't running. (-600)\n",
        "execution error: User canceled. (-128)\n",
    ]) {
        assert.equal(isAppleNotesAuthorizationDenied(stderr), false);
    }
});

test("requires the canonical trailing parenthesized AppleScript error number", () => {
    assert.equal(isAppleNotesAuthorizationDenied("permission failed -1743"), false);
    assert.equal(isAppleNotesAuthorizationDenied("permission (-1743) extra text"), false);
    assert.equal(isAppleNotesAuthorizationDenied("permission (1743)"), false);
});

test("handles empty, malformed, and non-string stderr without guessing", () => {
    for (const stderr of [null, undefined, "", "permission denied", {}, []]) {
        assert.equal(extractAppleScriptErrorNumber(stderr), null);
        assert.equal(isAppleNotesAuthorizationDenied(stderr), false);
    }
});

test("provides a stable typed error for the sync entry point", () => {
    const error = new AppleNotesAuthorizationError();
    assert.equal(error.name, "AppleNotesAuthorizationError");
    assert.equal(error.message, "Apple Notes access is not authorized");
    assert.equal(error instanceof Error, true);
});

test("normalizes official -1743 failures to the typed authorization error", () => {
    const original = new Error("osascript failed");
    const normalized = normalizeAppleNotesExecutionError(
        original,
        "execution error: Not authorized to send Apple events to Notes. (-1743)\n",
    );

    assert.equal(normalized instanceof AppleNotesAuthorizationError, true);
});

test("preserves non-authorization execution errors", () => {
    const original = new Error("Notes folder was not found");
    const normalized = normalizeAppleNotesExecutionError(
        original,
        "execution error: Can't get folder Notes. (-1728)\n",
    );

    assert.equal(normalized, original);
});
