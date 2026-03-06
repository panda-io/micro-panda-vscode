import * as vscode from 'vscode';
import { MicroPandaTestRunner } from './testRunner';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(new MicroPandaTestRunner());
}

export function deactivate() {}
