import { useEffect, useRef, useState } from "react";
import { chapters, meta, stats, nrl, members, mentor } from "./data/voltedge";

export default function App() {
  const [lenis, setLenis] = useState(null);
  const [loadPct, setLoadPct] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    let pct = 0;
    const iv = setInterval(() => {
      pct += Math.floor(Math.random() * 18) + 8;
      if (pct >= 100) { pct = 100; clearInterval(iv); setTimeout(() => setLoaded(true), 520); }
      setLoadPct(pct);
    }, 90);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    (async () => {
      const Lenis = (await import("lenis")).default;
      const l = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
      setLenis(l);
      const raf = (time) => { l.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    })();
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    const onScroll = () => {
      const tb = document.querySelector(".topbar");
      if (tb) tb.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaded]);

  useEffect(() => {
    if (!lenis) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [lenis]);

  if (!loaded) {
    return (
      <div className="loader">
        <div className="loader_bar"><div className="loader_fill" style={{ width: `${loadPct}%` }} /></div>
        <h1 className="loader_title">Volt<span>Edge</span></h1>
        <p className="loader_sub">Loading modules... {loadPct}%</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid_overlay" />
      <canvas className="canvas_bg" />

      <header className="topbar">
        <a href="#hero" className="topbar_logo"><img src="/favicon.svg" alt="" style={{ width:28, height:28, borderRadius:6 }} /> Volt<span>Edge</span> <span className="topbar_id">{meta.id}</span></a>
        <nav className="topbar_nav">
          <a href="#team">Team</a>
          <a href="#build">Build</a>
          <a href="#edgebot">EdgeBot</a>
          <a href="#arena">Arena</a>
          <a href="#outreach">Community</a>
          <a href="#event">Event</a>
          <a href="#journey">Journey</a>
        </nav>
        <button className="topbar_burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"><span /></button>
      </header>

      {menuOpen && (
        <div className="mobile_menu" onClick={() => setMenuOpen(false)}>
          <div onClick={e => e.stopPropagation()}>
            <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:10, letterSpacing:".14em", textTransform:"uppercase", color:"#6B7280", marginBottom:12}}>Navigation</div>
            {chapters.map(c => (
              <a key={c.id} href={`#${c.id}`} onClick={() => setMenuOpen(false)} style={{ color:"#9AA0AE", textDecoration:"none", padding:"10px 12px", border:"1px solid rgba(255,255,255,0.06)", borderRadius:10, display:"block", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".1em", textTransform:"uppercase" }}>{c.num} — {c.kicker}</a>
            ))}
            <a href="#team" onClick={() => setMenuOpen(false)} style={{ color:"#E8C84A", textDecoration:"none", padding:"10px 12px", border:"1px solid rgba(232,200,74,0.3)", borderRadius:10, display:"block", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".1em", textTransform:"uppercase", marginTop:8}}>The Six</a>
          </div>
        </div>
      )}

      <main ref={mainRef}>
        {/* HERO — TEAM first */}
        <section id="hero" className="hero">
          <div className="hero_inner reveal in">
            <p className="eyebrow" style={{ fontSize:11, letterSpacing:".25em", textTransform:"uppercase", color:"#6B7280" }}>{meta.event}</p>
            <h1 className="hero_title" style={{ textTransform:"uppercase", lineHeight:0.92, marginTop:16 }}>
              VOLTEDGE<br/><em>007</em>
            </h1>
            <p style={{ fontFamily:"Josefin Sans", fontWeight:300, fontSize:18, lineHeight:1.5, color:"#E8C84A", marginTop:20, letterSpacing:".04em" }}>
              SIX STUDENTS.<br/>ONE TEAM.<br/>ONE NATIONAL ARENA.
            </p>
            <div style={{ marginTop:24, fontFamily:"JetBrains Mono, monospace", fontSize:11, letterSpacing:".15em", textTransform:"uppercase", color:"#9AA0AE" }}>
              <span>BHATKAL</span>
              <span style={{ margin:"0 8px", color:"#E8C84A" }}>→</span>
              <span>IIT BOMBAY</span>
            </div>
            <div style={{ marginTop:12, padding:"8px 16px", border:"1px solid rgba(232,200,74,0.3)", borderRadius:999, display:"inline-block", fontFamily:"JetBrains Mono, monospace", fontSize:10, letterSpacing:".12em", textTransform:"uppercase", color:"#E8C84A", background:"rgba(232,200,74,0.06)" }}>
              Community Champions Award
            </div>
            <div className="cta_row" style={{ marginTop:28 }}>
              <a href="#team" className="btn btn_primary">Meet the Team ↓</a>
              <a href="#arena" className="btn btn_ghost">The Arena →</a>
              <a href="/Engineering-Portfolio-VoltEdge-007.pdf" target="_blank" rel="noreferrer" className="btn btn_ghost" download>Portfolio ↓</a>
            </div>
          </div>
        </section>

        {/* THE SIX — equal visual weight */}
        <section id="team" className="waypoint waypoint--full">
          <div className="waypoint_inner" style={{ maxWidth:1100 }}>
            <div className="reveal">
              <div className="meta" style={{ justifyContent:"center" }}><span className="meta_num">01</span> <span>The Six</span></div>
              <h2 style={{ textAlign:"center" }}>THE SIX</h2>
              <p style={{ textAlign:"center", color:"#E8C84A", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".12em", textTransform:"uppercase", marginTop:8 }}>
                No individual built VoltEdge.
              </p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:20, marginTop:32 }}>
              {members.map(m => (
                <div key={m.id} className="reveal" style={{ border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, padding:24, textAlign:"center", background:"rgba(255,255,255,0.02)" }}>
                  <div style={{ width:64, height:64, borderRadius:"50%", border:"2px solid rgba(232,200,74,0.3)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", fontFamily:"JetBrains Mono, monospace", fontSize:18, color:"#E8C84A", background:"rgba(232,200,74,0.06)" }}>{m.abbr}</div>
                  <div style={{ fontFamily:"Josefin Sans", fontWeight:600, fontSize:15, color:"#E6E8EC", letterSpacing:".02em" }}>{m.name}</div>
                  <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:"#E8C84A", marginTop:6 }}>{m.role}</div>
                  <p style={{ fontFamily:"Josefin Sans", fontWeight:300, fontSize:13, lineHeight:1.6, color:"#9AA0AE", marginTop:10 }}>{m.detail}</p>
                </div>
              ))}
            </div>
            {/* Mentor */}
            <div className="reveal" style={{ marginTop:24, textAlign:"center", padding:20, border:"1px solid rgba(200,169,10,0.2)", borderRadius:14, background:"rgba(200,169,10,0.04)" }}>
              <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:10, letterSpacing:".12em", textTransform:"uppercase", color:"#6B7280", marginBottom:8 }}>Mentor</div>
              <div style={{ fontFamily:"Josefin Sans", fontWeight:600, fontSize:16, color:"#E6E8EC" }}>{mentor.name}</div>
              <p style={{ fontFamily:"Josefin Sans", fontWeight:300, fontSize:13, lineHeight:1.6, color:"#9AA0AE", marginTop:8, maxWidth:560, margin:"8px auto 0" }}>{mentor.detail}</p>
            </div>
          </div>
        </section>

        {/* THE FIRST SPARK */}
        <section id="spark" className="waypoint">
          <div className="waypoint_inner">
            <div className="waypoint_text reveal">
              <div className="meta"><span className="meta_num">{chapters[0].num}</span> <span>{chapters[0].kicker}</span></div>
              <h2 dangerouslySetInnerHTML={{ __html: chapters[0].title.replace(/\n/g, "<br/>") }} />
              {chapters[0].body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="visual reveal">
              <div className="visual_card">
                <div className="visual_head"><span>Team VoltEdge — Bhatkal</span><span className="dot" /></div>
                <div className="visual_body">
                  <img src="/assets/voltedge/portfolio1_p06_2.jpeg" alt="Team VoltEdge — Bhatkal, 30 November 2025" style={{ width:"100%", borderRadius:12, objectFit:"cover" }} loading="lazy" />
                  <p style={{ fontFamily:"Josefin Sans", fontWeight:300, fontSize:13, color:"#9AA0AE", marginTop:10 }}>Six students, no robot, no workspace — only curiosity.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE BUILD — documentary */}
        <section id="build" className="waypoint waypoint--reverse">
          <div className="waypoint_inner">
            <div className="waypoint_text reveal">
              <div className="meta"><span className="meta_num">{chapters[1].num}</span> <span>{chapters[1].kicker}</span></div>
              <h2 dangerouslySetInnerHTML={{ __html: chapters[1].title.replace(/\n/g, "<br/>") }} />
              {chapters[1].body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="visual reveal">
              <div className="visual_card">
                <div className="visual_head"><span>22—27 October — Build Sessions</span><span className="dot" /></div>
                <div className="visual_body">
                  <div className="gallery" style={{ gridTemplateColumns:"1fr 1fr" }}>
                    <img src="/assets/voltedge/portfolio1_p09_2.jpeg" alt="Evening build session" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"4/3" }} loading="lazy" />
                    <img src="/assets/voltedge/portfolio1_p10_2.jpeg" alt="Workbench — scattered parts becoming a machine" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"4/3" }} loading="lazy" />
                  </div>
                  <p style={{ fontFamily:"Josefin Sans", fontWeight:300, fontSize:13, color:"#9AA0AE", marginTop:10 }}>Late-evening work sessions. Crowded tables. Quiet focus on screens.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EDGEBOT — evidence of teamwork */}
        <section id="edgebot" className="waypoint">
          <div className="waypoint_inner">
            <div className="waypoint_text reveal">
              <div className="meta"><span className="meta_num">{chapters[2].num}</span> <span>{chapters[2].kicker}</span></div>
              <h2 dangerouslySetInnerHTML={{ __html: chapters[2].title.replace(/\n/g, "<br/>") }} />
              {chapters[2].body.map((p, i) => <p key={i}>{p}</p>)}
              <div className="kv">
                {chapters[2].differences.map(d => (
                  <div key={d.to} className="kv_item"><div className="kv_label">{d.from}</div><div className="kv_value">→ {d.to}</div></div>
                ))}
              </div>
            </div>
            <div className="visual reveal">
              <div className="visual_card">
                <div className="visual_head"><span>EdgeBot — The Team's Machine</span><span className="dot" /></div>
                <div className="visual_body">
                  <img src="/assets/voltedge/portfolio1_p18_2.jpeg" alt="EdgeBot — monster-truck shell, aero wing" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"16/12" }} loading="lazy" />
                  <div className="tagrow"><span className="tag">Gyro</span><span className="tag">Ultrasonic</span><span className="tag">Line array</span><span className="tag">3D shell</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AUTONOMY */}
        <section id="autonomy" className="waypoint waypoint--reverse">
          <div className="waypoint_inner">
            <div className="waypoint_text reveal">
              <div className="meta"><span className="meta_num">{chapters[3].num}</span> <span>{chapters[3].kicker}</span></div>
              <h2 dangerouslySetInnerHTML={{ __html: chapters[3].title.replace(/\n/g, "<br/>") }} />
              {chapters[3].body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="visual reveal">
              <div className="visual_card">
                <div className="visual_head"><span>Sensors — Built from Scratch</span><span className="dot" /></div>
                <div className="visual_body">
                  <img src="/assets/voltedge/portfolio2_p32_2.png" alt="Chassis sketch — sensor layout" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"4/3" }} loading="lazy" />
                  <div className="specs">
                    <div className="spec"><span>IR array</span><span>5-sensor line following</span></div>
                    <div className="spec"><span>Gyro</span><span>Drift correction, precise turns</span></div>
                    <div className="spec"><span>Ultrasonic</span><span>Charge detection, collision protection</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ARENA — the climax */}
        <section id="arena" className="waypoint waypoint--full">
          <div className="waypoint_inner" style={{ maxWidth:900, margin:"0 auto" }}>
            <div className="reveal" style={{ textAlign:"center", marginBottom:28 }}>
              <div style={{ fontFamily:"Cormorant Garamond, serif", fontSize:22, lineHeight:1.5, color:"#E8C84A", fontStyle:"italic", maxWidth:640, margin:"0 auto" }}>
                "Our robot was dead the night before we left. Voltage regulator blown. ESP32 gone. Hexa Command Hub gone. We left for Bombay with a robot that wouldn't move."
              </div>
              <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:10, letterSpacing:".12em", textTransform:"uppercase", color:"#6B7280", marginTop:10 }}>
                3 December 2025 — Bhatkal
              </div>
            </div>
            <div className="reveal">
              <div className="meta" style={{ justifyContent:"center" }}><span className="meta_num">{chapters[4].num}</span> <span>{chapters[4].kicker}</span></div>
              <h2 style={{ textAlign:"center", textTransform:"uppercase" }}>IIT BOMBAY</h2>
              <p style={{ textAlign:"center", color:"#E8C84A", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".12em", textTransform:"uppercase", marginTop:8 }}>
                {meta.championship}
              </p>
              {chapters[4].body.map((p, i) => <p key={i} style={{ maxWidth:700, margin:"14px auto 0", textAlign:"center" }}>{p}</p>)}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:16, marginTop:28 }}>
                {chapters[4].stats.map(s => (
                  <div key={s.label} style={{ border:"1px solid rgba(232,200,74,0.2)", borderRadius:12, textAlign:"center", padding:"16px 8px", background:"rgba(232,200,74,0.04)" }}>
                    <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:10, letterSpacing:".12em", textTransform:"uppercase", color:"#E8C84A" }}>{s.label}</div>
                    <div style={{ fontFamily:"Josefin Sans", fontWeight:600, fontSize:22, color:"#E6E8EC", marginTop:4 }}>{s.value}</div>
                  </div>
                ))}
              </div>
              {/* Community Champions Award */}
              <div style={{ marginTop:28, padding:24, border:"2px solid rgba(232,200,74,0.4)", borderRadius:16, background:"linear-gradient(135deg, rgba(232,200,74,0.08), rgba(200,169,10,0.04))", textAlign:"center" }}>
                <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:10, letterSpacing:".15em", textTransform:"uppercase", color:"#E8C84A", marginBottom:8 }}>Award</div>
                <div style={{ fontFamily:"Josefin Sans", fontWeight:600, fontSize:22, color:"#E6E8EC", letterSpacing:".02em" }}>Community Champions</div>
                <p style={{ fontFamily:"Josefin Sans", fontWeight:300, fontSize:14, lineHeight:1.6, color:"#C9CDD6", marginTop:8, maxWidth:560, margin:"8px auto 0" }}>{chapters[4].award.body}</p>
              </div>
              <div style={{ marginTop:28, textAlign:"center" }}>
                <img src="/assets/voltedge/portfolio2_p35_2.jpeg" alt="Arena — Battle of Charges field" style={{ width:"100%", maxWidth:700, borderRadius:12, objectFit:"cover" }} loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* OUTREACH — major section */}
        <section id="outreach" className="waypoint waypoint--full">
          <div className="waypoint_inner" style={{ maxWidth:1000 }}>
            <div className="reveal">
              <div className="meta" style={{ justifyContent:"center" }}><span className="meta_num">{chapters[5].num}</span> <span>{chapters[5].kicker}</span></div>
              <h2 style={{ textAlign:"center" }} dangerouslySetInnerHTML={{ __html: chapters[5].title.replace(/\n/g, "<br/>") }} />
              {chapters[5].body.map((p, i) => <p key={i} style={{ maxWidth:700, margin:"14px auto 0", textAlign:"center" }}>{p}</p>)}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:16, marginTop:24 }}>
                {chapters[5].metrics.map(m => (
                  <div key={m.label} style={{ border:"1px solid rgba(0,229,255,0.2)", borderRadius:12, textAlign:"center", padding:"16px", background:"rgba(0,229,255,0.04)" }}>
                    <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:10, letterSpacing:".12em", textTransform:"uppercase", color:"#00E5FF" }}>{m.label}</div>
                    <div style={{ fontFamily:"Josefin Sans", fontWeight:600, fontSize:20, color:"#E6E8EC", marginTop:4 }}>{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginTop:24 }}>
              <img src="/assets/voltedge/portfolio2_p37_3.jpeg" alt="Workshop — Ali Public School" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"4/3" }} loading="lazy" />
              <img src="/assets/voltedge/portfolio2_p38_3.jpeg" alt="Students learning robotics" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"4/3" }} loading="lazy" />
            </div>
          </div>
        </section>

        {/* BRANDING — team identity */}
        <section id="branding" className="waypoint">
          <div className="waypoint_inner">
            <div className="waypoint_text reveal">
              <div className="meta"><span className="meta_num">{chapters[6].num}</span> <span>{chapters[6].kicker}</span></div>
              <h2 dangerouslySetInnerHTML={{ __html: chapters[6].title.replace(/\n/g, "<br/>") }} />
              {chapters[6].body.map((p, i) => <p key={i}>{p}</p>)}
              <div className="kv">
                <div className="kv_item"><div className="kv_label">Views</div><div className="kv_value">{stats.views}</div></div>
                <div className="kv_item"><div className="kv_label">Reached</div><div className="kv_value">{stats.reach}</div></div>
                <div className="kv_item"><div className="kv_label">Non-followers</div><div className="kv_value">{stats.nonFollower}</div></div>
              </div>
            </div>
            <div className="visual reveal">
              <div className="visual_card">
                <div className="visual_head"><span>Identity — Black + Gold</span><span className="dot" /></div>
                <div className="visual_body">
                  <img src="/assets/voltedge/portfolio2_p48_2.jpeg" alt="Instagram analytics" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"16/9" }} loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* JOURNEY — timeline */}
        <section id="journey" className="waypoint waypoint--full">
          <div className="waypoint_inner" style={{ maxWidth:900, margin:"0 auto" }}>
            <div className="reveal">
              <div className="meta" style={{ justifyContent:"center" }}><span className="meta_num">{chapters[7].num}</span> <span>{chapters[7].kicker}</span></div>
              <h2 style={{ textAlign:"center" }} dangerouslySetInnerHTML={{ __html: chapters[7].title.replace(/\n/g, "<br/>") }} />
              <p>{chapters[7].body[0]}</p>
              <div className="timeline">
                {chapters[7].timeline.map(t => (
                  <div key={t.date} className="t_item">
                    <div className="t_date">{t.date}</div>
                    <div className="t_title">{t.title}</div>
                    <div className="t_desc">{t.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:20, padding:16, border:"1px solid rgba(200,169,10,0.2)", borderRadius:14, background:"rgba(200,169,10,0.05)", textAlign:"center" }}>
                <div style={{ fontFamily:"Cormorant Garamond, serif", fontSize:17, color:"#E8C84A" }}>{chapters[7].closing}</div>
              </div>
            </div>
          </div>
        </section>

        {/* THE SIX — closing, not the robot */}
        <section id="closing" className="waypoint waypoint--full">
          <div className="waypoint_inner" style={{ maxWidth:900, margin:"0 auto" }}>
            <div className="reveal" style={{ textAlign:"center" }}>
              <div className="meta" style={{ justifyContent:"center" }}><span className="meta_num">09</span> <span>The Six</span></div>
              <h2 style={{ textTransform:"uppercase" }}>VOLTEDGE 007</h2>
              <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:12, marginTop:24 }}>
                {members.map(m => (
                  <div key={m.id} style={{ padding:"12px 20px", border:"1px solid rgba(232,200,74,0.2)", borderRadius:12, background:"rgba(232,200,74,0.04)" }}>
                    <div style={{ fontFamily:"Josefin Sans", fontWeight:600, fontSize:14, color:"#E6E8EC" }}>{m.name.split(" ")[0]}</div>
                    <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:9, letterSpacing:".1em", textTransform:"uppercase", color:"#E8C84A", marginTop:2 }}>{m.role.split(" & ")[0]}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:16, fontFamily:"Josefin Sans", fontWeight:300, fontSize:13, color:"#9AA0AE" }}>
                Mentored by <strong style={{ color:"#E6E8EC" }}>{mentor.name}</strong>
              </div>
              <div style={{ marginTop:24, fontFamily:"Cormorant Garamond, serif", fontSize:20, color:"#E8C84A" }}>
                Driven by Volts. Defined by Vision.
              </div>
            </div>
          </div>
        </section>

        {/* EVENT — IIT Bombay booth photo */}
        <section id="event" className="waypoint waypoint--full">
          <div className="waypoint_inner" style={{ maxWidth:1000, margin:"0 auto" }}>
            <div className="reveal" style={{ textAlign:"center" }}>
              <div className="meta" style={{ justifyContent:"center" }}><span className="meta_num">10</span> <span>IIT Bombay — Event Day</span></div>
              <h2 style={{ textTransform:"uppercase" }}>THE NATIONAL ARENA</h2>
              <p style={{ marginTop:8, fontFamily:"Josefin Sans", fontWeight:300, fontSize:15, color:"#C9CDD6", maxWidth:640, margin:"8px auto 0", textAlign:"center" }}>
                6—7 December 2025. IIT Bombay. Team VoltEdge at their booth — EdgeBot, drone prototype, and the Transparent Glass Safety System poster on display for judges and teams from across India.
              </p>
            </div>
            <div className="reveal" style={{ marginTop:24 }}>
              <img src="/assets/voltedge/team-booth-iit-bombay.jpg" alt="Team VoltEdge at IIT Bombay — NRL 2025 booth, all six members in matching jackets" style={{ width:"100%", borderRadius:16, objectFit:"cover" }} loading="lazy" />
              <p style={{ fontFamily:"JetBrains Mono, monospace", fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:"#6B7280", textAlign:"center", marginTop:10 }}>
                Team VoltEdge — Booth at IIT Bombay, December 2025
              </p>
            </div>
            <div className="reveal" style={{ marginTop:20 }}>
              <img src="/assets/voltedge/nrl-event-booth.jpg" alt="Team VoltEdge at IIT Bombay — event coverage" style={{ width:"100%", borderRadius:16, objectFit:"cover" }} loading="lazy" />
              <p style={{ fontFamily:"JetBrains Mono, monospace", fontSize:10, letterSpacing:".1em", textTransform:"uppercase", color:"#6B7280", textAlign:"center", marginTop:10 }}>
                Coverage from NRL 2025 — Community Champions Award
              </p>
            </div>
            <div className="reveal" style={{ marginTop:28, padding:24, border:"2px solid rgba(232,200,74,0.3)", borderRadius:16, background:"linear-gradient(135deg, rgba(232,200,74,0.08), rgba(200,169,10,0.03))", textAlign:"center" }}>
              <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:10, letterSpacing:".15em", textTransform:"uppercase", color:"#E8C84A", marginBottom:8 }}>Community Champions Award — NRL 2025</div>
              <p style={{ fontFamily:"Josefin Sans", fontWeight:300, fontSize:14, lineHeight:1.6, color:"#C9CDD6", maxWidth:560, margin:"0 auto" }}>
                Recognized for building a robotics culture in Bhatkal — school workshops, kits distributed, STEM awareness, and inspiring the next generation. Only team from Bhatkal at the national arena.
              </p>
            </div>
          </div>
        </section>

        <footer className="footer reveal">
          <div className="footer_sub">VoltEdge {meta.id} • {meta.school} • {meta.location} → {meta.venue} • {meta.championship}</div>
          <div style={{ marginTop:12, padding:"8px 16px", border:"1px solid rgba(232,200,74,0.3)", borderRadius:999, display:"inline-block", fontFamily:"JetBrains Mono, monospace", fontSize:10, letterSpacing:".12em", textTransform:"uppercase", color:"#E8C84A", background:"rgba(232,200,74,0.06)" }}>
            {meta.award}
          </div>
          <div className="footer_links">
            <a href="#hero" className="btn btn_primary">Back to Top ↑</a>
            <a href="/Engineering-Portfolio-VoltEdge-007.pdf" target="_blank" rel="noreferrer" className="btn btn_ghost" download>Download Portfolio ↓</a>
            <a href="https://www.instagram.com/teamvoltedge" target="_blank" rel="noreferrer" className="btn btn_ghost">@teamvoltedge</a>
          </div>
          <div className="small">Typography: Josefin Sans • Palette: Void / Gold / Cyan • © Team VoltEdge</div>
        </footer>
      </main>

      <div className="joystick_hint"><i>↕</i> scroll to navigate</div>
    </>
  );
}
