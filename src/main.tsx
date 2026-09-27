import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

type Page = "home" | "contact" | "privacy" | "terms";

const EMAIL = "modernads692@gmail.com";
const GMAIL_COMPOSE_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=modernads692@gmail.com";

const pageFromPath = (): Page => {
  if (location.pathname.startsWith("/contact")) return "contact";
  if (location.pathname.startsWith("/privacy")) return "privacy";
  if (location.pathname.startsWith("/terms")) return "terms";
  return "home";
};

const slug = (page: Page) => (page === "home" ? "/" : `/${page}`);

const titles: Record<Page, string> = {
  home: "Modern Ads — AI Search & Advertising Growth Agency",
  contact: "Contact Modern Ads — Let's Talk About Your Growth",
  privacy: "Privacy Policy — Modern Ads",
  terms: "Terms of Use — Modern Ads",
};

const descriptions: Record<Page, string> = {
  home: "Modern Ads is an AI growth agency providing AI search optimization, emerging AI advertising strategy, and conversion-focused customer acquisition.",
  contact:
    "Get in touch with Modern Ads to discuss AI search visibility, emerging advertising opportunities, and measurable customer acquisition.",
  privacy:
    "Learn how Modern Ads handles information voluntarily submitted through our website and contact channels.",
  terms: "Terms and conditions of use for the Modern Ads website and growth consultancy services.",
};

function App() {
  const [page, setPage] = useState<Page>(pageFromPath);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onPop = () => setPage(pageFromPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.title = titles[page];
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", descriptions[page]);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", titles[page]);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", descriptions[page]);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", `${location.origin}${slug(page)}`);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", titles[page]);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", descriptions[page]);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute("href", `${location.origin}${slug(page)}`);
    window.scrollTo(0, 0);
  }, [page]);

  const go = (to: Page, hash = "") => {
    history.pushState({}, "", slug(to) + hash);
    setPage(to);
    setMenu(false);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    }
  };

  const onNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    to: Page,
    hash = "",
  ) => {
    e.preventDefault();
    go(to, hash);
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <a
            href="/"
            className="brand-link"
            onClick={(e) => onNavClick(e, "home")}
            aria-label="Modern Ads Home"
          >
            <div className="brand-symbol">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 19V5H8.5L12 12.5L15.5 5H20V19H16.8V9.8L13 16.8H11L7.2 9.8V19H4Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="brand-text-group">
              <span className="brand-title">Modern Ads</span>
              <span className="brand-badge">AI GROWTH</span>
            </div>
          </a>

          <button
            className={`menu-button ${menu ? "active" : ""}`}
            aria-label={menu ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <span className="menu-bar" />
            <span className="menu-bar" />
          </button>

          <nav
            className={`nav-menu ${menu ? "menu-open" : ""}`}
            aria-label="Primary navigation"
          >
            <a
              href="/#services"
              className="nav-item"
              onClick={(e) => onNavClick(e, "home", "#services")}
            >
              Services
            </a>
            <a
              href="/#process"
              className="nav-item"
              onClick={(e) => onNavClick(e, "home", "#process")}
            >
              How It Works
            </a>
            <a
              href="/#about"
              className="nav-item"
              onClick={(e) => onNavClick(e, "home", "#about")}
            >
              About
            </a>
            <a
              href="/contact"
              className={`nav-item ${page === "contact" ? "active-nav" : ""}`}
              onClick={(e) => onNavClick(e, "contact")}
            >
              Contact
            </a>
            <a
              className="btn btn-primary nav-cta"
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Get in Touch</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 12L12 4M12 4H6M12 4V10"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        {page === "home" ? (
          <HomePage onNavClick={onNavClick} />
        ) : page === "contact" ? (
          <ContactPage />
        ) : (
          <LegalPage kind={page} onNavClick={onNavClick} />
        )}
      </main>

      <Footer onNavClick={onNavClick} />
    </div>
  );
}

