import { ArrowUpRight, Plus } from "@phosphor-icons/react/dist/ssr";
import Navigation, { Brand } from "@/components/navigation";
import Hero from "@/components/hero";
import ServiceStories from "@/components/service-stories";
import GlobalNetwork from "@/components/global-network";
import SignalRail from "@/components/signal-rail";
import MotionControl from "@/components/motion-control";
import PentagonArt from "@/components/pentagon-art";
import Manifesto from "@/components/manifesto";
import Finale from "@/components/finale";
import ProjectJourney from "@/components/project-journey";
import ContactForm from "@/components/contact-form";
import Reveal from "@/components/reveal";
import AmbientMotion from "@/components/ambient-motion";
import QuentagonBot from "@/components/quentagon-bot";
import { site } from "@/lib/site";

export default function Home() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    email: site.email,
    founder: [
      { "@type": "Person", name: "Rizad Mohamed" },
      { "@type": "Person", name: "Hirusha Nilupul" },
    ],
    url: process.env.NEXT_PUBLIC_SITE_URL || site.url,
  };
  return (
    <div id="top">
      <Navigation />
      <MotionControl />
      <AmbientMotion />
      <SignalRail />
      <QuentagonBot />
      <main id="main">
        <Hero />
        <Manifesto />
        <ServiceStories />
        <GlobalNetwork />
        <ProjectJourney />
        <section id="work" className="work-section section-shell">
          <Reveal>
            <div className="section-heading">
              <p className="eyebrow">SELECTED WORK</p>
              <h2>
                Built for real business.
                <br />
                <span>Made with purpose.</span>
              </h2>
              <p>A selection of project references across company websites and digital commerce.</p>
            </div>
            <div className="work-layout">
              <div className="work-references">
                <article className="work-reference">
                  <p className="detail-label">BUSINESS WEBSITES</p>
                  <h3>
                    A digital presence
                    <br />
                    built for business.
                  </h3>
                  <p>Website work associated with a Sri Lankan CIDA Grade 3 company.</p>
                  <details>
                    <summary>
                      View project reference <Plus size={18} />
                    </summary>
                    <div>
                      <p className="reference-name">Dinesh Kumara Dissanayke</p>
                      <p>
                        Client reference supplied to Quentagon. Detailed project information and
                        client review are awaiting publication.
                      </p>
                    </div>
                  </details>
                </article>
                <article className="work-reference">
                  <p className="detail-label">MULTI-VENDOR E-COMMERCE</p>
                  <h3>
                    More vendors.
                    <br />
                    One marketplace.
                  </h3>
                  <p>
                    A multi-vendor e-commerce website for a connected buying and selling experience.
                  </p>
                  <details>
                    <summary>
                      View project reference <Plus size={18} />
                    </summary>
                    <div>
                      <p className="reference-name">Alex B. Perera</p>
                      <p>
                        Client reference supplied to Quentagon. Detailed project information and
                        client review are awaiting publication.
                      </p>
                    </div>
                  </details>
                </article>
              </div>
            </div>
          </Reveal>
        </section>
        <section id="products" className="products-section section-shell">
          <Reveal className="product-panel">
            <div className="product-art" aria-hidden="true">
              <PentagonArt />
            </div>
            <div className="product-content">
              <span className="coming-soon">PRODUCT SPOTLIGHT / CYMS</span>
              <h2>
                Built for construction.
                <br />
                Ready for real operations.
              </h2>
              <p>
                CYMS brings project activity, people, costs and decisions into one construction
                management platform. Explore its operational model in the software showcase above.
              </p>
              <a
                className="text-link"
                href="mailto:rizad.dev@gmail.com?subject=Quentagon%20product%20enquiry"
              >
                Ask about CYMS <ArrowUpRight size={18} />
              </a>
            </div>
          </Reveal>
        </section>
        <section id="about" className="about-section section-shell">
          <Reveal>
            <div className="about-top">
              <h2>
                Thoughtful people.
                <br />
                <span>Serious about the work.</span>
              </h2>
              <p>
                Quentagon brings software, design and technical delivery together. We start by
                understanding your business, then build a clear path forward.
              </p>
            </div>
            <div className="founders">
              <div className="founder-intro">
                <span className="detail-label">THE FOUNDERS</span>
                <p>
                  Two perspectives.
                  <br />
                  One shared standard.
                </p>
              </div>
              <div className="founder">
                <span className="founder-monogram" aria-hidden="true">
                  RM
                </span>
                <div>
                  <h3>Rizad Mohamed</h3>
                  <p>Co-founder</p>
                </div>
                <ArrowUpRight size={22} aria-hidden="true" />
              </div>
              <div className="founder">
                <span className="founder-monogram" aria-hidden="true">
                  HN
                </span>
                <div>
                  <h3>Hirusha Nilupul</h3>
                  <p>Co-founder</p>
                </div>
                <ArrowUpRight size={22} aria-hidden="true" />
              </div>
            </div>
          </Reveal>
        </section>
        <Finale />
        <section id="project-brief" className="contact-section section-shell">
          <div className="contact-intro">
            <p className="eyebrow">START A CONVERSATION</p>
            <h2>
              Let&apos;s make
              <br />
              <span>the right connection.</span>
            </h2>
            <p>
              An idea, a challenge, or a system that could work better. Tell us where you are, and
              we&apos;ll help you find the next step.
            </p>
          </div>
          <ContactForm />
        </section>
      </main>
      <footer className="site-footer section-shell">
        <div className="footer-top">
          <Brand footer />
          <p>Engineering intelligence for meaningful progress.</p>
          <a href="#top" className="text-link">
            Back to top <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Quentagon</span>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span>Software built with purpose.</span>
        </div>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
