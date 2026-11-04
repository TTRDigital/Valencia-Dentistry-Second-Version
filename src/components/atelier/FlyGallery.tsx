import { Img } from "@/components/ui/Img";

/**
 * (03) Inside the practice: a 3D fly-through. Photos float at different
 * depths and move toward you as you scroll. Each photo is capped so that at
 * its closest (about 2.1×) it is still drawn no wider than half its file's
 * pixel width. Without JavaScript or with reduced motion it is a plain grid.
 */
const items = [
  { src: "/images/office/treatment-room.jpg", alt: "Treatment room with a dental chair, monitors and large arched windows", x: "22%", y: "30%", w: 360 },
  { src: "/images/office/veneer-smile.jpg", alt: "Patient checking her smile in a hand mirror", x: "78%", y: "68%", w: 340 },
  { src: "/images/office/scan-closeup.jpg", alt: "Digital intraoral scan of a patient's teeth shown on a monitor", x: "76%", y: "26%", w: 280 },
  { src: "/images/office/implant-model-hands.jpg", alt: "Dentist showing a patient how an implant and crown fit on a model", x: "24%", y: "72%", w: 340 },
  { src: "/images/office/cleaning.jpg", alt: "Hygienist cleaning a patient's teeth in a bright treatment room", x: "80%", y: "50%", w: 360 },
  { src: "/images/office/aligner-patient.jpg", alt: "Smiling patient holding a clear aligner and its case", x: "18%", y: "48%", w: 340 },
  { src: "/images/office/denture-closeup.jpg", alt: "Close-up of a full-arch implant denture model", x: "70%", y: "80%", w: 320 },
  { src: "/images/office/treatment-room-2.jpg", alt: "Calm treatment room with natural light and a modern dental chair", x: "30%", y: "20%", w: 360 },
];

export function FlyGallery() {
  return (
    <section data-fly="" className="on-dark relative bg-ink text-on-dark" aria-labelledby="inside-title">
      <div className="fly-stage">
        <div className="fly-copy container-x py-20 lg:py-28">
          <p className="chapter"><b>(03)</b> Inside the practice</p>
          <h2 id="inside-title" className="mt-6 max-w-4xl text-[clamp(2.8rem,1.4rem+5vw,7rem)]">A quiet office on <em className="accent">Tourney Road</em></h2>
          <p className="lead mx-auto mt-6 max-w-lg">Bright treatment rooms, modern imaging and time to talk. Scroll to walk through.</p>
        </div>
        <div className="fly-grid container-x grid grid-cols-2 gap-3 pb-20 lg:grid-cols-4 lg:gap-4">
          {items.map((it, i) => (
            <figure key={it.src} className="fly-item" style={{ "--x": it.x, "--y": it.y, "--w": `min(${it.w}px, 44vw)` } as React.CSSProperties} data-fly-item={i}>
              <div className="frame relative aspect-[3/2] w-full">
                <Img src={it.src} alt={it.alt} fill sizes={`(max-width: 767px) 92vw, ${Math.round(it.w * 2.1)}px`} />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
