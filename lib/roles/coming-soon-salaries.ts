import type { SalaryByRegion } from "@/types/role";

export const SALARY_INCIDENT_RESPONDER: readonly SalaryByRegion[] = [
  { region: "United Kingdom", entry: "£40k–£55k", mid: "£55k–£75k", senior: "£75k–£110k+" },
  { region: "United States", entry: "$70k–$90k", mid: "$90k–$120k", senior: "$120k–$160k+" },
  { region: "Europe (EU)", entry: "€42k–€60k", mid: "€60k–€90k", senior: "€90k–€130k+" },
  { region: "Nigeria", entry: "₦200k–₦400k", mid: "₦500k–₦900k", senior: "₦900k–₦1.8m+" },
] as const;

export const SALARY_THREAT_HUNTER: readonly SalaryByRegion[] = [
  { region: "United Kingdom", entry: "£50k–£65k", mid: "£65k–£85k", senior: "£85k–£120k+" },
  { region: "United States", entry: "$85k–$110k", mid: "$110k–$155k", senior: "$155k–$215k+" },
  { region: "Europe (EU)", entry: "€55k–€70k", mid: "€70k–€100k", senior: "€100k–€140k+" },
  { region: "Nigeria", entry: "₦300k–₦600k", mid: "₦700k–₦1.2m", senior: "₦1.2m–₦2.5m+" },
] as const;

export const SALARY_EDR_ANALYST: readonly SalaryByRegion[] = [
  { region: "United Kingdom", entry: "£32k–£48k", mid: "£48k–£68k", senior: "£68k–£95k+" },
  { region: "United States", entry: "$60k–$80k", mid: "$80k–$110k", senior: "$110k–$145k+" },
  { region: "Europe (EU)", entry: "€38k–€55k", mid: "€55k–€80k", senior: "€80k–€115k+" },
  { region: "Nigeria", entry: "₦175k–₦350k", mid: "₦400k–₦750k", senior: "₦850k–₦1.6m+" },
] as const;

export const SALARY_VA_ANALYST: readonly SalaryByRegion[] = [
  { region: "United Kingdom", entry: "£28k–£42k", mid: "£42k–£60k", senior: "£60k–£85k+" },
  { region: "United States", entry: "$55k–$75k", mid: "$75k–$105k", senior: "$105k–$135k+" },
  { region: "Europe (EU)", entry: "€35k–€50k", mid: "€50k–€75k", senior: "€75k–€105k+" },
  { region: "Nigeria", entry: "₦150k–₦300k", mid: "₦350k–₦650k", senior: "₦750k–₦1.4m+" },
] as const;

export const SALARY_RED_TEAMER: readonly SalaryByRegion[] = [
  { region: "United Kingdom", entry: "£45k–£65k", mid: "£65k–£90k", senior: "£90k–£140k+" },
  { region: "United States", entry: "$85k–$110k", mid: "$110k–$150k", senior: "$150k–$200k+" },
  { region: "Europe (EU)", entry: "€48k–€68k", mid: "€68k–€95k", senior: "€95k–€140k+" },
  { region: "Nigeria", entry: "₦250k–₦500k", mid: "₦600k–₦1.1m", senior: "₦1.2m–₦2.2m+" },
] as const;

export const SALARY_DEVSECOPS: readonly SalaryByRegion[] = [
  { region: "United Kingdom", entry: "£42k–£60k", mid: "£60k–£85k", senior: "£85k–£130k+" },
  { region: "United States", entry: "$90k–$115k", mid: "$115k–$155k", senior: "$155k–$210k+" },
  { region: "Europe (EU)", entry: "€48k–€68k", mid: "€68k–€98k", senior: "€98k–€140k+" },
  { region: "Nigeria", entry: "₦250k–₦500k", mid: "₦600k–₦1.1m", senior: "₦1.2m–₦2.2m+" },
] as const;

export const SALARY_AI_SECURITY: readonly SalaryByRegion[] = [
  { region: "United Kingdom", entry: "£45k–£65k", mid: "£65k–£95k", senior: "£95k–£150k+" },
  { region: "United States", entry: "$95k–$125k", mid: "$125k–$170k", senior: "$170k–$250k+" },
  { region: "Europe (EU)", entry: "€52k–€75k", mid: "€75k–€110k", senior: "€110k–€160k+" },
  { region: "Nigeria", entry: "₦300k–₦600k", mid: "₦700k–₦1.3m", senior: "₦1.4m–₦2.8m+" },
] as const;

export const SALARY_AWS: readonly SalaryByRegion[] = [
  { region: "United Kingdom", entry: "£42k–£60k", mid: "£60k–£88k", senior: "£88k–£135k+" },
  { region: "United States", entry: "$90k–$120k", mid: "$120k–$160k", senior: "$160k–$210k+" },
  { region: "Europe (EU)", entry: "€52k–€72k", mid: "€72k–€102k", senior: "€102k–€145k+" },
  { region: "Nigeria", entry: "₦270k–₦540k", mid: "₦650k–₦1.3m", senior: "₦1.3m–₦2.6m+" },
] as const;

