import type {
  RoleCommunityResource,
  RoleInterviewQuestion,
  RoleLabRequirements,
  RoleMisconception,
  RolePrerequisite,
  RoleRelatedRole,
} from "@/types/role";

import { API_SECURITY_ENGINEER_REGULATIONS } from "@/lib/roles/regulations/api-security-engineer";

export const API_SECURITY_ENGINEER_ENRICHED = {
  dayInTheLife:
    "Morning you review new API endpoints the dev team added overnight. You read the OpenAPI spec, check auth requirements, and flag anything missing rate limits or object-level checks. You run a Postman security collection against staging and note failures. Mid-morning you investigate one auth anomaly from API gateway logs: unusual token refresh pattern, possible credential stuffing. Afternoon you update the API threat model with the new endpoints and data flows. End of day you refresh the API security checklist the team uses before release. A normal two-hour block is testing BOLA on three endpoints and writing up findings with request/response examples.",
  misconceptions: [
    {
      myth: "API security is just web app testing with different tools",
      reality:
        "Auth patterns, business logic, and machine-to-machine data flow are fundamentally different from browser-based testing.",
    },
    {
      myth: "APIs are secured by the gateway",
      reality:
        "Gateways handle rate limiting and basic auth. They cannot catch business logic flaws or broken object-level authorization.",
    },
    {
      myth: "Only external APIs need security review",
      reality:
        "Internal microservice APIs are frequently the real attack surface. Attackers pivot through them after initial access.",
    },
  ] as const satisfies readonly RoleMisconception[],
  handsOnProjects: [
    "Deploy OWASP crAPI locally in Docker",
    "Find and exploit all OWASP API Top 10 vulnerability classes in the lab",
    "Build a Postman security testing collection with automated checks",
    "Perform a JWT algorithm confusion attack and document the fix",
    "Document an OAuth misconfiguration, exploit it in the lab, and write remediation steps",
  ],
  labRequirements: {
    minimumSpecs: "8GB RAM",
    diskSpace: "25GB free disk space",
    installs: ["Docker", "Postman (free tier)"],
    setupTime: "Roughly 2 hours",
    osSupport: "Windows (WSL2), macOS, and Linux",
  } as const satisfies RoleLabRequirements,
  interviewQuestions: [
    {
      question: "What is the difference between BOLA and BFLA?",
      goodAnswer:
        "BOLA is broken object-level authorization: accessing another user's data by changing an ID. BFLA is broken function-level authorization: a regular user calling an admin-only endpoint.",
    },
    {
      question: "Walk me through how you would test an OAuth 2.0 implementation",
      goodAnswer:
        "Check redirect URI validation, state parameter, token storage, scope enforcement, and refresh token rotation. Test for authorization code interception and client secret exposure.",
    },
    {
      question: "How does JWT algorithm confusion work?",
      goodAnswer:
        "The server accepts a token signed with a weak algorithm (like HS256) using the public key as the secret. Attacker forges a token with admin claims. Mitigation is strict algorithm allowlisting.",
    },
    {
      question: "What does excessive data exposure look like in an API response?",
      goodAnswer:
        "The API returns more fields than the client needs: internal IDs, PII, or admin flags. Compare responses across roles and trim at the serializer level.",
    },
    {
      question: "How would you secure an internal microservices API?",
      goodAnswer:
        "Mutual TLS or service mesh identity, network segmentation, least-privilege scopes, and auth on every internal call. Never trust the network alone.",
    },
  ] as const satisfies readonly RoleInterviewQuestion[],
  relatedRoles: [
    {
      name: "AppSec Engineer",
      note: "If you want broader application security scope beyond APIs.",
    },
    {
      name: "DevSecOps Engineer",
      note: "If pipeline security and deployment automation interest you.",
    },
    {
      name: "Penetration Tester",
      note: "If you want the full offensive scope across web, network, and API.",
    },
    {
      name: "Cloud Security Engineer",
      note: "If API gateway and cloud-native security patterns are your focus.",
    },
  ] as const satisfies readonly RoleRelatedRole[],
  communityAndResources: [
    { name: "APIsec University", note: "Free courses on API security testing" },
    { name: "OWASP API Security Project", note: "API Top 10 and testing guides" },
    { name: "r/netsec", note: "Technical security discussion" },
    { name: "Hacking APIs by Corey Ball", note: "Practical book on API penetration testing" },
    { name: "Katie Paxton-Fear YouTube (InsiderPhD)", note: "Accessible bug bounty and web/API testing content" },
  ] as const satisfies readonly RoleCommunityResource[],
  prerequisites: [
    {
      module: "Networking Fundamentals",
      reason: "HTTP methods, headers, TLS, and how APIs sit on the network.",
    },
    {
      module: "Security Fundamentals",
      reason: "Auth concepts, OWASP categories, and how to write clear findings.",
    },
    {
      module: "REST API basics",
      reason: "Not a Foundation module, but helpful. Understand endpoints, JSON, status codes, and OAuth flows before you start.",
    },
  ] as const satisfies readonly RolePrerequisite[],
  regulationsAndStandards: API_SECURITY_ENGINEER_REGULATIONS,
} as const;
