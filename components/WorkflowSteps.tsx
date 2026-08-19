export function WorkflowSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="relative space-y-0">
      {steps.map((step, index) => (
        <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
          {index < steps.length - 1 ? (
            <span className="absolute top-8 left-[13px] h-[calc(100%-16px)] w-px bg-line" aria-hidden />
          ) : null}
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent-soft text-[12px] font-medium text-accent">
            {index + 1}
          </span>
          <p className="pt-1 text-[15px] leading-6 text-ink">{step}</p>
        </li>
      ))}
    </ol>
  );
}
