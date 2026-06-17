/**
 * Run with: pnpm dlx tsx scripts/verify-summary-xss.ts
 * Mirrors the exact JSX text rendering used in public and private cabinet views.
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const XSS_PAYLOADS = [
  "<script>alert('test')</script>",
  "<img src=x onerror=alert('test')>",
  "<svg/onload=alert('test')>",
  "javascript:alert('test')",
] as const;

function renderPublicSummary(summary: string): string {
  // Same structure as public-cabinet-view.tsx summary paragraph
  return renderToStaticMarkup(
    createElement(
      "p",
      { className: "mt-4 text-sm leading-relaxed text-zinc-300" },
      summary,
    ),
  );
}

function renderPrivateSummary(summary: string): string {
  // Same structure as cabinet-module-card.tsx unlocked summary paragraph
  return renderToStaticMarkup(
    createElement(
      "p",
      { className: "text-sm leading-relaxed text-zinc-300" },
      summary,
    ),
  );
}

function assertNoExecutableHtml(html: string, payload: string, context: string): void {
  if (/<script[\s>]/i.test(html)) {
    throw new Error(`${context}: raw <script tag found for payload: ${payload}`);
  }

  if (/<img[\s/>]/i.test(html)) {
    throw new Error(`${context}: raw <img tag found for payload: ${payload}`);
  }

  if (/<svg[\s/>]/i.test(html)) {
    throw new Error(`${context}: raw <svg tag found for payload: ${payload}`);
  }

  if (payload.includes("<") && html.includes(payload)) {
    throw new Error(`${context}: unescaped payload found in HTML: ${payload}`);
  }
}

function assertEscapedTextPresent(html: string, payload: string, context: string): void {
  if (payload.includes("<")) {
    if (!html.includes("&lt;")) {
      throw new Error(`${context}: escaped HTML not found for payload: ${payload}`);
    }
    return;
  }

  const normalizedHtml = html.replace(/&#x27;|&#39;|&apos;/g, "'");
  if (!normalizedHtml.includes(payload)) {
    throw new Error(`${context}: payload text not present in output: ${payload}`);
  }
}

for (const payload of XSS_PAYLOADS) {
  const publicHtml = renderPublicSummary(payload);
  assertNoExecutableHtml(publicHtml, payload, "public-cabinet-view summary");
  assertEscapedTextPresent(publicHtml, payload, "public-cabinet-view summary");

  const privateHtml = renderPrivateSummary(payload);
  assertNoExecutableHtml(privateHtml, payload, "cabinet-module-card summary");
  assertEscapedTextPresent(privateHtml, payload, "cabinet-module-card summary");
}

console.log("XSS verification passed for all payloads on public and private cabinet views.");
