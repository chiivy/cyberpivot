import type { RolePathModuleMeta } from "@/types/role-path";
import {
  OT_SECURITY_ANALYST_ROLE_SLUG,
  OT_SECURITY_PATH_SLUG,
} from "@/types/role-path";

export interface OtCabinetArtifactMeta {
  name: string;
  description: string;
}

export interface OtModuleIndexEntry extends RolePathModuleMeta {
  cabinetArtifact: OtCabinetArtifactMeta;
}

export const OT_SECURITY_MODULES: readonly OtModuleIndexEntry[] = [
  {
    title: "What OT Security Actually Is, and Why IT Playbooks Break",
    slug: "module-01-what-ot-security-is",
    module: 1,
    level: "OT Security Analyst",
    roleSlug: OT_SECURITY_ANALYST_ROLE_SLUG,
    pathSlug: OT_SECURITY_PATH_SLUG,
    description:
      "Understand why OT security is not IT security applied to building systems, read industrial Modbus traffic in Wireshark, and produce a one-page brief your manager can act on.",
    readingTime: "50 min",
    labTime: "45 min",
    status: "available",
    previousModule: null,
    nextModule: "module-02-purdue-model-and-network-architecture",
    cabinetArtifact: {
      name: "OT versus IT decision brief",
      description:
        "One-page brief for Quorivane's IT security manager explaining why the IT incident playbook cannot be applied unchanged to building systems",
    },
  },
  {
    title: "The Purdue Model and OT Network Architecture",
    slug: "module-02-purdue-model-and-network-architecture",
    module: 2,
    level: "OT Security Analyst",
    roleSlug: OT_SECURITY_ANALYST_ROLE_SLUG,
    pathSlug: OT_SECURITY_PATH_SLUG,
    description:
      "Learn the Purdue model and zones and conduits, practise network segmentation in GRFICS, and produce a Purdue-aligned segmentation diagram for Quorivane's OT environment.",
    readingTime: "55 min",
    labTime: "60-90 min",
    status: "available",
    previousModule: "module-01-what-ot-security-is",
    nextModule: null,
    cabinetArtifact: {
      name: "Purdue-aligned network segmentation diagram",
      description:
        "Network segmentation design for Quorivane's OT environment with Purdue levels, zones, conduits, and IT/OT DMZ labelled",
    },
  },
] as const;
