import type {
  RoleCommunityResource,
  RoleInterviewQuestion,
  RoleLabRequirements,
  RoleMisconception,
  RolePrerequisite,
  RoleRelatedRole,
} from "@/types/role";

import { PENTESTER_REGULATIONS } from "@/lib/roles/regulations/penetration-tester";

export const PENTESTER_ENRICHED = {
  dayInTheLife:
    "Morning starts with scoping review. You confirm what is in scope, what is off limits, and what the client cares about most. Then passive recon: OSINT, DNS history, certificate transparency, anything that does not touch the target directly. Mid-morning you move to active scanning and enumeration. Nmap, service fingerprinting, web crawling. You note everything because you will need it in the report. Afternoon is exploitation attempts and manual testing. Tools find the easy wins. Your hands find the chained issues that matter. When you find something good, you screenshot it immediately. End of day is notes and evidence organisation. Never skip documentation because you found something exciting. Tomorrow's you will not remember the exact command.",
  misconceptions: [
    {
      myth: "Pentesting is just running automated tools",
      reality:
        "Tools find low-hanging fruit. Manual testing, business logic flaws, and chained exploits find the issues clients actually care about.",
    },
    {
      myth: "You need to find everything in scope",
      reality:
        "Engagements have defined objectives and time boxes. You report what you find within scope, not every theoretical flaw on the internet.",
    },
    {
      myth: "The job is all about hacking",
      reality:
        "Reporting is roughly 40 percent of the work. If you cannot explain risk to a client, the finding does not get fixed.",
    },
  ] as const satisfies readonly RoleMisconception[],
  handsOnProjects: [
    "Set up Kali in WSL2 or a dedicated VM",
    "Run passive and active recon on a target scope",
    "Use Burp Suite to find and exploit an IDOR vulnerability",
    "Escalate privileges from a low-privilege user to admin",
    "Write a professional pentest report with executive summary and technical findings",
  ],
  labRequirements: {
    minimumSpecs: "8GB RAM",
    recommendedSpecs: "16GB RAM",
    diskSpace: "100GB free disk space",
    installs: ["Kali Linux (WSL2 on Windows or dedicated VM)", "Burp Suite Community", "Target lab VMs"],
    setupTime: "Roughly 4 hours for a complete beginner",
    osSupport: "Windows with WSL2, macOS, and Linux. A dedicated Kali VM works on all three.",
  } as const satisfies RoleLabRequirements,
  interviewQuestions: [
    {
      question: "Walk me through your methodology for a black box web app test",
      goodAnswer:
        "Recon and mapping first, then authentication and session testing, input validation, access control, and business logic. Document as you go. Stay in scope.",
    },
    {
      question: "You find a critical SQLi vulnerability at 4pm on Friday. What do you do?",
      goodAnswer:
        "Notify the client immediately through the agreed channel. Do not exploit further than needed to prove impact. Document steps and recommend urgent remediation. Follow the engagement rules of engagement.",
    },
    {
      question: "How do you write findings for a non-technical audience?",
      goodAnswer:
        "Executive summary in plain language: what happened, business risk, and priority. Technical detail in an appendix for the team that will fix it.",
    },
    {
      question: "What is the difference between stored and reflected XSS?",
      goodAnswer:
        "Stored XSS persists on the server and hits every user who views the page. Reflected XSS bounces off the request and typically needs the victim to click a crafted link.",
    },
    {
      question: "How do you stay within scope during an engagement?",
      goodAnswer:
        "Read the scope document before you start. When in doubt, ask the client contact. Log every target IP and URL you touch. Out-of-scope testing is a career-ending mistake.",
    },
  ] as const satisfies readonly RoleInterviewQuestion[],
  relatedRoles: [
    {
      name: "Red Teamer",
      note: "If you want full adversary simulation against mature security teams.",
    },
    {
      name: "Bug Bounty Hunter",
      note: "If you want independence and pay-per-finding work on your own schedule.",
    },
    {
      name: "AppSec Engineer",
      note: "If you want to shift left and work inside development teams.",
    },
    {
      name: "Vulnerability Assessment Analyst",
      note: "If you want to start with scanning and triage before full exploitation skills.",
    },
  ] as const satisfies readonly RoleRelatedRole[],
  communityAndResources: [
    { name: "HackTheBox", note: "Online labs and machines for practice" },
    { name: "TryHackMe", note: "Guided learning paths for beginners through advanced" },
    { name: "PortSwigger Web Security Academy", note: "Free web security labs and explanations" },
    { name: "r/netsec", note: "Technical security news and discussion" },
    { name: "NahamSec YouTube", note: "Bug bounty and web testing walkthroughs" },
    { name: "TCM Security YouTube", note: "Practical offensive security training" },
    { name: "The Cyber Mentor", note: "Beginner-friendly pentest courses and labs" },
  ] as const satisfies readonly RoleCommunityResource[],
  prerequisites: [
    {
      module: "Networking Fundamentals",
      reason: "You need to understand how traffic moves before you can scan or exploit it.",
    },
    {
      module: "Linux Fundamentals",
      reason: "Kali and most lab targets run Linux. Comfort on the command line is non-negotiable.",
    },
    {
      module: "Security Fundamentals",
      reason: "Attack types, vulnerability classes, and how to describe risk clearly.",
    },
  ] as const satisfies readonly RolePrerequisite[],
  regulationsAndStandards: PENTESTER_REGULATIONS,
} as const;
