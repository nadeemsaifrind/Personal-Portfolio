import { PERSONAL } from "@/lib/portfolio-data";

export function Contact() {
  return (
    <section className="border-t border-border" id="contact">
      <div className="container mx-auto px-6 lg:px-10 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-16 items-end">
          <div>
            <span className="font-mono text-xs tracking-[0.2em]" style={{ color: "#02AC87" }}>
              LET'S WORK TOGETHER
            </span>
            <h2 className="text-3xl md:text-4xl mt-4 leading-[0.95] text-balance">
              Let's build something visual, useful, and meaningful.
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Open to brand design, UX/UI, marketing, and creative technologist roles. Based in Germany — available for remote and hybrid engagements worldwide.
            </p>

            <a
              href={`mailto:${PERSONAL.email}`}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-sm transition-all duration-200 group"
              style={{ background: "#02AC87", color: "white" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#029a78"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#02AC87"; }}
            >
              <span className="font-mono text-sm tracking-wide">START A CONVERSATION</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>

            <div className="pt-2 space-y-2">
              <div className="font-mono text-xs tracking-[0.15em] text-muted-foreground">
                {PERSONAL.email.toUpperCase()}
              </div>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-mono text-xs tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
              >
                LINKEDIN ↗
              </a>
              <div className="font-mono text-xs tracking-[0.15em] text-muted-foreground">
                GERMANY · REMOTE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
