import * as vscode from 'vscode';
import { MicroPandaDiagnostics } from './diagnostics';
import { MicroPandaBuilder } from './builder';
import { MicroPandaTestRunner } from './testRunner';

export function activate(context: vscode.ExtensionContext) {
    const diagnostics = new MicroPandaDiagnostics();
    const builder     = new MicroPandaBuilder(diagnostics);
    const testRunner  = new MicroPandaTestRunner(diagnostics);

    context.subscriptions.push(diagnostics, builder, testRunner);

    // ── helper: resolve workspace root ────────────────────────────────────────
    const root = (): string | undefined =>
        vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

    const requireRoot = (): string | undefined => {
        const r = root();
        if (!r) { vscode.window.showErrorMessage('Micro Panda: no workspace open.'); }
        return r;
    };

    // ── commands ──────────────────────────────────────────────────────────────

    context.subscriptions.push(

        vscode.commands.registerCommand('microPanda.build', async () => {
            const r = requireRoot(); if (!r) { return; }
            await builder.run(['build'], r);
        }),

        vscode.commands.registerCommand('microPanda.gen', async () => {
            const r = requireRoot(); if (!r) { return; }
            await builder.run(['gen'], r);
        }),

        vscode.commands.registerCommand('microPanda.run', async () => {
            const r = requireRoot(); if (!r) { return; }
            const targets = await getTargets(r);
            const target = targets.length === 1
                ? targets[0]
                : await vscode.window.showQuickPick(targets, { placeHolder: 'Select target' });
            if (!target) { return; }
            await builder.run(['run', target], r);
        }),

    );
}

export function deactivate() {}

// ── helpers ───────────────────────────────────────────────────────────────────

/** Read target names from mpd.yaml (best-effort, falls back to empty list). */
async function getTargets(root: string): Promise<string[]> {
    try {
        const uri = vscode.Uri.file(`${root}/mpd.yaml`);
        const bytes = await vscode.workspace.fs.readFile(uri);
        const text = Buffer.from(bytes).toString('utf8');
        // Find the `targets:` section and read top-level keys below it.
        const targetsSection = text.split(/^targets:/m)[1] ?? '';
        const targets: string[] = [];
        const lineRe = /^  (\w[\w-]*):/gm;
        let m: RegExpExecArray | null;
        while ((m = lineRe.exec(targetsSection)) !== null) {
            targets.push(m[1]);
        }
        return targets.length ? targets : ['main'];
    } catch {
        return ['main'];
    }
}
