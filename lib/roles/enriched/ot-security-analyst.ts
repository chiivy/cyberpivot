import type {
  RoleCommunityResource,
  RoleInterviewQuestion,
  RoleLabRequirements,
  RoleMisconception,
  RolePrerequisite,
  RoleRelatedRole,
} from "@/types/role";

export const OT_SECURITY_ANALYST_ENRICHED = {
  dayInTheLife:
    "Morning starts with a check on OT monitoring dashboards and any overnight alerts from building management or access-control systems. You review passive traffic summaries, confirm nothing unexpected crossed the IT/OT boundary, and triage any vendor remote-access sessions scheduled for the day. Mid-morning you might investigate an alert on Modbus write traffic, correlate it with change records, and decide whether it is legitimate maintenance or worth escalating. Afternoon work is often documentation: updating the asset inventory, refining detection rules, or preparing a brief for IT leadership on a segmentation gap you found. When IT reports ransomware on the corporate network, your job is to answer whether the building systems are reachable from that foothold, fast and with evidence.",
  careerSwitcherNote:
    "OT Security Analyst is an entry point into OT security for people transitioning from SOC work, network engineering, IT administration, or control systems engineering. It is rarely a first job in the industry. This is distinct from SOC Analyst, which is a genuine career-zero entry point.",
  misconceptions: [
    {
      myth: "OT security is just IT security on older computers",
      reality:
        "OT priorities are safety and availability first. Patching, rebooting, and scanning are not free actions when a device controls cooling, power, or access.",
    },
    {
      myth: "You need a controls engineering degree to start",
      reality:
        "Many OT security analysts come from IT security or networking. You need curiosity about industrial protocols and willingness to learn how physical processes are controlled.",
    },
    {
      myth: "OT roles are only in oil and gas",
      reality:
        "Banks, hospitals, campuses, utilities, and manufacturers all run building management, access control, and power systems that need OT-aware security.",
    },
  ] as const satisfies readonly RoleMisconception[],
  handsOnProjects: [
    "Analyse Modbus traffic in Wireshark and identify unauthenticated write commands",
    "Map a lab environment to Purdue levels with zones and conduits",
    "Configure network segmentation in GRFICS and verify blocked paths",
    "Build passive OT monitoring with Malcolm on industrial PCAP data",
    "Produce a one-page OT versus IT brief for a non-specialist manager",
    "Document Quorivane's OT segmentation design with IT/OT DMZ labelled",
  ],
  labRequirements: {
    minimumSpecs: "8GB RAM for analysis-only modules",
    recommendedSpecs: "16GB RAM for GRFICS and Malcolm running together",
    diskSpace: "30GB free disk space",
    installs: ["Wireshark", "GRFICS or PCAP datasets", "Malcolm (later modules)"],
    setupTime: "Roughly 1 hour for Module 1 analysis setup; 2-3 hours for full GRFICS lab",
    osSupport: "Windows, macOS, and Linux. Module 1 requires only Wireshark.",
    additionalNotes:
      "Modules with live labs offer local, optional cloud VPS, and log-package-only routes. See each module's route callout for details.",
  } as const satisfies RoleLabRequirements,
  interviewQuestions: [
    {
      question: "Why did Colonial Pipeline shut down operations when the attack was on IT systems?",
      goodAnswer:
        "They could not prove the attacker was walled off from operational systems. In OT, uncertainty about IT-to-OT reachability forces conservative shutdown decisions because physical consequence outweighs data loss.",
    },
    {
      question: "What is the Purdue model and why does it matter?",
      goodAnswer:
        "A layered reference architecture from Level 0 physical process up to Level 5 enterprise IT, with Level 3.5 as the industrial DMZ. It defines where boundaries and controls should sit so IT incidents cannot jump straight to controllers.",
    },
    {
      question: "Why is active vulnerability scanning risky in OT?",
      goodAnswer:
        "Some controllers are fragile and can crash or behave unpredictably under scan traffic. OT monitoring leans on passive techniques instead of active probing.",
    },
    {
      question: "What makes Modbus traffic a security concern?",
      goodAnswer:
        "Commands are typically unauthenticated and unencrypted. Anyone who can reach the network can read and send function codes, including writes that change physical outputs.",
    },
    {
      question: "What is a zone and a conduit in IEC 62443 terms?",
      goodAnswer:
        "A zone groups assets with similar security requirements. A conduit is the controlled path between zones where only explicitly permitted traffic is allowed.",
    },
  ] as const satisfies readonly RoleInterviewQuestion[],
  prerequisites: [
    {
      module: "Foundation Module 1 — How the Internet Actually Works",
      reason:
        "Packet capture and protocol reading skills underpin every OT traffic analysis module.",
    },
    {
      module: "Foundation Module 4 — Security Fundamentals",
      reason:
        "CIA triad reordering in OT builds directly on understanding confidentiality, integrity, and availability in IT contexts.",
    },
  ] as const satisfies readonly RolePrerequisite[],
  relatedRoles: [
    {
      name: "SOC Analyst",
      note: "Common transition path into OT security for analysts who want to specialise in industrial environments.",
    },
    {
      name: "OT Security Engineer",
      note: "The engineering track that owns segmentation builds, monitoring deployment, and hardening implementation.",
    },
    {
      name: "GRC Analyst",
      note: "Relevant for IEC 62443, NERC CIP, and other OT compliance work that sits alongside technical controls.",
    },
  ] as const satisfies readonly RoleRelatedRole[],
  communityAndResources: [
    {
      name: "SANS ICS courses and GIAC GICSP",
      note: "Widely recognised OT security training path.",
    },
    {
      name: "CISA ICS advisories and guidance",
      note: "Free government resources on OT threats and architecture.",
    },
    {
      name: "Digital Bond and automayt ICS PCAP repositories",
      note: "Public capture files for practising industrial protocol analysis.",
    },
  ] as const satisfies readonly RoleCommunityResource[],
  regulationsAndStandards: [
    {
      name: "IEC 62443",
      description:
        "Global standard family for industrial automation and control systems security, including zones and conduits.",
    },
    {
      name: "ISA/IEC 62443-3-2",
      description:
        "Risk-based methodology for defining zones and conduits across a Purdue-aligned architecture.",
    },
    {
      name: "NERC CIP",
      description:
        "North American electric sector reliability standards. Relevant as a regional regulatory layer for US energy assets.",
    },
  ],
};
