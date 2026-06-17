import type { FoundationModuleMeta } from "@/types/foundation";

export interface FoundationCabinetArtifactMeta {
  name: string;
  description: string;
}

export interface FoundationModuleIndexEntry extends FoundationModuleMeta {
  cabinetArtifact: FoundationCabinetArtifactMeta;
}

export const FOUNDATION_MODULES: readonly FoundationModuleIndexEntry[] = [
  {
    title: "How the Internet Actually Works",
    slug: "how-the-internet-works",
    module: 1,
    level: "Foundation",
    description:
      "Capture and read real network traffic. Understand how packets, IP addresses, DNS, ports, and protocols work in practice before you touch anything else.",
    readingTime: "45 min",
    labTime: "30-45 min",
    status: "available",
    nextModule: "linux-fundamentals",
    cabinetArtifact: {
      name: "Packet Capture Analysis",
      description:
        "Documented analysis of a real network capture, your first portfolio entry",
    },
  },
  {
    title: "Linux Fundamentals",
    slug: "linux-fundamentals",
    module: 2,
    level: "Foundation",
    description:
      "Navigate a Linux filesystem, read and search logs, understand permissions, and investigate running processes before you touch a real security tool.",
    readingTime: "50 min",
    labTime: "45-60 min",
    status: "available",
    nextModule: "windows-active-directory",
    cabinetArtifact: {
      name: "Linux Investigation Log",
      description:
        "Documented Linux filesystem, permissions, and process investigation, your second portfolio entry",
    },
  },
  {
    title: "Windows and Active Directory",
    slug: "windows-active-directory",
    module: 3,
    level: "Foundation",
    description:
      "Build a real Active Directory domain from scratch, understand users, groups, OUs, Group Policy, and why Active Directory is one of the most heavily targeted systems in enterprise security.",
    readingTime: "60 min",
    labTime: "90-120 min (optional)",
    status: "available",
    nextModule: "security-fundamentals",
    cabinetArtifact: {
      name: "Active Directory Investigation Notes",
      description:
        "Documented Windows and Active Directory lab work, your third portfolio entry",
    },
  },
  {
    title: "Security Fundamentals",
    slug: "security-fundamentals",
    module: 4,
    level: "Foundation",
    description:
      "Understand encryption, certificates, the TLS handshake, and why hashing a file is not the same as hashing a password, with a real breach case study.",
    readingTime: "55 min",
    labTime: "45-60 min",
    status: "available",
    nextModule: "cloud-fundamentals",
    cabinetArtifact: {
      name: "Cryptography and Authentication Investigation",
      description:
        "Documented Security Fundamentals lab work, your fourth portfolio entry",
    },
  },
  {
    title: "Cloud Fundamentals",
    slug: "cloud-fundamentals",
    module: 5,
    level: "Foundation",
    description:
      "Understand what cloud computing actually is, the shared responsibility model, and the major providers, with a hands-on Azure lab covering a real storage misconfiguration.",
    readingTime: "60 min",
    labTime: "60-75 min",
    status: "available",
    nextModule: "python-for-security",
    cabinetArtifact: {
      name: "Cloud Setup and Security Investigation",
      description:
        "Documented Cloud Fundamentals lab work, your fifth portfolio entry",
    },
  },
  {
    title: "Python for Security",
    slug: "python-for-security",
    module: 6,
    level: "Foundation",
    description:
      "Learn enough Python to read, modify, and write small security scripts, then automate the log investigation, file hashing, and cloud storage checks from earlier Foundation modules.",
    readingTime: "55 min",
    labTime: "60-75 min",
    status: "available",
    nextModule: null,
    cabinetArtifact: {
      name: "Security Automation Scripts",
      description:
        "Three working Python scripts and a documented writeup, your sixth and final Foundation portfolio entry",
    },
  },
] as const;
