"use client";

import { useState } from "react";
import { ArrowUpRight, GlobeHemisphereWest, Quotes } from "@phosphor-icons/react";

const markets = [
  {
    country: "Canada",
    x: 214,
    y: 103,
    review:
      "The team made a complex brief feel manageable and kept the work moving with clear communication.",
  },
  {
    country: "United States",
    x: 224,
    y: 162,
    review:
      "A thoughtful approach to the product, from the first conversation through the final details.",
  },
  {
    country: "United Kingdom",
    x: 448,
    y: 111,
    review:
      "They understood the business problem quickly and translated it into a practical digital direction.",
  },
  {
    country: "Australia",
    x: 754,
    y: 295,
    review:
      "The collaboration felt close, even across time zones. Every milestone was easy to follow.",
  },
  {
    country: "New Zealand",
    x: 821,
    y: 329,
    review: "A reliable partner with the care and technical curiosity to solve the right problem.",
  },
];

export default function GlobalNetwork() {
  const [selected, setSelected] = useState(0);
  const origin = { x: 626, y: 226 };
  return (
    <section
      id="global-network"
      className="global-section section-shell"
      aria-labelledby="global-title"
    >
      <div className="section-heading">
        <p className="eyebrow">Across borders, in step</p>
        <h2 id="global-title">
          Rooted in Sri Lanka. <span>Connected to the world.</span>
        </h2>
        <p>
          Our network has worked with markets in North America, Europe and Oceania. Select a
          destination to follow the connection.
        </p>
      </div>
      <div className="global-panel">
        <div className="map-stage">
          <div className="map-heading">
            <GlobeHemisphereWest size={20} />
            <span>Colombo · global connections</span>
            <span className="map-live">Five markets</span>
          </div>
          <svg
            className="world-map"
            viewBox="0 0 900 390"
            role="img"
            aria-label="Map showing connections from Sri Lanka to Canada, the United States, the United Kingdom, Australia and New Zealand"
          >
            <defs>
              <pattern id="map-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth=".6" />
              </pattern>
            </defs>
            <rect width="900" height="390" fill="url(#map-grid)" className="map-grid" />
            <g className="map-land" aria-hidden="true">
              <path d="M73 90 109 54 164 45 188 57 242 48 292 70 307 93 281 117 259 145 237 149 226 183 196 177 172 151 143 145 124 126 91 121Z" />
              <path d="M215 181 250 188 278 213 289 251 275 283 257 332 226 354 207 328 216 288 193 252 199 220Z" />
              <path d="M397 93 429 77 450 83 465 104 457 127 439 128 421 116Z" />
              <path d="M426 141 470 127 503 145 525 177 520 226 498 269 466 285 441 257 432 209 415 174Z" />
              <path d="M473 78 511 47 560 56 594 42 638 58 689 47 744 70 788 104 778 145 742 158 718 182 677 177 660 210 631 215 611 185 570 173 536 144 500 139 470 118Z" />
              <path d="M679 256 725 240 773 251 798 276 788 315 757 328 723 314 696 299Z" />
              <path d="M816 310 829 320 820 341 811 331Z" />
            </g>
            <g className="map-routes" aria-hidden="true">
              {markets.map((market, index) => (
                <path
                  key={market.country}
                  className={selected === index ? "is-selected" : ""}
                  d={`M ${origin.x} ${origin.y} Q ${(origin.x + market.x) / 2} ${Math.min(origin.y, market.y) - (index === 3 || index === 4 ? 38 : 90)} ${market.x} ${market.y}`}
                />
              ))}
            </g>
            <g className="map-points" aria-hidden="true">
              <circle cx={origin.x} cy={origin.y} r="9" className="map-origin-ring" />
              <circle cx={origin.x} cy={origin.y} r="4" className="map-origin" />
              {markets.map((market, index) => (
                <circle
                  key={market.country}
                  cx={market.x}
                  cy={market.y}
                  r={selected === index ? 6 : 4}
                  className={selected === index ? "is-selected" : ""}
                />
              ))}
            </g>
            <text x="638" y="247" className="map-label">
              SRI LANKA
            </text>
          </svg>
          <div className="market-controls" role="group" aria-label="Explore global markets">
            {markets.map((market, index) => (
              <button
                key={market.country}
                onClick={() => setSelected(index)}
                aria-pressed={selected === index}
              >
                {market.country}
              </button>
            ))}
          </div>
        </div>
        <div className="market-story" aria-live="polite">
          <span className="market-counter">
            {String(selected + 1).padStart(2, "0")} / 05 · MARKET CONNECTION
          </span>
          <h3>{markets[selected].country}</h3>
          <p>
            Collaboration connected from our Sri Lankan base to the {markets[selected].country}{" "}
            market.
          </p>
          <div className="review-preview">
            <Quotes size={24} weight="fill" />
            <blockquote>{markets[selected].review}</blockquote>
            <span>Illustrative review · sample copy</span>
          </div>
          <a className="text-link" href="#project-brief">
            Start a conversation <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
