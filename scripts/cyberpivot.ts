#!/usr/bin/env node
import path from "path";

import {
  formatQaJson,
  formatQaTerminal,
  runContentAssurance,
} from "@/lib/content-assurance";

function printHelp(): void {
  process.stdout.write(`CyberPivot CLI

Usage:
  pnpm cyberpivot qa [--json]

Commands:
  qa     Run deterministic content assurance (CP-AUTO-005 through CP-AUTO-008)

Options:
  --json   Emit machine-readable JSON (CP-AUTO-004)
  --help   Show this help
`);
}

function main(argv: string[]): number {
  const args = argv.slice(2);
  const command = args[0];

  if (!command || command === "--help" || command === "-h") {
    printHelp();
    return command ? 0 : 2;
  }

  if (command !== "qa") {
    process.stderr.write(`Unknown command: ${command}\n\n`);
    printHelp();
    return 2;
  }

  const json = args.includes("--json");
  const rootDir = process.cwd();

  try {
    const result = runContentAssurance({
      rootDir: path.resolve(rootDir),
    });

    if (json) {
      process.stdout.write(formatQaJson(result));
    } else {
      process.stdout.write(`${formatQaTerminal(result)}\n`);
    }

    return result.exitCode;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown QA execution error";
    process.stderr.write(`QA execution error: ${message}\n`);
    return 2;
  }
}

process.exitCode = main(process.argv);
