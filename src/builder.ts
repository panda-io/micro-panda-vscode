import * as vscode from 'vscode';
import { spawn } from 'child_process';
import { MicroPandaDiagnostics } from './diagnostics';

/** Runs mpd CLI commands and streams output to the Output Channel. */
export class MicroPandaBuilder implements vscode.Disposable {
    private readonly output = vscode.window.createOutputChannel('Micro Panda');

    constructor(private readonly diagnostics: MicroPandaDiagnostics) {}

    /** Run `mpd <args>` in [cwd], streaming output. Returns true on success. */
    async run(args: string[], cwd: string): Promise<boolean> {
        const mpdExe = vscode.workspace
            .getConfiguration('microPanda')
            .get<string>('mpdPath', 'mpd');

        this.output.show(/* preserveFocus */ true);
        this.output.appendLine(`> mpd ${args.join(' ')}`);
        this.diagnostics.clear();

        return new Promise(resolve => {
            let combined = '';

            let proc: ReturnType<typeof spawn>;
            try {
                proc = spawn(mpdExe, args, { cwd });
            } catch (err) {
                this.output.appendLine(`error: could not launch '${mpdExe}': ${err}`);
                resolve(false);
                return;
            }

            const onData = (d: Buffer) => {
                const text = d.toString();
                this.output.append(text);
                combined += text;
            };

            proc.stdout?.on('data', onData);
            proc.stderr?.on('data', onData);

            proc.on('error', err => {
                this.output.appendLine(
                    `error: could not launch '${mpdExe}': ${err.message}\n` +
                    `Check the 'microPanda.mpdPath' setting.`
                );
                resolve(false);
            });

            proc.on('close', code => {
                this.diagnostics.update(combined);
                if (code === 0) {
                    this.output.appendLine('Done.');
                } else {
                    this.output.appendLine(`Failed (exit ${code}).`);
                }
                resolve(code === 0);
            });
        });
    }

    dispose() {
        this.output.dispose();
    }
}