export const SALARY_GCP: readonly SalaryByRegion[] = SALARY_AWS;

export const SALARY_NETWORK_SECURITY: readonly SalaryByRegion[] = [
  { region: "United Kingdom", entry: "£35k–£52k", mid: "£52k–£75k", senior: "£75k–£110k+" },
  { region: "United States", entry: "$75k–$100k", mid: "$100k–$135k", senior: "$135k–$175k+" },
  { region: "Europe (EU)", entry: "€42k–€60k", mid: "€60k–€88k", senior: "€88k–€125k+" },
  { region: "Nigeria", entry: "₦200k–₦400k", mid: "₦500k–₦950k", senior: "₦1m–₦2m+" },
] as const;

export const SALARY_IDENTITY: readonly SalaryByRegion[] = [
  { region: "United Kingdom", entry: "£40k–£58k", mid: "£58k–£82k", senior: "£82k–£125k+" },
  { region: "United States", entry: "$85k–$110k", mid: "$110k–$148k", senior: "$148k–$195k+" },
  { region: "Europe (EU)", entry: "€48k–€68k", mid: "€68k–€98k", senior: "€98k–€138k+" },
  { region: "Nigeria", entry: "₦250k–₦480k", mid: "₦580k–₦1.1m", senior: "₦1.2m–₦2.3m+" },
] as const;

export const SALARY_EMAIL_SECURITY: readonly SalaryByRegion[] = [
  { region: "United Kingdom", entry: "£32k–£48k", mid: "£48k–£68k", senior: "£68k–£95k+" },
  { region: "United States", entry: "$65k–$85k", mid: "$85k–$115k", senior: "$115k–$150k+" },
  { region: "Europe (EU)", entry: "€38k–€55k", mid: "€55k–€80k", senior: "€80k–€115k+" },
  { region: "Nigeria", entry: "₦175k–₦350k", mid: "₦400k–₦750k", senior: "₦850k–₦1.5m+" },
] as const;

export const SALARY_COMPLIANCE: readonly SalaryByRegion[] = [
  { region: "United Kingdom", entry: "£28k–£40k", mid: "£40k–£58k", senior: "£58k–£80k+" },
  { region: "United States", entry: "$52k–$70k", mid: "$70k–$95k", senior: "$95k–$130k+" },
  { region: "Europe (EU)", entry: "€30k–€45k", mid: "€45k–€65k", senior: "€65k–€92k+" },
  { region: "Nigeria", entry: "₦150k–₦280k", mid: "₦320k–₦620k", senior: "₦700k–₦1.3m+" },
] as const;

export const SALARY_RISK: readonly SalaryByRegion[] = [
  { region: "United Kingdom", entry: "£30k–£45k", mid: "£45k–£65k", senior: "£65k–£90k+" },
  { region: "United States", entry: "$55k–$75k", mid: "$75k–$105k", senior: "$105k–$140k+" },
  { region: "Europe (EU)", entry: "€32k–€48k", mid: "€48k–€70k", senior: "€70k–€100k+" },
  { region: "Nigeria", entry: "₦150k–₦300k", mid: "₦350k–₦680k", senior: "₦750k–₦1.4m+" },
] as const;

export const SALARY_SECURITY_AUDITOR: readonly SalaryByRegion[] = [
  { region: "United Kingdom", entry: "£32k–£48k", mid: "£48k–£70k", senior: "£70k–£100k+" },
  { region: "United States", entry: "$58k–$78k", mid: "$78k–$108k", senior: "$108k–$145k+" },
  { region: "Europe (EU)", entry: "€35k–€52k", mid: "€52k–€75k", senior: "€75k–€108k+" },
  { region: "Nigeria", entry: "₦160k–₦320k", mid: "₦370k–₦700k", senior: "₦800k–₦1.5m+" },
] as const;

export const BUG_BOUNTY_SALARY_NOTE =
  "Bug bounty hunting is not a traditional salaried role. Top hunters earn $100k–$500k+ annually from programmes. Realistically, expect $5k–$20k in your first year while you build a track record. It works best as a supplement to a pentesting career, not a starting point.";

export const VCISO_SALARY_NOTE =
  "vCISO is almost always a senior consulting or fractional role. UK rates range from £90k–£180k+ annually for fractional engagements. US rates often run $200–$400 per hour. In Nigeria fractional vCISO engagements range from ₦800k–₦3m+ monthly depending on scope. You typically need 10+ years of security experience before this becomes a realistic path.";

export const AI_SECURITY_SALARY_EXTRA =
  "This is one of the fastest growing roles in cybersecurity right now. Only 14% of organisations believe they have the necessary AI security talent (World Economic Forum 2025). Getting in early means less competition and higher demand.";
