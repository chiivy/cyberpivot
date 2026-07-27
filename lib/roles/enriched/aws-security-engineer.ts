import type {
  RoleCommunityResource,
  RoleInterviewQuestion,
  RoleLabRequirements,
  RoleMisconception,
  RolePrerequisite,
  RoleRelatedRole,
} from "@/types/role";

import { AWS_SECURITY_ENGINEER_REGULATIONS } from "@/lib/roles/regulations/aws-security-engineer";

export const AWS_SECURITY_ENGINEER_ENRICHED = {
  dayInTheLife:
    "Morning starts in Security Hub and GuardDuty. You review new findings, check what changed overnight, and pick the highest-risk misconfigurations to fix or assign. Then you open CloudTrail and investigate an unusual IAM activity alert: which role, which API calls, which resources touched. Mid-morning might be an S3 bucket policy review or a Security Group change request from an application team. Afternoon you tune a Config rule that fires too often, or pair with infra on a VPC endpoint design. End of day you audit break-glass access usage and update the team on open cloud incidents.",
  misconceptions: [
    {
      myth: "AWS security is just clicking through the console",
      reality:
        "Architecture decisions, IAM policy design, and CloudTrail queries are real skills. The console is where you work, not all there is to learn.",
    },
    {
      myth: "The shared responsibility model means AWS handles security",
      reality:
        "AWS secures the cloud. You secure everything you put in it: identity, data, network paths, and logging.",
    },
    {
      myth: "One cert covers AWS security",
      reality:
        "Security Specialty plus Solutions Architect Associate is the realistic combination for most roles. You need to understand the services you are securing.",
    },
  ] as const satisfies readonly RoleMisconception[],
  handsOnProjects: [
    "Configure IAM with least privilege and MFA for admin access",
    "Enable GuardDuty, Security Hub, and CloudTrail across a lab account",
    "Remediate public S3 buckets and overprivileged roles found by Prowler",
    "Write CloudTrail queries to detect suspicious API activity",
    "Build a cloud incident response runbook for compromised credentials",
    "Produce a CIS AWS benchmark compliance report with gaps prioritised",
  ],
  labRequirements: {
    minimumSpecs: "4GB RAM for local tooling",
    diskSpace: "20GB free disk space for scripts and exports",
    installs: ["AWS free tier account", "AWS CLI", "Prowler or ScoutSuite"],
    setupTime: "Roughly 2 hours including account setup",
    osSupport: "Windows, macOS, and Linux. Labs run in AWS, not on your machine.",
    additionalNotes:
      "AWS free tier requires a credit card. Tear down lab resources when done to avoid charges.",
  } as const satisfies RoleLabRequirements,
  interviewQuestions: [
    {
      question: "Walk me through how you would investigate compromised AWS credentials",
      goodAnswer:
        "Check CloudTrail for unusual API calls and source IPs. Review IAM activity, new access keys, and privilege changes. Contain by disabling keys, rotating credentials, and reviewing resource changes in the blast radius.",
    },
    {
      question: "What is the difference between an IAM role and an IAM user?",
      goodAnswer:
        "Users are long-lived identities for people. Roles are temporary credentials for services, applications, or federated access. Roles with least privilege are preferred for almost everything automated.",
    },
    {
      question: "How would you detect data exfiltration from S3?",
      goodAnswer:
        "CloudTrail data events on sensitive buckets, VPC Flow Logs, GuardDuty findings, and unusual GetObject volume from unexpected principals or regions.",
    },
    {
      question: "What is Security Hub and why use it?",
      goodAnswer:
        "It aggregates findings from GuardDuty, Inspector, Config, and partner tools into one view with compliance standards like CIS. It is your posture dashboard, not a replacement for fixing issues.",
    },
    {
      question: "How do you enforce encryption for data at rest in AWS?",
      goodAnswer:
        "Default encryption on S3, EBS, and RDS. KMS keys with rotation. Config rules to detect unencrypted resources. Bucket policies that deny unencrypted uploads.",
    },
  ] as const satisfies readonly RoleInterviewQuestion[],
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
    {
      name: "SOC Analyst",
      note: "If you want to move into security operations and live in the SIEM.",
    },
  ] as const satisfies readonly RoleRelatedRole[],
  communityAndResources: [
    { name: "AWS Security Blog", note: "Official security announcements and guidance" },
    { name: "Prowler project", note: "Open source AWS security assessment tool" },
    { name: "Cloud Security Podcast", note: "Practitioner interviews on cloud security" },
    { name: "r/aws", note: "AWS community on Reddit" },
    { name: "Anton Babenko Terraform AWS modules", note: "Reference patterns for secure infrastructure" },
    { name: "AWS re:Invent security talks on YouTube", note: "Deep dives from AWS security teams" },
  ] as const satisfies readonly RoleCommunityResource[],
  prerequisites: [
    {
      module: "Networking Fundamentals",
      reason: "VPCs, security groups, and NACLs are core to AWS security design.",
    },
    {
      module: "Cloud Fundamentals",
      reason: "Shared responsibility, regions, and IAM basics before you secure them.",
    },
    {
      module: "Security Fundamentals",
      reason: "Threat models, logging, and incident basics applied to cloud workloads.",
    },
  ] as const satisfies readonly RolePrerequisite[],
  regulationsAndStandards: AWS_SECURITY_ENGINEER_REGULATIONS,
} as const;
