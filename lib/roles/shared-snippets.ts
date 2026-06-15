import type { SalaryByRegion } from "@/types/role";

/** Shown under every role page salary table (DECISIONS.md). */
export const SALARY_TABLE_NOTE =
  "UK, US, and EU figures are annual base salary before tax and benefits. Nigeria figures are monthly. Remote roles for international employers often pay at UK or EU rates regardless of location. Banking, fintech, and telecoms pay at the top end of every range.";

export const SALARY_SOC: readonly SalaryByRegion[] = [
  {
    region: "United Kingdom",
    entry: "£32k–£45k",
    mid: "£45k–£65k",
    senior: "£65k–£92k",
  },
  {
    region: "United States",
    entry: "$55k–$75k",
    mid: "$75k–$100k",
    senior: "$100k–$145k",
  },
  {
    region: "Europe (EU)",
    entry: "€35k–€55k",
    mid: "€55k–€85k",
    senior: "€80k–€120k+",
  },
  {
    region: "Nigeria",
    entry: "₦150k–₦300k",
    mid: "₦350k–₦700k",
    senior: "₦800k–₦1.5m+",
  },
] as const;

export const SALARY_PENTEST: readonly SalaryByRegion[] = [
  {
    region: "United Kingdom",
    entry: "£35k–£50k",
    mid: "£55k–£80k",
    senior: "£80k–£120k+",
  },
  {
    region: "United States",
    entry: "$75k–$100k",
    mid: "$100k–$130k",
    senior: "$130k–$170k+",
  },
  {
    region: "Europe (EU)",
    entry: "€38k–€55k",
    mid: "€55k–€85k",
    senior: "€85k–€120k+",
  },
  {
    region: "Nigeria",
    entry: "₦200k–₦400k",
    mid: "₦500k–₦900k",
    senior: "₦1m–₦2m+",
  },
] as const;

export const SALARY_AZURE: readonly SalaryByRegion[] = [
  {
    region: "United Kingdom",
    entry: "£40k–£58k",
    mid: "£58k–£85k",
    senior: "£85k–£130k+",
  },
  {
    region: "United States",
    entry: "$90k–$115k",
    mid: "$115k–$150k",
    senior: "$150k–$200k+",
  },
  {
    region: "Europe (EU)",
    entry: "€52k–€72k",
    mid: "€72k–€100k",
    senior: "€100k–€138k+",
  },
  {
    region: "Nigeria",
    entry: "₦250k–₦500k",
    mid: "₦600k–₦1.2m",
    senior: "₦1.2m–₦2.5m+",
  },
] as const;

export const SALARY_GRC: readonly SalaryByRegion[] = [
  {
    region: "United Kingdom",
    entry: "£28k–£40k",
    mid: "£40k–£60k",
    senior: "£60k–£85k+",
  },
  {
    region: "United States",
    entry: "$55k–$75k",
    mid: "$75k–$105k",
    senior: "$105k–$140k+",
  },
  {
    region: "Europe (EU)",
    entry: "€32k–€48k",
    mid: "€48k–€70k",
    senior: "€70k–€100k+",
  },
  {
    region: "Nigeria",
    entry: "₦150k–₦300k",
    mid: "₦350k–₦700k",
    senior: "₦800k–₦1.5m+",
  },
] as const;

export const SALARY_APPSEC: readonly SalaryByRegion[] = [
  {
    region: "United Kingdom",
    entry: "£40k–£58k",
    mid: "£58k–£85k",
    senior: "£85k–£145k+",
  },
  {
    region: "United States",
    entry: "$85k–$110k",
    mid: "$110k–$150k",
    senior: "$145k–$190k+",
  },
  {
    region: "Europe (EU)",
    entry: "€45k–€65k",
    mid: "€65k–€95k",
    senior: "€95k–€140k+",
  },
  {
    region: "Nigeria",
    entry: "₦250k–₦450k",
    mid: "₦500k–₦1m",
    senior: "₦1m–₦2m+",
  },
] as const;

export const SALARY_API_SECURITY: readonly SalaryByRegion[] = [
  {
    region: "United Kingdom",
    entry: "£38k–£55k",
    mid: "£55k–£80k",
    senior: "£80k–£130k+",
  },
  {
    region: "United States",
    entry: "$80k–$105k",
    mid: "$105k–$140k",
    senior: "$140k–$180k+",
  },
  {
    region: "Europe (EU)",
    entry: "€42k–€62k",
    mid: "€62k–€90k",
    senior: "€90k–€130k+",
  },
  {
    region: "Nigeria",
    entry: "₦200k–₦400k",
    mid: "₦450k–₦900k",
    senior: "₦900k–₦1.8m+",
  },
] as const;
