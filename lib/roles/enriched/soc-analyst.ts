import type {
  RoleCommunityResource,
  RoleInterviewQuestion,
  RoleLabRequirements,
  RoleMisconception,
  RolePrerequisite,
  RoleRelatedRole,
} from "@/types/role";

import { SOC_ANALYST_REGULATIONS } from "@/lib/roles/regulations/soc-analyst";

export const SOC_ANALYST_ENRICHED = {
  dayInTheLife:
    "Shift starts with the SIEM dashboard. You read the overnight handover notes, check who is on call, and open the alert queue sorted by severity. First hour is triage: close obvious false positives, assign real items, escalate anything that looks like active compromise. Mid-morning you pick the top three alerts and investigate properly. That means pulling logs, checking the endpoint, correlating IPs, and deciding if this is phishing, malware, or someone testing credentials. You document everything in the ticket as you go. Afternoon you might review a threat intel feed, update a detection rule that fired too often, or help a colleague close their queue. End of shift you write handover notes: what is open, what needs watching, what the next analyst should check first.",
  misconceptions: [
    {
      myth: "You need to know how to hack to defend",
      reality:
        "False at Tier 1. You need to understand how attacks show up in logs. Offensive skills help later, not on day one.",
    },
    {
      myth: "SOC work is just watching dashboards",
      reality:
        "Triage is real work. A good investigation means reading logs, asking questions, and knowing when to escalate.",
    },
    {
      myth: "You need a degree to get hired",
      reality:
        "Certs and hands-on lab work matter more at entry level. A portfolio of investigations beats a generic CV.",
    },
  ] as const satisfies readonly RoleMisconception[],
  handsOnProjects: [
    "Deploy Wazuh and connect it to your lab",
    "Ingest Windows Event logs, Sysmon, Linux auth logs, and network flow data",
    "Write five custom detection rules for common attack patterns",
    "Investigate a simulated brute force attack from first alert to closure",
    "Write the incident report with timeline, impact, and recommendations",
    "Hunt for lateral movement that did not trigger any alert",
  ],
  labRequirements: {
    minimumSpecs: "8GB RAM",
    recommendedSpecs: "16GB RAM",
    diskSpace: "50GB free disk space",
    installs: ["Docker (via WSL2 on Windows)", "Wazuh stack", "A Windows and Linux VM for log sources"],
    setupTime: "Roughly 3 hours for a complete beginner following the lab guide",
    osSupport: "Windows (WSL2), macOS, and Linux. Windows users run Docker through WSL2.",
  } as const satisfies RoleLabRequirements,
  interviewQuestions: [
    {
      question: "Walk me through investigating a suspicious login alert",
      goodAnswer:
        "Start with the alert context: user, source IP, time, and auth result. Check if the IP is known, if MFA was used, and whether the user reported anything. Correlate with other logins from that account in the last 24 hours. Escalate if you see impossible travel or privilege changes.",
    },
    {
      question: "What is the difference between IDS and IPS?",
      goodAnswer:
        "IDS detects and alerts. IPS can block traffic inline. Both use signatures or behaviour rules, but IPS sits in the path and can drop packets.",
    },
    {
      question: "How do you handle 200 alerts at shift start?",
      goodAnswer:
        "Sort by severity and confidence. Batch obvious false positives using known patterns. Triage the top critical items first. Document what you deferred and why.",
    },
    {
      question: "What is a false positive and how do you reduce alert fatigue?",
      goodAnswer:
        "A false positive is a detection that fires on benign activity. Tune rules, add context (asset criticality, user role), and feed back to detection engineering so the same noise does not return tomorrow.",
    },
    {
      question: "Explain MITRE ATT&CK to a non-technical manager",
      goodAnswer:
        "It is a catalogue of how attackers actually behave, step by step. We map our detections and gaps to it so we can say what we can see and what we are blind to.",
    },
  ] as const satisfies readonly RoleInterviewQuestion[],
  relatedRoles: [
    {
      name: "Threat Hunter",
      note: "If you want to go beyond alerts and search for threats that never fired a rule.",
    },
    {
      name: "EDR Analyst",
      note: "If endpoint telemetry and detection engineering interest you most.",
    },
    {
      name: "Incident Responder",
      note: "If you want to own the full response from containment through recovery.",
    },
    {
      name: "GRC Analyst",
      note: "If you prefer process, policy, and risk conversations over live tooling.",
    },
  ] as const satisfies readonly RoleRelatedRole[],
  communityAndResources: [
    { name: "BlueTeamLabs Online", note: "Practical blue team challenges and labs" },
    { name: "r/blueteamsec", note: "Reddit community for defensive security practitioners" },
    { name: "SANS Blue Team Summit talks on YouTube", note: "Conference talks from working analysts" },
    { name: "13Cubed YouTube", note: "DFIR and Windows forensics walkthroughs" },
    { name: "The DFIR Report", note: "Real incident breakdowns with IOCs and timelines" },
  ] as const satisfies readonly RoleCommunityResource[],
  prerequisites: [
    {
      module: "Networking Fundamentals",
      reason: "You cannot read firewall or flow logs without understanding IPs, ports, and DNS.",
    },
    {
      module: "Linux Fundamentals",
      reason: "Most SIEM agents and servers run on Linux. You will SSH into boxes daily.",
    },
    {
      module: "Windows and Active Directory",
      reason: "Most enterprise alerts involve Windows auth events and AD objects.",
    },
    {
      module: "Security Fundamentals",
      reason: "CIA triad, common attack types, and how detections map to real behaviour.",
    },
  ] as const satisfies readonly RolePrerequisite[],
  regulationsAndStandards: SOC_ANALYST_REGULATIONS,
} as const;
