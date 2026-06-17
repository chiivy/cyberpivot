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
      "Shared responsibility, cloud building blocks, and how Azure, AWS, and GCP differ.",
    readingTime: "45 min",
    labTime: "30-45 min",
    status: "coming-soon",
    nextModule: "python-for-security",
    cabinetArtifact: {
      name: "Cloud Environment Lab Notes",
      description:
        "Documented cloud fundamentals lab work from Foundation Module 5",
    },
  },
  {
    title: "Python for Security",
    slug: "python-for-security",
    module: 6,
    level: "Foundation",
    description:
      "Enough Python to automate tasks, write simple tools, and read scripts on the job.",
    readingTime: "40 min",
    labTime: "30-45 min",
    status: "coming-soon",
    nextModule: null,
    cabinetArtifact: {
      name: "Python Security Automation Script",
      description:
        "A working Python script produced during Foundation Module 6",
    },
  },
] as const;
