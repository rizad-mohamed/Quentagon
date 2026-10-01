"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { ArrowUpRight, ArrowRight, Stack, Code, Lightning } from "@phosphor-icons/react";
import PentagonArt from "./pentagon-art";
import { useQuietMotion } from "./use-quiet-motion";
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const quiet = useQuietMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.0005 });
  const scale = useTransform(progress, [0, 0.18, 0.48, 0.65, 1], [1, 1, 1.25, 1.25, 1.6]);
  const rotateY = useTransform(progress, [0, 0.45, 0.7, 1], [-19, 9, 9, -6]);
  const rotateZ = useTransform(progress, [0, 1], [-10, 13]);
  const x = useTransform(progress, [0, 1], [0, -100]);
  const introOpacity = useTransform(progress, [0, 0.16, 0.38], [1, 1, 0]);
  const introY = useTransform(progress, [0, 0.4], [0, -45]);
  const storyOpacity = useTransform(progress, [0.28, 0.46, 0.87, 1], [0, 1, 1, 0.6]);
  const storyY = useTransform(progress, [0.28, 0.46], [35, 0]);
  const labels = useTransform(progress, [0, 0.3], [1, 0]);
  return (
    <section ref={ref} className="hero-journey" aria-labelledby="hero-title">
      <div className="hero-sticky">
        <div className="section-shell hero-composition">
          <motion.div
            className="hero-copy"
            style={{ opacity: quiet ? 1 : introOpacity, y: quiet ? 0 : introY }}
          >
            <p className="hero-eyebrow">Independent thinking. Connected technology.</p>
            <h1 id="hero-title">
              Engineering intelligence.
              <br />
              <span>Built for progress.</span>
            </h1>
            <p className="hero-description">
              Software, websites and intelligent workflows that make your business work better.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#project-brief">
                Start your project <ArrowUpRight size={20} />
              </a>
              <a className="text-link" href="#services">
                Explore our services <ArrowRight size={19} />
              </a>
            </div>
          </motion.div>
          <div
            className="hero-visual"
            role="img"
            aria-label="Layers of a pentagonal system connecting software, experience and intelligence"
          >
            <div className="hero-halo" />
            <motion.div
              className="hero-camera"
              style={{
                scale: quiet ? 1 : scale,
                rotateY: quiet ? -19 : rotateY,
                rotateZ: quiet ? -10 : rotateZ,
                x: quiet ? 0 : x,
              }}
            >
              <PentagonArt />
            </motion.div>
            <motion.div className="hero-connections" style={{ opacity: quiet ? 1 : labels }}>
              <span className="connection connection-software">
                <Code size={21} />
                <span>
                  Purpose-built software<small>Built around your business</small>
                </span>
              </span>
              <span className="connection connection-experience">
                <Stack size={21} />
                <span>
                  Considered experiences<small>Made for real people</small>
                </span>
              </span>
              <span className="connection connection-intelligence">
                <Lightning size={21} />
                <span>
                  Applied intelligence<small>Less friction. More possibility.</small>
                </span>
              </span>
            </motion.div>
          </div>
          <motion.div
            className="hero-story-copy"
            aria-hidden="true"
            style={{ opacity: quiet ? 0 : storyOpacity, y: quiet ? 0 : storyY }}
          >
            <p>One shared direction.</p>
            <h2>
              From moving parts.
              <br />
              <span>To a connected whole.</span>
            </h2>
            <p>
              Strategy, design and engineering.
              <br />
              Working beautifully together.
            </p>
          </motion.div>
          <div className="hero-foot">
            <span>From the first conversation to what comes next.</span>
            <a href="#process">
              A clear path to delivery <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