function HomePage({
  onNavClick,
}: {
  onNavClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    to: Page,
    hash?: string,
  ) => void;
}) {
  const [activeService, setActiveService] = useState<number>(0);

  const services = [
    {
      id: "01",
      name: "AI Search Growth",
      tagline:
        "Optimize your brand for discoverability across emerging AI answer engines and generative search tools.",
      deliverables: [
        "Website analysis & entity authority audit",
        "AI search discoverability & indexation strategy",
        "Technical improvements & schema markup",
        "Customer-intent & semantic query research",
        "Content strategy for generative citations",
        "Measurement, benchmark tracking & optimization",
      ],
      detail:
        "When buyers research decisions using AI tools, your company must be cited with high accuracy. We map user intent, optimize your technical entity profile, and position your core differentiators directly inside generative responses.",
      metrics: [
        { label: "Entity Match", val: "High Fidelity" },
        { label: "Search Index", val: "Vector Mapped" },
        { label: "Citation Signals", val: "Continuous" },
      ],
    },
    {
      id: "02",
      name: "AI Advertising",
      tagline:
        "Evaluate, test, and manage high-intent advertising opportunities across emerging AI platforms.",
      deliverables: [
        "Channel evaluation & access feasibility",
        "Campaign strategy & intent modeling",
        "Audience research & persona segmentation",
        "High-performance creative & copy sprints",
        "Dedicated conversion-engineered landing pages",
        "Real-time campaign monitoring & analytics",
      ],
      detail:
        "We identify relevant emerging ad inventory, structure disciplined tests, and test targeted acquisition experiments while keeping ad spend accountable to unit economics. Platform availability and access vary by provider.",
      metrics: [
        { label: "Channel Testing", val: "Disciplined" },
        { label: "Spend Control", val: "Accountable" },
        { label: "Audience Target", val: "Intent-First" },
      ],
    },
    {
      id: "03",
      name: "Conversion Optimization",
      tagline:
        "Turn high-value discovery into measurable revenue through rigorous funnel architecture and message clarity.",
      deliverables: [
        "Friction audit & user journey mapping",
        "Landing page optimization & messaging",
        "Call-to-action hierarchy & placement",
        "Server-side conversion tracking & telemetry",
        "Funnel drop-off analysis & analytics",
        "Iterative A/B testing strategy",
      ],
      detail:
        "Traffic is only as valuable as your ability to convert it. We engineer frictionless page flows, refine value propositions to answer high-intent questions, and eliminate conversion blockers from first click to closed customer.",
      metrics: [
        { label: "Funnel Friction", val: "Minimized" },
        { label: "Value Clarity", val: "Immediate" },
        { label: "Attribution", val: "Verified" },
      ],
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Understand",
      description:
        "We study your business, customers, competitors, website, and existing acquisition funnel to locate high-leverage growth opportunities.",
      focus: "Discovery, diagnostic audit, and baseline benchmarking",
      badge: "Discovery Phase",
    },
    {
      number: "02",
      title: "Build",
      description:
        "We develop the strategy, messaging, landing pages, tracking infrastructure, and content framework required for maximum performance.",
      focus: "Architecture, content optimization, and telemetry setup",
      badge: "Strategy & Build",
    },
    {
      number: "03",
      title: "Launch",
      description:
        "We launch appropriate acquisition experiments and begin collecting real performance data in live market conditions.",
      focus: "Controlled deployment, signal capture, and test execution",
      badge: "Market Execution",
    },
    {
      number: "04",
      title: "Optimize",
      description:
        "We analyze the results and continuously improve the strategy based on measurable data, eliminating waste and scaling what works.",
      focus: "Iterative testing, funnel tuning, and performance scaling",
      badge: "Ongoing Momentum",
    },
  ];

  const audienceCategories = [
    {
      title: "Startups",
      tagline: "Early-stage traction & category clarity",
      description:
        "Establish discoverability and validate acquisition channels before burning capital on untargeted ad spend.",
      badge: "Early Growth",
    },
    {
      title: "SaaS Companies",
      tagline: "High-intent pipeline & trial acquisition",
      description:
        "Show up when prospective buyers ask AI tools for software recommendations and turn traffic into product trials.",
      badge: "B2B / Product",
    },
    {
      title: "E-commerce Businesses",
      tagline: "High-converting product discovery",
      description:
        "Make your catalogue discoverable to conversational shoppers and build frictionless paths from intent to checkout.",
      badge: "Commerce",
    },
    {
      title: "Local Businesses",
      tagline: "Regional authority & high-intent inquiries",
      description:
        "Dominate local AI search queries when customers search for trusted services and solutions in your geographic market.",
      badge: "Regional / Local",
    },
    {
      title: "Professional Services",
      tagline: "Reputational credibility & qualified leads",
      description:
        "Position your firm's advisory capabilities as authoritative answers to complex client research inquiries.",
      badge: "Advisory / Services",
    },
    {
      title: "Growing Online Businesses",
      tagline: "Multi-channel resilience & sustainable momentum",
      description:
        "Diversify beyond saturated traditional search channels and build durable customer acquisition engines.",
      badge: "Scale-Ups",
    },
  ];

  const pricingTiers = [
    {
      name: "Pilot",
      subtitle: "For businesses testing the Modern Ads methodology.",
      pricing: "Custom pricing",
      timeline: "Focused 30-Day Sprint",
      highlights: [
        "Specific acquisition channel test",
        "AI search visibility baseline audit",
        "Dedicated landing page optimization",
        "Precise performance measurement",
        "Clear data-backed next step roadmap",
      ],
      featured: false,
    },
    {
      name: "Growth",
      subtitle: "For businesses ready for ongoing acquisition & optimization.",
      pricing: "Custom pricing",
      timeline: "Ongoing Retainer / Sprint Iterations",
      highlights: [
        "Continuous AI search engine optimization",
        "Active campaign testing & creative sprints",
        "Ongoing conversion funnel refinement",
        "Monthly performance attribution reporting",
        "Direct senior strategic advisory",
      ],
      featured: true,
      badge: "Most Common Engagement",
    },
    {
      name: "Custom",
      subtitle:
        "For organizations with larger, multi-market acquisition goals.",
      pricing: "Custom pricing",
      timeline: "Tailored Architecture & Scope",
      highlights: [
        "Multi-product or multi-market scope",
        "Advanced technical entity architecture",
        "Custom conversion tracking integration",
        "Dedicated performance experimentation",
        "Executive reviews and priority support",
      ],
      featured: false,
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-ambient-glow" aria-hidden="true" />
        <div className="hero-grid-pattern" aria-hidden="true" />

        <div className="container hero-container">
          <div className="hero-content">
            <div className="pill-badge hero-pill">
              <span className="live-indicator" />
              <span>THE NEXT ERA OF CUSTOMER ACQUISITION</span>
            </div>

            <h1 className="hero-headline">
              Grow your business
              <br />
              in the age of <span className="text-accent">AI.</span>
            </h1>

            <p className="hero-lead">
              Modern Ads helps businesses get discovered through AI-powered
              search and emerging AI advertising channels, then turns that
              attention into measurable customer growth.
            </p>

            <div className="hero-cta-group">
              <a
                className="btn btn-primary hero-btn-main"
                href={GMAIL_COMPOSE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Get in Touch</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a
                className="btn btn-secondary hero-btn-sub"
                href="#process"
                onClick={(e) => onNavClick(e, "home", "#process")}
              >
                <span>See How It Works</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 3.5V12.5M8 12.5L4 8.5M8 12.5L12 8.5"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            {/* FLOW PIPELINE */}
            <div
              className="flow-pipeline"
              aria-label="Acquisition pipeline: Business to AI discovery to website to customer"
            >
              <div className="pipeline-title">
                <span className="mono-label">DISCOVERY PIPELINE</span>
                <span className="pipeline-status">Live Telemetry</span>
              </div>
              <div className="pipeline-track">
                <div className="pipeline-step">
                  <div className="step-dot">
                    <span className="step-num">01</span>
                  </div>
                  <span className="step-label">Business</span>
                  <span className="step-sub">Core Offer</span>
                </div>
                <div className="pipeline-connector">
                  <span className="pulse-signal" />
                </div>
                <div className="pipeline-step active-step">
                  <div className="step-dot accent-dot">
                    <span className="step-num">02</span>
                  </div>
                  <span className="step-label accent-text">AI Discovery</span>
                  <span className="step-sub">Answer Engines</span>
                </div>
                <div className="pipeline-connector">
                  <span className="pulse-signal delay-1" />
                </div>
                <div className="pipeline-step">
                  <div className="step-dot">
                    <span className="step-num">03</span>
                  </div>
                  <span className="step-label">Website</span>
                  <span className="step-sub">Frictionless Path</span>
                </div>
                <div className="pipeline-connector">
                  <span className="pulse-signal delay-2" />
                </div>
                <div className="pipeline-step">
                  <div className="step-dot">
                    <span className="step-num">04</span>
                  </div>
                  <span className="step-label">Customer</span>
                  <span className="step-sub">Measurable Revenue</span>
                </div>
              </div>
            </div>
          </div>

          {/* PURPOSEFUL PRODUCT VISUALIZATION */}
          <div className="hero-visualization" aria-hidden="true">
            <div className="console-card">
              <div className="console-header">
                <div className="console-controls">
                  <span className="control-dot red" />
                  <span className="control-dot yellow" />
                  <span className="control-dot green" />
                </div>
                <div className="console-title">
                  <span>MODERN ADS // AI GROWTH ENGINE</span>
                </div>
                <div className="console-status">
                  <span className="live-dot" />
                  <span>ONLINE</span>
                </div>
              </div>

              <div className="console-body">
                {/* SIMULATED SEARCH & DISCOVERY TERMINAL */}
                <div className="terminal-panel">
                  <div className="panel-label">
                    <span className="mono-code">AI SEARCH CITATION MONITOR</span>
                    <span className="badge-tag">GEN-SEARCH</span>
                  </div>
                  <div className="query-stream">
                    <div className="query-item">
                      <span className="prompt-sym">›</span>
                      <span className="query-text">
                        "Top high-converting growth solutions for 2026..."
                      </span>
                    </div>
                    <div className="query-response">
                      <div className="response-badge">
                        <span className="citation-mark">✳</span>
                        <span>Brand Cited #1: Modern Ads Ecosystem</span>
                      </div>
                      <span className="confidence-score">98.4% Confidence</span>
                    </div>
                  </div>
                </div>

                {/* TELEMETRY METRIC CLUSTERS */}
                <div className="telemetry-grid">
                  <div className="telemetry-box">
                    <span className="telemetry-kicker">DISCOVERABILITY INDEX</span>
                    <div className="telemetry-number">
                      94.8<span className="unit">%</span>
                    </div>
                    <span className="telemetry-trend positive">
                      ↑ High Entity Authority
                    </span>
                  </div>

                  <div className="telemetry-box">
                    <span className="telemetry-kicker">INTENT MATCH RATE</span>
                    <div className="telemetry-number">
                      3.8<span className="unit">x</span>
                    </div>
                    <span className="telemetry-trend positive">
                      ↑ Qualified Traffic
                    </span>
                  </div>

                  <div className="telemetry-box">
                    <span className="telemetry-kicker">FUNNEL CONVERSION</span>
                    <div className="telemetry-number">
                      +42<span className="unit">%</span>
                    </div>
                    <span className="telemetry-trend positive">
                      ↑ Measurable Velocity
                    </span>
                  </div>
                </div>

                {/* GRAPHIC RADAR / KNOWLEDGE GRAPH */}
                <div className="radar-monitor">
                  <div className="radar-radar-circle r1" />
                  <div className="radar-radar-circle r2" />
                  <div className="radar-radar-circle r3" />
                  <div className="radar-beam" />
                  <div className="radar-node node-center">
                    <span className="core-glyph">M</span>
                  </div>
                  <div className="radar-node node-ai">
                    <span>AI Engine</span>
                  </div>
                  <div className="radar-node node-search">
                    <span>Search</span>
                  </div>
                  <div className="radar-node node-conv">
                    <span>Conversion</span>
                  </div>
                  <div className="radar-caption">
                    <span>SYNCHRONIZED KNOWLEDGE GRAPH</span>
                  </div>
                </div>
              </div>

              <div className="console-footer">
                <span className="sys-status">
                  STATUS: ENTITY GRAPH VERIFIED & MONITORING
                </span>
                <span className="sys-ver">v2.4-PRODUCTION</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO: THE SHIFT */}
      <section className="section intro-section" id="shift">
        <div className="container">
          <div className="section-header-compact">
            <span className="section-eyebrow">01 / THE SHIFT</span>
            <div className="intro-split">
              <h2 className="section-heading">
                Customer discovery
                <br />
                is <span className="text-accent">changing.</span>
              </h2>
              <div className="intro-copy-column">
                <p className="lead-text">
                  People are increasingly turning to AI-powered tools to research
                  products, services, software, and businesses.
                </p>
                <p className="body-text">
                  Modern Ads helps you prepare for this shift while improving the
                  conversion systems that turn attention into customers. A
                  thoughtful mix of discoverability, relevant experiments, and
                  clear measurement gives your next stage of growth a stronger,
                  future-proof foundation.
                </p>
              </div>
            </div>
          </div>

          <div className="signal-cards-grid">
            <div className="signal-card">
              <div className="signal-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="#10F49C"
                    strokeWidth="2"
                  />
                  <path
                    d="M20 20L16 16"
                    stroke="#10F49C"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="signal-content">
                <h3 className="signal-title">Be understood</h3>
                <p className="signal-desc">
                  Make your offer, value propositions, and core capabilities
                  unmistakably clear to both human buyers and AI-powered answer
                  engines.
                </p>
              </div>
              <span className="signal-index">01</span>
            </div>

            <div className="signal-card">
              <div className="signal-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                    stroke="#10F49C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="signal-content">
                <h3 className="signal-title">Show up with intent</h3>
                <p className="signal-desc">
                  Meet high-intent prospective customers at the exact moment they
                  are actively researching solutions, comparing options, and
                  preparing to buy.
                </p>
              </div>
              <span className="signal-index">02</span>
            </div>

            <div className="signal-card">
              <div className="signal-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 12H18L15 21L9 3L6 12H2"
                    stroke="#10F49C"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="signal-content">
                <h3 className="signal-title">Turn interest into action</h3>
                <p className="signal-desc">
                  Eliminate landing page friction, clarify messaging, and build
                  a clear, seamless bridge from first awareness to qualified
                  inquiries and closed sales.
                </p>
              </div>
              <span className="signal-index">03</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="section services-section" id="services">
        <div className="container">
          <div className="section-head-split">
            <div>
              <span className="section-eyebrow">02 / WHAT WE DO</span>
              <h2 className="section-heading">
                Modern growth.
                <br />
                <span className="text-accent">Made practical.</span>
              </h2>
            </div>
            <p className="section-intro-copy">
              Three connected disciplines engineered to help your business get
              found, command buyer attention, and convert interest into
              measurable customer momentum.
            </p>
          </div>

          {/* INTERACTIVE SERVICE CARDS */}
          <div className="services-container">
            <div className="service-tab-bar" role="tablist">
              {services.map((item, idx) => (
                <button
                  key={item.id}
                  className={`service-tab ${activeService === idx ? "active" : ""}`}
                  role="tab"
                  aria-selected={activeService === idx}
                  onClick={() => setActiveService(idx)}
                >
                  <span className="tab-num">{item.id}</span>
                  <span className="tab-name">{item.name}</span>
                </button>
              ))}
            </div>

            <div className="service-showcase-card">
              <div className="service-card-main">
                <div className="service-card-header">
                  <span className="service-id-badge">
                    SERVICE {services[activeService].id}
                  </span>
                  <h3 className="service-card-title">
                    {services[activeService].name}
                  </h3>
                  <p className="service-card-tagline">
                    {services[activeService].tagline}
                  </p>
                </div>

                <p className="service-card-deep">
                  {services[activeService].detail}
                </p>

                <div className="service-deliverables">
                  <span className="deliverables-title">
                    CORE DELIVERABLES & CAPABILITIES:
                  </span>
                  <div className="deliverables-grid">
                    {services[activeService].deliverables.map((item) => (
                      <div className="deliverable-item" key={item}>
                        <span className="check-bullet">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="service-action-row">
                  <a
                    className="btn btn-primary"
                    href={GMAIL_COMPOSE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Discuss This Service</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 12L12 4M12 4H6M12 4V10"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <span className="service-pill-hint">
                    Tailored to your current stack & business goals
                  </span>
                </div>
              </div>

              <div className="service-card-sidebar">
                <div className="sidebar-metrics-panel">
                  <span className="sidebar-panel-label">
                    SYSTEM SPECIFICATION
                  </span>
                  <div className="spec-rows">
                    {services[activeService].metrics.map((m) => (
                      <div className="spec-row" key={m.label}>
                        <span className="spec-label">{m.label}</span>
                        <span className="spec-val">{m.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="service-visual-badge">
                  <span className="visual-code">
                    INTEGRATED SYSTEM // {services[activeService].id}
                  </span>
                  <div className="badge-wave" />
                </div>
              </div>
            </div>

            <div className="service-footnote">
              <span className="footnote-icon">ℹ</span>
              <p>
                Platform availability, advertising access, and inventory vary
                by platform. We rigorously assess channel suitability and
                technical viability before recommending any commercial tests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="section process-section" id="process">
        <div className="container">
          <div className="section-head-split">
            <div>
              <span className="section-eyebrow">03 / HOW IT WORKS</span>
              <h2 className="section-heading">
                A clear path
                <br />
                from <span className="text-accent">idea to insight.</span>
              </h2>
            </div>
            <p className="section-intro-copy">
              A disciplined, four-phase consulting methodology. Every engagement
              is shaped around your unique market position and the verifiable
              data we collect.
            </p>
          </div>

          <div className="process-timeline-grid">
            {steps.map((s) => (
              <article className="process-step-card" key={s.number}>
                <div className="process-step-top">
                  <span className="process-step-num">{s.number}</span>
                  <span className="process-phase-badge">{s.badge}</span>
                </div>
                <h3 className="process-step-title">{s.title}</h3>
                <p className="process-step-desc">{s.description}</p>
                <div className="process-step-footer">
                  <span className="focus-label">KEY FOCUS</span>
                  <span className="focus-text">{s.focus}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="section audience-section" id="audience">
        <div className="container">
          <div className="section-head-split">
            <div>
              <span className="section-eyebrow">04 / WHO WE WORK WITH</span>
              <h2 className="section-heading">
                Built for businesses
                <br />
                ready to <span className="text-accent">move forward.</span>
              </h2>
            </div>
            <p className="section-intro-copy">
              Flexible strategic frameworks for ambitious teams across different
              stages of their growth and commercial lifecycle.
            </p>
          </div>

          <div className="audience-matrix-grid">
            {audienceCategories.map((item) => (
              <div className="audience-tile" key={item.title}>
                <div className="audience-tile-head">
                  <span className="audience-category-badge">{item.badge}</span>
                  <span className="audience-arrow">↗</span>
                </div>
                <h3 className="audience-tile-title">{item.title}</h3>
                <p className="audience-tile-tagline">{item.tagline}</p>
                <p className="audience-tile-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PILOT SECTION */}
      <section className="section pilot-section" id="pilot">
        <div className="container">
          <div className="pilot-wrapper">
            <div className="pilot-inner-content">
              <span className="pill-badge pilot-pill">
                A SMARTER FIRST STEP
              </span>
              <h2 className="pilot-headline">
                Start with a
                <br />
                <span className="text-accent">focused pilot.</span>
              </h2>
              <p className="pilot-copy">
                Before committing significant resources, we identify a specific,
                high-leverage acquisition opportunity, build a focused test,
                measure results with precision, and use empirical data to
                determine the next strategic step.
              </p>
              <div className="pilot-framework-list">
                <div className="pilot-step-item">
                  <span className="pilot-check">01</span>
                  <div>
                    <strong>Identify the Opportunity</strong>
                    <span>Audit current gaps in AI search and funnel conversion.</span>
                  </div>
                </div>
                <div className="pilot-step-item">
                  <span className="pilot-check">02</span>
                  <div>
                    <strong>Deploy Focused Experiment</strong>
                    <span>Launch structured creative, technical schema, or page tests.</span>
                  </div>
                </div>
                <div className="pilot-step-item">
                  <span className="pilot-check">03</span>
                  <div>
                    <strong>Measure & Decide</strong>
                    <span>Review verified performance to scale or pivot with confidence.</span>
                  </div>
                </div>
              </div>
              <div className="pilot-actions">
                <a
                  className="btn btn-primary"
                  href={GMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Get in Touch</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 12L12 4M12 4H6M12 4V10"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <span className="pilot-subnote">
                  No long-term lock-in. Grounded in unit economics.
                </span>
              </div>
            </div>

            <div className="pilot-visual-box" aria-hidden="true">
              <div className="pilot-blueprint-card">
                <div className="blueprint-header">
                  <span className="blueprint-tag">PILOT SPECIFICATION</span>
                  <span className="blueprint-time">30-DAY TIMELINE</span>
                </div>
                <div className="blueprint-orbit">
                  <div className="orbit-ring o-outer" />
                  <div className="orbit-ring o-mid" />
                  <div className="orbit-core">
                    <span className="orbit-core-label">TEST</span>
                    <span className="orbit-arrow">↓</span>
                    <span className="orbit-core-label accent">LEARN</span>
                    <span className="orbit-arrow">↓</span>
                    <span className="orbit-core-label">SCALE</span>
                  </div>
                </div>
                <div className="blueprint-metrics-list">
                  <div className="bp-item">
                    <span>Target Metric</span>
                    <strong>Verified Inquiries</strong>
                  </div>
                  <div className="bp-item">
                    <span>Data Integrity</span>
                    <strong>First-Party Logs</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="section pricing-section" id="pricing">
        <div className="container">
          <div className="section-head-split">
            <div>
              <span className="section-eyebrow">A GOOD FIT FOR YOUR STAGE</span>
              <h2 className="section-heading">
                Start where
                <br />
                <span className="text-accent">you are.</span>
              </h2>
            </div>
            <p className="section-intro-copy">
              Engagements are carefully scoped around your specific goals,
              internal team resources, and commercial opportunity. Let's find the
              right place to begin.
            </p>
          </div>

          <div className="pricing-grid">
            {pricingTiers.map((tier) => (
              <article
                className={`pricing-card ${tier.featured ? "pricing-featured" : ""}`}
                key={tier.name}
              >
                {tier.badge && (
                  <div className="featured-ribbon">{tier.badge}</div>
                )}
                <div className="pricing-card-top">
                  <h3 className="pricing-tier-name">{tier.name}</h3>
                  <p className="pricing-tier-sub">{tier.subtitle}</p>
                </div>

                <div className="pricing-value-block">
                  <span className="pricing-amount">{tier.pricing}</span>
                  <span className="pricing-scope-timeline">{tier.timeline}</span>
                </div>

                <div className="pricing-highlights">
                  <span className="highlights-title">WHAT'S INCLUDED:</span>
                  <ul className="highlights-list">
                    {tier.highlights.map((h) => (
                      <li key={h}>
                        <span className="h-check">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pricing-card-footer">
                  <a
                    className={`btn ${tier.featured ? "btn-primary" : "btn-outline"} w-full`}
                    href={GMAIL_COMPOSE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Get in Touch</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 12L12 4M12 4H6M12 4V10"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES SECTION */}
      <section className="section cases-section" id="case-studies">
        <div className="container">
          <div className="section-head-split">
            <div>
              <span className="section-eyebrow">REAL WORK. REAL LEARNING.</span>
              <h2 className="section-heading">
                Measured over
                <br />
                <span className="text-accent">promised.</span>
              </h2>
            </div>
            <p className="section-intro-copy">
              We focus on building measurable results with our partners. Detailed
              case studies will be published as empirical performance data
              becomes available.
            </p>
          </div>

          <div className="case-framework-preview">
            <div className="case-status-banner">
              <div className="status-notice">
                <span className="status-icon">＋</span>
                <div>
                  <h3 className="status-title">Case studies coming soon.</h3>
                  <p className="status-desc">
                    We hold a strict policy against publishing manufactured
                    statistics, fabricated client logos, or hypothetical claims.
                    As our partner programs conclude their measurement cycles,
                    complete breakdowns will be documented here.
                  </p>
                </div>
              </div>
              <span className="transparency-pill">
                A COMMITMENT TO TRANSPARENCY
              </span>
            </div>

            <div className="case-blueprint-structure">
              <span className="structure-title">
                OUR REUSABLE CASE STUDY REPORTING BLUEPRINT:
              </span>
              <div className="blueprint-tags-row">
                <span className="tag-box">01 / Client & Category</span>
                <span className="tag-box">02 / Industry Context</span>
                <span className="tag-box">03 / Baseline Challenge</span>
                <span className="tag-box">04 / Strategy & Architecture</span>
                <span className="tag-box">05 / Execution & Iteration</span>
                <span className="tag-box accent-box">06 / Measured Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="section about-section" id="about">
        <div className="container">
          <div className="about-layout">
            <div className="about-visual-panel">
              <div className="about-badge-card">
                <div className="about-grid-overlay" />
                <div className="about-badge-content">
                  <span className="about-monogram">M</span>
                  <span className="about-slogan">
                    MODERN
                    <br />
                    BY DESIGN
                  </span>
                  <span className="about-sub">BUILT FOR WHAT'S NEXT</span>
                </div>
              </div>
            </div>

            <div className="about-copy-panel">
              <span className="section-eyebrow">05 / ABOUT MODERN ADS</span>
              <h2 className="section-heading">
                Built for the next era of{" "}
                <span className="text-accent">customer acquisition.</span>
              </h2>

              <p className="body-text">
                Modern Ads is a technology-focused growth agency exploring how AI
                is fundamentally changing the way customers discover, evaluate,
                and choose businesses.
              </p>

              <p className="body-text">
                We bring emerging channels and practical marketing fundamentals
                together to help businesses find what works, measure it with
                first-party rigor, and build sustainable momentum from there.
              </p>

              <div className="about-principles-list">
                <div className="principle-item">
                  <strong>Technical Rigor</strong>
                  <span>Engineered entity authority and structured data.</span>
                </div>
                <div className="principle-item">
                  <strong>Honest Experimentation</strong>
                  <span>Unit-economic discipline with no speculative spend.</span>
                </div>
                <div className="principle-item">
                  <strong>Direct Communication</strong>
                  <span>Work directly with senior growth practitioners.</span>
                </div>
              </div>

              <div className="about-action">
                <a
                  className="about-link"
                  href="/contact"
                  onClick={(e) => onNavClick(e, "contact")}
                >
                  <span>Talk with our team</span>
                  <span className="link-arrow">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING BANNER */}
      <section className="section closing-section">
        <div className="container closing-container">
          <span className="section-eyebrow text-center">
            YOUR NEXT CHAPTER STARTS HERE
          </span>
          <h2 className="closing-headline">
            Make your next move
            <br />
            <span className="text-accent">with clarity.</span>
          </h2>
          <p className="closing-sub">
            Tell us what you're working toward. We'll evaluate the opportunity
            and figure out the right next step together.
          </p>
          <div className="closing-cta-wrapper">
            <a
              className="btn btn-primary btn-large"
              href={GMAIL_COMPOSE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Get in Touch</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

type CurrencyCode = "INR" | "USD" | "GBP" | "EUR";

const CURRENCY_CODES: CurrencyCode[] = ["INR", "USD", "GBP", "EUR"];

const BUDGET_OPTIONS_INDIA = [
  "Under ₹25,000 /mo",
  "₹25,000–₹1,00,000 /mo",
  "₹1,00,000–₹2,50,000 /mo",
  "₹2,50,000+ /mo",
  "Not sure yet / Scoping",
];

const BUDGET_OPTIONS_INTL = [
  "Under $500 /mo",
  "$500–$2,000 /mo",
  "$2,000–$5,000 /mo",
  "$5,000+ /mo",
  "Not sure yet / Scoping",
];

const BUDGET_OPTIONS_UK = [
  "Under £500 /mo",
  "£500–£2,000 /mo",
  "£2,000–£5,000 /mo",
  "£5,000+ /mo",
  "Not sure yet / Scoping",
];

const BUDGET_OPTIONS_EU = [
  "Under €500 /mo",
  "€500–€2,000 /mo",
  "€2,000–€5,000 /mo",
  "€5,000+ /mo",
  "Not sure yet / Scoping",
];

const BUDGET_OPTIONS: Record<CurrencyCode, string[]> = {
  INR: BUDGET_OPTIONS_INDIA,
  USD: BUDGET_OPTIONS_INTL,
  GBP: BUDGET_OPTIONS_UK,
  EUR: BUDGET_OPTIONS_EU,
};

const EUR_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE",
]);

const INR_TIMEZONES = new Set(["Asia/Kolkata", "Asia/Calcutta"]);

const GBP_TIMEZONES = new Set([
  "Europe/London",
  "Europe/Belfast",
  "Europe/Guernsey",
  "Europe/Isle_of_Man",
  "Europe/Jersey",
]);

const EUR_TIMEZONES = new Set([
  "Europe/Amsterdam",
  "Europe/Andorra",
  "Europe/Athens",
  "Europe/Berlin",
  "Europe/Bratislava",
  "Europe/Brussels",
  "Europe/Bucharest",
  "Europe/Budapest",
  "Europe/Busingen",
  "Europe/Copenhagen",
  "Europe/Dublin",
  "Europe/Helsinki",
  "Europe/Lisbon",
  "Europe/Ljubljana",
  "Europe/Luxembourg",
  "Europe/Madrid",
  "Europe/Malta",
  "Europe/Mariehamn",
  "Europe/Paris",
  "Europe/Prague",
  "Europe/Riga",
  "Europe/Rome",
  "Europe/Sofia",
  "Europe/Stockholm",
  "Europe/Tallinn",
  "Europe/Vienna",
  "Europe/Vilnius",
  "Europe/Warsaw",
  "Europe/Zagreb",
  "Atlantic/Azores",
  "Atlantic/Canary",
  "Atlantic/Madeira",
]);

const USD_TIMEZONES = new Set([
  "America/New_York",
  "America/Detroit",
  "America/Kentucky/Louisville",
  "America/Kentucky/Monticello",
  "America/Indiana/Indianapolis",
  "America/Indiana/Vincennes",
  "America/Indiana/Winamac",
  "America/Indiana/Marengo",
  "America/Indiana/Petersburg",
  "America/Indiana/Vevay",
  "America/Indiana/Geneva",
  "America/Chicago",
  "America/North_Dakota/Center",
  "America/North_Dakota/New_Salem",
  "America/North_Dakota/Beulah",
  "America/Menominee",
  "America/Denver",
  "America/Boise",
  "America/Phoenix",
  "America/Los_Angeles",
  "America/Anchorage",
  "America/Juneau",
  "America/Nome",
  "America/Sitka",
  "America/Yakutat",
  "America/Metlakatla",
  "America/Adak",
  "Pacific/Honolulu",
]);

const currencyForCountry = (country: string): CurrencyCode => {
  const code = (country || "").trim().toUpperCase();
  if (code === "IN") return "INR";
  if (code === "US") return "USD";
  if (code === "GB") return "GBP";
  if (EUR_COUNTRIES.has(code)) return "EUR";
  return "USD";
};

const currencyForTimeZone = (timeZone: string): CurrencyCode | null => {
  if (!timeZone) return null;
  if (INR_TIMEZONES.has(timeZone)) return "INR";
  if (GBP_TIMEZONES.has(timeZone)) return "GBP";
  if (EUR_TIMEZONES.has(timeZone)) return "EUR";
  if (USD_TIMEZONES.has(timeZone)) return "USD";
  return null;
};

const currencyForLocale = (locale: string): CurrencyCode | null => {
  const parts = (locale || "").toLowerCase().split("-");
  if (parts.length < 2) return null;
  const region = parts[parts.length - 1];
  if (!/^[a-z]{2}$/.test(region)) return null;
  if (region === "in") return "INR";
  if (region === "us") return "USD";
  if (region === "gb") return "GBP";
  if (EUR_COUNTRIES.has(region.toUpperCase())) return "EUR";
  return null;
};

const detectInitialCurrency = (): CurrencyCode => {
  try {
    const saved = localStorage.getItem("preferred_country");
    if (saved) {
      const normalized = saved.toUpperCase();
      if ((CURRENCY_CODES as string[]).includes(normalized)) {
        return normalized as CurrencyCode;
      }
      if (normalized === "IN") return "INR";
      if (normalized === "INTL") return "USD";
    }
  } catch (_) {}

  try {
    const byZone = currencyForTimeZone(
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
    if (byZone) return byZone;
  } catch (_) {}

  try {
    const locales = navigator.languages || [navigator.language || ""];
    for (const locale of locales) {
      const byLocale = currencyForLocale(locale);
      if (byLocale) return byLocale;
    }
  } catch (_) {}

  return "USD";
};

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    website: "",
    budget: "",
    goal: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>(detectInitialCurrency);
  const budgetOptions = BUDGET_OPTIONS[currency];

  useEffect(() => {
    let hasSaved = false;
    try {
      hasSaved = !!localStorage.getItem("preferred_country");
    } catch (_) {}
    if (hasSaved) return;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    fetch("https://api.country.is", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((data) => {
        clearTimeout(timeoutId);
        if (data && data.country) {
          const detected = currencyForCountry(data.country);
          if (detected !== currency) handleSetCurrency(detected);
        }
      })
      .catch(() => {
        // Safe fallback: keeps timezone/locale detection or USD default
      });

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const handleSetCurrency = (next: CurrencyCode) => {
    setCurrency(next);
    try {
      localStorage.setItem("preferred_country", next);
    } catch (_) {}

    if (formData.budget) {
      const oldOptions = BUDGET_OPTIONS[currency];
      const newOptions = BUDGET_OPTIONS[next];
      const idx = oldOptions.indexOf(formData.budget);
      if (idx !== -1 && newOptions[idx]) {
        setFormData((prev) => ({ ...prev, budget: newOptions[idx] }));
      } else {
        setFormData((prev) => ({ ...prev, budget: "" }));
      }
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleCopyMessage = () => {
    const formatted = `Name: ${formData.name}\nCompany: ${formData.company}\nEmail: ${formData.email}\nWebsite: ${formData.website}\nBudget: ${formData.budget}\nGoal: ${formData.goal}\n\nMessage:\n${formData.message}`;
    navigator.clipboard.writeText(formatted);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;

    // Build mailto query to provide a seamless client bridge
    const subject = encodeURIComponent(
      `Growth Inquiry from ${formData.name || "Website"} - ${formData.company || "Modern Ads"}`,
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
        `Company: ${formData.company || "N/A"}\n` +
        `Email: ${formData.email}\n` +
        `Website: ${formData.website || "N/A"}\n` +
        `Budget: ${formData.budget || "Not specified"}\n` +
        `Primary Goal: ${formData.goal || "Not specified"}\n\n` +
        `Message:\n${formData.message}`,
    );

    // Open Gmail compose directly
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <section className="section contact-section">
      <div className="container">
        <div className="contact-layout">
          <div className="contact-info-panel">
            <span className="section-eyebrow">LET'S START A CONVERSATION</span>
            <h1 className="contact-heading">
              Let's talk about
              <br />
              your <span className="text-accent">growth.</span>
            </h1>

            <p className="contact-lead">
              Share details about your business, current acquisition challenges,
              and what you are looking to achieve. We personally review every
              inquiry and respond with honest insight.
            </p>

            <div className="direct-email-card">
              <span className="direct-label">DIRECT INQUIRIES & PARTNERSHIPS</span>
              <div className="email-row">
                <a
                  className="email-link"
                  href={GMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {EMAIL}
                </a>
                <button
                  type="button"
                  className="btn-copy-small"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                >
                  {copiedEmail ? "Copied!" : "Copy"}
                </button>
              </div>
              <p className="email-note">
                Feel free to email our team directly if you already have a
                brief, scope document, or RFQ prepared.
              </p>
            </div>

            <div className="contact-badges-group">
              <div className="service-tag-pill">
                <span className="pill-dot" />
                <span>AI Search Growth</span>
              </div>
              <div className="service-tag-pill">
                <span className="pill-dot" />
                <span>AI Advertising</span>
              </div>
              <div className="service-tag-pill">
                <span className="pill-dot" />
                <span>Conversion Optimization</span>
              </div>
            </div>
          </div>

          <div className="contact-form-panel">
            <form className="lead-contact-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h2 className="form-title">Send a Message</h2>
                <span className="form-required-note">
                  * Indicates required field
                </span>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="form-name">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="form-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="form-company">Company</label>
                  <input
                    id="form-company"
                    name="company"
                    type="text"
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="form-email">
                    Work Email <span className="req">*</span>
                  </label>
                  <input
                    id="form-email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="form-website">Website</label>
                  <input
                    id="form-website"
                    name="website"
                    type="url"
                    placeholder="https://company.com"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="form-budget">Monthly Marketing Budget</label>
                  <select
                    id="form-budget"
                    name="budget"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Select an approximate budget range
                    </option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="form-goal">Primary Goal</label>
                  <select
                    id="form-goal"
                    name="goal"
                    value={formData.goal}
                    onChange={(e) =>
                      setFormData({ ...formData, goal: e.target.value })
                    }
                  >
                    <option value="" disabled>
                      Select your primary focus
                    </option>
                    <option value="AI Search Visibility">
                      Improve AI search visibility & citations
                    </option>
                    <option value="Emerging Advertising">
                      Explore emerging advertising channels
                    </option>
                    <option value="Conversion Optimization">
                      Improve landing page & funnel conversion
                    </option>
                    <option value="Complete Growth Strategy">
                      Comprehensive acquisition strategy
                    </option>
                    <option value="Other">Other / Custom inquiry</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="form-message">
                  Message <span className="req">*</span>
                </label>
                <textarea
                  id="form-message"
                  name="message"
                  rows={4}
                  required
                  minLength={10}
                  placeholder="Tell us about what you're working on, your target customers, and what you'd like to achieve..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <div className="form-submit-row">
                <button type="submit" className="btn btn-primary form-submit-btn">
                  <span>Send Message</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 8L14 2L8 14L7 9L2 8Z"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <span className="privacy-microcopy">
                  We respect your privacy. Inquiries are reviewed under strict
                  confidentiality.
                </span>
              </div>

              {submitted && (
                <div className="submission-notice" role="status">
                  <div className="notice-header">
                    <span className="notice-icon">✓</span>
                    <strong>Ready to Send in Gmail</strong>
                  </div>
                  <p>
                    Your message was prepared. If your Gmail compose window did not open
                    automatically, you can send directly to{" "}
                    <a
                      href={GMAIL_COMPOSE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-semibold"
                    >
                      {EMAIL}
                    </a>
                    .
                  </p>
                  <div className="notice-actions">
                    <button
                      type="button"
                      className="btn btn-secondary btn-small"
                      onClick={handleCopyMessage}
                    >
                      {copiedMessage ? "Copied Inquiry Details!" : "Copy Inquiry to Clipboard"}
                    </button>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent("Growth Inquiry - " + (formData.name || "Modern Ads"))}&body=${encodeURIComponent(formData.message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-small"
                    >
                      Open in Gmail Again
                    </a>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function LegalPage({
  kind,
  onNavClick,
}: {
  kind: "privacy" | "terms";
  onNavClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    to: Page,
    hash?: string,
  ) => void;
}) {
  const isPrivacy = kind === "privacy";

  return (
    <article className="section legal-section">
      <div className="container legal-container">
        <div className="legal-breadcrumbs">
          <a href="/" onClick={(e) => onNavClick(e, "home")}>
            Home
          </a>
          <span>/</span>
          <span>{isPrivacy ? "Privacy Policy" : "Terms of Use"}</span>
        </div>

        <span className="section-eyebrow">
          MODERN ADS // {isPrivacy ? "PRIVACY POLICY" : "TERMS OF USE"}
        </span>
        <h1 className="legal-title">
          {isPrivacy ? "Privacy Policy" : "Terms of Use"}
        </h1>
        <p className="legal-timestamp">
          Last revised & published: September 25, 2026
        </p>

        <div className="legal-body">
          {isPrivacy ? (
            <>
              <section className="legal-block">
                <h2>1. Information You Voluntarily Provide</h2>
                <p>
                  When you interact with Modern Ads via this website, you may
                  voluntarily submit details such as your name, corporate
                  organization, work email address, company website URL,
                  marketing budget approximations, commercial goals, and
                  specific messaging. We utilize this information exclusively to
                  evaluate, prioritize, and respond to your direct inquiry.
                </p>
              </section>

              <section className="legal-block">
                <h2>2. How Information is Handled</h2>
                <p>
                  We recommend that you do not transmit sensitive personal,
                  financial, or proprietary trade secret information via general
                  contact forms. All inbound communications received through
                  direct email or contact mechanisms are handled with
                  professional confidentiality and accessed only by authorized
                  Modern Ads practitioners.
                </p>
              </section>

              <section className="legal-block">
                <h2>3. Information Sharing & Third-Party Disclosure</h2>
                <p>
                  Modern Ads does not sell, rent, monetize, or lease your
                  contact information to third parties or advertising networks.
                  Information is used solely to communicate regarding prospective
                  or active growth consultancy engagements.
                </p>
              </section>

              <section className="legal-block">
                <h2>4. Cookies & Web Telemetry</h2>
                <p>
                  This website is designed with a privacy-first posture. We do
                  not employ invasive behavioral tracking, third-party marketing
                  retargeting pixels, or intrusive tracking cookies.
                </p>
              </section>

              <section className="legal-block">
                <h2>5. Contact Concerning Privacy</h2>
                <p>
                  If you have questions regarding this Privacy Policy or wish to
                  request deletion of any correspondence, please contact us
                  directly at{" "}
                  <a href={GMAIL_COMPOSE_URL} className="legal-link">
                    {EMAIL}
                  </a>
                  .
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="legal-block">
                <h2>1. Nature of Website Content</h2>
                <p>
                  This website is provided for informational and preliminary
                  consultative purposes regarding Modern Ads growth advisory
                  services. All materials, analyses, and frameworks published
                  herein are subject to continuous revision without prior notice.
                </p>
              </section>

              <section className="legal-block">
                <h2>2. No Outcome Guarantees</h2>
                <p>
                  Any formal advisory services, research pilots, or campaign
                  management engagements are governed exclusively by a separate
                  executed written agreement. Nothing on this website constitutes
                  a guarantee of specific advertising platform access, search
                  engine indexation placements, commercial conversion rates, or
                  revenue outcomes. Results depend upon complex external market
                  variables, competitor behaviors, and platform policies.
                </p>
              </section>

              <section className="legal-block">
                <h2>3. Third-Party Platform Citations</h2>
                <p>
                  References to specific third-party AI platforms, search
                  engines, and software tools are descriptive and analytical
                  only. Modern Ads maintains independent consultancy status and
                  claims no formal affiliation, partnership, sponsorship, or
                  endorsement by third-party search or AI providers unless
                  expressly stated in writing.
                </p>
              </section>

              <section className="legal-block">
                <h2>4. Intellectual Property</h2>
                <p>
                  The design, typography, structure, copy, and visual identity
                  of this website are proprietary to Modern Ads. Unauthorized
                  reproduction or scraping of proprietary frameworks without
                  explicit permission is prohibited.
                </p>
              </section>

              <section className="legal-block">
                <h2>5. Inquiries Regarding Terms</h2>
                <p>
                  Inquiries regarding these terms and conditions should be
                  addressed to{" "}
                  <a href={GMAIL_COMPOSE_URL} className="legal-link">
                    {EMAIL}
                  </a>
                  .
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

function Footer({
  onNavClick,
}: {
  onNavClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    to: Page,
    hash?: string,
  ) => void;
}) {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-top-grid">
          <div className="footer-brand-column">
            <a
              href="/"
              className="brand-link"
              onClick={(e) => onNavClick(e, "home")}
            >
              <div className="brand-symbol">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 19V5H8.5L12 12.5L15.5 5H20V19H16.8V9.8L13 16.8H11L7.2 9.8V19H4Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="brand-title">Modern Ads</span>
            </a>
            <p className="footer-mission">
              AI-powered growth for modern businesses. Helping companies get
              discovered through AI search and turn attention into measurable
              customer growth.
            </p>
            <div className="footer-status-tag">
              <span className="tag-dot" />
              <span>Accepting Select Pilot Engagements</span>
            </div>
          </div>

          <div className="footer-nav-columns">
            <div className="footer-col">
              <span className="footer-col-title">NAVIGATION</span>
              <a
                href="/#services"
                onClick={(e) => onNavClick(e, "home", "#services")}
              >
                Services
              </a>
              <a
                href="/#process"
                onClick={(e) => onNavClick(e, "home", "#process")}
              >
                How It Works
              </a>
              <a
                href="/#about"
                onClick={(e) => onNavClick(e, "home", "#about")}
              >
                About
              </a>
              <a
                href="/contact"
                onClick={(e) => onNavClick(e, "contact")}
              >
                Contact
              </a>
            </div>

            <div className="footer-col">
              <span className="footer-col-title">CAPABILITIES</span>
              <a
                href="/#services"
                onClick={(e) => onNavClick(e, "home", "#services")}
              >
                AI Search Growth
              </a>
              <a
                href="/#services"
                onClick={(e) => onNavClick(e, "home", "#services")}
              >
                AI Advertising Strategy
              </a>
              <a
                href="/#services"
                onClick={(e) => onNavClick(e, "home", "#services")}
              >
                Conversion Optimization
              </a>
              <a
                href="/#pilot"
                onClick={(e) => onNavClick(e, "home", "#pilot")}
              >
                Focused 30-Day Pilot
              </a>
            </div>

            <div className="footer-col">
              <span className="footer-col-title">CONNECT</span>
              <a
                href={GMAIL_COMPOSE_URL}
                className="footer-email-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {EMAIL}
              </a>
              <a
                href="/privacy"
                onClick={(e) => onNavClick(e, "privacy")}
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                onClick={(e) => onNavClick(e, "terms")}
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copy">
            © {new Date().getFullYear()} Modern Ads. All rights reserved.
          </div>
          <div className="footer-meta">
            <span>Built for the next era of customer discovery.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
