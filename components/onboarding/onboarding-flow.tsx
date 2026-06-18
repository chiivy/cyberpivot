"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { AnswerOption } from "@/components/onboarding/answer-option";
import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { OnboardingWordmark } from "@/components/onboarding/onboarding-wordmark";
import { ProgressIndicator } from "@/components/onboarding/progress-indicator";
import { Button } from "@/components/ui/button";
import { computeRecommendation } from "@/lib/onboarding/recommendation-engine";
import {
  CORE_QUESTIONS,
  getConditionalQ6,
  isCompleteAnswers,
  needsConditionalQ6,
  parseQ6Value,
  type FlowQuestion,
} from "@/lib/onboarding/questions";
import { writeOnboardingState } from "@/lib/onboarding/storage";
import { cn } from "@/lib/utils";
import type { OnboardingAnswers, Q3Environment } from "@/types/onboarding";

type FlowStep = "core" | "conditional";

export function OnboardingFlow(): React.ReactElement {
  const router = useRouter();
  const [step, setStep] = useState<FlowStep>("core");
  const [coreIndex, setCoreIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"forward" | "back">(
    "forward",
  );
  const [answers, setAnswers] = useState<Partial<OnboardingAnswers>>({});

  const totalSteps = useMemo((): number => {
    if (!answers.q3Environment) {
      return 5;
    }
    return needsConditionalQ6(answers.q3Environment) ? 6 : 5;
  }, [answers.q3Environment]);

  const currentStepNumber = useMemo((): number => {
    if (step === "core") {
      return coreIndex + 1;
    }
    if (step === "conditional") {
      return totalSteps;
    }
    return 1;
  }, [step, coreIndex, totalSteps]);

  const finishFlow = useCallback(
    (complete: OnboardingAnswers): void => {
      const recommendation = computeRecommendation(complete);
      writeOnboardingState({
        answers: complete,
        recommendation,
        chosenPath: null,
        chosenDomainId: null,
        chosenRoleSlug: null,
      });
      router.push("/onboarding/recommendation");
    },
    [router],
  );

  const handleCoreAnswer = useCallback(
    (value: string): void => {
      const keys: (keyof OnboardingAnswers)[] = [
        "q1Background",
        "q2WorkInstinct",
        "q3Environment",
        "q4Terminal",
        "q5Goal",
      ];
      const key = keys[coreIndex];
      const nextAnswers = {
        ...answers,
        [key]: value,
      } as Partial<OnboardingAnswers>;

      if (key === "q3Environment") {
        delete nextAnswers.q6;
      }

      setAnswers(nextAnswers);

      if (coreIndex < CORE_QUESTIONS.length - 1) {
        setSlideDirection("forward");
        window.setTimeout(() => setCoreIndex((i) => i + 1), 280);
        return;
      }

      const env = nextAnswers.q3Environment as Q3Environment;
      if (needsConditionalQ6(env)) {
        setSlideDirection("forward");
        window.setTimeout(() => setStep("conditional"), 280);
        return;
      }

      if (isCompleteAnswers(nextAnswers)) {
        finishFlow(nextAnswers as OnboardingAnswers);
      }
    },
    [answers, coreIndex, finishFlow],
  );

  const handleConditionalAnswer = useCallback(
    (value: string): void => {
      const env = answers.q3Environment;
      if (!env) {
        return;
      }
      const q6 = parseQ6Value(env, value);
      const complete = { ...answers, q6 } as OnboardingAnswers;
      if (isCompleteAnswers(complete)) {
        finishFlow(complete);
      }
    },
    [answers, finishFlow],
  );

  const goBack = (): void => {
    setSlideDirection("back");
    if (step === "conditional") {
      setStep("core");
      setCoreIndex(CORE_QUESTIONS.length - 1);
      return;
    }
    if (coreIndex > 0) {
      setCoreIndex((i) => i - 1);
      return;
    }
    router.push("/onboarding");
  };

  let question: FlowQuestion;
  let currentValue: string | undefined;
  let onSelect: (value: string) => void;

  if (step === "conditional" && answers.q3Environment) {
    question = getConditionalQ6(answers.q3Environment)!;
    currentValue =
      answers.q6?.type === answers.q3Environment
        ? answers.q6.value
        : undefined;
    onSelect = handleConditionalAnswer;
  } else {
    question = CORE_QUESTIONS[coreIndex];
    const keys = [
      "q1Background",
      "q2WorkInstinct",
      "q3Environment",
      "q4Terminal",
      "q5Goal",
    ] as const;
    const key = keys[coreIndex];
    currentValue = answers[key] as string | undefined;
    onSelect = handleCoreAnswer;
  }

  const slideKey = step === "conditional" ? "q6" : question.id;

  return (
    <OnboardingShell>
      <div className="mb-10 flex flex-col items-center gap-6">
        <OnboardingWordmark />
        <ProgressIndicator current={currentStepNumber} total={totalSteps} />
      </div>

      <div
        key={slideKey}
        className={cn(
          "animate-in fade-in duration-300",
          slideDirection === "forward"
            ? "slide-in-from-right-4"
            : "slide-in-from-left-4",
        )}
      >
        {step === "conditional" ? (
          <p className="mb-4 text-center text-sm font-medium text-zinc-500">
            One more thing…
          </p>
        ) : null}
        <h1 className="mb-8 text-center text-xl font-medium leading-snug text-foreground sm:text-2xl">
          {question.prompt}
        </h1>
        <ul className="flex flex-col gap-3" role="list">
          {question.options.map((option) => (
            <li key={option.value}>
              <AnswerOption
                label={option.label}
                selected={currentValue === option.value}
                onSelect={() => onSelect(option.value)}
                size={question.largeOptions ? "large" : "default"}
              />
            </li>
          ))}
        </ul>
      </div>

      {step === "conditional" || coreIndex > 0 ? (
        <div className="mt-10 flex justify-center">
          <Button
            type="button"
            variant="ghost"
            className="text-zinc-400 hover:text-foreground"
            onClick={goBack}
          >
            Back
          </Button>
        </div>
      ) : (
        <div className="mt-10 flex justify-center">
          <Button
            type="button"
            variant="ghost"
            className="text-zinc-400 hover:text-foreground"
            asChild
          >
            <a href="/onboarding">Back</a>
          </Button>
        </div>
      )}
    </OnboardingShell>
  );
}
