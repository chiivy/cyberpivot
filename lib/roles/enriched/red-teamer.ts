import type {
  RoleCommunityResource,
  RoleInterviewQuestion,
  RoleLabRequirements,
  RoleMisconception,
  RolePrerequisite,
  RoleRelatedRole,
} from "@/types/role";

import { PENTESTER_REGULATIONS } from "@/lib/roles/regulations/penetration-tester";

export const RED_TEAMER_ENRICHED = {
  dayInTheLife:
    "Week one of an engagement is planning and recon. You map the target environment, agree objectives with stakeholders, and build infrastructure that will not get you caught on day one. Mid-engagement you maintain access, move laterally, and avoid the detections the blue team thinks they have nailed. You document every TTP because the debrief is where the value lands. Between engagements you refresh tooling, study new evasion research, and brief defenders on what they missed. Reporting is not a afterthought. It is how the organisation learns.",
  misconceptions: [
    {
      myth: "Red team is just pentesting with more time",
      reality:
        "Pentests find vulnerabilities in scope. Red team exercises test detection and response against realistic adversary behaviour. Stealth and objectives matter as much as exploits.",
    },
    {
      myth: "You need to use Cobalt Strike on every engagement",
      reality:
        "Commercial C2 is common in enterprise red team but not the skill. Understanding tradecraft, OPSEC, and what defenders see matters more than one tool brand.",
    },
    {
      myth: "Red teamers never work with blue team",
      reality:
        "Purple team and debrief culture are standard. The job fails if findings sit in a PDF nobody acts on.",
    },
  ] as const satisfies readonly RoleMisconception[],
  handsOnProjects: [
    "Plan an adversary emulation mapped to MITRE ATT&CK for a lab environment",
    "Set up command and control infrastructure and document detection opportunities",
    "Execute lateral movement in a lab AD environment with stealth constraints",
    "Write a red team engagement report with attack path and detection gaps",
    "Build a post-exploitation report documenting simulated impact",
    "Run a purple team session and track which TTPs were detected",
  ],
  labRequirements: {
    minimumSpecs: "16GB RAM",
    recommendedSpecs: "32GB RAM",
    diskSpace: "100GB free disk space",
    installs: ["Kali or equivalent", "Active Directory lab VMs", "C2 framework for lab use"],
    setupTime: "Roughly 6 hours including AD lab setup",
    osSupport: "Windows with Hyper-V or VMware, or Linux with KVM. Dedicated hardware recommended.",
  } as const satisfies RoleLabRequirements,
  interviewQuestions: [
    {
      question: "How is red teaming different from penetration testing?",
      goodAnswer:
        "Pentests are scoped vulnerability assessments with fixed timelines. Red team simulates a realistic adversary with stealth, persistence, and defined objectives to test people, process, and detection.",
    },
    {
      question: "Walk me through planning a red team engagement",
      goodAnswer:
        "Define objectives and rules of engagement. Identify crown jewels. Map likely attack paths. Select TTPs aligned to threat intel. Plan infrastructure and OPSEC. Agree communication and stop conditions with stakeholders.",
    },
    {
      question: "What do you do when you get detected mid-engagement?",
      goodAnswer:
        "Follow the rules of engagement. Often you pause, notify the white cell, and either continue with adjusted tradecraft or pivot to debrief. Never surprise the client outside the agreed process.",
    },
    {
      question: "How do you measure red team success?",
      goodAnswer:
        "Objectives achieved, time to detection, quality of blue team response, and actionable improvements. Finding every CVE is not the goal.",
    },
    {
      question: "What is OPSEC in red team context?",
      goodAnswer:
        "Operational security: infrastructure that blends in, minimal footprint, encrypted channels, and awareness of what logs and EDR will capture about your activity.",
    },
  ] as const satisfies readonly RoleInterviewQuestion[],
  relatedRoles: [
    {
      name: "Penetration Tester",
      note: "The usual path in. Scoped tests before long-running adversary simulations.",
    },
    {
      name: "Threat Hunter",
      note: "Blue team side of the same coin. Some operators move between both.",
    },
    {
      name: "Bug Bounty Hunter",
      note: "Independent hunting on programmes. Different economics, overlapping skills.",
    },
    {
      name: "Malware Analyst",
      note: "If you want to understand payloads and detection at a deeper technical level.",
    },
  ] as const satisfies readonly RoleRelatedRole[],
  communityAndResources: [
    { name: "MITRE ATT&CK", note: "Adversary TTP catalogue for planning and debriefs" },
    { name: "Red Team Village", note: "Conference talks and community resources" },
    { name: "r/redteamsec", note: "Red team practitioner discussions" },
    { name: "SpecterOps training and blog", note: "Active Directory attack and defense research" },
    { name: "HackTheBox Pro Labs", note: "Long-form offensive scenarios" },
    { name: "Caldera", note: "Open source adversary emulation platform" },
  ] as const satisfies readonly RoleCommunityResource[],
  prerequisites: [
    {
      module: "Linux Fundamentals",
      reason: "Most offensive tooling and C2 infrastructure run on Linux.",
    },
    {
      module: "Windows and Active Directory",
      reason: "Enterprise red team engagements centre on AD attack paths.",
    },
    {
      module: "Security Fundamentals",
      reason: "Attack lifecycle, logging, and how defenders detect behaviour.",
    },
  ] as const satisfies readonly RolePrerequisite[],
  regulationsAndStandards: PENTESTER_REGULATIONS,
} as const;
