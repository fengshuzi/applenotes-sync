declare module 'path' {
    export function join(...paths: string[]): string;
}

declare module 'fs' {
    export function existsSync(path: string): boolean;
    export function mkdirSync(path: string, options?: { recursive?: boolean }): string | undefined;
    export function rmSync(path: string, options?: { recursive?: boolean; force?: boolean }): void;
    export function unlinkSync(path: string): void;
}

declare module 'fs/promises' {
    export function readFile(path: string): Promise<Uint8Array>;
    export function rename(oldPath: string, newPath: string): Promise<void>;
}

declare module 'child_process' {
    export function exec(
        command: string,
        options: { maxBuffer?: number },
        callback: (error: Error | null, stdout: string, stderr: string) => void
    ): unknown;
    export function execSync(command: string, options?: { stdio?: string }): string;
}

