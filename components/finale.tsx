"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import PentagonArt from "./pentagon-art";
import { useQuietMotion } from "./use-quiet-motion";
export default function Finale() {
  const ref = useRef<HTMLElement>(null),
    quiet = useQuietMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.72, 1, 1.65]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-12, 8]);
  return (
    <section ref={ref} id="contact" className="finale">
      <div className="finale-sticky">
        <motion.div
          className="finale-architecture"
          style={{ scale: quiet ? 1 : scale, rotate: quiet ? 0 : rotate }}
        >
          <PentagonArt />
        </motion.div>
        <div className="finale-copy">
          <p>Your next chapter</p>
          <h2>
            Something great
            <br />
            starts with <span>a conversation.</span>
          </h2>
          <p>
            Bring your ambition.
            <br />
            Let&apos;s work out what comes next.
          </p>
          <a className="button button-primary" href="#project-brief">
            Let&apos;s build it together <ArrowUpRight size={21} />
          </a>
        </div>
      </div>
    </section>
  );
}
