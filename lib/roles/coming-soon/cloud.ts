import type { ComingSoonRoleContent } from "@/types/role";

import { CABINET_PREVIEW_BY_SLUG } from "@/lib/roles/coming-soon-cabinet";
import {
  SALARY_AWS,
  SALARY_EMAIL_SECURITY,
  SALARY_GCP,
  SALARY_IDENTITY,
  SALARY_NETWORK_SECURITY,
} from "@/lib/roles/coming-soon-salaries";

export const CLOUD_COMING_SOON_ROLES: readonly ComingSoonRoleContent[] = [
  {
    slug: "aws-security-engineer",
    name: "AWS Security Engineer",
    domain: "Cloud and Infrastructure Security",
    domainId: "cloud-infrastructure-security",
    level: "Mid",
    v1: false,
    dayToDay:
      "You secure AWS accounts day to day. GuardDuty findings, IAM reviews, Security Hub scores, and misconfigured S3 buckets fill most of your queue. You also write CloudTrail queries, tune Config rules, and help application teams deploy without opening the network to the internet.",
    differentiator:
      "Azure security engineers live in Entra ID and Sentinel. You live in IAM, GuardDuty, and the AWS shared responsibility model. Network security engineers own firewalls and segmentation. You own cloud-native controls and account hygiene.",
    background:
      "Cloud administration or sysadmin background with AWS exposure is the usual path. You need IAM fluency, basic networking, and comfort reading CloudTrail. AWS certifications help but labs matter more at interview.",
    salaryDisplay: { type: "table", salaries: SALARY_AWS },
    industries: [
      "Technology and SaaS",
      "Fintech",
      "Retail and e-commerce",
      "Consultancies",
      "Startups on AWS-native stacks",
    ],
    toolsFree: [
      "Prowler",
      "ScoutSuite",
      "CloudTrail Lake queries",
      "Steampipe",
      "aws-nuke (lab only)",
    ],
    toolsEnterprise: [
      "AWS Security Hub",
      "GuardDuty and Detective",
      "Wiz or Prisma Cloud",
      "Splunk or Datadog for CloudTrail",
      "Terraform with Checkov",
    ],
    certs: [
      {
        name: "AWS Certified Security – Specialty",
        note: "The hire signal for dedicated AWS security roles. Covers IAM, logging, and incident response in AWS.",
      },
      {
        name: "AWS Solutions Architect Associate",
        note: "Foundation cert. Shows you understand the services you are securing, not just the security tools.",
      },
      {
        name: "CCSP",
        note: "Vendor-neutral cloud security. Useful for roles spanning AWS and hybrid environments.",
      },
    ],
    careerProgression: [
      "Senior AWS security engineer or cloud security architect",
      "Cloud incident responder",
      "Multi-cloud security lead",
    ],
    relatedRoles: [
      {
        name: "Azure Security Engineer",
        note: "Same job, different cloud. Many engineers learn one deeply then pick up the second.",
      },
      {
        name: "GCP Security Engineer",
        note: "Google Cloud equivalent with SCC and Chronicle in the mix.",
      },
      {
        name: "DevSecOps Engineer",
        note: "When your AWS work centres on pipelines and IaC rather than account operations.",
      },
    ],
    cabinetPreview: CABINET_PREVIEW_BY_SLUG["aws-security-engineer"],
  },
  {
    slug: "gcp-security-engineer",
    name: "GCP Security Engineer",
    domain: "Cloud and Infrastructure Security",
    domainId: "cloud-infrastructure-security",
    level: "Mid",
    v1: false,
    dayToDay:
      "You work in Security Command Center, IAM, and organisation policies. Findings from misconfigured buckets, overprivileged service accounts, and VPC issues land in your queue. Teams running GKE add container security to the mix. You also integrate Chronicle or third-party SIEM when the org outgrows native tooling.",
    differentiator:
      "AWS security engineers think in IAM roles and GuardDuty. You think in organisation policies, workload identity, and SCC. Azure engineers live in Entra ID. GCP identity and data controls have their own sharp edges.",
    background:
      "GCP administration or platform engineering experience helps. Kubernetes exposure is common because many GCP shops run GKE. Networking basics and scripting for automation are expected.",
    salaryDisplay: { type: "table", salaries: SALARY_GCP },
    industries: [
      "Technology and data-heavy SaaS",
      "Media and analytics",
      "Fintech",
      "Consultancies",
      "Enterprises standardising on GCP",
    ],
    toolsFree: [
      "Forseti (legacy patterns) / open policy agents",
      "gcloud CLI auditing",
      "kube-bench",
      "Trivy for containers",
      "OpenCVE monitoring",
    ],
    toolsEnterprise: [
      "Security Command Center Premium",
      "Chronicle SIEM",
      "Wiz or Orca for multi-cloud",
      "Google BeyondCorp Enterprise",
      "Terraform with policy checks",
    ],
    certs: [
      {
        name: "Google Professional Cloud Security Engineer",
        note: "Directly aligned to the role. Covers SCC, IAM, and GCP incident response patterns.",
      },
      {
        name: "Google Professional Cloud Architect",
        note: "Foundation for understanding what you are securing across compute, data, and networking.",
      },
      {
        name: "CKS",
        note: "Relevant when GKE is in scope. Container security is a large part of many GCP security jobs.",
      },
    ],
    careerProgression: [
      "Senior GCP security engineer or cloud architect",
      "Detection engineer on Chronicle",
      "Multi-cloud security lead",
    ],
    relatedRoles: [
      {
        name: "AWS Security Engineer",
        note: "Comparable role on the other major hyperscaler.",
      },
      {
        name: "Azure Security Engineer",
        note: "Microsoft stack equivalent. Skills transfer at the architecture level.",
      },
      {
        name: "DevSecOps Engineer",
        note: "When GKE and CI/CD security dominate your week.",
      },
    ],
    cabinetPreview: CABINET_PREVIEW_BY_SLUG["gcp-security-engineer"],
  },
  {
    slug: "network-security-engineer",
    name: "Network Security Engineer",
    domain: "Cloud and Infrastructure Security",
    domainId: "cloud-infrastructure-security",
    level: "Entry to Mid",
    v1: false,
    dayToDay:
      "You manage firewalls, VPNs, and segmentation. Change requests, rule reviews, and troubleshooting connectivity issues take most of your week. You also tune IDS/IPS, review TLS configs, and push back when someone asks for any-any rules because it is easier.",
    differentiator:
      "Cloud security engineers own IAM and cloud-native controls. You own the packets. SOC analysts see alerts from your gear but do not configure it. Identity engineers own authentication. You own where traffic is allowed to flow.",
    background:
      "Networking background is expected. CCNA-level knowledge is a common baseline. Security interest on top of routing, switching, and firewalls is the usual career path. Scripting for automation is increasingly required.",
    salaryDisplay: { type: "table", salaries: SALARY_NETWORK_SECURITY },
    industries: [
      "Enterprises with on-prem estates",
      "Telecoms and ISPs",
      "Manufacturing",
      "Healthcare",
      "Government and defence",
    ],
    toolsFree: [
      "Wireshark",
      "nmap",
      "OpenSense / pfSense",
      "Suricata",
      "testssl.sh",
    ],
    toolsEnterprise: [
      "Palo Alto or Fortinet firewalls",
      "Cisco ASA / FTD",
      "Zscaler or Netskope (SSE)",
      "Splunk or QRadar for network logs",
      "Infoblox or BlueCat for DNS security",
    ],
    certs: [
      {
        name: "CCNA",
        note: "Networking foundation. Many network security roles expect routing and switching basics.",
      },
      {
        name: "PCNSA (Palo Alto)",
        note: "Common when the estate runs Palo Alto firewalls. Vendor cert but widely listed.",
      },
      {
        name: "CompTIA Security+",
        note: "Security baseline for engineers moving from pure networking into security-focused roles.",
      },
    ],
    careerProgression: [
      "Senior network security engineer or architect",
      "Zero trust network architect",
      "Cloud network security specialist",
    ],
    relatedRoles: [
      {
        name: "Cloud Security Engineer",
        note: "When segmentation moves into VPCs, security groups, and cloud firewalls.",
      },
      {
        name: "SOC Analyst",
        note: "If you prefer investigating alerts over configuring gear.",
      },
      {
        name: "Identity Security Engineer",
        note: "Zero trust often pairs network segmentation with strong identity controls.",
      },
    ],
    cabinetPreview: CABINET_PREVIEW_BY_SLUG["network-security-engineer"],
  },
  {
    slug: "identity-security-engineer",
    name: "Identity Security Engineer",
    domain: "Cloud and Infrastructure Security",
    domainId: "cloud-infrastructure-security",
    level: "Mid",
    v1: false,
    dayToDay:
      "You own how people and machines authenticate and what they can access. MFA rollouts, SSO integrations, privileged access reviews, and service account hygiene fill your calendar. When someone gets phished, you are in the room tracing sessions, revoking tokens, and tightening policies.",
    differentiator:
      "Cloud security engineers secure workloads and data stores. You secure the keys to those workloads. Network engineers control traffic flow. You control who is allowed on the network in the first place.",
    background:
      "Active Directory, Entra ID, or Okta administration experience is the common path. You need to understand SAML, OIDC, and conditional access without treating them as magic. LDAP and group policy basics still matter in hybrid estates.",
    salaryDisplay: { type: "table", salaries: SALARY_IDENTITY },
    industries: [
      "Large enterprises",
      "Financial services",
      "Healthcare",
      "Technology",
      "Government",
    ],
    toolsFree: [
      "BloodHound Community Edition",
      "ldapdomaindump",
      "PingCastle",
      "MITRE ATT&CK for identity techniques",
      "OpenID Connect test clients",
    ],
    toolsEnterprise: [
      "Microsoft Entra ID / Defender for Identity",
      "Okta or Ping Identity",
      "CyberArk or Delinea PAM",
      "SailPoint or Saviynt IGA",
      "CrowdStrike Identity Protection",
    ],
    certs: [
      {
        name: "SC-300",
        note: "Microsoft identity and access administrator. Directly relevant for Entra-heavy environments.",
      },
      {
        name: "Okta Certified Professional",
        note: "Standard cert for Okta-centric identity programmes.",
      },
      {
        name: "CISSP",
        note: "Common at senior identity architect level. Broad but recognised for IAM leadership roles.",
      },
    ],
    careerProgression: [
      "Identity security architect",
      "PAM programme lead",
      "Zero trust programme owner",
    ],
    relatedRoles: [
      {
        name: "Azure Security Engineer",
        note: "Heavy overlap when the estate is Microsoft-centric.",
      },
      {
        name: "Cloud Security Engineer",
        note: "IAM is often the hardest part of cloud security work.",
      },
      {
        name: "SOC Analyst",
        note: "Identity compromise investigations are a major SOC workload.",
      },
    ],
    cabinetPreview: CABINET_PREVIEW_BY_SLUG["identity-security-engineer"],
  },
  {
    slug: "email-security-engineer",
    name: "Email Security Engineer",
    domain: "Cloud and Infrastructure Security",
    domainId: "cloud-infrastructure-security",
    level: "Entry to Mid",
    v1: false,
    dayToDay:
      "You keep email from being the easiest way into the company. SPF, DKIM, and DMARC records, gateway tuning, and phishing triage are daily work. You investigate suspicious messages, adjust rules when campaigns shift, and work with identity teams when credentials get stolen through a link.",
    differentiator:
      "SOC analysts investigate phishing alerts among everything else. You own the email stack and authentication records. Incident responders run the breach. You stop many breaches from starting in the inbox.",
    background:
      "Messaging or IT administration background helps. You need DNS literacy, basic malware analysis intuition, and patience for false positives from aggressive gateways. Microsoft 365 or Google Workspace admin experience is common.",
    salaryDisplay: { type: "table", salaries: SALARY_EMAIL_SECURITY },
    industries: [
      "Enterprises of all sizes",
      "Financial services",
      "Legal and professional services",
      "Healthcare",
      "Education",
    ],
    toolsFree: [
      "MXToolbox",
      "dmarcian / parsedmarc",
      "PhishTool",
      "urlscan.io",
      "ANY.RUN sandbox (free tier)",
    ],
    toolsEnterprise: [
      "Proofpoint or Mimecast",
      "Microsoft Defender for Office 365",
      "Abnormal Security",
      "Cofense for phishing simulation",
      "Area 1 / Cloudflare email security",
    ],
    certs: [
      {
        name: "SC-400",
        note: "Microsoft information protection admin. Covers M365 email security features directly.",
      },
      {
        name: "CompTIA Security+",
        note: "Baseline for engineers moving from messaging admin into security-focused email roles.",
      },
      {
        name: "BTL1",
        note: "Practical defensive skills including phishing analysis workflows.",
      },
    ],
    careerProgression: [
      "Senior email security engineer",
      "Security awareness programme lead",
      "SOC lead with messaging specialisation",
    ],
    relatedRoles: [
      {
        name: "SOC Analyst",
        note: "Phishing triage is core SOC work. Specialisation goes deeper on gateways and auth.",
      },
      {
        name: "Identity Security Engineer",
        note: "Credential theft from email often becomes an identity incident.",
      },
      {
        name: "Incident Responder",
        note: "When a phish leads to a full compromise.",
      },
    ],
    cabinetPreview: CABINET_PREVIEW_BY_SLUG["email-security-engineer"],
  },
] as const;
