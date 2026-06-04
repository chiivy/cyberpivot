"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { AnswerOption } from "@/components/onboarding/answer-option";
import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { OnboardingWordmark } from "@/components/onboarding/onboarding-wordmark";
import { ProgressIndicator } from "@/components/onboarding/progress-indicator";
import { Button } from "@/components/ui/button";
import { ONBOARDING_QUESTIONS } from "@/lib/onboarding/data";
import { computeRecommendation } from "@/lib/onboarding/recommendation";
import { writeOnboardingState } from "@/lib/onboarding/storage";
import { cn } from "@/lib/utils";
import type { OnboardingAnswers } from "@/types/onboarding";

type FlowStep = "welcome" | 0 | 1 | 2 | 3;

const TOTAL_QUESTIONS = 4;

export function OnboardingFlow(): React.ReactElement {
  const router = useRouter();
  const [step, setStep] = useState<FlowStep>("welcome");
  const [slideDirection, setSlideDirection] = useState<"forward" | "back">(
    "forward",
  );
  const [answers, setAnswers] = useState<Partial<OnboardingAnswers>>({});

  const goToQuestion = (index: number): void => {
    setSlideDirection("back");
    setStep(index as 0 | 1 | 2 | 3);
  };

  const handleAnswer = useCallback(
    (questionIndex: number, value: string): void => {
      const keys: (keyof OnboardingAnswers)[] = [
        "q1Background",
        "q2Linux",
        "q3Networking",
        "q4PathKnown",
      ];
      const key = keys[questionIndex];
      const nextAnswers = { ...answers, [key]: value } as Partial<OnboardingAnswers>;
      setAnswers(nextAnswers);

      if (questionIndex < TOTAL_QUESTIONS - 1) {
        setSlideDirection("forward");
        window.setTimeout(() => {
          setStep((questionIndex + 1) as 0 | 1 | 2 | 3);
        }, 280);
        return;
      }

      const complete = {
        q1Background: nextAnswers.q1Background!,
        q2Linux: nextAnswers.q2Linux!,
        q3Networking: nextAnswers.q3Networking!,
        q4PathKnown: nextAnswers.q4PathKnown!,
      };
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
    [answers, router],
  );

  if (step === "welcome") {
    return (
      <OnboardingShell narrow className="text-center">
        <div className="flex flex-col items-center gap-8">
          <OnboardingWordmark />
          <p className="max-w-sm text-base leading-relaxed text-zinc-400">
            Figure out where you&apos;re starting. We&apos;ll take it from there.
          </p>
          <Button
            size="lg"
            className="bg-cyan-500 text-[#0a0a0f] hover:bg-cyan-400"
            onClick={() => {
              setSlideDirection("forward");
              setStep(0);
            }}
          >
            Get Started
          </Button>
        </div>
      </OnboardingShell>
    );
  }

  const questionIndex = step;
  const question = ONBOARDING_QUESTIONS[questionIndex];
  const answerKey = ["q1Background", "q2Linux", "q3Networking", "q4PathKnown"][
    questionIndex
  ] as keyof OnboardingAnswers;
  const currentValue = answers[answerKey];

  return (
    <OnboardingShell>
      <div className="mb-10 flex flex-col items-center gap-6">
        <OnboardingWordmark />
        <ProgressIndicator current={questionIndex + 1} total={TOTAL_QUESTIONS} />
      </div>

      <div
        key={questionIndex}
        className={cn(
          "animate-in fade-in duration-300",
          slideDirection === "forward"
            ? "slide-in-from-right-4"
            : "slide-in-from-left-4",
        )}
      >
        <h1 className="mb-8 text-center text-xl font-medium leading-snug text-foreground sm:text-2xl">
          {question.prompt}
        </h1>
        <ul className="flex flex-col gap-3" role="list">
          {question.options.map((option) => (
            <li key={option.value}>
              <AnswerOption
                label={option.label}
                selected={currentValue === option.value}
                onSelect={() => handleAnswer(questionIndex, option.value)}
              />
            </li>
          ))}
        </ul>
      </div>

      {questionIndex > 0 ? (
        <div className="mt-10 flex justify-center">
          <Button
            type="button"
            variant="ghost"
            className="text-zinc-400 hover:text-foreground"
            onClick={() => goToQuestion(questionIndex - 1)}
          >
            Back
          </Button>
        </div>
      ) : null}
    </OnboardingShell>
  );
}
