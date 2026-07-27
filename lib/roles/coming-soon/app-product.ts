import type { ComingSoonRoleContent } from "@/types/role";

import { CABINET_PREVIEW_BY_SLUG } from "@/lib/roles/coming-soon-cabinet";
import {
  AI_SECURITY_SALARY_EXTRA,
  SALARY_AI_SECURITY,
} from "@/lib/roles/coming-soon-salaries";

export const APP_PRODUCT_COMING_SOON_ROLES: readonly ComingSoonRoleContent[] = [
  {
    slug: "ai-security-engineer",
    name: "AI Security Engineer",
    domain: "Application and Product Security",
    domainId: "application-product-security",
    level: "Mid to Senior",
    v1: false,
    dayToDay:
      "You review LLM features, RAG pipelines, and agent workflows before they reach production. Most days mix threat modeling, prompt injection testing, and policy conversations with teams who want to ship AI fast. You also track new attack research and translate it into controls developers can actually implement.",
    differentiator:
      "AppSec engineers secure traditional applications. You secure systems where the attack surface includes prompts, models, and retrieval data. Cloud security engineers own infrastructure. You own how AI features fail safely.",
    background:
      "AppSec or cloud security background plus curiosity about ML systems works. You do not need to train models, but you need to understand inference, RAG, and agent tool use. Python literacy and comfort reading API docs for OpenAI, Anthropic, or similar providers helps.",
    salaryDisplay: { type: "table", salaries: SALARY_AI_SECURITY },
    salaryExtraNote: AI_SECURITY_SALARY_EXTRA,
    industries: [
      "Technology and SaaS",
      "Financial services adopting AI",
      "Healthcare AI",
      "Consultancies",
      "Government and defence contractors",
    ],
    toolsFree: [
      "garak",
      "promptfoo",
      "OWASP LLM Top 10 resources",
      "MITRE ATLAS",
      "LangChain / local model labs",
    ],
    toolsEnterprise: [
      "Lakera Guard or similar guardrails",
      "Azure AI Content Safety",
      "AWS Bedrock guardrails",
      "HiddenLayer or CalypsoAI",
      "Internal red team platforms for LLM",
    ],
    certs: [
      {
        name: "AAISM (ISC2)",
        note: "Early AI security credential. Signals intent in a field where certs are still forming.",
      },
      {
        name: "OSCP or BSCP",
        note: "Offensive foundation still matters. Injection and auth bypass skills transfer to LLM apps.",
      },
      {
        name: "CSSLP",
        note: "Secure SDLC framing for teams shipping AI features into existing products.",
      },
    ],
    careerProgression: [
      "Lead AI security or ML security architect",
      "AI governance or responsible AI lead",
      "AppSec lead with AI portfolio ownership",
    ],
    relatedRoles: [
      {
        name: "AppSec Engineer",
        note: "Traditional application security before specialising in LLM attack surfaces.",
      },
      {
        name: "DevSecOps Engineer",
        note: "When AI features ship through the same CI/CD pipelines you secure.",
      },
      {
        name: "GRC Analyst",
        note: "If EU AI Act and governance work interests you more than hands-on testing.",
      },
    ],
    cabinetPreview: CABINET_PREVIEW_BY_SLUG["ai-security-engineer"],
  },
] as const;
