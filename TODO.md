# TODO

## LSP features

- [ ] **Document symbols** (`textDocument/documentSymbol`) — populate the Outline panel and breadcrumb bar with all functions/classes/vars in the current file.
- [ ] **Workspace symbols** (`workspace/symbol`) — `Cmd+T` fuzzy-jump to any symbol across all project files.
- [ ] **Find all references** (`textDocument/references`) — right-click → "Find All References", shows every call/use site across the workspace.
- [ ] **Rename symbol** (`textDocument/rename`) — rename a symbol across all files at once (depends on find-all-references internally).
- [ ] **Inlay hints** (`textDocument/inlayHint`) — show inferred types inline next to variable declarations.
- [ ] **Code actions / quick fix** (`textDocument/codeAction`) — e.g. auto-insert missing import, add missing field.

## Debugger (Option A — GDB via `#line`)

- [ ] **DAP launch config** — add a `microPanda` debug type that generates a `launch.json` entry, compiles the project with `mpd build`, and launches the binary under GDB/LLDB via the existing `cppdbg` / `CodeLLDB` adapter. Requires the compiler to emit `#line` directives (tracked in micro-panda-dart TODO).
- [ ] **MCU attach config** — same DAP entry point but for `attach` mode via OpenOCD + GDB (ESP32, Cortex-M). User provides the OpenOCD config path; the extension wires it to `cppdbg` with `miDebuggerServerAddress`.

## Distribution

- [ ] Bundle cross-platform `mpd` binaries inside the VSIX so users don't need to install separately (Linux x64, macOS arm64/x64, Windows x64). Fall back to `mpd` on PATH if no bundled binary matches the current platform.
