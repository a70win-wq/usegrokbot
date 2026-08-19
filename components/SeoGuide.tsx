import type { SeoGuide as SeoGuideData } from "@/data/seo";

export function SeoGuide({ guide }: { guide: SeoGuideData }) {
  return (
    <section className="mt-16 max-w-[68ch] border-t border-line pt-12">
      <h2 className="text-[22px] font-medium tracking-tight text-ink">{guide.heading}</h2>
      <p className="mt-4 text-[15px] leading-7 text-mute">{guide.body}</p>
      <h3 className="mt-8 text-lg font-medium text-ink">{guide.tasksHeading}</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] leading-6 text-mute">
        {guide.tasks.map((task) => (
          <li key={task}>{task}</li>
        ))}
      </ul>
      <h3 className="mt-8 text-lg font-medium text-ink">{guide.setupHeading}</h3>
      <p className="mt-3 text-[15px] leading-7 text-mute">{guide.setup}</p>
      <h3 className="mt-8 text-lg font-medium text-ink">FAQ</h3>
      <dl className="mt-3 space-y-5">
        {guide.faq.map((item) => (
          <div key={item.q}>
            <dt className="text-[15px] font-medium text-ink">{item.q}</dt>
            <dd className="mt-1 text-[15px] leading-6 text-mute">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
