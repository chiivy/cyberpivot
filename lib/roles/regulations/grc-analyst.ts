import type { RoleRegulation } from "@/types/role";

export const GRC_ANALYST_REGULATIONS: readonly RoleRegulation[] = [
  {
    name: "GDPR and UK GDPR",
    description:
      "The foundation of data protection compliance in the UK and EU. You map controls to GDPR requirements, manage DPIAs, maintain Article 30 records of processing, and coordinate breach notification. The ICO can fine up to £17.5m or 4% of global turnover.",
  },
  {
    name: "NDPR",
    description:
      "Nigeria's data protection regulation enforced by the NDPC. Annual audits are required for data controllers of major importance. In Nigeria you own this compliance programme.",
  },
  {
    name: "SOX",
    description:
      "US public companies must maintain internal controls over financial reporting. IT General Controls are a major part of SOX compliance. GRC analysts in US-listed companies or their subsidiaries work to SOX requirements.",
  },
  {
    name: "PCI-DSS 4.0",
    description:
      "Twelve requirements covering any organisation that processes, stores, or transmits card payment data. You scope the cardholder data environment, manage the assessment process, and coordinate remediation. Work to 4.0, not the older 3.2.1.",
  },
  {
    name: "HIPAA",
    description:
      "US healthcare organisations and their business associates must protect protected health information. GRC analysts in healthcare manage the Security Rule risk analysis and implementation specifications.",
  },
  {
    name: "ISO 27001:2022",
    description:
      "The international standard for information security management. You implement the ISMS, manage the risk register, coordinate internal audits, and prepare for external certification audits.",
  },
  {
    name: "NIS2",
    description:
      "EU directive on network and information security. Applies to essential and important entities across 18 sectors. Incident reporting obligations, supply chain security requirements, and management accountability provisions all land on GRC.",
  },
  {
    name: "Cyber Essentials",
    description:
      "UK government-backed certification. Mandatory for UK government contracts. You manage the self-assessment process and coordinate with technical teams on the five controls.",
  },
  {
    name: "SOC 2",
    description:
      "Common for SaaS and technology companies. Trust Service Criteria audit. You manage readiness, evidence collection, and the relationship with the auditor.",
  },
  {
    name: "NIST CSF 2.0",
    description:
      "Widely adopted especially in US-aligned organisations. You use it to assess current security posture and build improvement roadmaps.",
  },
  {
    name: "COBIT 2019",
    description:
      "IT governance framework published by ISACA. Used in large enterprises to govern IT processes and align them to business objectives. You use it to assess IT governance maturity and map controls to ISO 27001 and NIST CSF.",
  },
  {
    name: "COSO ERM",
    description:
      "Enterprise Risk Management framework. Standard for internal control in US financial services and SOX-compliant organisations. You use it to structure risk assessments and demonstrate the link between risk management and business objectives to the board.",
  },
  {
    name: "CBN Cybersecurity Framework",
    description:
      "Mandatory for Nigerian banks and financial institutions. Issued by the Central Bank of Nigeria. GRC analysts in Nigerian banking own compliance with this framework.",
  },
  {
    name: "NCSC Cyber Assessment Framework",
    description:
      "UK government framework for operators of essential services and critical national infrastructure. GRC analysts in UK regulated sectors use it alongside NIS Regulations compliance.",
  },
  {
    name: "DORA",
    description:
      "EU financial services firms must meet specific operational resilience requirements from January 2025. GRC analysts in EU financial services manage this compliance programme.",
  },
  {
    name: "Knowing your regulatory landscape",
    description:
      "A core GRC skill. Map your organisation's profile (geography, industry, data types, customer base) to the regulations that apply. A Nigerian fintech with UK and EU customers faces NDPR, GDPR, UK GDPR, and PCI-DSS simultaneously. Understanding how to prioritise and manage overlapping obligations is what separates a good GRC analyst from someone who just knows the framework names.",
  },
] as const;
