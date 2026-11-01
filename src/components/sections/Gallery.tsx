import { getCases } from "@/lib/cms";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { Button, Arrow } from "@/components/ui/Button";

export async function GalleryPreview({ ids, heading = "Smile gallery", eyebrow = "Real patients, real results", lead = "Drag the handle to compare. Every case is a patient of Dr. Moezzi, shared with permission.", limit = 3 }: { ids?: string[]; heading?: string; eyebrow?: string; lead?: string; limit?: number }) {
  const cases = await getCases();
  const picked = ids ? cases.filter((c) => ids.includes(c.id)) : cases;
  const list = (picked.length ? picked : cases).slice(0, limit);
  return (
    <Section tone="ivory" labelledBy="gallery-heading">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading eyebrow={eyebrow} title={heading} id="gallery-heading" lead={lead} />
        <div data-reveal=""><Button href="/smile-gallery/" variant="outline" icon={<Arrow />}>View the full gallery</Button></div>
      </div>
      <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {list.map((c, i) => (
          <li key={c.id} data-reveal="" style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}>
            <BeforeAfter c={c} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
