"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChartBar,
  CheckCircle,
  CirclesThreePlus,
  Cube,
  CursorClick,
  Desktop,
  DeviceMobile,
  DeviceTablet,
  GearSix,
  HandPointing,
  Lightning,
  ShoppingBag,
  SquaresFour,
} from "@phosphor-icons/react";
import { useQuietMotion } from "./use-quiet-motion";

type Module = "Command" | "Projects" | "Finance" | "People";
const modules: Module[] = ["Command", "Projects", "Finance", "People"];

function CommandDashboard() {
  return (
    <div className="system-command">
      <div className="system-command-lead">
        <div>
          <small>PORTFOLIO PULSE</small>
          <strong>Everything in motion.</strong>
          <span>18 active projects across 4 teams</span>
        </div>
        <div className="system-health">
          <b>
            92<span>%</span>
          </b>
          <small>delivery health</small>
        </div>
      </div>
      <div className="system-command-grid">
        <div className="system-command-trend">
          <span>
            Delivery this quarter <b>↗ 12.8%</b>
          </span>
          <div
            className="system-sparkline"
            role="img"
            aria-label="Illustrative upward delivery trend"
          >
            {[32, 47, 39, 58, 53, 73, 67, 88, 78, 94].map((value, index) => (
              <i key={index} style={{ height: value + "%" }} />
            ))}
          </div>
          <small>
            W1&nbsp;&nbsp; W2&nbsp;&nbsp; W3&nbsp;&nbsp; W4&nbsp;&nbsp; W5&nbsp;&nbsp; W6
          </small>
        </div>
        <div className="system-command-queue">
          <span>
            Needs attention <b>03</b>
          </span>
          <p>
            <i /> East Ridge <em>Review budget</em>
          </p>
          <p>
            <i /> Site approvals <em>2 pending</em>
          </p>
          <p>
            <i /> Supplier sync <em>Due today</em>
          </p>
        </div>
      </div>
    </div>
  );
}

