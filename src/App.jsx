import { useEffect, useRef, useState } from "react";
import { chapters, meta, stats, nrl } from "./data/voltedge";

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.12 }
    );
    el.querySelectorAll(".reveal").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const revealRef = useReveal();

  // loader: thevertmenthe style 0 -> 12 modules
  useEffect(() => {
    let p = 0;
    const t = setInterval(() => {
      p += Math.random() * 2.2;
      if (p >= 100) { p = 100; clearInterval(t); setTimeout(() => setLoading(false), 420); }
      setProgress(Math.floor(p));
    }, 40);
    return () => clearInterval(t);
  }, []);

  // progress bar + topbar
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const v = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty("--progress", String(v));
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lenis smooth (if installed, degrade gracefully)
  useEffect(() => {
    let lenis;
    (async () => {
      try {
        const Lenis = (await import("lenis")).default;
        lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
        function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
        requestAnimationFrame(raf);
      } catch {}
    })();
    return () => { try{ lenis?.destroy(); }catch{} };
  }, []);

  const loadedModules = Math.floor((progress / 100) * 12);

  return (
    <>
      <canvas className="webgl" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
      <div className="progress" />

      {/* Loader — favorite minimal */}
      <div className={`loader ${loading ? "" : "hidden"}`}>
        <div className="loader_inner">
          <h1 className="loader_title">Volt<span>Edge</span></h1>
          <div className="loader_line" />
          <div className="loader_sub">
            <div className="loader_number">{String(loadedModules).padStart(2,"0")}</div>
            <div className="loader_subtitle">/ 12 modules — {progress}%</div>
          </div>
          <div style={{ marginTop: 10, fontFamily:"JetBrains Mono, monospace", fontSize:10, letterSpacing:".14em", color:"#6B7280", textTransform:"uppercase"}}>
            National Robotics League — Team {meta.id}
          </div>
        </div>
      </div>

      <header className={`topbar ${scrolled ? "scrolled" : ""}`}>
        <a className="brand" href="#prologue">
          <div className="brand_mark">⚡</div>
          <div>
            <div className="brand_name">VoltEdge <span className="brand_id">007</span></div>
            <div style={{ fontFamily:"JetBrains Mono, monospace", fontSize:9, letterSpacing:".14em", color:"#9AA0AE", textTransform:"uppercase"}}>NRL 2025 — Bhatkal → IIT Bombay</div>
          </div>
        </a>
        <nav className="topbar_nav">
          <a href="#spark">Team</a>
          <a href="#prototype">Build</a>
          <a href="#edgebot">EdgeBot</a>
          <a href="#arena">Arena</a>
          <a href="#autonomous">Autonomy</a>
          <a href="#journey">Journey</a>
          <a href="#journey" className="btn btn_primary" style={{ padding:"7px 14px", fontSize:10}}>Follow @teamvoltedge</a>
        </nav>
        <button className="menu_btn" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "close" : "menu"}</button>
      </header>
      {menuOpen && (
        <div style={{ position:"fixed", inset:"56px 12px auto 12px", zIndex:19, background:"rgba(11,15,25,0.96)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:14, backdropFilter:"blur(12px)"}}>
          <div style={{ display:"grid", gap:8, fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".12em", textTransform:"uppercase"}}>
            {chapters.slice(0,8).map(c=> <a key={c.id} href={`#${c.id}`} onClick={()=>setMenuOpen(false)} style={{ color:"#9AA0AE", textDecoration:"none", padding:"8px 10px", border:"1px solid rgba(255,255,255,0.06)", borderRadius:10}}>{c.num} — {c.kicker}</a>)}
            <a href="#arena" onClick={()=>setMenuOpen(false)} style={{ color:"#9AA0AE", textDecoration:"none", padding:"8px 10px", border:"1px solid rgba(255,255,255,0.06)", borderRadius:10}}>Arena — Battle of Charges</a>
          </div>
        </div>
      )}

      <main ref={revealRef}>
        {/* Hero — prologue: restrained editorial, no boot, no fake loading */}
        <section id="prologue" className="hero">
          <div className="hero_inner reveal in">
            <p className="kicker"><span>NRL 2025</span></p>
            <h1 className="hero_title" style={{ textTransform:"uppercase", lineHeight:0.92 }}>
              VOLT<br/><em>EDGE</em><br/><strong>007</strong>
            </h1>
            <p className="eyebrow" style={{ fontSize:14, letterSpacing:".2em", marginTop:12, color:"#E8C84A" }}>
              BATTLE OF CHARGES
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"12px 24px", marginTop:18, fontFamily:"JetBrains Mono, monospace", fontSize:11, letterSpacing:".14em", textTransform:"uppercase", color:"#9AA0AE" }}>
              <span>IIT Bombay</span>
              <span>6—7 December 2025</span>
              <span>Only team from Bhatkal</span>
              <span>600+ students</span>
              <span>100+ teams</span>
              <span>Community Champions</span>
            </div>
            <p className="hero_sub" style={{ marginTop:24, maxWidth:640, fontSize:16, lineHeight:1.7, color:"#C9CDD6" }}>
              Six students. One machine. One national arena. A standalone engineering archive — from a midnight message before midterms to the IIT Bombay floor. No fiction. Just the build.
            </p>
            <div className="cta_row">
              <a href="#spark" className="btn btn_primary">Begin Archive ↓</a>
              <a href="#arena" className="btn btn_ghost">The Arena →</a>
            </div>
          </div>
        </section>

        {/* Spark */}
        <section id="spark" className="waypoint">
          <div className="waypoint_inner">
            <div className="waypoint_text reveal">
              <div className="meta"><span className="meta_num">{chapters[1].num}</span> <span className="meta_pages">{chapters[1].pages}</span> <span>• {chapters[1].kicker}</span></div>
              <h2 dangerouslySetInnerHTML={{__html: chapters[1].title.replace(/\n/g,"<br/>")}} />
              <p style={{ marginTop:10, color:"#E8C84A", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".12em", textTransform:"uppercase"}}>{chapters[1].subtitle}</p>
              {chapters[1].body.map((p,i)=> <p key={i}>{p}</p>)}
              <div className="pullquote">{chapters[1].pullquote}</div>
            </div>
            <div className="visual reveal">
              <div className="visual_card">
                <div className="visual_head"><span>01 — Group • Bhatkal • 30 Nov 2025</span> <span className="dot" /></div>
                <div className="visual_body">
                  <img src="/assets/voltedge/portfolio1_p06_2.jpeg" alt="Team VoltEdge — Bhatkal, 30 Nov 2025" style={{ width:"100%", borderRadius:12, objectFit:"cover" }} loading="lazy" />
                  <div className="tagrow"><span className="tag">Bhatkal coast</span><span className="tag">Team 007</span><span className="tag">IIT Bombay bound</span></div>
                  <p style={{ fontFamily:"Josefin Sans, sans-serif", fontWeight:300, fontSize:13, lineHeight:1.6, color:"#9AA0AE", marginTop:10}}>
                    Six students, no robot, no workspace — only curiosity. From that midnight message to a national arena with confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roles */}
        <section id="roles" className="waypoint waypoint--full">
          <div className="waypoint_inner" style={{ maxWidth:1160}}>
            <div className="reveal">
              <div className="meta"><span className="meta_num">{chapters[2].num}</span> <span className="meta_pages">{chapters[2].pages}</span> <span>• {chapters[2].kicker}</span></div>
              <h2 dangerouslySetInnerHTML={{__html: chapters[2].title.replace(/\n/g,"<br/>")}} />
              <p style={{ color:"#E8C84A", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".12em", textTransform:"uppercase", marginTop:8}}>{chapters[2].subtitle}</p>
              <p>{chapters[2].body[0]}</p>
              <div className="roles">
                {chapters[2].roles.map(r=> (
                  <div key={r.name} className="role">
                    <div className="role_name">{r.name}</div>
                    <div className="role_title">{r.role}</div>
                    <div className="role_desc">{r.detail}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:14, padding:14, border:"1px solid rgba(200,169,10,0.18)", borderRadius:12, background:"rgba(200,169,10,0.06)"}}>
                <div className="role_name">{chapters[2].mentor.name} — <span style={{ color:"#E8C84A"}}>{chapters[2].mentor.role}</span></div>
                <div className="role_desc" style={{ marginTop:6}}>{chapters[2].mentor.detail}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Approach */}
        <section id="approach" className="waypoint">
          <div className="waypoint_inner">
            <div className="waypoint_text reveal">
              <div className="meta"><span className="meta_num">{chapters[3].num}</span> <span className="meta_pages">{chapters[3].pages}</span> <span>• {chapters[3].kicker}</span></div>
              <h2 dangerouslySetInnerHTML={{__html: chapters[3].title.replace(/\n/g,"<br/>")}} />
              <p style={{ color:"#E8C84A", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".12em", textTransform:"uppercase"}}>{chapters[3].subtitle}</p>
              {chapters[3].body.map((p,i)=> <p key={i}>{p}</p>)}
              <div className="kv"><div className="kv_item"><div className="kv_label">Window</div><div className="kv_value">22—27 Oct / Five evenings after college</div></div><div className="kv_item"><div className="kv_label">Cycle</div><div className="kv_value">Build → Test → Adjust</div></div></div>
            </div>
            <div className="visual reveal">
              <div className="visual_card">
                <div className="visual_head"><span>Workbench • p09—10 photos</span><span className="dot" /></div>
                <div className="visual_body">
                  <div className="gallery" style={{ gridTemplateColumns:"1fr 1fr"}}>
                    <img src="/assets/voltedge/portfolio1_p09_2.jpeg" alt="Evening session" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"4/3" }} loading="lazy" />
                    <img src="/assets/voltedge/portfolio1_p10_2.jpeg" alt="Crowded table" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"4/3" }} loading="lazy" />
                  </div>
                  <p style={{ fontFamily:"Josefin Sans", fontWeight:300, fontSize:13, color:"#9AA0AE", marginTop:10}}>{chapters[3].caption}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prototype */}
        <section id="prototype" className="waypoint waypoint--reverse">
          <div className="waypoint_inner">
            <div className="waypoint_text reveal">
              <div className="meta"><span className="meta_num">{chapters[4].num}</span> <span className="meta_pages">{chapters[4].pages}</span> <span>• {chapters[4].kicker}</span></div>
              <h2 dangerouslySetInnerHTML={{__html: chapters[4].title.replace(/\n/g,"<br/>")}} />
              <p style={{ color:"#E8C84A", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".12em", textTransform:"uppercase"}}>{chapters[4].subtitle}</p>
              {chapters[4].body.map((p,i)=> <p key={i}>{p}</p>)}
              <h3>Early Tests — p13</h3>
              <p>{chapters[4].testing.body}</p>
            </div>
            <div className="visual reveal">
              <div className="visual_card">
                <div className="visual_head"><span>BaseBot • Dual-layer acrylic • 4-motor</span><span className="dot" /></div>
                <div className="visual_body">
                  <div className="specs">
                    {chapters[4].specs.map(s=> <div key={s.label} className="spec"><span>{s.label}</span><span>{s.value}</span></div>)}
                  </div>
                  <img src="/assets/voltedge/portfolio1_p13_2.jpeg" alt="BaseBot chassis — dual-layer acrylic" style={{ width:"100%", borderRadius:12, objectFit:"cover", marginTop:12, aspectRatio:"16/10" }} loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EdgeBot */}
        <section id="edgebot" className="waypoint">
          <div className="waypoint_inner">
            <div className="waypoint_text reveal">
              <div className="meta"><span className="meta_num">{chapters[5].num}</span> <span className="meta_pages">{chapters[5].pages}</span> <span>• {chapters[5].kicker}</span></div>
              <h2>{chapters[5].title}</h2>
              <p style={{ color:"#E8C84A", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".12em", textTransform:"uppercase"}}>{chapters[5].subtitle}</p>
              {chapters[5].body.map((p,i)=> <p key={i}>{p}</p>)}
              <h3>BaseBot → EdgeBot</h3>
              <div className="kv">
                {chapters[5].differences.map(d=> (
                  <div key={d.to} className="kv_item"><div className="kv_label">{d.from}</div><div className="kv_value">→ {d.to}</div></div>
                ))}
              </div>
              <h3>Impact on Performance — p16</h3>
              {chapters[5].impact.map((t,i)=> <p key={i} style={{ fontSize:14}}>• {t}</p>)}
            </div>
            <div className="visual reveal">
              <div className="visual_card">
                <div className="visual_head"><span>EdgeBot • Monster-truck shell • Aero wing</span><span className="dot" /></div>
                <div className="visual_body">
                  <img src="/assets/voltedge/portfolio1_p18_2.jpeg" alt="EdgeBot — monster-truck shell, aero wing" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"16/12" }} loading="lazy" />
                  <div className="tagrow"><span className="tag">Gyro</span><span className="tag">Ultrasonic</span><span className="tag">Line array</span><span className="tag">Telemetry</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mechanical */}
        <section id="mechanical" className="waypoint waypoint--reverse">
          <div className="waypoint_inner">
            <div className="waypoint_text reveal">
              <div className="meta"><span className="meta_num">{chapters[6].num}</span> <span className="meta_pages">{chapters[6].pages}</span> <span>• {chapters[6].kicker}</span></div>
              <h2 dangerouslySetInnerHTML={{__html: chapters[6].title.replace(/\n/g,"<br/>")}} />
              <p style={{ color:"#E8C84A", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".12em", textTransform:"uppercase"}}>{chapters[6].subtitle}</p>
              {chapters[6].body.map((p,i)=> <p key={i}>{p}</p>)}
              <div className="kv">
                {chapters[6].specs.map(s=> <div key={s.label} className="kv_item"><div className="kv_label">{s.label}</div><div className="kv_value">{s.value}</div></div>)}
              </div>
            </div>
            <div className="visual reveal">
              <div className="visual_card">
                <div className="visual_head"><span>Chassis • p17 blueprint</span><span className="dot" /></div>
                <div className="visual_body">
                  <img src="/assets/voltedge/portfolio1_p20_2.jpeg" alt="Chassis — dual-layer acrylic, 36x26cm" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"16/11" }} loading="lazy" />
                  <div className="specs">
                    <div className="spec"><span>Lead</span><span>Ahmed Irfan Akrami</span></div>
                    <div className="spec"><span>Refinements</span><span>22—27 Oct realignment</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Electronic */}
        <section id="electronic" className="waypoint">
          <div className="waypoint_inner">
            <div className="waypoint_text reveal">
              <div className="meta"><span className="meta_num">{chapters[7].num}</span> <span className="meta_pages">{chapters[7].pages}</span> <span>• {chapters[7].kicker}</span></div>
              <h2 dangerouslySetInnerHTML={{__html: chapters[7].title.replace(/\n/g,"<br/>")}} />
              <p style={{ color:"#E8C84A", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".12em", textTransform:"uppercase"}}>{chapters[7].subtitle}</p>
              {chapters[7].body.map((p,i)=> <p key={i}>{p}</p>)}
              <div style={{ borderLeft:"2px solid rgba(0,229,255,0.4)", padding:"10px 14px", background:"rgba(0,229,255,0.06)", borderRadius:"0 10px 10px 0", marginTop:12, fontFamily:"Cormorant Garamond, serif", fontSize:15, color:"#9EDDFF"}}>“{chapters[7].callout}”</div>
            </div>
            <div className="visual reveal">
              <div className="visual_card">
                <div className="visual_head"><span>Wiring • MDD10 + HEXA ESP32 • p19</span><span className="dot" /></div>
                <div className="visual_body">
                  <img src="/assets/voltedge/portfolio1_p25_2.jpeg" alt="Wiring — MDD10A + HEXA ESP32" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"16/11" }} loading="lazy" />
                  <div className="specs">
                    <div className="spec"><span>Brain</span><span>HEXA Command Hub ESP32</span></div>
                    <div className="spec"><span>Driver</span><span>Cytron MDD10A PWM</span></div>
                    <div className="spec"><span>Safety</span><span>Power-off before rewiring</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programming */}
        <section id="programming" className="waypoint waypoint--reverse">
          <div className="waypoint_inner">
            <div className="waypoint_text reveal">
              <div className="meta"><span className="meta_num">{chapters[8].num}</span> <span className="meta_pages">{chapters[8].pages}</span> <span>• {chapters[8].kicker}</span></div>
              <h2 dangerouslySetInnerHTML={{__html: chapters[8].title.replace(/\n/g,"<br/>")}} />
              <p style={{ color:"#E8C84A", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".12em", textTransform:"uppercase"}}>{chapters[8].subtitle}</p>
              {chapters[8].body.map((p,i)=> <p key={i}>{p}</p>)}
              <div className="specs" style={{ marginTop:10}}>
                {chapters[8].mapping.map(m=> <div key={m.input} className="spec"><span>{m.input}</span><span>{m.action} <em style={{ color:"#9AA0AE", fontWeight:400}}>— {m.note}</em></span></div>)}
              </div>
            </div>
            <div className="visual reveal">
              <div className="visual_card">
                <div className="visual_head"><span>PS5 → ESP32 • p22—27 custom map</span><span className="dot" /></div>
                <div className="visual_body">
                  <img src="/assets/voltedge/portfolio1_p24_2.png" alt="PS5 → ESP32 custom mapping" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"16/10" }} loading="lazy" />
                  <div className="tagrow"><span className="tag">Left: forward</span><span className="tag">Right: turn</span><span className="tag">L2/R2: arm</span><span className="tag">R1: gripper</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Autonomous */}
        <section id="autonomous" className="waypoint">
          <div className="waypoint_inner">
            <div className="waypoint_text reveal">
              <div className="meta"><span className="meta_num">{chapters[9].num}</span> <span className="meta_pages">{chapters[9].pages}</span> <span>• {chapters[9].kicker}</span></div>
              <h2 dangerouslySetInnerHTML={{__html: chapters[9].title.replace(/\n/g,"<br/>")}} />
              <p style={{ color:"#E8C84A", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".12em", textTransform:"uppercase"}}>{chapters[9].subtitle}</p>
              {chapters[9].body.map((p,i)=> <p key={i} style={i===0?{fontWeight:500, color:"#E6E8EC"}:{}}>{p}</p>)}
              <h3>{chapters[9].integration.title}</h3>
              <p>{chapters[9].integration.body}</p>
            </div>
            <div className="visual reveal">
              <div className="visual_card">
                <div className="visual_head"><span>Sensing • 5×IR + gyro + ultrasonic • p29—32</span><span className="dot" /></div>
                <div className="visual_body">
                  <img src="/assets/voltedge/portfolio2_p32_2.png" alt="Chassis sketch — sensor layout" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"4/3" }} loading="lazy" />
                  <div className="specs">
                    <div className="spec"><span>IR array</span><span>Threshold + correction logic</span></div>
                    <div className="spec"><span>Gyro</span><span>Drift correction, precise turns</span></div>
                    <div className="spec"><span>Ultrasonic</span><span>Charge distance → slow & align</span></div>
                    <div className="spec"><span>Activation</span><span>Hold X 5s (safety)</span></div>
                  </div>
                  <p style={{ fontFamily:"Josefin Sans", fontWeight:300, fontSize:12, color:"#6B7280", marginTop:8}}>Mentor: Danish Gawai Sir — sensor behaviour & logic over several days. p32 chassis sketch.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Strategy */}
        <section id="strategy" className="waypoint waypoint--full">
          <div className="waypoint_inner">
            <div className="reveal" style={{ maxWidth:860, margin:"0 auto"}}>
              <div className="meta" style={{ justifyContent:"center"}}><span className="meta_num">{chapters[10].num}</span> <span className="meta_pages">{chapters[10].pages}</span> <span>• {chapters[10].kicker}</span></div>
              <h2 style={{ textAlign:"center"}} dangerouslySetInnerHTML={{__html: chapters[10].title.replace(/\n/g,"<br/>")}} />
              <p style={{ textAlign:"center", color:"#E8C84A", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".12em", textTransform:"uppercase"}}>{chapters[10].subtitle}</p>
              {chapters[10].body.map((p,i)=> <p key={i} style={{ maxWidth:760, margin:"0 auto 14px"}}>{p}</p>)}
              <div className="principles">
                {chapters[10].principles.map(pr=> (
                  <div key={pr.n} className="principle">
                    <div className="principle_num">{pr.n}</div>
                    <h4>{pr.title}</h4>
                    <div style={{ fontFamily:"Josefin Sans", fontWeight:300, fontSize:13, lineHeight:1.6, color:"#9AA0AE"}}>{pr.desc}</div>
                  </div>
                ))}
              </div>
              <div className="visual_card" style={{ marginTop:16}}>
                <div className="visual_head"><span>Arena • p35 — Shortest route wins</span><span className="dot" /></div>
                <div className="visual_body">
                  <img src="/assets/voltedge/portfolio2_p35_2.jpeg" alt="Arena — Battle of Charges field" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"16/10" }} loading="lazy" />
                  <p style={{ textAlign:"center", fontFamily:"Josefin Sans", fontWeight:300, fontSize:13, color:"#9AA0AE", marginTop:10}}>Every movement shaped by one principle: If there is a shorter route, we take it.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Arena — verified NRL Battle of Charges mechanics */}
        <section id="arena" className="waypoint waypoint--full">
          <div className="waypoint_inner">
            <div className="reveal" style={{ maxWidth:900, margin:"0 auto"}}>
              <div className="meta" style={{ justifyContent:"center"}}><span className="meta_num">00</span> <span className="meta_pages">Arena</span> <span>• Verified Mechanics</span></div>
              <h2 style={{ textAlign:"center", textTransform:"uppercase" }}>THE ARENA</h2>
              <p style={{ textAlign:"center", color:"#E8C84A", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".12em", textTransform:"uppercase", marginTop:8 }}>
                {nrl.matchDuration} • {nrl.cycleWindow} • {nrl.season}
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:16, marginTop:24 }}>
                <div className="kv_item" style={{ border:"1px solid rgba(0,229,255,0.2)", background:"rgba(0,229,255,0.05)", borderRadius:12, textAlign:"center", padding:"16px" }}>
                  <div className="kv_label" style={{ color:"#00E5FF" }}>CHARGE</div>
                  <div className="kv_value" style={{ fontFamily:"Josefin Sans", fontWeight:600, fontSize:16, color:"#E6E8EC" }}>The Object</div>
                  <div style={{ marginTop:8, fontFamily:"Josefin Sans", fontWeight:300, fontSize:13, color:"#9AA0AE" }}>Retrieved from Source Zone. Scored in Drop Zone. One at a time.</div>
                </div>
                <div className="kv_item" style={{ border:"1px solid rgba(200,169,10,0.2)", background:"rgba(200,169,10,0.05)", borderRadius:12, textAlign:"center", padding:"16px" }}>
                  <div className="kv_label" style={{ color:"#E8C84A" }}>SOURCE ZONE</div>
                  <div className="kv_value" style={{ fontFamily:"Josefin Sans", fontWeight:600, fontSize:16, color:"#E6E8EC" }}>Origin</div>
                  <div style={{ marginTop:8, fontFamily:"Josefin Sans", fontWeight:300, fontSize:13, color:"#9AA0AE" }}>Where CHARGE spawns. Robot must approach, align, collect.</div>
                </div>
                <div className="kv_item" style={{ border:"1px solid rgba(200,169,10,0.2)", background:"rgba(200,169,10,0.05)", borderRadius:12, textAlign:"center", padding:"16px" }}>
                  <div className="kv_label" style={{ color:"#E8C84A" }}>DROP ZONE</div>
                  <div className="kv_value" style={{ fontFamily:"Josefin Sans", fontWeight:600, fontSize:16, color:"#E6E8EC" }}>Target</div>
                  <div style={{ marginTop:8, fontFamily:"Josefin Sans", fontWeight:300, fontSize:13, color:"#9AA0AE" }}>Score point by depositing CHARGE. Precision over speed.</div>
                </div>
                <div className="kv_item" style={{ border:"1px solid rgba(0,229,255,0.2)", background:"rgba(0,229,255,0.05)", borderRadius:12, textAlign:"center", padding:"16px" }}>
                  <div className="kv_label" style={{ color:"#00E5FF" }}>CHARGE STATION</div>
                  <div className="kv_value" style={{ fontFamily:"Josefin Sans", fontWeight:600, fontSize:16, color:"#E6E8EC" }}>Parking</div>
                  <div style={{ marginTop:8, fontFamily:"Josefin Sans", fontWeight:300, fontSize:13, color:"#9AA0AE" }}>Low height allows passing under for parking points. EdgeBot fit.</div>
                </div>
              </div>
              <div style={{ marginTop:24, padding:16, border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, background:"rgba(255,255,255,0.02)", fontFamily:"Josefin Sans", fontWeight:300, fontSize:14, lineHeight:1.7, color:"#C9CDD6", textAlign:"center" }}>
                Match: <strong style={{ color:"#E6E8EC" }}>{nrl.matchDuration}</strong> | Cycle window: <strong style={{ color:"#E6E8EC" }}>{nrl.cycleWindow}</strong> | Manual: <a href={nrl.site} target="_blank" rel="noreferrer" style={{ color:"#E8C84A" }}>{nrl.manual}</a>
              </div>
              <div className="visual_card" style={{ marginTop:16}}>
                <div className="visual_head"><span>Field Reconstruction • Source → Drop → Station</span><span className="dot" /></div>
                <div className="visual_body">
                  <img src="/assets/voltedge/portfolio2_p35_2.jpeg" alt="Arena — Source → Drop → Station" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"16/10" }} loading="lazy" />
                  <p style={{ textAlign:"center", fontFamily:"Josefin Sans", fontWeight:300, fontSize:13, color:"#9AA0AE", marginTop:10}}>The constraint is the design brief. EdgeBot was built for this exact geometry.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Outreach */}
        <section id="outreach" className="waypoint">
          <div className="waypoint_inner">
            <div className="waypoint_text reveal">
              <div className="meta"><span className="meta_num">{chapters[11].num}</span> <span className="meta_pages">{chapters[11].pages}</span> <span>• {chapters[11].kicker}</span></div>
              <h2 dangerouslySetInnerHTML={{__html: chapters[11].title.replace(/\n/g,"<br/>")}} />
              <p style={{ color:"#E8C84A", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".12em", textTransform:"uppercase"}}>{chapters[11].subtitle}</p>
              {chapters[11].body.map((p,i)=> <p key={i}>{p}</p>)}
              <div className="kv">
                {chapters[11].metrics.map(m=> <div key={m.label} className="kv_item"><div className="kv_label">{m.label}</div><div className="kv_value">{m.value}</div></div>)}
              </div>
            </div>
            <div className="visual reveal">
              <div className="visual_card">
                <div className="visual_head"><span>Ali Public School • p37—38 gallery</span><span className="dot" /></div>
                <div className="visual_body">
                  <div className="gallery">
                    <img src="/assets/voltedge/portfolio2_p37_3.jpeg" alt="Workshop — Ali Public School" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"4/3" }} loading="lazy" />
                    <img src="/assets/voltedge/portfolio2_p37_2.jpeg" alt="Kits — hands-on" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"4/3" }} loading="lazy" />
                    <img src="/assets/voltedge/portfolio2_p38_3.jpeg" alt="Classroom session" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"4/3" }} loading="lazy" />
                  </div>
                  <div className="specs" style={{ marginTop:12}}>
                    <div className="spec"><span>Hosts</span><span>Mohiddin • Zaid • Omer • Abdullah • Irfan • Shamveel</span></div>
                    <div className="spec"><span>Award</span><span>Aspire Scientist — Omer & Zaid drone • p40</span></div>
                    <div className="spec"><span>Impact</span><span>STEM feels achievable, not “only big cities”</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Branding */}
        <section id="branding" className="waypoint waypoint--reverse">
          <div className="waypoint_inner">
            <div className="waypoint_text reveal">
              <div className="meta"><span className="meta_num">{chapters[12].num}</span> <span className="meta_pages">{chapters[12].pages}</span> <span>• {chapters[12].kicker}</span></div>
              <h2 dangerouslySetInnerHTML={{__html: chapters[12].title.replace(/\n/g,"<br/>")}} />
              <p style={{ color:"#E8C84A", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".12em", textTransform:"uppercase"}}>{chapters[12].subtitle}</p>
              {chapters[12].body.map((p,i)=> <p key={i}>{p}</p>)}
            </div>
            <div className="visual reveal">
              <div className="visual_card">
                <div className="visual_head"><span>Black + Gold • p42—48 analytics</span><span className="dot" /></div>
                <div className="visual_body">
                  <div className="kv">
                    <div className="kv_item"><div className="kv_label">Views (29 Nov)</div><div className="kv_value">{stats.views}</div></div>
                    <div className="kv_item"><div className="kv_label">Reached</div><div className="kv_value">{stats.reach}</div></div>
                    <div className="kv_item"><div className="kv_label">Non-followers</div><div className="kv_value">{stats.nonFollower}</div></div>
                    <div className="kv_item"><div className="kv_label">Growth</div><div className="kv_value">{stats.profileGrowth}</div></div>
                  </div>
                  <img src="/assets/voltedge/portfolio2_p48_2.jpeg" alt="Instagram analytics — Reels 56.8%" style={{ width:"100%", borderRadius:12, objectFit:"cover", aspectRatio:"16/9", marginTop:12 }} loading="lazy" />
                  <p style={{ fontFamily:"Josefin Sans", fontWeight:300, fontSize:12, color:"#6B7280", marginTop:8}}>Trailer 30 Nov → Full reveal 4/5 Dec • Team reveal edited solo 7—13 Nov during tour by Abdullah.</p>
                </div>
              </div>
            </div>
          </div>
        </section>





        {/* Journey */}
        <section id="journey" className="waypoint waypoint--full">
          <div className="waypoint_inner" style={{ maxWidth:1160}}>
            <div className="reveal">
              <div className="meta"><span className="meta_num">{chapters[14].num}</span> <span className="meta_pages">{chapters[14].pages}</span> <span>• {chapters[14].kicker}</span></div>
              <h2 dangerouslySetInnerHTML={{__html: chapters[14].title.replace(/\n/g,"<br/>")}} />
              <p style={{ color:"#E8C84A", fontFamily:"JetBrains Mono, monospace", fontSize:12, letterSpacing:".12em", textTransform:"uppercase", marginTop:8}}>{chapters[14].subtitle}</p>
              <p>{chapters[14].body[0]}</p>
              <div className="timeline">
                {chapters[14].timeline.map(t=> (
                  <div key={t.date} className="t_item">
                    <div className="t_date">{t.date}</div>
                    <div className="t_title">{t.title}</div>
                    <div className="t_desc">{t.desc}</div>
                  </div>
                ))}
              </div>
              <h3>Busy Schedule Challenges — p57—60</h3>
              {chapters[14].challenges.map((c,i)=> <p key={i} style={{ fontSize:14}}>• {c}</p>)}
              <div style={{ marginTop:16, padding:16, border:"1px solid rgba(200,169,10,0.2)", borderRadius:14, background:"rgba(200,169,10,0.07)", textAlign:"center"}}>
                <div style={{ fontFamily:"Cormorant Garamond, serif", fontSize:18, color:"#E8C84A"}}>{chapters[14].closing}</div>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer reveal">
          <h2 className="footer_title">Volt<em>Edge</em> — 007</h2>
          <div className="footer_sub">Bhatkal • {meta.event} • {meta.venue} • 6—7 December 2025 • Engineering portfolio tribute</div>
          <p style={{ maxWidth:680, margin:"14px auto 0", fontFamily:"Josefin Sans, sans-serif", fontWeight:300, fontSize:14, lineHeight:1.7, color:"#9AA0AE"}}>
            A standalone tribute. No other project linked. Built from the 60-page portfolio you wrote, page by page, test by test. If there is a shorter route, we take it — and we built this route from the coast to the national stage.
          </p>
          <div className="footer_links">
            <a href="#prologue" className="btn btn_primary">Back to Void ↑</a>
            <a href="https://www.instagram.com/teamvoltedge" target="_blank" rel="noreferrer" className="btn btn_ghost">Instagram @teamvoltedge</a>
          </div>
          <div className="small">Typography: Josefin Sans (favorite from thevertmenthe) • Palette: void / gold / cyan • Motion: Lenis + scroll-reveal • Built Vite React • Netlify ready • © Team VoltEdge</div>
        </footer>
      </main>

      <div className="joystick_hint"><i>↕</i> scroll / drag to navigate void</div>
    </>
  );
}
