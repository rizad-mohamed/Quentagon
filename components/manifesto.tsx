import { ArrowDownRight } from "@phosphor-icons/react/dist/ssr";
export default function Manifesto() {
  return (
    <section className="manifesto section-shell" aria-label="Our approach">
      <ArrowDownRight size={45} weight="light" aria-hidden="true" />
      <div>
        <p className="manifesto-text">
          Technology should open possibilities.
          <br />
          <span>Not get in the way.</span>
        </p>
        <p>
          We bring the right pieces together, from a better website to a complete business platform.
          Thoughtfully designed. Built to last.
        </p>
      </div>
    </section>
  );
}
