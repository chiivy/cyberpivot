import type {
  OnboardingAnswers,
  Q1Background,
  Q2WorkInstinct,
  Q4Terminal,
  Q5Goal,
  RoleRecommendation,
} from "@/types/onboarding";

import { environmentLabel } from "@/lib/onboarding/recommendation-engine";

function backgroundClause(q1: Q1Background): string | null {
  switch (q1) {
    case "no-background":
      return "You are starting without an IT background, so foundations come first.";
    case "it":
      return "Your IT background gives you a head start on the technical side.";
    case "developer":
      return "You already build software, which maps directly to application security work.";
    case "security":
      return "You are already in security, so you can move faster through foundations.";
    default:
      return null;
  }
}

function instinctClause(q2: Q2WorkInstinct): string {
  const map: Record<Q2WorkInstinct, string> = {
    investigate:
      "You are drawn to investigation: finding out what happened and why",
    "fix-fast":
      "You want to contain problems quickly before they spread",
    prevention:
      "You think in terms of prevention, process, and policy",
    replicate:
      "You want to understand attacks by thinking like an attacker",
    "build-right":
      "You focus on building systems that are secure from the start",
  };
  return map[q2];
}

function goalClause(q5: Q5Goal): string {
  const map: Record<Q5Goal, string> = {
    "job-from-scratch":
      "Your 12-month goal is a first job in cybersecurity",
    "it-to-security":
      "Your 12-month goal is moving from IT into a dedicated security role",
    "level-up":
      "Your 12-month goal is levelling up into something more senior or specialised",
    "understand-field":
      "Your 12-month goal is understanding the field well enough to commit to a direction",
  };
  return map[q5];
}

function terminalClause(q4: Q4Terminal, role: RoleRecommendation): string | null {
  if (role.pathSlug !== "pentest" && role.pathSlug !== "soc") {
    return null;
  }
  if (q4 === "very-comfortable") {
    return "You are comfortable in the terminal, which matters for hands-on technical work";
  }
  if (q4 === "somewhat") {
    return "You can get by in the terminal, and the path builds that comfort as you go";
  }
  return null;
}

function roleFitClause(
  role: RoleRecommendation,
  answers: OnboardingAnswers,
): string {
  const displayName =
    role.comingSoon && role.targetRoleName ? role.targetRoleName : role.roleName;

  if (role.comingSoon && role.bridgeRole) {
    return `${displayName} is the long-term fit. ${role.bridgeRole.name} is where you start now`;
  }

  if (
    answers.q2WorkInstinct === "investigate" &&
    answers.q3Environment === "soc"
  ) {
    return `${role.roleName} is the most direct path from where you are to where you want to be`;
  }

  if (
    answers.q2WorkInstinct === "replicate" &&
    answers.q4Terminal === "very-comfortable"
  ) {
    return `${role.roleName} matches how you think and the tools you are ready to use`;
  }

  if (
    answers.q2WorkInstinct === "prevention" &&
    answers.q3Environment === "business"
  ) {
    return `${role.roleName} fits process-focused work without requiring deep terminal skills`;
  }

  return `${displayName} lines up with how you answered and where you want to end up`;
}

export function generateWhyExplanation(
  answers: OnboardingAnswers,
  role: RoleRecommendation,
  foundationFirst: boolean,
): string {
  const opening = `${instinctClause(answers.q2WorkInstinct)}. You picture yourself working in ${environmentLabel(answers.q3Environment)}.`;

  const context =
    backgroundClause(answers.q1Background) ??
    terminalClause(answers.q4Terminal, role) ??
    `${goalClause(answers.q5Goal)}.`;

  const fit = `${roleFitClause(role, answers)}.`;

  const parts = [opening, context, fit];

  if (foundationFirst) {
    parts.push(
      "Foundation modules come first so you are not guessing at tools you have never touched.",
    );
  } else if (role.pathNote) {
    parts.push(role.pathNote);
  }

  return parts.slice(0, 3).join(" ");
}
