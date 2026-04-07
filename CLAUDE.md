# micro-panda-vscode

VS Code extension for the Micro-Panda language (`.mpd` files).

## Features

- Syntax highlighting (TextMate grammar in `syntaxes/`)
- Language configuration (brackets, comments) in `language-configuration.json`
- Code snippets in `snippets/`
- Build / Gen / Run commands via `mpd` CLI
- Test discovery and execution for `*_test.mpd` files
- LSP client — spawns `mpd lsp` for diagnostics and completions

## Type keywords (for grammar updates)

Canonical: `bool i8 u8 i16 u16 i32 u32 i64 u64 float q16 void`
Aliases: `byte` (=u8), `int` (=i32), `fixed` (=q16)
No f64 — `float` is the only floating-point type.

## Source layout

| File | Purpose |
|---|---|
| `src/extension.ts` | Entry point — activates LSP client, registers commands |
| `src/builder.ts` | Spawns `mpd` CLI processes, streams output |
| `src/diagnostics.ts` | Parses compiler errors, shows squiggles |
| `src/testRunner.ts` | Discovers `@test` functions, runs `mpd test`, reports results |

## LSP client

The extension spawns `mpd lsp` as a child process on activation (when a `.mpd` file is opened). Communication is JSON-RPC over stdin/stdout via `vscode-languageclient`.

### Phase 1 (implemented)
- Diagnostics pushed by the server on `didOpen` / `didSave`
- Completions trigger on `_` — returns all public symbols from loaded modules with type/signature detail
- Signature help triggers on `(` and `,` — shows active parameter hint while typing a call
- Server lifecycle tied to the extension: started on activate, stopped on deactivate

### Phase 2 (implemented)
- Hover — hovering a symbol returns a markdown tooltip with its full signature
- Go-to-definition — `F12` / `Cmd+Click` jumps to the declaration site

## Configuration

`microPanda.mpdPath` — path to the `mpd` binary (default: `"mpd"`, must be on PATH).

## Build & install

```sh
bash pack.sh                  # compile + package → micro-panda-*.vsix
code --install-extension micro-panda-*.vsix --force
```

## Dependencies

- `vscode-languageclient` — LSP client protocol (runtime dependency)
- `typescript`, `@types/vscode`, `@types/node` — dev only
