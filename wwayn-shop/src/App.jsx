import React, { useEffect, useRef, useState } from "react";

/**
 * WWAYN° SHOP — immersive designer landing page
 * Стек: React + Tailwind (Vite)
 *
 * КУДА КЛАСТЬ ФОТО:
 * public/products/ink-front.jpg  (и т.д. — см. пути ниже в PRODUCTS)
 * public/video/hero.mp4
 */

const PRODUCTS = [
  {
    id: "04",
    name: "Ink Tee",
    price: "$58",
    desc: "280гсм хлопок, вышивка на спине",
    front: "/products/ink-front.jpg",
    back: "/products/ink-back.jpg",
    tagBg: "#ff5a1f",
  },
  {
    id: "07",
    name: "Bone Tee",
    price: "$58",
    desc: "280гсм хлопок, графика на спине",
    front: "/products/bone-front.jpg",
    back: "/products/bone-back.jpg",
    tagBg: "#ff5a1f",
  },
  {
    id: "11",
    name: "Tag Tee",
    price: "$64",
    desc: "Лимитированная — 100 штук, номерная",
    front: "/products/tag-front.jpg",
    back: "/products/tag-back.jpg",
    tagBg: "#efece6",
  },
];

function ProductCard({ product, index }) {
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative bg-[var(--ink)] hover:bg-[var(--ink-soft)] transition-colors duration-500 px-7 pt-8 pb-7"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity .8s ease ${index * 0.1}s, transform .8s ease ${index * 0.1}s, background-color .4s ease`,
      }}
    >
      <div className="relative aspect-[3/4] border border-[var(--line)] overflow-hidden mb-5">
        {/* front photo */}
        <div
          className="absolute inset-0"
          style={{
            opacity: hover ? 0 : 1,
            transform: hover ? "scale(1.06) rotate(-1deg)" : "scale(1)",
            transition: "opacity .55s cubic-bezier(.2,.7,.2,1), transform .55s cubic-bezier(.2,.7,.2,1)",
          }}
        >
          <img src={product.front} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* back photo (revealed on hover) */}
        <div
          className="absolute inset-0"
          style={{
            opacity: hover ? 1 : 0,
            transform: hover ? "scale(1)" : "scale(1.06)",
            transition: "opacity .55s cubic-bezier(.2,.7,.2,1), transform .55s cubic-bezier(.2,.7,.2,1)",
          }}
        >
          <img src={product.back} alt={`${product.name} back`} className="w-full h-full object-cover" />
        </div>

        {/* garment tag */}
        <div
          className="mono absolute top-3.5 -right-px text-[10px] tracking-wide px-2.5 py-1 z-10 text-[#0b0b0c]"
          style={{
            background: product.tagBg,
            transformOrigin: "top right",
            transform: hover ? "rotate(0deg) translateX(-4px)" : "rotate(4deg)",
            transition: "transform .4s ease",
          }}
        >
          №{product.id} · {product.price}
        </div>
      </div>

      <div className="flex justify-between items-baseline">
        <div className="font-display text-[19px] uppercase tracking-wide">{product.name}</div>
        <div className="mono text-[13px] text-[var(--bone-dim)]">{product.price}</div>
      </div>
      <div className="text-[12px] text-[var(--bone-dim)] mt-2 tracking-wide">{product.desc}</div>
    </article>
  );
}

