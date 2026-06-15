import type {
  RoleCommunityResource,
  RoleInterviewQuestion,
  RoleLabRequirements,
  RoleMisconception,
  RolePrerequisite,
  RoleRelatedRole,
} from "@/types/role";

import { AZURE_SECURITY_ENGINEER_REGULATIONS } from "@/lib/roles/regulations/azure-security-engineer";

export const AZURE_SECURITY_ENGINEER_ENRICHED = {
  dayInTheLife:
    "Morning starts in Defender for Cloud and Secure Score. You review new recommendations, check what changed overnight, and pick the highest-risk misconfigurations to fix or assign. Then you open the Sentinel incident queue. One alert gets a full investigation: identity, resource, KQL queries across Log Analytics, correlation with sign-in logs. Afternoon might be policy work: reviewing a Conditional Access change request, checking PIM activation logs for unusual patterns, or pairing with infra on a Private Endpoint design. End of day you audit privileged role activations and update the team on open cloud incidents. Handover is less formal than a SOC shift but you leave notes on anything still in progress.",
  misconceptions: [
    {
      myth: "Azure security is just clicking through the portal",
      reality:
        "Architecture decisions and KQL queries are real skills. The portal is where you work, not all there is to learn.",
    },
    {
      myth: "You need to be a developer",
      reality:
        "You need to understand infrastructure, identity, and networking. Writing production code is not the job.",
    },
    {
      myth: "One cert covers Azure security",
      reality:
        "AZ-500 plus SC-200 is the realistic combination for most roles. Identity and operations are separate skill sets.",
    },
  ] as const satisfies readonly RoleMisconception[],
  handsOnProjects: [
    "Configure an Entra ID tenant with MFA and Conditional Access policies",
    "Set up PIM for privileged roles with approval workflows",
    "Deploy a Sentinel workspace with three data connectors",
    "Write five KQL detection rules for common cloud attack patterns",
    "Remediate Secure Score recommendations in a lab subscription",
    "Run a cloud incident response simulation from alert to containment",
  ],
  labRequirements: {
    minimumSpecs: "4GB RAM for local tooling",
    diskSpace: "20GB free disk space for scripts and exports",
    installs: ["Azure free tier account", "Azure CLI", "VS Code with KQL extensions"],
    setupTime: "Roughly 2 hours including tenant setup",
    osSupport: "Windows, macOS, and Linux. Labs run in Azure, not on your machine.",
    additionalNotes:
      "Azure free tier requires a credit card. You will not be charged if you stay within free tier limits and tear down lab resources when done.",
  } as const satisfies RoleLabRequirements,
  interviewQuestions: [
    {
      question: "Walk me through how you would investigate a compromised Azure identity",
      goodAnswer:
        "Check sign-in logs for impossible travel and risky sign-ins. Review PIM activations and role assignments. Hunt for new app registrations, consent grants, and mailbox rules. Contain by disabling the account and revoking sessions.",
    },
    {
      question: "What is the difference between Azure AD roles and RBAC roles?",
      goodAnswer:
        "Entra ID roles govern directory objects like users and groups. Azure RBAC governs access to Azure resources like VMs and storage. Both matter for least privilege.",
    },
    {
      question: "How does Conditional Access work and when would you use it?",
      goodAnswer:
        "Policies evaluate signals (user, device, location, risk) and grant, block, or require MFA. Use it to protect admin access, block legacy auth, and require compliant devices.",
    },
    {
      question: "What is PIM and why does it matter?",
      goodAnswer:
        "Privileged Identity Management gives just-in-time admin access with approval and audit trails. Standing global admin is a breach waiting to happen.",
    },
    {
      question: "How would you detect lateral movement in Azure using Sentinel?",
      goodAnswer:
        "Correlate sign-ins, resource creation, and network logs. Look for new role assignments, cross-subscription activity, and unusual service principal behaviour with KQL analytics rules.",
    },
  ] as const satisfies readonly RoleInterviewQuestion[],
  relatedRoles: [
    {
      name: "AWS Security Engineer",
      note: "If your target employer runs on AWS instead of Azure.",
    },
    {
      name: "Identity Security Engineer",
      note: "If Entra ID and identity architecture are your main interest.",
    },
    {
      name: "SOC Analyst",
      note: "If you want to move into security operations and live in the SIEM.",
    },
    {
      name: "Network Security Engineer",
      note: "If infrastructure and firewalls interest you more than cloud control planes.",
    },
  ] as const satisfies readonly RoleRelatedRole[],
  communityAndResources: [
    { name: "Microsoft Security Community", note: "Official community and learning paths" },
    { name: "Azure Sentinel GitHub", note: "Community detection rules and workbooks" },
    { name: "KQL Café YouTube", note: "KQL tutorials for Sentinel and Log Analytics" },
    { name: "Cloud Security Podcast", note: "Practitioner interviews on cloud security" },
    { name: "r/AZURE", note: "Azure community on Reddit" },
    { name: "John Savill YouTube", note: "Deep Azure technical explainers" },
  ] as const satisfies readonly RoleCommunityResource[],
  prerequisites: [
    {
      module: "Networking Fundamentals",
      reason: "NSGs, Private Endpoints, and VNets are core to cloud security design.",
    },
    {
      module: "Windows and Active Directory",
      reason: "Entra ID evolved from AD. Hybrid identity scenarios are common in enterprise.",
    },
    {
      module: "Cloud Fundamentals",
      reason: "Subscriptions, resource groups, and shared responsibility before you secure them.",
    },
    {
      module: "Security Fundamentals",
      reason: "Threat models, logging, and incident basics applied to cloud workloads.",
    },
  ] as const satisfies readonly RolePrerequisite[],
  regulationsAndStandards: AZURE_SECURITY_ENGINEER_REGULATIONS,
} as const;
