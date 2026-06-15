import type { SalaryByRegion } from "@/types/role";

export const SALARY_SOC: readonly SalaryByRegion[] = [
  {
    region: "United Kingdom",
    entry: "£28k–£38k",
    mid: "£42k–£58k",
    senior: "£58k–£78k",
  },
  {
    region: "United States",
    entry: "$55k–$75k",
    mid: "$85k–$110k",
    senior: "$110k–$145k",
  },
  {
    region: "Europe (EU)",
    entry: "€32k–€42k",
    mid: "€45k–€62k",
    senior: "€62k–€85k",
  },
  {
    region: "Rest of world",
    entry: "$25k–$45k",
    mid: "$45k–$75k",
    senior: "$75k–$110k",
  },
] as const;

export const SALARY_PENTEST: readonly SalaryByRegion[] = [
  {
    region: "United Kingdom",
    entry: "£35k–£48k",
    mid: "£55k–£75k",
    senior: "£75k–£100k",
  },
  {
    region: "United States",
    entry: "$70k–$95k",
    mid: "$110k–$145k",
    senior: "$145k–$190k",
  },
  {
    region: "Europe (EU)",
    entry: "€40k–€55k",
    mid: "€60k–€85k",
    senior: "€85k–€120k",
  },
  {
    region: "Rest of world",
    entry: "$35k–$55k",
    mid: "$55k–$90k",
    senior: "$90k–$140k",
  },
] as const;

export const SALARY_AZURE: readonly SalaryByRegion[] = [
  {
    region: "United Kingdom",
    entry: "£45k–£58k",
    mid: "£60k–£82k",
    senior: "£82k–£110k",
  },
  {
    region: "United States",
    entry: "$95k–$120k",
    mid: "$125k–$160k",
    senior: "$160k–$210k",
  },
  {
    region: "Europe (EU)",
    entry: "€50k–€65k",
    mid: "€68k–€90k",
    senior: "€90k–€125k",
  },
  {
    region: "Rest of world",
    entry: "$45k–$70k",
    mid: "$70k–$110k",
    senior: "$110k–$160k",
  },
] as const;

export const SALARY_GRC: readonly SalaryByRegion[] = [
  {
    region: "United Kingdom",
    entry: "£30k–£40k",
    mid: "£45k–£60k",
    senior: "£60k–£85k",
  },
  {
    region: "United States",
    entry: "$60k–$80k",
    mid: "$90k–$115k",
    senior: "$115k–$150k",
  },
  {
    region: "Europe (EU)",
    entry: "€34k–€44k",
    mid: "€48k–€65k",
    senior: "€65k–€90k",
  },
  {
    region: "Rest of world",
    entry: "$28k–$48k",
    mid: "$48k–$80k",
    senior: "$80k–$115k",
  },
] as const;

export const SALARY_APPSEC: readonly SalaryByRegion[] = [
  {
    region: "United Kingdom",
    entry: "£45k–£60k",
    mid: "£65k–£85k",
    senior: "£85k–£115k",
  },
  {
    region: "United States",
    entry: "$100k–$130k",
    mid: "$135k–$175k",
    senior: "$175k–$230k",
  },
  {
    region: "Europe (EU)",
    entry: "€50k–€68k",
    mid: "€72k–€95k",
    senior: "€95k–€130k",
  },
  {
    region: "Rest of world",
    entry: "$40k–$70k",
    mid: "$70k–$120k",
    senior: "$120k–$170k",
  },
] as const;