export default function WwaynShop() {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--ink)] text-[var(--bone)] font-sans overflow-x-hidden selection:bg-[var(--tag)] selection:text-[var(--ink)]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
        :root{
          --ink:#0b0b0c; --ink-soft:#141416; --bone:#efece6;
          --bone-dim:rgba(239,236,230,0.55); --line:rgba(239,236,230,0.14); --tag:#ff5a1f;
        }
        .font-sans{ font-family:'Space Grotesk', sans-serif; }
        .font-display{ font-family:'Anton', sans-serif; }
        .mono{ font-family:'JetBrains Mono', monospace; }
        .stroke-outline{ -webkit-text-stroke:1.5px var(--bone); color:transparent; }
        @keyframes grain{
          0%{transform:translate(0,0)} 25%{transform:translate(-3%,2%)}
          50%{transform:translate(2%,-3%)} 75%{transform:translate(-2%,-2%)} 100%{transform:translate(0,0)}
        }
        @keyframes scrollbar{ 0%{top:-100%} 50%{top:0} 100%{top:100%} }
        .grain-layer{
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E");
          animation:grain 1s steps(4) infinite; mix-blend-mode:overlay;
        }
        .scrollbar-fill::after{
          content:''; position:absolute; left:0; top:-100%; width:100%; height:100%;
          background:var(--bone); animation:scrollbar 1.8s ease-in-out infinite;
        }
        .reveal-up{ opacity:0; transform:translateY(10px); transition:opacity .8s ease, transform .8s ease; }
        .reveal-up.in{ opacity:1; transform:translateY(0); }
        .word-line{ overflow:hidden; }
        .word-line span{ display:inline-block; transform:translateY(110%); transition:transform 1.1s cubic-bezier(.16,1,.3,1); }
        .word-line span.in{ transform:translateY(0%); }
      `}</style>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-10 py-6 mix-blend-difference">
        <div className="font-display text-xl tracking-wide">WWAYN°</div>
        <div className="hidden md:flex gap-7 text-xs uppercase tracking-widest">
          {["Shop", "Lookbook", "Studio", "Cart (0)"].map((l) => (
            <a key={l} href="#shop" className="text-[var(--bone)]/75 hover:text-[var(--bone)] transition-opacity">
              {l}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[100svh] flex flex-col items-center justify-center overflow-hidden isolate">
        <div
          className="absolute inset-0 -z-20"
          style={{ background: "radial-gradient(120% 90% at 50% 20%, #1c1c1f 0%, #0b0b0c 55%, #050506 100%)" }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-55"
            style={{ filter: "saturate(0.35) contrast(1.15) brightness(.75)" }}
            onError={(e) => (e.currentTarget.style.display = "none")}
          >
            <source src="/video/hero.MP4" type="video/mp4" />
          </video>
        </div>
        <div className="grain-layer absolute -inset-1/2 w-[200%] h-[200%] -z-10 opacity-25" />
        <div className="absolute inset-0 -z-10" style={{ boxShadow: "inset 0 0 220px 60px rgba(0,0,0,.85)" }} />

        <p className={`reveal-up ${loaded ? "in" : ""} text-[11px] tracking-[3px] uppercase text-[var(--bone-dim)] mb-5`}>
          Designer studio <span className="text-[var(--tag)]">—</span> drop 004 / limited
        </p>

        <h1 className="font-display text-center uppercase leading-[.82] tracking-wide text-[clamp(56px,16vw,220px)]">
          <div className="word-line">
            <span className={loaded ? "in" : ""}>WWAYN</span>
          </div>
          <div className="word-line">
            <span className={`stroke-outline ${loaded ? "in" : ""}`}>SHOP</span>
          </div>
        </h1>

        <p className={`reveal-up ${loaded ? "in" : ""} mt-6 text-[13px] text-[var(--bone-dim)] text-center max-w-[380px] tracking-wide`}>
          Три силуэта. Один сезон. Сделано вручную небольшими партиями — то, что заканчивается, не возвращается.
        </p>

        <div className={`reveal-up ${loaded ? "in" : ""} absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5`}>
          <div className="relative w-px h-11 bg-[var(--line)] scrollbar-fill overflow-hidden" />
          <div className="text-[10px] tracking-[3px] uppercase text-[var(--bone-dim)]" style={{ writingMode: "vertical-rl" }}>
            SCROLL
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="shop" className="px-10">
        <div className="max-w-[1280px] mx-auto flex justify-between items-end pt-28 pb-12 border-b border-[var(--line)]">
          <h2 className="font-display uppercase tracking-wide text-[clamp(28px,4vw,50px)]">Selected pieces</h2>
          <div className="mono text-xs text-[var(--bone-dim)] tracking-widest">03 / SS26</div>
        </div>

        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--line)] pb-32">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-[1280px] mx-auto px-10 pt-10 pb-10 border-t border-[var(--line)] flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
        <div className="font-display text-[15px] tracking-wide">WWAYN° SHOP</div>
        <div className="flex gap-6 text-[11px] uppercase tracking-widest text-[var(--bone-dim)]">
          <a href="#" className="hover:text-[var(--bone)]">Instagram</a>
          <a href="#" className="hover:text-[var(--bone)]">Contact</a>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}