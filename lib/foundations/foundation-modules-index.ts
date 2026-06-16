import type { FoundationModuleMeta } from "@/types/foundation";

export const FOUNDATION_MODULES: readonly FoundationModuleMeta[] = [
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
  },
  {
    title: "Windows and Active Directory",
    slug: "windows-active-directory",
    module: 3,
    level: "Foundation",
    description:
      "How enterprise Windows networks work and why AD appears in almost every security role.",
    readingTime: "50 min",
    labTime: "45-60 min",
    status: "coming-soon",
    nextModule: "security-fundamentals",
  },
  {
    title: "Security Fundamentals",
    slug: "security-fundamentals",
    module: 4,
    level: "Foundation",
    description:
      "Cryptography in practice, authentication, PKI, and common protocols where they fail.",
    readingTime: "45 min",
    labTime: "30-45 min",
    status: "coming-soon",
    nextModule: "cloud-fundamentals",
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
  },
] as const;
