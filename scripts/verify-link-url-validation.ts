import { validateExternalLinkUrl } from "../lib/cabinet/validate-link-url";

const CASES = [
  { input: "http:iloveyou", expectValid: false },
  { input: "javascript:alert(1)", expectValid: false },
  { input: "my-blog-post", expectValid: false },
  { input: "http://localhost:3000/test", expectValid: false },
  { input: "https://example.com", expectValid: true },
  { input: "https://www.linkedin.com/posts/example", expectValid: true },
] as const;

let failed = 0;

for (const { input, expectValid } of CASES) {
  const result = validateExternalLinkUrl(input);
  const pass = result.valid === expectValid;

  console.log(
    JSON.stringify({
      input,
      expected: expectValid ? "accept" : "reject",
      actual: result.valid ? "accept" : "reject",
      normalized: result.normalized,
      error: result.error,
      pass,
    }),
  );

  if (!pass) {
    failed += 1;
  }
}

if (failed > 0) {
  console.error(`\n${failed} case(s) failed.`);
  process.exit(1);
}

console.log("\nAll link URL validation cases passed.");
