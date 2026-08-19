import { capabilitiesFor } from "@/lib/capabilities";
import type { UseCase } from "@/data/types";

export function CapabilityRow({
  useCase,
  labels,
}: {
  useCase: UseCase;
  labels: {
    browser: string;
    login: string;
    loginYes: string;
    loginMaybe: string;
    loginNo: string;
    routine: string;
    approval: string;
    approvalRecommended: string;
    approvalOptional: string;
  };
}) {
  const caps = capabilitiesFor(useCase);
  const items = [
    caps.needsBrowser ? labels.browser : null,
    `${labels.login}: ${
      caps.loginRequired === "yes"
        ? labels.loginYes
        : caps.loginRequired === "maybe"
          ? labels.loginMaybe
          : labels.loginNo
    }`,
    caps.supportsRoutine ? labels.routine : null,
    `${labels.approval}: ${
      caps.humanApproval === "recommended" ? labels.approvalRecommended : labels.approvalOptional
    }`,
  ].filter(Boolean);

  return (
    <ul className="flex flex-wrap gap-2 text-[12px] text-mute">
      {items.map((item) => (
        <li key={item} className="rounded-full border border-line px-2.5 py-1">
          {item}
        </li>
      ))}
    </ul>
  );
}