function ProjectsDashboard() {
  const columns = [
    {
      name: "Planning",
      count: "02",
      cards: [
        ["Westhaven HQ", "Scope review"],
        ["Northline", "Design sign-off"],
      ],
    },
    {
      name: "In progress",
      count: "03",
      cards: [
        ["Harbour Tower", "Foundation · 82%"],
        ["East Ridge", "Procurement · 61%"],
      ],
    },
    { name: "Delivering", count: "01", cards: [["Lakeview", "Final checks · 94%"]] },
  ];
  return (
    <div className="system-projects">
      <div className="system-projects-toolbar">
        <span>
          Board view <b>All projects</b>
        </span>
        <span>6 visible</span>
      </div>
      <div className="system-kanban">
        {columns.map((column) => (
          <div className="system-kanban-column" key={column.name}>
            <strong>
              {column.name} <small>{column.count}</small>
            </strong>
            {column.cards.map((card, index) => (
              <div className="system-task" key={card[0]}>
                <i className={"task-mark task-mark-" + index} />
                <b>{card[0]}</b>
                <span>{card[1]}</span>
                <div className="system-task-bottom">
                  <em>{index === 0 ? "Design" : "Delivery"}</em>
                  <small>{index === 0 ? "RM" : "HN"}</small>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function FinanceDashboard() {
  return (
    <div className="system-finance">
      <div className="system-finance-summary">
        <div>
          <small>Total budget tracked</small>
          <strong>$8.4M</strong>
          <span>Across current portfolio</span>
        </div>
        <div>
          <small>Forecast position</small>
          <strong className="finance-positive">−3.2%</strong>
          <span>Under approved budget</span>
        </div>
      </div>
      <div className="system-finance-main">
        <div className="system-finance-chart">
          <span>Spend against forecast</span>
          <div
            className="finance-chart-lines"
            role="img"
            aria-label="Illustrative spend and forecast chart"
          >
            <div className="finance-chart-bars">
              {[35, 49, 42, 62, 56, 76, 69, 82].map((value, index) => (
                <i key={index} style={{ height: value + "%" }} />
              ))}
            </div>
            <div className="finance-chart-target" />
          </div>
          <small>JAN &nbsp; FEB &nbsp; MAR &nbsp; APR &nbsp; MAY &nbsp; JUN</small>
        </div>
        <div className="system-ledger">
          <span>Cost centres</span>
          <p>
            <b>Materials</b>
            <em>$4.02M</em>
          </p>
          <p>
            <b>People</b>
            <em>$2.68M</em>
          </p>
          <p>
            <b>Equipment</b>
            <em>$1.70M</em>
          </p>
          <div>
            All records reconciled <CheckCircle size={13} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PeopleDashboard() {
  const people = [
    ["AM", "Amina Malik", "Site lead", "Available"],
    ["JR", "Jonah Reed", "Engineering", "On site"],
    ["SK", "Sara Kim", "Operations", "Available"],
  ];
  return (
    <div className="system-people">
      <div className="system-people-banner">
        <div>
          <small>TEAM CAPACITY</small>
          <strong>Good people. Clear plans.</strong>
          <span>326 members · 24 teams</span>
        </div>
        <div className="people-avatars">
          <i>AM</i>
          <i>JR</i>
          <i>SK</i>
          <b>+23</b>
        </div>
      </div>
      <div className="system-people-grid">
        <div className="system-roster">
          <span>
            Team availability <b>View roster →</b>
          </span>
          {people.map((person) => (
            <div className="system-person" key={person[1]}>
              <i>{person[0]}</i>
              <div>
                <b>{person[1]}</b>
                <small>{person[2]}</small>
              </div>
              <em>{person[3]}</em>
            </div>
          ))}
        </div>
        <div className="system-capacity">
          <span>This week</span>
          <div className="capacity-bars" role="img" aria-label="Illustrative weekly team capacity">
            {[72, 91, 84, 68, 79].map((value, index) => (
              <div key={index}>
                <i style={{ height: value + "%" }} />
                <small>{["M", "T", "W", "T", "F"][index]}</small>
              </div>
            ))}
          </div>
          <strong>78% allocated</strong>
        </div>
      </div>
    </div>
  );
}

export function SoftwarePortfolio() {
  const [module, setModule] = useState<Module>("Command");
  const [guided, setGuided] = useState(true);
  const quiet = useQuietMotion();
  useEffect(() => {
    if (quiet || !guided) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible")
        setModule((current) => modules[(modules.indexOf(current) + 1) % modules.length]);
    }, 4200);
    return () => window.clearInterval(id);
  }, [guided, quiet]);
  return (
    <div className="micro-stage software-micro interactive-visual">
      <div className="micro-heading">
        <span>
          <Cube size={16} /> MANAGEMENT SYSTEM / LIVE PREVIEW
        </span>
        <span>EXPLORE THE WORKSPACE</span>
      </div>
      <div className="enterprise-window">
        <div className="enterprise-top">
          <strong>
            Management System <span>/ workspace</span>
          </strong>
          <span>
            Live preview <i />
          </span>
        </div>
        <div className="enterprise-layout">
          <div
            className="enterprise-rail"
            role="group"
            aria-label="Explore Management System dashboards"
          >
            {modules.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={module === item}
                onClick={() => {
                  setGuided(false);
                  setModule(item);
                }}
              >
                {item === "Command" ? (
                  <SquaresFour size={16} />
                ) : item === "Projects" ? (
                  <Cube size={16} />
                ) : item === "Finance" ? (
                  <ChartBar size={16} />
                ) : (
                  <CirclesThreePlus size={16} />
                )}
                <span>{item}</span>
              </button>
            ))}
          </div>
          <div className="enterprise-main" aria-live="polite">
            <div className="enterprise-title">
              <div>
                <small>WORKSPACE / {module.toUpperCase()}</small>
                <h4>{module === "Projects" ? "Project management" : module + " dashboard"}</h4>
              </div>
              <span className="enterprise-signal">
                <i /> SYNCHRONIZED
              </span>
            </div>
            <div className="system-dashboard" key={module}>
              {module === "Command" ? (
                <CommandDashboard />
              ) : module === "Projects" ? (
                <ProjectsDashboard />
              ) : module === "Finance" ? (
                <FinanceDashboard />
              ) : (
                <PeopleDashboard />
              )}
            </div>
          </div>
        </div>
        {guided && (
          <div className={"system-demo-pointer pointer-" + module.toLowerCase()} aria-hidden="true">
            <CursorClick size={25} weight="fill" />
          </div>
        )}
      </div>
      <div className="micro-foot">
        <span>
          <GearSix size={14} /> Research → model → engineer
        </span>
        <span>Illustrative data</span>
      </div>
    </div>
  );
}

type WebDevice = "Desktop" | "Tablet" | "Mobile";
type WebPage = "Discover" | "Product" | "Checkout";
const webDevices: WebDevice[] = ["Desktop", "Tablet", "Mobile"];

function LampVisual() {
  return (
    <div className="web-product" aria-label="Illustration of the Form 01 table lamp" role="img">
      <div className="lamp-glow" />
      <div className="lamp-shade" />
      <div className="lamp-stem" />
      <div className="lamp-base" />
      <span>FORM / 01</span>
    </div>
  );
}

function WebsiteVisual() {
  const [device, setDevice] = useState<WebDevice>("Desktop");
  const [page, setPage] = useState<WebPage>("Discover");
  const manuallySelectedDevice = useRef(false);
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 640px)");
    const tablet = window.matchMedia("(max-width: 1023px)");
    const syncToViewport = () => {
      if (!manuallySelectedDevice.current)
        setDevice(mobile.matches ? "Mobile" : tablet.matches ? "Tablet" : "Desktop");
    };
    syncToViewport();
    mobile.addEventListener("change", syncToViewport);
    tablet.addEventListener("change", syncToViewport);
    return () => {
      mobile.removeEventListener("change", syncToViewport);
      tablet.removeEventListener("change", syncToViewport);
    };
  }, []);
  const advance = () =>
    setPage((current) =>
      current === "Discover" ? "Product" : current === "Product" ? "Checkout" : "Discover",
    );
  return (
    <div className="micro-stage web-micro interactive-visual">
      <div className="micro-heading">
        <span>
          <Desktop size={16} /> RESPONSIVE COMMERCE CONCEPT
        </span>
        <span>DESIGNED FOR EVERY SCREEN</span>
      </div>
      <div className="device-controls" role="group" aria-label="Preview website screen size">
        {webDevices.map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={device === item}
            onClick={() => {
              manuallySelectedDevice.current = true;
              setDevice(item);
            }}
          >
            {item === "Desktop" ? (
              <Desktop size={16} />
            ) : item === "Tablet" ? (
              <DeviceTablet size={16} />
            ) : (
              <DeviceMobile size={16} />
            )}
            {item}
          </button>
        ))}
      </div>
      <div className={"web-device web-device-" + device.toLowerCase()} key={device}>
        <div className="web-browser">
          <span>
            <i />
            <i />
            <i />
          </span>
          <b>arc-atelier.example</b>
          <span>↗</span>
        </div>
        <div className="web-screen">
          <div className="web-nav">
            <strong>
              arc<span> / </span>atelier
            </strong>
            <span>Objects&nbsp;&nbsp;&nbsp; Journal&nbsp;&nbsp;&nbsp; Our story</span>
            <ShoppingBag size={16} />
          </div>
          {page === "Checkout" ? (
            <div className="web-checkout">
              <div>
                <small>SECURE CHECKOUT</small>
                <h4>
                  Good things,
                  <br />
                  on their way.
                </h4>
                <p>Thoughtful objects deserve a simple checkout.</p>
                <label>
                  Contact email<span>you@example.com</span>
                </label>
                <label>
                  Delivery<span>Complimentary shipping</span>
                </label>
              </div>
              <aside>
                <LampVisual />
                <b>Form 01 / Table light</b>
                <span>Warm white · 1 item</span>
                <strong>$240</strong>
                <button type="button" onClick={advance}>
                  Explore again <ArrowRight size={12} />
                </button>
              </aside>
            </div>
          ) : (
            <div className={"web-content web-content-" + page.toLowerCase()}>
              <div className="web-story">
                <small>
                  {page === "Discover" ? "OBJECTS FOR THE EVERYDAY" : "LIGHTING / FORM 01"}
                </small>
                <h4>
                  {page === "Discover" ? "A quieter kind of statement." : "A softer way to see."}
                </h4>
                <p>
                  {page === "Discover"
                    ? "Considered pieces for spaces that feel like you."
                    : "Sculptural form. Warm light. Made to stay."}
                </p>
                {page === "Product" && (
                  <div className="web-swatches">
                    <i />
                    <i />
                    <i />
                    <span>Warm white</span>
                  </div>
                )}
                <button type="button" onClick={advance}>
                  {page === "Discover" ? "Explore the collection" : "Add to bag · $240"}{" "}
                  <ArrowRight size={13} />
                </button>
              </div>
              <LampVisual />
            </div>
          )}
          <div className="web-progress">
            <span className={page === "Discover" ? "active" : ""}>01 Discover</span>
            <span className={page === "Product" ? "active" : ""}>02 Product</span>
            <span className={page === "Checkout" ? "active" : ""}>03 Checkout</span>
          </div>
        </div>
      </div>
      <div className="micro-foot">
        <span>One storefront, intelligently adapted.</span>
        <span>{device} layout</span>
      </div>
    </div>
  );
}

type Platform = "iOS" | "Android";
type AppView = "Explore" | "Orders" | "Account";

function MobileVisual() {
  const [platform, setPlatform] = useState<Platform>("iOS");
  const [view, setView] = useState<AppView>("Explore");
  const [saved, setSaved] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const quiet = useQuietMotion();
  useEffect(() => {
    if (quiet || view !== "Explore") return;
    const scroll = () => {
      if (document.visibilityState === "visible" && contentRef.current)
        contentRef.current.scrollTo({
          top: contentRef.current.scrollTop < 24 ? 100 : 0,
          behavior: "smooth",
        });
    };
    const first = window.setTimeout(scroll, 1900);
    const interval = window.setInterval(scroll, 5000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, [platform, view, quiet]);
  return (
    <div className="micro-stage app-micro interactive-visual">
      <div className="micro-heading">
        <span>
          <DeviceMobile size={16} /> CROSS-PLATFORM APP CONCEPT
        </span>
        <span>NATIVE EXPERIENCE</span>
      </div>
      <div className="app-controls" role="group" aria-label="Preview mobile platform">
        <button type="button" aria-pressed={platform === "iOS"} onClick={() => setPlatform("iOS")}>
          iOS / iPhone
        </button>
        <button
          type="button"
          aria-pressed={platform === "Android"}
          onClick={() => setPlatform("Android")}
        >
          Android / Galaxy
        </button>
      </div>
      <div className="app-scene">
        <div className="app-orbit" aria-hidden="true" />
        <div className={"app-phone app-phone-" + platform.toLowerCase()} key={platform}>
          <div className="phone-side-button" />
          <div className="phone-camera" aria-hidden="true" />
          <div className="app-status">
            <span>9:41</span>
            <span>●●● 100%</span>
          </div>
          <div className="app-head">
            <small>{platform === "iOS" ? "GOOD MORNING" : "WELCOME BACK"}</small>
            <h4>
              {view === "Explore" ? "Discover" : view === "Orders" ? "Your orders" : "Your account"}
            </h4>
          </div>
          <div className="app-content" ref={contentRef}>
            {view === "Explore" ? (
              <>
                <div className="app-feature">
                  <small>CURATED FOR YOU</small>
                  <strong>
                    Everyday,
                    <br />
                    better made.
                  </strong>
                  <button type="button" onClick={() => setSaved((current) => !current)}>
                    {saved ? <CheckCircle size={13} /> : <ShoppingBag size={13} />}
                    {saved ? "Saved" : "Save item"}
                  </button>
                </div>
                <div className="app-mini-list">
                  <span>Recommended for you</span>
                  <div className="app-mini-products">
                    <div>
                      <i />
                      <b>Form 01</b>
                      <small>$240</small>
                    </div>
                    <div>
                      <i />
                      <b>Soft forms</b>
                      <small>$86</small>
                    </div>
                  </div>
                  <span>Stories worth opening</span>
                  <p>Objects with a sense of place, designed to last.</p>
                </div>
              </>
            ) : view === "Orders" ? (
              <div className="app-order">
                <CheckCircle size={22} />
                <strong>Order on its way</strong>
                <span>Track progress in real time.</span>
                <div>
                  <i />
                </div>
              </div>
            ) : (
              <div className="app-account">
                <span>RM</span>
                <strong>Your space</strong>
                <p>Preferences and activity, always in sync.</p>
              </div>
            )}
          </div>
          {platform === "Android" && (
            <button
              className="app-fab"
              type="button"
              aria-label="Open orders"
              onClick={() => setView("Orders")}
            >
              +
            </button>
          )}
          <div className="app-tabs" role="group" aria-label="Explore app screens">
            {(["Explore", "Orders", "Account"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={view === item}
                onClick={() => setView(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="app-home" />
        </div>
        {view === "Explore" && (
          <div className="app-hand" aria-hidden="true">
            <HandPointing size={39} weight="fill" />
          </div>
        )}
        <div className="app-sidecar">
          <span>
            <Lightning size={14} /> Shared data
          </span>
          <i />
          <span>
            <CheckCircle size={14} /> {platform === "iOS" ? "iOS patterns" : "Android patterns"}
          </span>
        </div>
      </div>
      <div className="micro-foot">
        <span>Connected logic. Platform-aware interactions.</span>
        <span>
          {platform} / {view}
        </span>
      </div>
    </div>
  );
}

export function WebPortfolio({ mobile = false }: { mobile?: boolean }) {
  return mobile ? <MobileVisual /> : <WebsiteVisual />;
}
