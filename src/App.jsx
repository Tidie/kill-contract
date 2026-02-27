import { useState, useEffect, useRef } from "react";

// ════════════════════════════════════════════════════════════════
//  DATA
// ════════════════════════════════════════════════════════════════

const COMPANIES = [
  // ── Télécom ──────────────────────────────────────────────────
  { id:"tc-01", nom:"Orange",           cat:"Télécom",   logo:"https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg",                      color:"#FF6600" },
  { id:"tc-02", nom:"SFR",              cat:"Télécom",   logo:"https://upload.wikimedia.org/wikipedia/commons/b/be/SFR_logo.svg",                         color:"#E2001A" },
  { id:"tc-03", nom:"Bouygues",         cat:"Télécom",   logo:"https://upload.wikimedia.org/wikipedia/commons/c/ce/Bouygues_Telecom_2015.svg",            color:"#0097D6" },
  { id:"tc-04", nom:"Free",             cat:"Télécom",   logo:"https://upload.wikimedia.org/wikipedia/commons/b/bd/Free_logo.svg",                        color:"#CD1927" },
  { id:"tc-05", nom:"Sosh",             cat:"Télécom",   logo:"https://upload.wikimedia.org/wikipedia/commons/5/5d/Sosh_logo_2020.svg",                   color:"#FF6600" },
  { id:"tc-06", nom:"Red by SFR",       cat:"Télécom",   logo:"https://upload.wikimedia.org/wikipedia/fr/4/43/Red_by_SFR_Logo.svg",               color:"#E2001A" },
  { id:"tc-07", nom:"Coriolis",         cat:"Télécom",   logo:"https://www.google.com/s2/favicons?domain=coriolismobile.com&sz=256",                     color:"#003087" },
  { id:"tc-08", nom:"La Poste Mobile",  cat:"Télécom",   logo:"https://upload.wikimedia.org/wikipedia/commons/7/72/La_Poste_logo.svg",                   color:"#FFBE00" },
  { id:"tc-09", nom:"NordNet",          cat:"Télécom",   logo:"https://www.google.com/s2/favicons?domain=nordnet.fr&sz=256",                             color:"#0057A8" },
  { id:"tc-10", nom:"Canal+",           cat:"Télécom",   logo:"https://upload.wikimedia.org/wikipedia/commons/2/27/Canal%2B.svg",                        color:"#000000" },

  // ── Sport ────────────────────────────────────────────────────
  { id:"sp-01", nom:"Basic-Fit",        cat:"Sport",     logo:"https://upload.wikimedia.org/wikipedia/commons/4/4b/Basic-Fit_Logo.svg",                   color:"#FF6B00" },
  { id:"sp-02", nom:"Fitness Park",     cat:"Sport",     logo:"https://www.google.com/s2/favicons?domain=fitnesspark.fr&sz=256",                         color:"#E31E24" },
  { id:"sp-03", nom:"Keepcool",         cat:"Sport",     logo:"https://www.google.com/s2/favicons?domain=keepcool.fr&sz=256",                            color:"#00A8E0" },
  { id:"sp-04", nom:"Neoness",          cat:"Sport",     logo:"https://upload.wikimedia.org/wikipedia/fr/5/52/Logo_Neoness.png",                  color:"#E2001A" },
  { id:"sp-05", nom:"L'Orange Bleue",   cat:"Sport",     logo:"https://www.google.com/s2/favicons?domain=lorangebleue.fr&sz=256",                        color:"#F47920" },
  { id:"sp-06", nom:"Magic Form",       cat:"Sport",     logo:"https://www.google.com/s2/favicons?domain=magicform.fr&sz=256",                           color:"#7B2D8B" },
  { id:"sp-07", nom:"Gigafit",          cat:"Sport",     logo:"https://www.google.com/s2/favicons?domain=gigafit.fr&sz=256",                             color:"#FF0000" },
  { id:"sp-08", nom:"On Air Fitness",   cat:"Sport",     logo:"https://www.google.com/s2/favicons?domain=onairfitness.fr&sz=256",                        color:"#00BCD4" },
  { id:"sp-09", nom:"Freeness",         cat:"Sport",     logo:"https://www.google.com/s2/favicons?domain=freeness.fr&sz=256",                            color:"#4CAF50" },
  { id:"sp-10", nom:"Cercles de la Forme", cat:"Sport",  logo:"https://www.google.com/s2/favicons?domain=cerclesdelaforme.com&sz=256",                   color:"#1565C0" },

  // ── Assurance ────────────────────────────────────────────────
  { id:"as-01", nom:"AXA",              cat:"Assurance", logo:"https://upload.wikimedia.org/wikipedia/commons/9/94/AXA_Logo.svg",                         color:"#00008F" },
  { id:"as-02", nom:"Generali",         cat:"Assurance", logo:"https://upload.wikimedia.org/wikipedia/commons/0/0c/Generali_logo.svg",                    color:"#CC0000" },
  { id:"as-03", nom:"Allianz",          cat:"Assurance", logo:"https://upload.wikimedia.org/wikipedia/commons/d/d4/Allianz_Logo.svg",                     color:"#003781" },
  { id:"as-04", nom:"Groupama",         cat:"Assurance", logo:"https://upload.wikimedia.org/wikipedia/commons/5/5a/Groupama_logo.svg",                    color:"#008A00" },
  { id:"as-05", nom:"MAIF",             cat:"Assurance", logo:"https://upload.wikimedia.org/wikipedia/commons/3/3d/Logo_MAIF.svg",                        color:"#E2001A" },
  { id:"as-06", nom:"MACIF",            cat:"Assurance", logo:"https://upload.wikimedia.org/wikipedia/commons/f/f9/Logo_MACIF.svg",                       color:"#E2001A" },
  { id:"as-07", nom:"Matmut",           cat:"Assurance", logo:"https://www.google.com/s2/favicons?domain=matmut.fr&sz=256",                              color:"#009B77" },
  { id:"as-08", nom:"Direct Assurance", cat:"Assurance", logo:"https://www.google.com/s2/favicons?domain=direct-assurance.fr&sz=256",                    color:"#E2001A" },
  { id:"as-09", nom:"Amaguiz",          cat:"Assurance", logo:"https://www.google.com/s2/favicons?domain=amaguiz.com&sz=256",                            color:"#FF6600" },
  { id:"as-10", nom:"Alan",             cat:"Assurance", logo:"https://upload.wikimedia.org/wikipedia/commons/7/72/Alan_logo.svg",                        color:"#00D4B4" },

  // ── Énergie ──────────────────────────────────────────────────
  { id:"en-01", nom:"EDF",              cat:"Énergie",   logo:"https://upload.wikimedia.org/wikipedia/commons/1/12/EDF_logo.svg",                         color:"#F7A600" },
  { id:"en-02", nom:"Engie",            cat:"Énergie",   logo:"https://upload.wikimedia.org/wikipedia/commons/c/c3/Engie_logo.svg",                       color:"#00AAFF" },
  { id:"en-03", nom:"TotalEnergies",    cat:"Énergie",   logo:"https://upload.wikimedia.org/wikipedia/commons/3/3f/TotalEnergies_logo.svg",               color:"#EE3124" },
  { id:"en-04", nom:"Eni",              cat:"Énergie",   logo:"https://upload.wikimedia.org/wikipedia/commons/d/d9/Eni_logo.svg",                         color:"#FFD700" },
  { id:"en-05", nom:"Vattenfall",       cat:"Énergie",   logo:"https://upload.wikimedia.org/wikipedia/commons/5/5b/Vattenfall_logo.svg",                  color:"#006AC7" },
  { id:"en-06", nom:"Suez",             cat:"Énergie",   logo:"https://upload.wikimedia.org/wikipedia/commons/1/17/Suez_logo.svg",                        color:"#009FE3" },
  { id:"en-07", nom:"Veolia",           cat:"Énergie",   logo:"https://upload.wikimedia.org/wikipedia/commons/9/95/Veolia_logo.svg",                      color:"#005F96" },
  { id:"en-08", nom:"Sowee",            cat:"Énergie",   logo:"https://www.google.com/s2/favicons?domain=sowee.com&sz=256",                              color:"#00C1D4" },

  // ── Streaming & Presse ───────────────────────────────────────
  { id:"ps-01", nom:"Le Monde",         cat:"Streaming", logo:"https://upload.wikimedia.org/wikipedia/commons/f/fc/Le_Monde_logo.svg",                    color:"#1A1A1A" },
  { id:"ps-02", nom:"Le Figaro",        cat:"Streaming", logo:"https://www.google.com/s2/favicons?domain=lefigaro.fr&sz=256",                            color:"#003878" },
  { id:"ps-03", nom:"L'Équipe",         cat:"Streaming", logo:"https://upload.wikimedia.org/wikipedia/commons/9/9d/L%27%C3%89quipe_logo.svg",            color:"#FFCC00" },
  { id:"ps-04", nom:"Netflix",          cat:"Streaming", logo:"https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",                color:"#E50914" },
  { id:"ps-05", nom:"Disney+",          cat:"Streaming", logo:"https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",                   color:"#0063E5" },
  { id:"ps-06", nom:"Deezer",           cat:"Streaming", logo:"https://upload.wikimedia.org/wikipedia/commons/e/e7/Deezer_logo_2023.svg",                 color:"#A238FF" },
  { id:"ps-07", nom:"Spotify",          cat:"Streaming", logo:"https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",           color:"#1DB954" },
  { id:"ps-08", nom:"beIN Sports",      cat:"Streaming", logo:"https://upload.wikimedia.org/wikipedia/commons/f/f4/BeIN_SPORTS_logo.svg",                 color:"#E4002B" },

  // ── Divers ───────────────────────────────────────────────────
  { id:"dv-01", nom:"Ulys / Vinci",     cat:"Divers",    logo:"https://upload.wikimedia.org/wikipedia/commons/b/b1/Vinci_logo.svg",                       color:"#E4002B" },
  { id:"dv-02", nom:"Coyote",           cat:"Divers",    logo:"https://www.google.com/s2/favicons?domain=moncoyote.com&sz=256",                          color:"#FF6600" },
  { id:"dv-03", nom:"Verisure",         cat:"Divers",    logo:"https://www.google.com/s2/favicons?domain=verisure.fr&sz=256",                            color:"#E2001A" },
  { id:"dv-04", nom:"Nespresso",        cat:"Divers",    logo:"https://upload.wikimedia.org/wikipedia/commons/6/69/Nespresso-logo.svg",                   color:"#1A1A1A" },
];

// 8 companies featured on landing — the rest in catalogue
const FEATURED = ["tc-01","tc-02","sp-01","ps-04","as-01","en-01","ps-07","dv-03"];

const MOTIFS = [
  { value:"hamon",  icon:"🔓", label:"Résiliation libre",  badge:"Loi Hamon",    badgeC:"#1D4ED8", badgeBg:"#DBEAFE", desc:"Après 12 mois d'engagement, sans frais ni justification.", loi:"Art. L.215-1 Code de la consommation" },
  { value:"chatel", icon:"📈", label:"Hausse de tarif",    badge:"Loi Chatel",   badgeC:"#166534", badgeBg:"#DCFCE7", desc:"Résiliation gratuite suite à toute augmentation unilatérale.", loi:"Loi n° 2005-67 — Art. L.221-13 Code de la consommation" },
  { value:"demena", icon:"🏠", label:"Déménagement",       badge:"Art. L.224-28",badgeC:"#334155", badgeBg:"#F1F5F9", desc:"Résiliation anticipée sans frais hors zone couverte.", loi:"Art. L.224-28 Code de la consommation" },
  { value:"emploi", icon:"💼", label:"Perte d'emploi",     badge:"Force majeure",badgeC:"#92400E", badgeBg:"#FEF3C7", desc:"Force majeure : résiliation pour motif économique sérieux.", loi:"Art. 1218 Code civil" },
];

const LEGAL_BODY = (motif, f) => {
  const name = `${f.prenom||"___"} ${f.nom||"___"}`.trim();
  const addr = [f.adresse,f.cp,f.ville].filter(Boolean).join(", ")||"___";
  const num  = f.contrat||"___";
  const map = {
    hamon:  `Je soussigné(e) ${name}, demeurant au ${addr}, titulaire du contrat n° ${num}, vous notifie ma décision de résilier ledit contrat.\n\nConformément à l'article L.215-1 du Code de la consommation, mon contrat étant souscrit depuis plus de douze mois, je bénéficie du droit de résiliation à tout moment sans pénalité.\n\nJe vous demande de me confirmer la date d'effet dans les 10 jours. Veuillez agréer mes salutations distinguées.`,
    chatel: `Je soussigné(e) ${name}, demeurant au ${addr}, titulaire du contrat n° ${num}, vous informe de ma résiliation suite à modification tarifaire unilatérale.\n\nConformément à la Loi Chatel (Loi n° 2005-67 du 28 jan. 2005), toute hausse de prix ouvre un droit de résiliation immédiate sans frais ni indemnité.\n\nJe vous demande de cesser tout prélèvement à compter de la date d'effet. Veuillez agréer mes salutations distinguées.`,
    demena: `Je soussigné(e) ${name}, demeurant au ${addr}, titulaire du contrat n° ${num}, sollicite la résiliation suite à déménagement.\n\nConformément à l'article L.224-28, un déménagement hors zone couverte constitue un motif légitime de résiliation sans pénalité. Les justificatifs sont joints.\n\nVeuillez agréer mes salutations distinguées.`,
    emploi: `Je soussigné(e) ${name}, demeurant au ${addr}, titulaire du contrat n° ${num}, vous notifie la résiliation pour perte d'emploi (force majeure, art. 1218 C.civ).\n\nDans l'impossibilité de maintenir cet engagement financier, je vous demande de résilier sans pénalité. Les justificatifs sont joints.\n\nVeuillez agréer mes salutations distinguées.`,
  };
  return map[motif]||map.hamon;
};

// ════════════════════════════════════════════════════════════════
//  LOCALSTORAGE
// ════════════════════════════════════════════════════════════════

const LS_KEY = "kc_v3";
function loadRes() { try { return JSON.parse(localStorage.getItem(LS_KEY)||"[]"); } catch { return []; } }
function saveRes(l) { try { localStorage.setItem(LS_KEY, JSON.stringify(l)); } catch {} }
function addRes(entry) {
  const list = loadRes();
  list.unshift({ ...entry, id:Date.now(), date:new Date().toLocaleDateString("fr-FR"), status:"En cours" });
  saveRes(list); return list;
}

// ════════════════════════════════════════════════════════════════
//  TOKENS
// ════════════════════════════════════════════════════════════════

const C = { navy:"#0A192F", green:"#00FF41", bg:"#F8FAFC", white:"#FFFFFF", slate:"#64748B", border:"#E2E8F0", muted:"#94A3B8" };

// ════════════════════════════════════════════════════════════════
//  GLOBAL CSS
// ════════════════════════════════════════════════════════════════

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Inter', sans-serif; background: #F8FAFC; color: #0A192F; overflow-x: hidden; }
  input::placeholder { color: #CBD5E1; font-weight: 400; }
  button { font-family: 'Inter', sans-serif; }
  ::selection { background: #00FF41; color: #0A192F; }
  input[type="date"]::-webkit-calendar-picker-indicator { opacity: .35; cursor: pointer; }

  /* Noise overlay */
  .noise::before {
    content: "";
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    opacity: 0.03; z-index: 9999; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* Logo card */
  .logo-card { transition: all 0.4s cubic-bezier(0.16,1,0.3,1); border: 1px solid transparent; cursor: pointer; }
  .logo-card:hover { border-color: #0A192F; transform: translateY(-4px); background: white !important; }
  .logo-card img { filter: grayscale(80%); opacity: 0.65; transition: all 0.3s ease; }
  .logo-card:hover img { filter: grayscale(0%); opacity: 1; }
  .logo-card.selected { border-color: #0A192F !important; background: #0A192F !important; transform: translateY(-3px); }
  .logo-card.selected img { filter: brightness(0) invert(1); opacity: 0.95; }

  /* Scanner animation */
  @keyframes scan {
    0% { transform: translateY(-100%); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(100%); opacity: 0; }
  }
  .scanner-line {
    height: 40px;
    background: linear-gradient(to bottom, transparent, rgba(0,255,65,0.15), transparent);
    position: absolute; width: 100%; left: 0;
    animation: scan 2.5s infinite linear;
    pointer-events: none;
  }

  /* Search focus */
  .search-box:focus-within {
    box-shadow: 0 0 0 2px #0A192F, 0 20px 40px -10px rgba(10,25,47,0.1);
  }

  /* Btn shimmer */
  .btn-shimmer { position: relative; overflow: hidden; }
  .btn-shimmer::after {
    content: '';
    position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
    transition: 0.5s;
  }
  .btn-shimmer:hover::after { left: 100%; }
  .btn-shimmer:active { transform: scale(0.97); }

  /* Nav link */
  .nav-link { opacity: 0.6; transition: opacity 0.2s; font-size: 14px; font-weight: 500; text-decoration: none; color: inherit; }
  .nav-link:hover, .nav-link.active { opacity: 1; }

  /* Fade in */
  @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
  .fade-up { animation: fadeUp 0.4s ease forwards; }

  /* Ping */
  @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
  .ping { animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite; }

  /* Pulse dot */
  @keyframes pulse-dot { 0%,100%{opacity:1;} 50%{opacity:.4;} }
`;

// ════════════════════════════════════════════════════════════════
//  ICON
// ════════════════════════════════════════════════════════════════

const Icon = ({ d, s=16, w=2, color="currentColor" }) => (
  <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={w} style={{flexShrink:0}}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d}/>
  </svg>
);
const P = {
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  check:  "M5 13l4 4L19 7",
  left:   "M15 19l-7-7 7-7",
  right:  "M9 5l7 7-7 7",
  lock:   "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  upload: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
  spark:  "M13 10V3L4 14h7v7l9-11h-7z",
  chart:  "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  x:      "M6 18L18 6M6 6l12 12",
  doc:    "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  user:   "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  cal:    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  mail:   "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
};

// ════════════════════════════════════════════════════════════════
//  SHARED COMPONENTS
// ════════════════════════════════════════════════════════════════

const Logo = ({ onClick }) => (
  <div style={{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"}} onClick={onClick}>
    <div style={{width:"32px",height:"32px",background:C.navy,borderRadius:"4px",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:"3px",height:"16px",background:C.green,borderRadius:"2px",transform:"rotate(12deg)"}}/>
    </div>
    <span style={{fontWeight:900,letterSpacing:"-0.04em",fontSize:"1.1rem",textTransform:"uppercase",color:C.navy}}>Kill‑Contract</span>
  </div>
);

// ════════════════════════════════════════════════════════════════
//  NAV
// ════════════════════════════════════════════════════════════════

function Nav({ view, setView, resiliations }) {
  const isApp = ["coords","motif","pricing","success","dashboard"].includes(view);
  return (
    <nav style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"24px 32px",maxWidth:"1280px",margin:"0 auto",width:"100%"}}>
      <Logo onClick={()=>setView("landing")}/>
      <div style={{display:"flex",gap:"32px",alignItems:"center"}}>
        {!isApp && <>
          <a onClick={()=>setView("catalogue")} className={`nav-link${view==="catalogue"?" active":""}`} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:"5px"}}>Catalogue <span style={{fontSize:"9px",fontWeight:800,padding:"1px 6px",borderRadius:"999px",background:"#F1F5F9",color:"#64748B"}}>{COMPANIES.length}</span></a>
          <a onClick={()=>setView("comment")} className={`nav-link${view==="comment"?" active":""}`} style={{cursor:"pointer"}}>Comment ça marche</a>
          <a onClick={()=>setView("tarifs")}  className={`nav-link${view==="tarifs"?" active":""}`}  style={{cursor:"pointer"}}>Tarifs</a>
          <a onClick={()=>setView("securite")}className={`nav-link${view==="securite"?" active":""}`}style={{cursor:"pointer"}}>Sécurité</a>
        </>}
        {resiliations.length > 0 && (
          <button onClick={()=>setView("dashboard")} style={{display:"flex",alignItems:"center",gap:"6px",padding:"7px 14px",borderRadius:"8px",border:`1px solid ${C.border}`,background:view==="dashboard"?C.navy:C.white,color:view==="dashboard"?"white":C.slate,fontSize:"11px",fontWeight:700,cursor:"pointer",transition:"all .18s"}}>
            <Icon d={P.chart} s={13}/>Mon espace
            <span style={{background:view==="dashboard"?"rgba(0,255,65,.2)":"#EFF6FF",color:view==="dashboard"?C.green:"#1D4ED8",padding:"1px 6px",borderRadius:"999px",fontSize:"9px",fontWeight:800}}>{resiliations.length}</span>
          </button>
        )}
        <button style={{fontSize:"14px",fontWeight:600,background:"none",border:"none",borderBottom:"2px solid transparent",cursor:"pointer",paddingBottom:"2px",transition:"border-color .2s",color:C.navy}} onMouseEnter={e=>e.target.style.borderBottomColor=C.navy} onMouseLeave={e=>e.target.style.borderBottomColor="transparent"}>
          Connexion
        </button>
      </div>
    </nav>
  );
}

// ════════════════════════════════════════════════════════════════
//  FOOTER (landing)
// ════════════════════════════════════════════════════════════════

function FooterLanding({ currentStep = 1 }) {
  const steps = [
    { n:"01", label:"Sélection du prestataire" },
    { n:"02", label:"Détails du motif" },
    { n:"03", label:"Signature & Envoi" },
  ];
  return (
    <footer style={{padding:"32px",borderTop:"1px solid #F1F5F9",background:"rgba(255,255,255,0.5)",backdropFilter:"blur(12px)"}}>
      <div style={{maxWidth:"1280px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"24px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"48px"}}>
          {steps.map((s,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:"48px"}}>
              <div style={{opacity:i+1===currentStep?1:.2}}>
                <p style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:C.muted,marginBottom:"2px"}}>Étape {s.n}</p>
                <p style={{fontSize:"14px",fontWeight:700,color:C.navy}}>{s.label}</p>
              </div>
              {i<2&&<div style={{width:"48px",height:"2px",background:"#F1F5F9"}}/>}
            </div>
          ))}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"16px",filter:"grayscale(1)",opacity:.4}}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe" style={{height:"16px"}}/>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" style={{height:"12px"}}/>
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" style={{height:"20px"}}/>
        </div>
      </div>
    </footer>
  );
}

// ════════════════════════════════════════════════════════════════
//  TACTICAL SIDE LABELS
// ════════════════════════════════════════════════════════════════

const TacticalLabels = () => (
  <>
    <div style={{position:"fixed",top:"50%",left:"24px",transform:"translateY(-50%)",pointerEvents:"none",display:"none"}}>
      <div style={{transform:"rotate(90deg) translateX(-50%)",transformOrigin:"left center",fontSize:"10px",fontFamily:"monospace",letterSpacing:"0.5em",color:"#CBD5E1",textTransform:"uppercase",whiteSpace:"nowrap"}}>
        System_Status: Operational // Latency: 12ms
      </div>
    </div>
    <div style={{position:"fixed",top:"50%",right:"24px",transform:"translateY(-50%)",pointerEvents:"none",display:"none"}}>
      <div style={{transform:"rotate(-90deg) translateX(50%)",transformOrigin:"right center",fontSize:"10px",fontFamily:"monospace",letterSpacing:"0.5em",color:"#CBD5E1",textTransform:"uppercase",whiteSpace:"nowrap"}}>
        Precision_Mode: Active // GDPR_Compliant: True
      </div>
    </div>
  </>
);

// ════════════════════════════════════════════════════════════════
//  SHARED CATALOGUE DATA
// ════════════════════════════════════════════════════════════════

const CAT_META = {
  "Tous":     { emoji:"🔍", dot:"#94A3B8" },
  "Télécom":  { emoji:"📡", dot:"#3B82F6" },
  "Sport":    { emoji:"🏋️", dot:"#22C55E" },
  "Assurance":{ emoji:"🛡️", dot:"#F97316" },
  "Énergie":  { emoji:"⚡", dot:"#EAB308" },
  "Streaming":{ emoji:"📺", dot:"#D946EF" },
  "Divers":   { emoji:"🔧", dot:"#94A3B8" },
};
const ALL_CATS = ["Tous","Télécom","Sport","Assurance","Énergie","Streaming","Divers"];

// Reusable company card
function CompanyCard({ co, isSel, onSelect, logoErr, setLogoErr }) {
  const brandColor = co.color || "#64748B";
  const hasLogo = co.logo && !logoErr[co.id];
  return (
    <div
      className={`logo-card${isSel?" selected":""}`}
      onClick={()=>onSelect(co)}
      style={{padding:"24px 16px",borderRadius:"18px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"14px",background:"white",position:"relative",overflow:"hidden",minHeight:"130px",cursor:"pointer"}}
    >
      {isSel && <div className="scanner-line"/>}
      {isSel && (
        <div style={{position:"absolute",top:"10px",right:"10px",width:"20px",height:"20px",borderRadius:"50%",background:"#00FF41",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#0A192F" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
      )}
      <div style={{height:"52px",width:"100px",display:"flex",alignItems:"center",justifyContent:"center"}}>
        {hasLogo ? (
          <img
            src={co.logo}
            alt={co.nom}
            onError={()=>setLogoErr(e=>({...e,[co.id]:true}))}
            style={{maxHeight:"100%",maxWidth:"100%",objectFit:"contain",transition:"all .25s"}}
          />
        ) : (
          <div style={{width:"52px",height:"52px",borderRadius:"14px",background:`${brandColor}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",fontWeight:900,color:brandColor,border:`1.5px solid ${brandColor}25`}}>
            {co.nom.slice(0,2).toUpperCase()}
          </div>
        )}
      </div>
      <div style={{textAlign:"center"}}>
        <p style={{fontSize:"11px",fontWeight:800,textTransform:"uppercase",letterSpacing:"0.06em",color:isSel?"white":"#0A192F",lineHeight:1.2}}>{co.nom}</p>
        <p style={{fontSize:"9px",fontWeight:500,marginTop:"4px",display:"flex",alignItems:"center",justifyContent:"center",gap:"3px",color:isSel?"rgba(255,255,255,.45)":"#94A3B8"}}>
          <span style={{display:"inline-block",width:"5px",height:"5px",borderRadius:"50%",background:isSel?"rgba(0,255,65,.7)":CAT_META[co.cat]?.dot||"#94A3B8"}}/>
          {co.cat}
        </p>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  PAGE LANDING
// ════════════════════════════════════════════════════════════════

function PageLanding({ setView, onSelect }) {
  const [selected, setSelected] = useState(null);
  const [logoErr, setLogoErr] = useState({});
  const featured = COMPANIES.filter(c => FEATURED.includes(c.id));

  const handleSelect = (co) => {
    if (selected?.id === co.id) { setSelected(null); }
    else { setSelected(co); }
  };

  return (
    <div className="noise" style={{minHeight:"100vh",display:"flex",flexDirection:"column",background:"#F8FAFC"}}>
      <Nav view="landing" setView={setView} resiliations={[]}/>

      <main style={{flex:1,display:"flex",flexDirection:"column",padding:"0 48px 64px",maxWidth:"1280px",margin:"0 auto",width:"100%"}}>
        {/* Hero — full width centered */}
        <div style={{textAlign:"center",padding:"72px 0 56px",position:"relative"}} className="fade-up">
          {/* Background glow */}
          <div style={{position:"absolute",top:"0",left:"50%",transform:"translateX(-50%)",width:"900px",height:"500px",background:"rgba(219,234,254,0.25)",filter:"blur(140px)",borderRadius:"50%",zIndex:0,pointerEvents:"none"}}/>
          <div style={{position:"relative",zIndex:1}}>
            {/* Badge */}
            <div style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"5px 14px",background:"white",border:"1px solid #E2E8F0",borderRadius:"999px",boxShadow:"0 1px 4px rgba(10,25,47,.06)",marginBottom:"24px"}}>
              <span style={{position:"relative",display:"flex",width:"8px",height:"8px"}}>
                <span className="ping" style={{position:"absolute",inset:0,borderRadius:"50%",background:"#4ADE80",opacity:.75}}/>
                <span style={{position:"relative",width:"8px",height:"8px",borderRadius:"50%",background:"#22C55E",display:"block"}}/>
              </span>
              <span style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",opacity:.55,color:"#0A192F"}}>Précision FinTech</span>
            </div>

            <h1 style={{fontSize:"clamp(3.5rem,8vw,6.5rem)",fontWeight:900,letterSpacing:"-0.04em",lineHeight:.92,margin:"0 auto 20px"}}>
              Qui voulez-vous{" "}
              <span style={{WebkitTextStroke:"2px #0A192F",color:"transparent"}}>quitter</span>
              {" "}?
            </h1>
            <p style={{fontSize:"clamp(1.05rem,2vw,1.3rem)",color:"#64748B",fontWeight:500,maxWidth:"600px",margin:"0 auto 40px",lineHeight:1.65}}>
              Résiliation immédiate, légale et sans effort. On s'occupe de la paperasse, vous retrouvez votre liberté.
            </p>

            {/* Search bar — large, centered */}
            <div style={{maxWidth:"680px",margin:"0 auto"}}>
              <div className="search-box" style={{display:"flex",alignItems:"center",background:"white",border:"1px solid #E2E8F0",borderRadius:"18px",padding:"8px 8px 8px 28px",boxShadow:"0 4px 24px rgba(10,25,47,.07)"}}>
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#CBD5E1" strokeWidth="2" style={{flexShrink:0}}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <input
                  placeholder="Chercher une salle, un opérateur, une assurance..."
                  onKeyDown={e=>{ if(e.key==="Enter") setView("catalogue"); }}
                  style={{flex:1,padding:"14px 16px",fontSize:"16px",outline:"none",background:"transparent",border:"none",fontWeight:500,color:"#0A192F",fontFamily:"inherit"}}
                />
                <button
                  className="btn-shimmer"
                  onClick={()=>setView("catalogue")}
                  style={{padding:"14px 28px",background:"#0A192F",color:"white",borderRadius:"12px",border:"none",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",fontSize:"11px",cursor:"pointer",fontFamily:"inherit"}}
                >
                  Identifier
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured 8 companies */}
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"24px"}}>
            <div>
              <p style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"#94A3B8",marginBottom:"4px"}}>Les plus résiliés</p>
              <h2 style={{fontSize:"1.4rem",fontWeight:900,color:"#0A192F",letterSpacing:"-0.03em"}}>Prestataires populaires</h2>
            </div>
            <button
              onClick={()=>setView("catalogue")}
              style={{display:"flex",alignItems:"center",gap:"8px",padding:"10px 20px",borderRadius:"12px",border:"1.5px solid #E2E8F0",background:"white",color:"#64748B",fontSize:"13px",fontWeight:700,cursor:"pointer",fontFamily:"inherit",transition:"all .2s",whiteSpace:"nowrap"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#0A192F";e.currentTarget.style.color="#0A192F";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#E2E8F0";e.currentTarget.style.color="#64748B";}}
            >
              Voir tout le catalogue
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>

          {/* 4-column grid — 2 rows of 4 */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"16px",marginBottom:"24px"}}>
            {featured.map(co => (
              <CompanyCard
                key={co.id}
                co={co}
                isSel={selected?.id===co.id}
                onSelect={handleSelect}
                logoErr={logoErr}
                setLogoErr={setLogoErr}
              />
            ))}
          </div>

          {/* Category pills — quick access */}
          <div style={{display:"flex",gap:"10px",flexWrap:"wrap",marginBottom:"32px"}}>
            <span style={{fontSize:"12px",fontWeight:600,color:"#94A3B8",alignSelf:"center",marginRight:"4px"}}>Parcourir par :</span>
            {ALL_CATS.filter(c=>c!=="Tous").map(c=>{
              const meta = CAT_META[c];
              return (
                <button
                  key={c}
                  onClick={()=>setView("catalogue")}
                  style={{display:"flex",alignItems:"center",gap:"6px",padding:"7px 16px",borderRadius:"999px",cursor:"pointer",fontSize:"12px",fontWeight:700,border:"1.5px solid #E2E8F0",background:"white",color:"#64748B",transition:"all .2s",fontFamily:"inherit",whiteSpace:"nowrap"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#0A192F";e.currentTarget.style.color="#0A192F";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#E2E8F0";e.currentTarget.style.color="#64748B";}}
                >
                  <span style={{display:"inline-block",width:"6px",height:"6px",borderRadius:"50%",background:meta.dot}}/> {c}
                  <span style={{fontSize:"10px",opacity:.5}}>{COMPANIES.filter(x=>x.cat===c).length}</span>
                </button>
              );
            })}
          </div>

          {/* Selected panel */}
          {selected && (
            <div className="fade-up" style={{background:"#0A192F",borderRadius:"20px",padding:"28px 32px",position:"relative",overflow:"hidden",boxShadow:"0 24px 60px rgba(10,25,47,.35)"}}>
              <div style={{position:"absolute",top:0,right:0,width:"300px",height:"300px",background:"radial-gradient(circle,rgba(0,255,65,.05),transparent 70%)",borderRadius:"50%",transform:"translate(30%,-30%)"}}/>
              <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"space-between",gap:"24px",flexWrap:"wrap"}}>
                <div style={{display:"flex",alignItems:"center",gap:"16px"}}>
                  <div style={{width:"56px",height:"56px",borderRadius:"14px",background:"rgba(0,255,65,.08)",border:"1px solid rgba(0,255,65,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",fontWeight:900,color:"#00FF41"}}>
                    {selected.nom.slice(0,2).toUpperCase()}
                  </div>
                  <div>
                    <p style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:"4px"}}>Cible sélectionnée</p>
                    <h3 style={{fontSize:"1.4rem",fontWeight:900,color:"white",letterSpacing:"-0.03em"}}>{selected.nom}</h3>
                    <p style={{fontSize:"12px",color:"rgba(255,255,255,.4)",marginTop:"2px"}}>{selected.cat}</p>
                  </div>
                </div>
                <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
                  <button onClick={()=>setSelected(null)} style={{color:"rgba(255,255,255,.35)",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:"8px",padding:"8px 14px",cursor:"pointer",fontSize:"12px",fontWeight:600,fontFamily:"inherit"}}>
                    Annuler
                  </button>
                  <button
                    onClick={()=>onSelect(selected)}
                    style={{padding:"14px 32px",borderRadius:"12px",background:"#00FF41",color:"#0A192F",border:"none",cursor:"pointer",fontSize:"12px",fontWeight:900,letterSpacing:"0.15em",textTransform:"uppercase",fontFamily:"inherit",boxShadow:"0 8px 24px rgba(0,255,65,.4)",display:"flex",alignItems:"center",gap:"8px"}}
                  >
                    Initier la résiliation
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <FooterLanding currentStep={1}/>
      <TacticalLabels/>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  PAGE CATALOGUE (tous les 52 prestataires)
// ════════════════════════════════════════════════════════════════

function PageCatalogue({ setView, onSelect }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Tous");
  const [selected, setSelected] = useState(null);
  const [logoErr, setLogoErr] = useState({});

  const filtered = COMPANIES.filter(c => {
    const mS = c.nom.toLowerCase().includes(search.toLowerCase());
    const mC = cat === "Tous" || c.cat === cat;
    return mS && mC;
  });

  const handleSelect = (co) => {
    setSelected(s => s?.id===co.id ? null : co);
  };

  return (
    <div className="noise" style={{minHeight:"100vh",background:"#F8FAFC"}}>
      <Nav view="catalogue" setView={setView} resiliations={[]}/>
      <div style={{maxWidth:"1280px",margin:"0 auto",padding:"3rem 48px 4rem"}}>
        {/* Header */}
        <div style={{marginBottom:"2rem"}}>
          <button onClick={()=>setView("landing")} style={{display:"flex",alignItems:"center",gap:"6px",background:"none",border:"none",cursor:"pointer",fontSize:"13px",color:"#94A3B8",fontFamily:"inherit",marginBottom:"16px",padding:0}}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
            Retour
          </button>
          <h1 style={{fontSize:"2.5rem",fontWeight:900,letterSpacing:"-0.04em",color:"#0A192F",marginBottom:"8px"}}>
            Catalogue complet
          </h1>
          <p style={{fontSize:"15px",color:"#64748B"}}>{COMPANIES.length} prestataires référencés · Résiliation garantie</p>
        </div>

        {/* Search */}
        <div style={{display:"flex",gap:"12px",marginBottom:"24px",alignItems:"center",flexWrap:"wrap"}}>
          <div className="search-box" style={{flex:1,minWidth:"280px",display:"flex",alignItems:"center",background:"white",border:"1px solid #E2E8F0",borderRadius:"14px",padding:"8px 8px 8px 20px"}}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#CBD5E1" strokeWidth="2" style={{flexShrink:0}}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input
              value={search}
              onChange={e=>setSearch(e.target.value)}
              placeholder={`Rechercher parmi ${COMPANIES.length} prestataires...`}
              style={{flex:1,padding:"8px 12px",fontSize:"14px",outline:"none",background:"transparent",border:"none",fontWeight:500,color:"#0A192F",fontFamily:"inherit"}}
            />
            {search && <button onClick={()=>setSearch("")} style={{color:"#94A3B8",background:"none",border:"none",cursor:"pointer",padding:"4px"}}><svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>}
          </div>
          <span style={{fontSize:"13px",color:"#94A3B8",whiteSpace:"nowrap"}}>{filtered.length} résultat{filtered.length>1?"s":""}</span>
        </div>

        {/* Category tabs */}
        <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"32px"}}>
          {ALL_CATS.map(c=>{
            const isA=cat===c;
            const meta=CAT_META[c];
            const count = c==="Tous" ? COMPANIES.length : COMPANIES.filter(x=>x.cat===c).length;
            return (
              <button key={c} onClick={()=>setCat(c)} style={{display:"flex",alignItems:"center",gap:"7px",padding:"9px 18px",borderRadius:"12px",cursor:"pointer",fontSize:"13px",fontWeight:700,border:`1.5px solid ${isA?"#0A192F":"#E2E8F0"}`,background:isA?"#0A192F":"white",color:isA?"white":"#64748B",transition:"all .2s",fontFamily:"inherit",whiteSpace:"nowrap"}}>
                <span>{meta.emoji}</span>
                {c}
                <span style={{fontSize:"11px",fontWeight:600,opacity:.6}}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:"14px",marginBottom:"24px"}}>
          {filtered.map(co=>(
            <CompanyCard
              key={co.id}
              co={co}
              isSel={selected?.id===co.id}
              onSelect={handleSelect}
              logoErr={logoErr}
              setLogoErr={setLogoErr}
            />
          ))}
        </div>

        {filtered.length===0&&(
          <div style={{textAlign:"center",padding:"64px 24px",border:"2px dashed #E2E8F0",borderRadius:"20px"}}>
            <p style={{fontSize:"1.5rem",marginBottom:"12px"}}>🔍</p>
            <p style={{fontWeight:700,color:"#0A192F",marginBottom:"6px"}}>Aucun prestataire pour "{search}"</p>
            <button onClick={()=>setSearch("")} style={{fontSize:"13px",fontWeight:700,textDecoration:"underline",background:"none",border:"none",cursor:"pointer",color:"#0A192F",fontFamily:"inherit"}}>Effacer la recherche</button>
          </div>
        )}

        {/* Selected panel */}
        {selected && (
          <div className="fade-up" style={{position:"sticky",bottom:"24px",background:"#0A192F",borderRadius:"20px",padding:"24px 32px",overflow:"hidden",boxShadow:"0 24px 60px rgba(10,25,47,.4)"}}>
            <div style={{position:"absolute",top:0,right:0,width:"300px",height:"300px",background:"radial-gradient(circle,rgba(0,255,65,.05),transparent 70%)",borderRadius:"50%",transform:"translate(30%,-30%)"}}/>
            <div style={{position:"relative",zIndex:1,display:"flex",alignItems:"center",justifyContent:"space-between",gap:"20px",flexWrap:"wrap"}}>
              <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
                <div style={{width:"48px",height:"48px",borderRadius:"12px",background:"rgba(0,255,65,.08)",border:"1px solid rgba(0,255,65,.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"15px",fontWeight:900,color:"#00FF41"}}>
                  {selected.nom.slice(0,2).toUpperCase()}
                </div>
                <div>
                  <p style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,.3)",marginBottom:"2px"}}>Cible sélectionnée</p>
                  <h3 style={{fontSize:"1.15rem",fontWeight:900,color:"white",letterSpacing:"-0.03em"}}>{selected.nom}</h3>
                </div>
              </div>
              <div style={{display:"flex",gap:"10px"}}>
                <button onClick={()=>setSelected(null)} style={{color:"rgba(255,255,255,.4)",background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",borderRadius:"8px",padding:"8px 16px",cursor:"pointer",fontSize:"12px",fontWeight:600,fontFamily:"inherit"}}>Annuler</button>
                <button onClick={()=>onSelect(selected)} style={{padding:"12px 28px",borderRadius:"10px",background:"#00FF41",color:"#0A192F",border:"none",cursor:"pointer",fontSize:"11px",fontWeight:900,letterSpacing:"0.15em",textTransform:"uppercase",fontFamily:"inherit",boxShadow:"0 8px 24px rgba(0,255,65,.4)"}}>
                  Initier la résiliation →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  PAGE COMMENT ÇA MARCHE
// ════════════════════════════════════════════════════════════════

function PageComment({ setView }) {
  const steps = [
    { n:"01", icon:"🎯", title:"Sélectionnez votre contrat", desc:"Choisissez l'entreprise que vous souhaitez quitter parmi notre catalogue de 50+ prestataires — ou ajoutez-la manuellement.", detail:"Orange, SFR, Basic-Fit, AXA… Tous les grands acteurs du marché français sont référencés avec leurs coordonnées de résiliation exactes." },
    { n:"02", icon:"🤖", title:"Notre IA analyse votre situation", desc:"Uploadez votre contrat ou renseignez votre motif. Notre IA détecte automatiquement la loi applicable (Hamon, Chatel, déménagement…).", detail:"L'analyseur scanne vos clauses contractuelles et identifie la stratégie légale optimale pour une résiliation sans frais ni pénalité." },
    { n:"03", icon:"✍️", title:"Votre lettre est générée", desc:"En 30 secondes, une lettre de résiliation officielle, rédigée par des juristes, est prête avec votre nom et les références légales exactes.", detail:"Chaque lettre est conforme au Code de la consommation. Valeur juridique garantie — reconnue par tous les prestataires français." },
    { n:"04", icon:"📮", title:"On envoie à votre place (Full Service)", desc:"Avec le Pack Full Service à 9,99 €, nous envoyons votre courrier recommandé LRAR directement via notre API postale partenaire.", detail:"Accusé de réception numérique, suivi en temps réel, notification par email. Vous n'avez littéralement rien à faire." },
  ];

  return (
    <div className="noise" style={{minHeight:"100vh",background:C.bg}}>
      <Nav view="comment" setView={setView} resiliations={[]}/>
      <div style={{maxWidth:"900px",margin:"0 auto",padding:"4rem 2rem"}}>
        <div style={{textAlign:"center",marginBottom:"4rem"}} className="fade-up">
          <p style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:C.muted,marginBottom:"12px"}}>Méthode</p>
          <h1 style={{fontSize:"clamp(2.5rem,6vw,4rem)",fontWeight:900,letterSpacing:"-0.04em",lineHeight:.95,marginBottom:"16px",color:C.navy}}>
            Simple comme<br/><span style={{WebkitTextStroke:`1.5px ${C.navy}`,color:"transparent"}}>bonjour.</span>
          </h1>
          <p style={{fontSize:"1.1rem",color:C.slate,maxWidth:"520px",margin:"0 auto",lineHeight:1.7}}>
            4 étapes. 3 minutes. 100% légal. Vous n'avez plus jamais à rédiger une lettre de résiliation.
          </p>
        </div>

        <div style={{display:"flex",flexDirection:"column",gap:"0"}}>
          {steps.map((s,i)=>(
            <div key={i} style={{display:"flex",gap:"32px",alignItems:"flex-start",padding:"40px 0",borderBottom:i<steps.length-1?`1px solid ${C.border}`:"none"}}>
              <div style={{flexShrink:0,width:"80px",textAlign:"center"}}>
                <p style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.2em",color:C.muted,marginBottom:"8px"}}>{s.n}</p>
                <div style={{width:"56px",height:"56px",borderRadius:"16px",background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",margin:"0 auto",boxShadow:"0 8px 20px rgba(10,25,47,.2)"}}>
                  {s.icon}
                </div>
              </div>
              <div style={{flex:1}}>
                <h3 style={{fontSize:"1.25rem",fontWeight:800,color:C.navy,marginBottom:"10px",letterSpacing:"-0.02em"}}>{s.title}</h3>
                <p style={{fontSize:"15px",color:C.slate,lineHeight:1.7,marginBottom:"12px"}}>{s.desc}</p>
                <p style={{fontSize:"13px",color:C.muted,lineHeight:1.7,padding:"12px 16px",background:C.white,borderRadius:"10px",border:`1px solid ${C.border}`}}>{s.detail}</p>
              </div>
              {i<steps.length-1&&<div style={{flexShrink:0,width:"2px",height:"40px",background:C.border,alignSelf:"flex-end",marginBottom:"-40px",marginLeft:"-48px"}}/>}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{marginTop:"4rem"}}>
          <h2 style={{fontSize:"1.75rem",fontWeight:900,letterSpacing:"-0.03em",color:C.navy,marginBottom:"2rem"}}>Questions fréquentes</h2>
          {[
            { q:"Est-ce vraiment légal ?", r:"100%. Nous appliquons uniquement les lois françaises en vigueur (Code de la consommation, Loi Hamon, Loi Chatel…). Aucune astuce — juste vos droits légaux exercés correctement." },
            { q:"Mon prestataire peut-il refuser ?", r:"Non. Dès lors que le motif légal est valide, le prestataire est juridiquement tenu d'accepter la résiliation. Nos lettres sont rédigées pour être irréfutables." },
            { q:"Combien de temps ça prend ?", r:"3 minutes pour générer votre lettre. Le prestataire doit prendre en compte votre résiliation dans les délais légaux (généralement 10 à 30 jours selon le contrat)." },
            { q:"Que se passe-t-il si mon prestataire tarde ?", r:"Notre lettre LRAR vous protège juridiquement. La date de réception fait foi. En cas de litige, vous avez la preuve de votre démarche." },
          ].map((f,i)=>(
            <div key={i} style={{padding:"20px 0",borderBottom:`1px solid ${C.border}`}}>
              <p style={{fontSize:"15px",fontWeight:700,color:C.navy,marginBottom:"8px"}}>{f.q}</p>
              <p style={{fontSize:"14px",color:C.slate,lineHeight:1.7}}>{f.r}</p>
            </div>
          ))}
        </div>

        <div style={{textAlign:"center",marginTop:"3rem"}}>
          <button onClick={()=>setView("landing")} style={{padding:"14px 32px",borderRadius:"12px",background:C.navy,color:"white",border:"none",cursor:"pointer",fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",fontSize:"12px",fontFamily:"inherit",boxShadow:"0 8px 24px rgba(10,25,47,.2)"}}>
            Résilier maintenant →
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  PAGE TARIFS
// ════════════════════════════════════════════════════════════════

function PageTarifs({ setView, onStartPDF, onStartFull }) {
  const plans = [
    {
      id:"pdf", emoji:"📄", title:"Génération seule", price:"0,99", period:"par résiliation",
      desc:"Vous gérez l'envoi, on génère la lettre parfaite.",
      features:["Lettre PDF officielle haute qualité","Références légales exactes (Hamon, Chatel…)","Instructions d'envoi LRAR détaillées","Téléchargement immédiat","Valeur juridique garantie"],
      cta:"Choisir ce pack", badge:null, highlight:false,
    },
    {
      id:"full", emoji:"🚀", title:"Full Service", price:"9,99", period:"par résiliation",
      desc:"On s'occupe de tout. Vous ne faites littéralement rien.",
      features:["Tout du pack Génération","Envoi recommandé LRAR via API La Poste","Accusé de réception numérique","Suivi en temps réel","Notification email confirmée","Support prioritaire 7j/7"],
      cta:"Choisir Full Service", badge:"Recommandé", highlight:true,
    },
  ];

  return (
    <div className="noise" style={{minHeight:"100vh",background:C.bg}}>
      <Nav view="tarifs" setView={setView} resiliations={[]}/>
      <div style={{maxWidth:"900px",margin:"0 auto",padding:"4rem 2rem"}}>
        <div style={{textAlign:"center",marginBottom:"4rem"}} className="fade-up">
          <p style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:C.muted,marginBottom:"12px"}}>Tarifs</p>
          <h1 style={{fontSize:"clamp(2.5rem,6vw,4rem)",fontWeight:900,letterSpacing:"-0.04em",lineHeight:.95,marginBottom:"16px",color:C.navy}}>
            Transparent.<br/><span style={{WebkitTextStroke:`1.5px ${C.navy}`,color:"transparent"}}>Sans surprise.</span>
          </h1>
          <p style={{fontSize:"1.1rem",color:C.slate,maxWidth:"480px",margin:"0 auto",lineHeight:1.7}}>
            Deux formules claires. Pas d'abonnement, pas de frais cachés. Vous payez une fois, vous résiliez.
          </p>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px",marginBottom:"3rem"}}>
          {plans.map(p=>(
            <div key={p.id} style={{padding:"32px",borderRadius:"20px",border:`2px solid ${p.highlight?C.navy:C.border}`,background:p.highlight?C.navy:C.white,position:"relative",transition:"transform .2s",boxShadow:p.highlight?"0 20px 50px rgba(10,25,47,.25)":"0 4px 16px rgba(10,25,47,.04)"}}>
              {p.badge&&<div style={{position:"absolute",top:"16px",right:"16px",padding:"3px 10px",borderRadius:"999px",background:p.highlight?"rgba(0,255,65,.15)":C.navy,color:p.highlight?C.green:"white",fontSize:"9px",fontWeight:800,letterSpacing:"0.1em"}}>{p.badge}</div>}
              <div style={{fontSize:"28px",marginBottom:"12px"}}>{p.emoji}</div>
              <p style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:p.highlight?"rgba(255,255,255,.5)":C.muted,marginBottom:"6px"}}>{p.title}</p>
              <p style={{fontSize:"2.5rem",fontWeight:900,letterSpacing:"-0.05em",color:p.highlight?"white":C.navy,marginBottom:"4px"}}>{p.price} €</p>
              <p style={{fontSize:"12px",color:p.highlight?"rgba(255,255,255,.4)":C.muted,marginBottom:"16px"}}>{p.period}</p>
              <p style={{fontSize:"13px",color:p.highlight?"rgba(255,255,255,.65)":C.slate,lineHeight:1.6,marginBottom:"24px"}}>{p.desc}</p>
              <div style={{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"28px"}}>
                {p.features.map((f,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:"10px"}}>
                    <span style={{color:p.highlight?C.green:"#22C55E",flexShrink:0}}><Icon d={P.check} s={14} w={2.5}/></span>
                    <span style={{fontSize:"13px",color:p.highlight?"rgba(255,255,255,.75)":"#374151",fontWeight:500}}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={()=>setView("landing")} style={{width:"100%",padding:"13px",borderRadius:"10px",background:p.highlight?C.green:C.navy,color:p.highlight?C.navy:"white",border:"none",cursor:"pointer",fontWeight:900,letterSpacing:"0.12em",textTransform:"uppercase",fontSize:"11px",fontFamily:"inherit",boxShadow:p.highlight?"0 8px 24px rgba(0,255,65,.35)":"0 4px 16px rgba(10,25,47,.2)"}}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Garanties */}
        <div style={{background:C.white,borderRadius:"16px",border:`1px solid ${C.border}`,padding:"28px",marginBottom:"2rem"}}>
          <h3 style={{fontSize:"16px",fontWeight:800,color:C.navy,marginBottom:"20px"}}>🛡️ Garanties incluses dans les deux packs</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
            {["Aucun abonnement, jamais","Paiement sécurisé Stripe","Lettre conforme Code de la consommation","Remboursement si refus du prestataire","Données RGPD supprimées après 30 jours","Support humain par email"].map((g,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:"8px"}}>
                <span style={{color:"#22C55E"}}><Icon d={P.check} s={14} w={2.5}/></span>
                <span style={{fontSize:"13px",color:C.slate,fontWeight:500}}>{g}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Savings example */}
        <div style={{background:"linear-gradient(135deg,#0A192F,#1e3a5f)",borderRadius:"16px",padding:"28px",color:"white",textAlign:"center"}}>
          <p style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,.4)",marginBottom:"12px"}}>Exemple concret</p>
          <p style={{fontSize:"1.1rem",fontWeight:600,color:"rgba(255,255,255,.8)",lineHeight:1.7}}>
            Vous résiliez votre abonnement salle de sport à <strong style={{color:"white"}}>29,99 €/mois</strong>.<br/>
            Économie annuelle : <strong style={{color:C.green,fontSize:"1.5rem"}}>359,88 €</strong><br/>
            Coût Kill-Contract Full Service : <strong style={{color:C.green}}>9,99 €</strong><br/>
            <span style={{opacity:.5,fontSize:"13px"}}>Soit un ROI de 3 500% dès le premier mois.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  PAGE SÉCURITÉ
// ════════════════════════════════════════════════════════════════

function PageSecurite({ setView }) {
  const pillars = [
    { icon:"🔐", title:"Chiffrement de bout en bout", desc:"Toutes vos données personnelles sont chiffrées en transit (TLS 1.3) et au repos (AES-256). Vos informations ne sont jamais accessibles en clair, y compris pour nos équipes.", badge:"TLS 1.3 + AES-256" },
    { icon:"🇪🇺", title:"100% conforme RGPD", desc:"Kill-Contract est une entreprise française opérant dans le respect strict du RGPD. Vos données sont hébergées en Europe (AWS Paris eu-west-3). Vous disposez d'un droit d'accès, rectification et suppression à tout moment.", badge:"RGPD Art. 17" },
    { icon:"💳", title:"Paiements sécurisés par Stripe", desc:"Nous n'hébergeons jamais vos données bancaires. Tous les paiements transitent par Stripe (certifié PCI-DSS Level 1), le standard de sécurité le plus élevé de l'industrie.", badge:"PCI-DSS Level 1" },
    { icon:"🗑️", title:"Suppression automatique des données", desc:"Vos documents et données personnelles sont automatiquement supprimés de nos serveurs 30 jours après la génération de votre lettre. Aucune rétention inutile.", badge:"Auto-delete J+30" },
    { icon:"⚖️", title:"Légalité absolue de chaque lettre", desc:"Nos modèles de lettres sont rédigés et audités par des juristes spécialisés en droit de la consommation. Chaque lettre cite l'article de loi exact applicable à votre situation.", badge:"Vérifié par juristes" },
    { icon:"🚫", title:"Zéro revente de données", desc:"Kill-Contract ne revend, ne loue et ne partage jamais vos données personnelles avec des tiers à des fins commerciales. Notre modèle économique repose uniquement sur la génération de lettres.", badge:"No data selling" },
  ];

  return (
    <div className="noise" style={{minHeight:"100vh",background:C.bg}}>
      <Nav view="securite" setView={setView} resiliations={[]}/>
      <div style={{maxWidth:"960px",margin:"0 auto",padding:"4rem 2rem"}}>
        <div style={{textAlign:"center",marginBottom:"4rem"}} className="fade-up">
          <p style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:C.muted,marginBottom:"12px"}}>Sécurité</p>
          <h1 style={{fontSize:"clamp(2.5rem,6vw,4rem)",fontWeight:900,letterSpacing:"-0.04em",lineHeight:.95,marginBottom:"16px",color:C.navy}}>
            Votre vie privée,<br/><span style={{WebkitTextStroke:`1.5px ${C.navy}`,color:"transparent"}}>notre obsession.</span>
          </h1>
          <p style={{fontSize:"1.1rem",color:C.slate,maxWidth:"520px",margin:"0 auto",lineHeight:1.7}}>
            Kill-Contract a été conçu dès le premier jour avec la protection de vos données comme priorité absolue. Voici exactement ce que nous faisons.
          </p>
        </div>

        {/* Trust bar */}
        <div style={{display:"flex",justifyContent:"center",gap:"32px",flexWrap:"wrap",marginBottom:"4rem",padding:"20px",background:C.white,borderRadius:"16px",border:`1px solid ${C.border}`}}>
          {[{l:"RGPD",s:"Conforme"},{l:"PCI-DSS",s:"Level 1"},{l:"TLS",s:"1.3"},{l:"Hébergement",s:"🇫🇷 France"},{l:"Juristes",s:"Certifiés"}].map(t=>(
            <div key={t.l} style={{textAlign:"center"}}>
              <p style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:C.muted,marginBottom:"4px"}}>{t.l}</p>
              <p style={{fontSize:"15px",fontWeight:900,color:C.navy}}>{t.s}</p>
            </div>
          ))}
        </div>

        {/* Pillars grid */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"3rem"}}>
          {pillars.map((p,i)=>(
            <div key={i} style={{padding:"24px",background:C.white,borderRadius:"14px",border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(10,25,47,.04)"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:"14px"}}>
                <span style={{fontSize:"24px",flexShrink:0}}>{p.icon}</span>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",marginBottom:"8px"}}>
                    <h3 style={{fontSize:"14px",fontWeight:800,color:C.navy}}>{p.title}</h3>
                    <span style={{padding:"1px 8px",borderRadius:"999px",background:"#F0FDF4",color:"#166534",fontSize:"9px",fontWeight:800,letterSpacing:"0.08em",whiteSpace:"nowrap"}}>{p.badge}</span>
                  </div>
                  <p style={{fontSize:"13px",color:C.slate,lineHeight:1.7}}>{p.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legal block */}
        <div style={{background:"#F0F9FF",borderRadius:"16px",border:"1.5px solid #BAE6FD",padding:"28px",marginBottom:"2rem"}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:"14px"}}>
            <span style={{fontSize:"24px",flexShrink:0}}>⚖️</span>
            <div>
              <h3 style={{fontSize:"15px",fontWeight:800,color:"#0C4A6E",marginBottom:"10px"}}>Vos droits légaux — Article L215-1 du Code de la consommation</h3>
              <p style={{fontSize:"13px",color:"#0369A1",lineHeight:1.7,marginBottom:"10px"}}>
                Tout consommateur peut résilier son contrat à l'issue de la première période contractuelle, puis à tout moment, sans pénalité ni frais de résiliation. Cette disposition est d'ordre public — elle s'applique à tout contrat d'abonnement ou de prestation continue, quelles que soient les conditions générales du prestataire.
              </p>
              <p style={{fontSize:"13px",color:"#0369A1",lineHeight:1.7}}>
                Kill-Contract n'exploite aucune "faille" : nous appliquons vos droits existants, que la plupart des prestataires espèrent que vous ignoriez.
              </p>
              <p style={{fontSize:"10px",fontWeight:700,color:"#0284C7",marginTop:"12px",letterSpacing:"0.05em"}}>Source : Légifrance — Art. L215-1 modifié par Loi 2022-1158 du 16 août 2022</p>
            </div>
          </div>
        </div>

        <div style={{textAlign:"center"}}>
          <button onClick={()=>setView("landing")} style={{padding:"14px 32px",borderRadius:"12px",background:C.navy,color:"white",border:"none",cursor:"pointer",fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",fontSize:"12px",fontFamily:"inherit",boxShadow:"0 8px 24px rgba(10,25,47,.2)"}}>
            Résilier en toute sécurité →
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  FORM PAGES (app flow)
// ════════════════════════════════════════════════════════════════

function Stepper({ step }) {
  const steps = ["Entreprise","Coordonnées","Motif & Préavis","Paiement"];
  return (
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"center",gap:0,marginBottom:"2.5rem"}}>
      {steps.map((s,i)=>{
        const done=i+1<step, active=i+1===step;
        return (
          <div key={i} style={{display:"flex",alignItems:"center"}}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"5px"}}>
              <div style={{width:"34px",height:"34px",borderRadius:"50%",background:done?"#22C55E":active?C.navy:"white",border:`2px solid ${done?"#22C55E":active?C.navy:"#D1D5DB"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:800,color:(done||active)?"white":"#D1D5DB"}}>
                {done?<Icon d={P.check} s={15} w={3}/>:i+1}
              </div>
              <span style={{fontSize:"9px",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:active?C.navy:done?"#6B7280":"#D1D5DB",whiteSpace:"nowrap"}}>{s}</span>
            </div>
            {i<3&&<div style={{width:"68px",height:"2px",margin:"0 4px 18px",background:done?C.navy:"#E5E7EB",borderRadius:"2px"}}/>}
          </div>
        );
      })}
    </div>
  );
}

function LetterPreview({ company, form, motif }) {
  const today = new Date().toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"});
  const motifObj = MOTIFS.find(m=>m.value===motif);
  const body = LEGAL_BODY(motif, form);
  return (
    <div>
      <p style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:C.muted,marginBottom:"10px"}}>Aperçu sécurisé</p>
      <div style={{background:C.white,borderRadius:"12px",border:"1px solid #E4E9EF",boxShadow:"0 2px 6px rgba(10,25,47,.04),0 16px 48px rgba(10,25,47,.09)",overflow:"hidden"}}>
        <div style={{padding:"18px 20px 0"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"12px"}}>
            <div style={{display:"flex",gap:"10px"}}>
              <div style={{width:"32px",height:"32px",borderRadius:"7px",background:"#F1F5F9",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:900,color:"#475569",flexShrink:0}}>
                {(company?.nom||"XX").slice(0,2).toUpperCase()}
              </div>
              <div>
                <p style={{fontSize:"12px",fontWeight:700,color:C.navy,marginBottom:"2px"}}>{company?.nom||"Entreprise"} — Service Résiliation</p>
                <p style={{fontSize:"10px",color:C.muted}}>Service résiliation</p>
              </div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <p style={{fontSize:"10px",color:C.muted}}>Paris, {today}</p>
              <p style={{fontSize:"9px",fontWeight:700,color:"#CBD5E1",letterSpacing:"0.1em",marginTop:"2px"}}>LRAR</p>
            </div>
          </div>
          {motifObj&&<div style={{marginBottom:"10px"}}><span style={{padding:"2px 10px",borderRadius:"999px",background:"#DCFCE7",color:"#166534",fontSize:"10px",fontWeight:700}}>✦ {motifObj.badge} appliqué</span></div>}
          <p style={{fontSize:"12px",fontWeight:700,color:C.navy,marginBottom:"14px"}}>Objet : Demande de résiliation de contrat</p>
          <div style={{position:"relative",minHeight:"180px",overflow:"hidden"}}>
            <div style={{filter:"blur(4px)",userSelect:"none",pointerEvents:"none",fontSize:"11px",lineHeight:"1.8",color:"#374151",position:"relative"}}>
              {[0,1,2].map(i=><div key={i} style={{position:"absolute",top:`${8+i*36}%`,left:"-5%",fontSize:"36px",fontWeight:900,color:"rgba(10,25,47,.04)",transform:"rotate(-30deg)",whiteSpace:"nowrap",letterSpacing:"0.2em",userSelect:"none",pointerEvents:"none"}}>BROUILLON</div>)}
              <div style={{position:"relative",zIndex:1}}>{body.split("\n\n").map((p,i)=><p key={i} style={{marginBottom:"9px"}}>{p}</p>)}</div>
            </div>
          </div>
        </div>
        <div style={{padding:"12px 20px",borderTop:`1px solid #F1F5F9`,display:"flex",justifyContent:"center"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:"6px",padding:"7px 16px",borderRadius:"999px",border:`1px solid ${C.border}`,background:C.white,fontSize:"11px",fontWeight:600,color:C.slate}}>
            <Icon d={P.lock} s={12}/> Contenu protégé — complétez les étapes
          </div>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px",marginTop:"10px"}}>
        {["Loi Hamon / Chatel","Code conso. 2024","PDF immédiat","Recommandé AR"].map(t=>(
          <div key={t} style={{display:"flex",alignItems:"center",gap:"7px",padding:"8px 11px",background:C.white,border:`1px solid #E8ECF0`,borderRadius:"8px"}}>
            <span style={{color:"#22C55E",flexShrink:0}}><Icon d={P.check} s={12} w={2.5}/></span>
            <span style={{fontSize:"11px",fontWeight:600,color:"#475569"}}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppNav({ setView, resiliations, onDashboard }) {
  return (
    <nav style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 32px",borderBottom:`1px solid ${C.border}`,background:C.white,position:"sticky",top:0,zIndex:100}}>
      <Logo onClick={()=>setView("landing")}/>
      <div style={{display:"flex",gap:"12px",alignItems:"center"}}>
        {resiliations.length>0&&(
          <button onClick={onDashboard} style={{display:"flex",alignItems:"center",gap:"6px",padding:"7px 14px",borderRadius:"8px",border:`1px solid ${C.border}`,background:C.white,color:C.slate,fontSize:"11px",fontWeight:700,cursor:"pointer"}}>
            <Icon d={P.chart} s={13}/>Mon espace
            <span style={{background:"#EFF6FF",color:"#1D4ED8",padding:"1px 6px",borderRadius:"999px",fontSize:"9px",fontWeight:800}}>{resiliations.length}</span>
          </button>
        )}
        <div style={{width:"32px",height:"32px",borderRadius:"50%",background:"#F1F5F9",border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:C.muted}}>
          <Icon d={P.user} s={15}/>
        </div>
      </div>
    </nav>
  );
}

function TField({ value, onChange, placeholder, type="text" }) {
  const [f,setF]=useState(false);
  return <input type={type} value={value} onChange={onChange} placeholder={placeholder} onFocus={()=>setF(true)} onBlur={()=>setF(false)} style={{width:"100%",padding:"9px 12px",borderRadius:"8px",fontSize:"13px",border:`1px solid ${f?"#94A3B8":C.border}`,background:C.white,outline:"none",fontFamily:"inherit",color:C.navy,boxSizing:"border-box",transition:"border-color .15s"}}/>;
}

function Btn({ children, onClick, variant="primary", disabled=false, style:sx={} }) {
  const base={display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",border:"none",cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit",fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",transition:"all .18s",borderRadius:"9px",fontSize:"11px",padding:"11px 20px"};
  const vars={
    primary:{background:disabled?"#E2E8F0":C.navy,color:disabled?"#94A3B8":"white",boxShadow:disabled?"none":"0 4px 16px rgba(10,25,47,.22)"},
    secondary:{background:C.white,color:C.slate,border:`1.5px solid ${C.border}`},
    green:{background:disabled?"#E2E8F0":C.green,color:disabled?"#94A3B8":C.navy,boxShadow:disabled?"none":"0 4px 20px rgba(0,255,65,.35)",fontWeight:900},
  };
  return <button onClick={disabled?undefined:onClick} style={{...base,...vars[variant],...sx}}>{children}</button>;
}

// ── Coordonnées ──
function ViewCoordonnees({ company, form, setForm, setView, resiliations }) {
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const ok=form.prenom&&form.nom&&form.adresse&&form.cp&&form.ville&&form.email&&form.contrat&&form.mensuel;
  return (
    <div style={{background:C.bg,minHeight:"100vh"}}>
      <AppNav setView={setView} resiliations={resiliations} onDashboard={()=>setView("dashboard")}/>
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"2rem"}}>
        <Stepper step={2}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2.5rem",alignItems:"start"}}>
          <div>
            <p style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:C.muted,marginBottom:"16px"}}>02 — Vos coordonnées</p>
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
                <div><span style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:C.muted,marginBottom:"5px",display:"block"}}>Prénom</span><TField value={form.prenom} onChange={e=>set("prenom",e.target.value)} placeholder="Jean"/></div>
                <div><span style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:C.muted,marginBottom:"5px",display:"block"}}>Nom</span><TField value={form.nom} onChange={e=>set("nom",e.target.value)} placeholder="Dupont"/></div>
              </div>
              <div><span style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:C.muted,marginBottom:"5px",display:"block"}}>Adresse</span><TField value={form.adresse} onChange={e=>set("adresse",e.target.value)} placeholder="12 rue de la Paix"/></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}}>
                <div><span style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:C.muted,marginBottom:"5px",display:"block"}}>Code postal</span><TField value={form.cp} onChange={e=>set("cp",e.target.value)} placeholder="75001"/></div>
                <div><span style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:C.muted,marginBottom:"5px",display:"block"}}>Ville</span><TField value={form.ville} onChange={e=>set("ville",e.target.value)} placeholder="Paris"/></div>
              </div>
              <div><span style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:C.muted,marginBottom:"5px",display:"block"}}>Email</span><TField value={form.email} onChange={e=>set("email",e.target.value)} placeholder="jean@example.com" type="email"/></div>
              <div><span style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:C.muted,marginBottom:"5px",display:"block"}}>N° de contrat</span><TField value={form.contrat} onChange={e=>set("contrat",e.target.value)} placeholder="Référence sur votre facture"/></div>
              <div style={{background:"#FAFBFC",borderRadius:"10px",border:`1px solid ${C.border}`,padding:"14px"}}>
                <span style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:C.muted,marginBottom:"5px",display:"block"}}>Prix mensuel de l'abonnement (€)</span>
                <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
                  <TField value={form.mensuel} onChange={e=>set("mensuel",e.target.value.replace(/[^0-9.]/g,""))} placeholder="ex : 29.99"/>
                  {form.mensuel&&parseFloat(form.mensuel)>0&&(
                    <div style={{flexShrink:0,padding:"8px 14px",borderRadius:"8px",background:"#F0FDF4",border:"1px solid #BBF7D0",textAlign:"center"}}>
                      <p style={{fontSize:"9px",fontWeight:700,color:"#166534",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"1px"}}>Économie/an</p>
                      <p style={{fontSize:"16px",fontWeight:900,color:"#166534",letterSpacing:"-0.03em"}}>{(parseFloat(form.mensuel)*12).toFixed(0)} €</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div style={{display:"flex",gap:"8px",marginTop:"20px"}}>
              <Btn variant="secondary" onClick={()=>setView("landing")}><Icon d={P.left} s={13}/> Retour</Btn>
              <Btn variant="primary" onClick={()=>setView("motif")} disabled={!ok} style={{flex:1}}>{ok?"Continuer →":"Remplissez tous les champs"}</Btn>
            </div>
          </div>
          <div style={{position:"sticky",top:"1.5rem"}}><LetterPreview company={company} form={form} motif={form.motif}/></div>
        </div>
      </div>
    </div>
  );
}

// ── AI Analyzer ──
function ContractAnalyzer() {
  const [status,setStatus]=useState("idle");
  const [result,setResult]=useState(null);
  const [fileName,setFileName]=useState("");
  const [drag,setDrag]=useState(false);
  const [progress,setProgress]=useState(0);
  const fileRef=useRef();

  const analyze=(f)=>{
    if(!f) return;
    setFileName(f.name); setStatus("loading"); setProgress(0);
    const iv=setInterval(()=>setProgress(p=>{if(p>=95){clearInterval(iv);return p;} return p+Math.random()*18;}),200);
    setTimeout(()=>{
      clearInterval(iv); setProgress(100);
      const findings=[
        {type:"success",icon:"🎯",title:"Loi Hamon détectée",detail:"Votre contrat a plus de 12 mois — résiliation sans frais possible à tout moment.",law:"Art. L.215-1 Code de la consommation",savings:"Résiliation immédiate"},
        {type:"warning",icon:"📈",title:"Hausse tarifaire détectée",detail:"Une augmentation de prix unilatérale a été identifiée — résiliation Loi Chatel applicable.",law:"Art. L.221-13 Code de la consommation",savings:"Sans préavis possible"},
        {type:"success",icon:"🔓",title:"Engagement arrivé à terme",detail:"La période d'engagement initiale est échue. Aucune pénalité applicable.",law:"Art. L.224-33 Code de la consommation",savings:"0 € de pénalité"},
      ];
      setResult(findings[Math.floor(Math.random()*findings.length)]); setStatus("result");
    },2800);
  };

  return (
    <div style={{background:C.white,borderRadius:"12px",border:`1px solid ${C.border}`,padding:"20px",marginBottom:"14px"}}>
      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"14px"}}>
        <div style={{width:"32px",height:"32px",borderRadius:"9px",background:`linear-gradient(135deg,${C.navy},#1e3a5f)`,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon d={P.spark} s={16} w={2.5} color="white"/></div>
        <div><p style={{fontSize:"13px",fontWeight:800,color:C.navy}}>Analyseur de Contrat IA</p><p style={{fontSize:"10px",color:C.muted}}>Détecte vos droits automatiquement</p></div>
        <span style={{marginLeft:"auto",padding:"2px 9px",borderRadius:"999px",fontSize:"9px",fontWeight:800,background:"linear-gradient(90deg,#DBEAFE,#EDE9FE)",color:"#1D4ED8"}}>IA</span>
      </div>
      {status==="idle"&&(
        <div onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);analyze(e.dataTransfer.files[0])}} onClick={()=>fileRef.current?.click()} style={{border:`2px dashed ${drag?"#94A3B8":C.border}`,borderRadius:"10px",padding:"24px 16px",textAlign:"center",cursor:"pointer",background:"#FAFBFC"}}>
          <div style={{color:"#CBD5E1",display:"flex",justifyContent:"center",marginBottom:"8px"}}><Icon d={P.upload} s={26} w={1.5}/></div>
          <p style={{fontSize:"13px",fontWeight:700,color:C.navy,marginBottom:"3px"}}>Analysez votre contrat pour trouver une faille</p>
          <p style={{fontSize:"11px",color:"#3B82F6",fontWeight:500}}>ou cliquez pour parcourir</p>
          <p style={{fontSize:"10px",color:C.muted,marginTop:"2px"}}>PDF, JPG ou PNG — 10 Mo max</p>
          <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{display:"none"}} onChange={e=>analyze(e.target.files[0])}/>
        </div>
      )}
      {status==="loading"&&(
        <div style={{padding:"16px 0"}}>
          <p style={{fontSize:"12px",fontWeight:600,color:C.navy,marginBottom:"12px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>📄 {fileName}</p>
          <div style={{marginBottom:"10px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"5px"}}><span style={{fontSize:"10px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.15em",color:C.muted}}>Analyse…</span><span style={{fontSize:"10px",fontWeight:800,color:C.navy}}>{Math.round(progress)}%</span></div>
            <div style={{height:"5px",background:"#F1F5F9",borderRadius:"999px",overflow:"hidden"}}><div style={{height:"100%",borderRadius:"999px",width:`${progress}%`,background:`linear-gradient(90deg,${C.navy},#3B82F6)`,transition:"width .2s"}}/></div>
          </div>
          {["Lecture du document…","Analyse des clauses…","Vérification des lois…","Calcul de vos droits…"].map((s,i)=>{
            const done=progress>25*(i+1),active=progress>25*i&&progress<=25*(i+1);
            return <div key={i} style={{display:"flex",alignItems:"center",gap:"8px",padding:"3px 0",opacity:done||active?1:.3}}><div style={{width:"14px",height:"14px",borderRadius:"50%",background:done?"#22C55E":active?C.navy:"#E2E8F0",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{done&&<Icon d={P.check} s={8} w={3} color="white"/>}</div><span style={{fontSize:"11px",color:done?"#166534":active?C.navy:C.muted,fontWeight:done||active?600:400}}>{s}</span></div>;
          })}
        </div>
      )}
      {status==="result"&&result&&(
        <div>
          <div style={{padding:"14px 16px",borderRadius:"10px",background:result.type==="success"?"#F0FDF4":"#FFFBEB",border:`1.5px solid ${result.type==="success"?"#86EFAC":"#FCD34D"}`,marginBottom:"10px"}}>
            <div style={{display:"flex",gap:"10px"}}>
              <span style={{fontSize:"20px",flexShrink:0}}>{result.icon}</span>
              <div>
                <p style={{fontSize:"13px",fontWeight:800,color:C.navy,marginBottom:"4px"}}>{result.title}</p>
                <p style={{fontSize:"12px",color:"#374151",lineHeight:1.55,marginBottom:"8px"}}>{result.detail}</p>
                <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                  <span style={{padding:"1px 8px",borderRadius:"999px",background:"#DCFCE7",color:"#166534",fontSize:"9px",fontWeight:800}}>{result.law}</span>
                  <span style={{padding:"1px 8px",borderRadius:"999px",background:"#FEF3C7",color:"#92400E",fontSize:"9px",fontWeight:800}}>💰 {result.savings}</span>
                </div>
              </div>
            </div>
          </div>
          <button onClick={()=>setStatus("idle")} style={{background:"none",border:"none",cursor:"pointer",fontSize:"11px",color:C.muted,textDecoration:"underline",fontFamily:"inherit"}}>Analyser un autre document</button>
        </div>
      )}
    </div>
  );
}

// ── Motif ──
function ViewMotif({ company, form, setForm, file, setFile, setView, resiliations }) {
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const [drag,setDrag]=useState(false);
  const [dateF,setDateF]=useState("");
  const fileRef=useRef();
  const handleFile=f=>{if(!f||f.size>10*1024*1024)return;setFile(f);};
  const preavis=(()=>{if(!dateF)return null;const d=Math.round((new Date(dateF)-new Date())/86400000);if(d<0)return{ok:false,msg:`⚠️ Date passée`};if(d<30)return{ok:false,msg:`⚠️ ${d} jours — vérifiez votre préavis`};return{ok:true,msg:`✅ ${d} jours (≈${Math.floor(d/30)} mois) — délai conforme`};})();

  return (
    <div style={{background:C.bg,minHeight:"100vh"}}>
      <AppNav setView={setView} resiliations={resiliations} onDashboard={()=>setView("dashboard")}/>
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"2rem"}}>
        <Stepper step={3}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2.5rem",alignItems:"start"}}>
          <div>
            <p style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:C.muted,marginBottom:"16px"}}>03 — Motif de résiliation</p>
            <ContractAnalyzer/>
            <div style={{display:"flex",flexDirection:"column",gap:"7px",marginBottom:"14px"}}>
              {MOTIFS.map(m=>{
                const isSel=form.motif===m.value;
                return (
                  <div key={m.value} onClick={()=>set("motif",m.value)} style={{display:"flex",gap:"11px",alignItems:"flex-start",padding:"13px 14px",borderRadius:"10px",cursor:"pointer",border:`1.5px solid ${isSel?C.navy:C.border}`,background:isSel?C.navy:C.white,transition:"all .18s"}}>
                    <div style={{width:"17px",height:"17px",borderRadius:"4px",flexShrink:0,marginTop:"2px",border:`2px solid ${isSel?C.green:"#CBD5E1"}`,background:isSel?C.green:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>{isSel&&<Icon d={P.check} s={10} w={3.5}/>}</div>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:"7px",flexWrap:"wrap",marginBottom:"3px"}}>
                        <span style={{fontSize:"14px"}}>{m.icon}</span>
                        <span style={{fontSize:"13px",fontWeight:700,color:isSel?"white":C.navy}}>{m.label}</span>
                        <span style={{padding:"1px 8px",borderRadius:"999px",fontSize:"9px",fontWeight:800,background:isSel?"rgba(255,255,255,.12)":m.badgeBg,color:isSel?"rgba(255,255,255,.75)":m.badgeC}}>{m.badge}</span>
                      </div>
                      <p style={{fontSize:"11.5px",color:isSel?"rgba(255,255,255,.6)":C.slate,lineHeight:1.5}}>{m.desc}</p>
                      {isSel&&<div style={{marginTop:"9px",padding:"7px 11px",background:"rgba(0,255,65,.08)",borderRadius:"6px",border:"1px solid rgba(0,255,65,.18)"}}><p style={{fontSize:"9px",fontWeight:800,letterSpacing:"0.18em",textTransform:"uppercase",color:C.green,marginBottom:"3px"}}>Article de loi appliqué</p><p style={{fontSize:"10.5px",color:"rgba(255,255,255,.75)",fontStyle:"italic"}}>{m.loi}</p></div>}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{background:C.white,borderRadius:"12px",border:`1px solid ${C.border}`,padding:"20px",marginBottom:"12px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"7px",marginBottom:"11px"}}><span style={{color:C.muted}}><Icon d={P.doc} s={14}/></span><span style={{fontSize:"12px",fontWeight:700,color:C.navy}}>Pièce justificative</span><span style={{padding:"1px 8px",borderRadius:"999px",background:"#FEF3C7",color:"#92400E",fontSize:"9px",fontWeight:800}}>Fortement conseillé</span></div>
              {!file?(
                <div onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0])}} onClick={()=>fileRef.current?.click()} style={{border:`2px dashed ${drag?"#94A3B8":C.border}`,borderRadius:"8px",padding:"20px 14px",textAlign:"center",cursor:"pointer",background:"#FAFBFC"}}>
                  <div style={{color:"#CBD5E1",display:"flex",justifyContent:"center",marginBottom:"6px"}}><Icon d={P.upload} s={22} w={1.5}/></div>
                  <p style={{fontSize:"12px",fontWeight:600,color:C.navy,marginBottom:"2px"}}>Déposer votre document ici</p>
                  <p style={{fontSize:"11px",color:"#3B82F6",fontWeight:500}}>ou cliquez pour parcourir</p>
                  <p style={{fontSize:"10px",color:C.muted,marginTop:"2px"}}>PDF, JPG ou PNG — 10 Mo max</p>
                  <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
                </div>
              ):(
                <div style={{display:"flex",alignItems:"center",gap:"9px",padding:"9px 11px",background:"#F0FDF4",borderRadius:"8px",border:"1px solid #BBF7D0"}}>
                  <span style={{color:"#16A34A"}}><Icon d={P.doc} s={14}/></span>
                  <div style={{flex:1,minWidth:0}}><p style={{fontSize:"12px",fontWeight:700,color:C.navy,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{file.name}</p><p style={{fontSize:"10px",color:C.slate}}>{(file.size/1024).toFixed(0)} Ko</p></div>
                  <button onClick={()=>setFile(null)} style={{color:C.muted,background:"none",border:"none",cursor:"pointer"}}><Icon d={P.x} s={12}/></button>
                </div>
              )}
            </div>
            <div style={{background:C.white,borderRadius:"12px",border:`1px solid ${C.border}`,padding:"20px",marginBottom:"20px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"7px",marginBottom:"10px"}}><span style={{color:C.muted}}><Icon d={P.cal} s={14}/></span><span style={{fontSize:"12px",fontWeight:700,color:C.navy}}>Calculateur de préavis</span></div>
              <span style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:C.muted,marginBottom:"5px",display:"block"}}>Date de fin souhaitée</span>
              <input type="date" value={dateF} onChange={e=>setDateF(e.target.value)} style={{width:"100%",padding:"9px 11px",borderRadius:"8px",border:`1px solid ${C.border}`,fontSize:"13px",color:dateF?C.navy:C.muted,outline:"none",fontFamily:"inherit",background:C.white,boxSizing:"border-box"}}/>
              {preavis?<p style={{marginTop:"8px",fontSize:"12px",fontWeight:500,color:preavis.ok?"#166534":"#92400E"}}>{preavis.msg}</p>:<p style={{marginTop:"7px",fontSize:"11px",color:"#CBD5E1",fontStyle:"italic"}}>Entrez une date pour calculer automatiquement</p>}
            </div>
            <div style={{display:"flex",gap:"8px"}}>
              <Btn variant="secondary" onClick={()=>setView("coords")}><Icon d={P.left} s={13}/> Retour</Btn>
              <Btn variant="primary" onClick={()=>setView("pricing")} disabled={!form.motif} style={{flex:1}}>Voir le récapitulatif <Icon d={P.right} s={13}/></Btn>
            </div>
          </div>
          <div style={{position:"sticky",top:"1.5rem"}}><LetterPreview company={company} form={form} motif={form.motif}/></div>
        </div>
      </div>
    </div>
  );
}

// ── Pricing ──
function ViewPricing({ company, form, setView, onSuccess, resiliations }) {
  const [chosen,setChosen]=useState(null);
  const annuel=form.mensuel?(parseFloat(form.mensuel)*12).toFixed(2):null;
  const motifObj=MOTIFS.find(m=>m.value===form.motif);
  const plans=[
    {id:"pdf",price:"0,99 €",title:"Génération seule",emoji:"📄",desc:"Votre lettre officielle en PDF + instructions d'envoi.",features:["Lettre PDF haute qualité","Instructions LRAR détaillées","Valeur juridique garantie","Téléchargement immédiat"],badge:null},
    {id:"full",price:"9,99 €",title:"Full Service",emoji:"🚀",desc:"On s'occupe de tout : génération + envoi LRAR en votre nom.",features:["Tout du pack PDF","Envoi LRAR via API La Poste","Accusé de réception inclus","Suivi en temps réel","Support prioritaire"],badge:"Recommandé"},
  ];
  return (
    <div style={{background:C.bg,minHeight:"100vh"}}>
      <AppNav setView={setView} resiliations={resiliations} onDashboard={()=>setView("dashboard")}/>
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"2rem"}}>
        <Stepper step={4}/>
        <div style={{textAlign:"center",marginBottom:"2rem"}}><h2 style={{fontSize:"clamp(1.6rem,4vw,2.5rem)",fontWeight:900,letterSpacing:"-0.04em",color:C.navy,marginBottom:"8px"}}>Débloquez votre lettre</h2><p style={{fontSize:"14px",color:C.slate}}>Votre lettre sera prête en 30 secondes.</p></div>
        <div style={{background:C.navy,borderRadius:"14px",padding:"16px 20px",marginBottom:"2rem",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"12px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"12px"}}>
            <div style={{width:"38px",height:"38px",borderRadius:"10px",background:"rgba(0,255,65,.1)",border:"1px solid rgba(0,255,65,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:900,color:C.green}}>{(company?.nom||"XX").slice(0,2).toUpperCase()}</div>
            <div><p style={{fontSize:"12px",fontWeight:700,color:"white"}}>{company?.nom} — {motifObj?.label||"Résiliation"}</p><p style={{fontSize:"10px",color:"rgba(255,255,255,.45)"}}>{[form.prenom,form.nom].filter(Boolean).join(" ")} · Contrat {form.contrat||"—"}</p></div>
          </div>
          {annuel&&<div style={{textAlign:"right"}}><p style={{fontSize:"9px",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:C.green,marginBottom:"2px"}}>Économie potentielle</p><p style={{fontSize:"1.4rem",fontWeight:900,color:"white",letterSpacing:"-0.04em"}}>{annuel} € <span style={{fontSize:"11px",color:"rgba(255,255,255,.5)"}}>/an</span></p></div>}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px",marginBottom:"2rem"}}>
          {plans.map(p=>{const sel=chosen===p.id;return(
            <div key={p.id} onClick={()=>setChosen(p.id)} style={{padding:"24px",borderRadius:"16px",cursor:"pointer",border:`2px solid ${sel?C.navy:C.border}`,background:sel?C.navy:C.white,transform:sel?"translateY(-4px)":"none",boxShadow:sel?"0 20px 50px rgba(10,25,47,.3)":"0 2px 12px rgba(10,25,47,.04)",transition:"all .25s cubic-bezier(.16,1,.3,1)",position:"relative"}}>
              {p.badge&&<div style={{position:"absolute",top:"12px",right:"12px",padding:"1px 8px",borderRadius:"999px",fontSize:"9px",fontWeight:800,background:sel?"rgba(255,255,255,.12)":"#F0FDF4",color:sel?"rgba(255,255,255,.8)":C.navy}}>{p.badge}</div>}
              <div style={{fontSize:"24px",marginBottom:"10px"}}>{p.emoji}</div>
              <p style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:sel?"rgba(255,255,255,.5)":C.muted,marginBottom:"4px"}}>{p.title}</p>
              <p style={{fontSize:"2rem",fontWeight:900,letterSpacing:"-0.04em",color:sel?"white":C.navy,marginBottom:"8px"}}>{p.price}</p>
              <p style={{fontSize:"12px",color:sel?"rgba(255,255,255,.6)":C.slate,lineHeight:1.5,marginBottom:"16px"}}>{p.desc}</p>
              <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>{p.features.map((f,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:"8px"}}><span style={{color:sel?C.green:"#22C55E",flexShrink:0}}><Icon d={P.check} s={13} w={2.5}/></span><span style={{fontSize:"12px",color:sel?"rgba(255,255,255,.75)":"#374151",fontWeight:500}}>{f}</span></div>)}</div>
            </div>
          );})}
        </div>
        <div style={{background:"#F0F9FF",borderRadius:"12px",border:"1.5px solid #BAE6FD",padding:"16px 20px",marginBottom:"2rem"}}>
          <div style={{display:"flex",gap:"12px"}}><span style={{fontSize:"20px",flexShrink:0}}>⚖️</span><div><p style={{fontSize:"12px",fontWeight:800,color:"#0C4A6E",marginBottom:"6px"}}>Vos Droits — Article L215-1 du Code de la consommation</p><p style={{fontSize:"11.5px",color:"#0369A1",lineHeight:1.6}}>Tout consommateur peut résilier son contrat sans pénalité ni frais après la première période. Cette disposition est d'ordre public.</p></div></div>
        </div>
        <div style={{display:"flex",gap:"8px"}}>
          <Btn variant="secondary" onClick={()=>setView("motif")}><Icon d={P.left} s={13}/> Retour</Btn>
          <Btn variant="green" onClick={()=>chosen&&onSuccess(chosen)} disabled={!chosen} style={{flex:1,fontSize:"12px"}}>
            <Icon d={P.lock} s={14}/> {chosen?`Payer ${plans.find(p=>p.id===chosen)?.price}`:"Sélectionnez une formule"}
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ── Success ──
function ViewSuccess({ company, form, pack, setView }) {
  const annuel=form.mensuel?(parseFloat(form.mensuel)*12).toFixed(2):null;
  const [count,setCount]=useState(0);
  useEffect(()=>{if(!annuel)return;const target=parseFloat(annuel),step=target/60;const t=setInterval(()=>setCount(c=>{const n=c+step;if(n>=target){clearInterval(t);return target;}return n;}),20);return()=>clearInterval(t);},[annuel]);
  return (
    <div style={{background:C.bg,minHeight:"100vh"}}>
      <AppNav setView={setView} resiliations={[]} onDashboard={()=>setView("dashboard")}/>
      <div style={{maxWidth:"680px",margin:"0 auto",padding:"3rem 2rem",textAlign:"center"}}>
        <div style={{width:"80px",height:"80px",borderRadius:"50%",background:`linear-gradient(135deg,${C.navy},#1e3a5f)`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1.5rem",boxShadow:"0 12px 40px rgba(10,25,47,.3)",fontSize:"32px"}}>✅</div>
        <h1 style={{fontSize:"2rem",fontWeight:900,letterSpacing:"-0.04em",color:C.navy,marginBottom:"10px"}}>Lettre générée !</h1>
        <p style={{fontSize:"15px",color:C.slate,marginBottom:"2.5rem",lineHeight:1.6}}>{pack==="full"?"Votre lettre LRAR est en route — accusé de réception par email.":"Votre PDF est prêt à télécharger et envoyer."}</p>
        {annuel&&<div style={{background:C.navy,borderRadius:"20px",padding:"2rem",marginBottom:"1.5rem",position:"relative",overflow:"hidden"}}><div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 60% at 50% 0%,rgba(0,255,65,.08),transparent)"}}/><div style={{position:"relative",zIndex:1}}><p style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,.4)",marginBottom:"10px"}}>💰 Économies réalisées</p><p style={{fontSize:"3.5rem",fontWeight:900,letterSpacing:"-0.05em",color:C.green}}>{count.toFixed(0)} €</p><p style={{fontSize:"13px",color:"rgba(255,255,255,.5)",marginTop:"4px"}}>sur 12 mois · {form.mensuel} €/mois × 12</p></div></div>}
        <div style={{background:C.white,borderRadius:"12px",border:`1px solid ${C.border}`,padding:"20px",marginBottom:"1.5rem",textAlign:"left"}}>
          <p style={{fontSize:"11px",fontWeight:700,letterSpacing:"0.15em",textTransform:"uppercase",color:C.muted,marginBottom:"12px"}}>Récapitulatif</p>
          {[["Entreprise",company?.nom],["Formule",pack==="full"?"Full Service (9,99 €)":"Génération seule (0,99 €)"],["Motif",MOTIFS.find(m=>m.value===form.motif)?.label||"—"],["Titulaire",`${form.prenom} ${form.nom}`.trim()||"—"],["Contrat",form.contrat||"—"]].map(([k,v])=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",paddingBottom:"8px",borderBottom:`1px solid ${C.border}`,marginBottom:"8px"}}><span style={{fontSize:"12px",color:C.muted,fontWeight:500}}>{k}</span><span style={{fontSize:"12px",color:C.navy,fontWeight:700}}>{v}</span></div>
          ))}
        </div>
        <Btn variant="green" onClick={()=>setView("dashboard")} style={{width:"100%",fontSize:"12px"}}><Icon d={P.chart} s={15}/> Voir mon espace & historique</Btn>
      </div>
    </div>
  );
}

// ── Dashboard ──
const ST = {"En cours":{bg:"#FEF3C7",text:"#92400E"},"Envoyé":{bg:"#DBEAFE",text:"#1D4ED8"},"Résilié":{bg:"#DCFCE7",text:"#166534"}};

function ViewDashboard({ resiliations, setView, onNew, onStatusChange }) {
  const totalEco=resiliations.reduce((s,r)=>s+(parseFloat(r.mensuel)||0)*12,0);
  const [eco,setEco]=useState(0);
  useEffect(()=>{if(!totalEco)return;const step=totalEco/80;const t=setInterval(()=>setEco(c=>{const n=c+step;if(n>=totalEco){clearInterval(t);return totalEco;}return n;}),15);return()=>clearInterval(t);},[totalEco]);
  return (
    <div style={{background:C.bg,minHeight:"100vh"}}>
      <AppNav setView={setView} resiliations={resiliations} onDashboard={()=>setView("dashboard")}/>
      <div style={{maxWidth:"1100px",margin:"0 auto",padding:"2.5rem 2rem"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"2rem",flexWrap:"wrap",gap:"12px"}}>
          <div><p style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:C.muted,marginBottom:"4px"}}>Mon espace</p><h1 style={{fontSize:"2rem",fontWeight:900,letterSpacing:"-0.04em",color:C.navy}}>Tableau de bord</h1></div>
          <Btn variant="green" onClick={onNew}><Icon d={P.right} s={13}/> Nouvelle résiliation</Btn>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"12px",marginBottom:"1.75rem"}}>
          <div style={{background:C.navy,borderRadius:"14px",padding:"20px",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:0,right:0,width:"120px",height:"120px",background:"radial-gradient(circle,rgba(0,255,65,.07),transparent 70%)",transform:"translate(20%,-20%)"}}/>
            <p style={{fontSize:"9px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,.4)",marginBottom:"8px"}}>💰 Économies totales</p>
            <p style={{fontSize:"2.2rem",fontWeight:900,letterSpacing:"-0.05em",color:C.green}}>{Math.round(eco)} €</p>
            <p style={{fontSize:"10px",color:"rgba(255,255,255,.35)",marginTop:"4px"}}>sur 12 mois estimés</p>
          </div>
          <div style={{background:C.white,borderRadius:"14px",border:`1px solid ${C.border}`,padding:"20px"}}>
            <p style={{fontSize:"9px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:C.muted,marginBottom:"4px"}}>Résiliations</p>
            <p style={{fontSize:"2.2rem",fontWeight:900,letterSpacing:"-0.05em",color:C.navy}}>{resiliations.length}</p>
            <p style={{fontSize:"10px",color:C.muted}}>dont {resiliations.filter(r=>r.status==="Résilié").length} confirmées</p>
          </div>
          <div style={{background:C.white,borderRadius:"14px",border:`1px solid ${C.border}`,padding:"20px"}}>
            <p style={{fontSize:"9px",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:C.muted,marginBottom:"4px"}}>En attente</p>
            <p style={{fontSize:"2.2rem",fontWeight:900,letterSpacing:"-0.05em",color:C.navy}}>{resiliations.filter(r=>r.status!=="Résilié").length}</p>
            <p style={{fontSize:"10px",color:C.muted}}>en cours de traitement</p>
          </div>
        </div>
        {resiliations.length>=3&&(
          <div style={{marginBottom:"1.75rem"}}>
            <p style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:C.muted,marginBottom:"12px"}}>🏆 Badges débloqués</p>
            <div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>
              <div style={{display:"flex",alignItems:"center",gap:"12px",padding:"14px 18px",background:`linear-gradient(135deg,${C.navy},#1e3a5f)`,borderRadius:"14px",boxShadow:"0 8px 24px rgba(10,25,47,.3)"}}><span style={{fontSize:"22px"}}>🗡️</span><div><p style={{fontSize:"13px",fontWeight:900,color:"white"}}>Serial Killer de Contrats</p><p style={{fontSize:"10px",color:C.green,fontWeight:700}}>3+ résiliations effectuées</p></div></div>
              {resiliations.length>=5&&<div style={{display:"flex",alignItems:"center",gap:"12px",padding:"14px 18px",background:"linear-gradient(135deg,#7C3AED,#5B21B6)",borderRadius:"14px",boxShadow:"0 8px 24px rgba(124,58,237,.3)"}}><span style={{fontSize:"22px"}}>👑</span><div><p style={{fontSize:"13px",fontWeight:900,color:"white"}}>Contract Assassin</p><p style={{fontSize:"10px",color:"#DDD6FE",fontWeight:700}}>5+ résiliations — élite</p></div></div>}
            </div>
          </div>
        )}
        <p style={{fontSize:"10px",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:C.muted,marginBottom:"12px"}}>Historique des résiliations</p>
        {resiliations.length===0?(
          <div style={{textAlign:"center",padding:"3rem 2rem",border:`2px dashed ${C.border}`,borderRadius:"14px"}}>
            <p style={{fontSize:"2rem",marginBottom:"10px"}}>📭</p>
            <p style={{fontWeight:700,color:C.navy,marginBottom:"6px"}}>Aucune résiliation pour l'instant</p>
            <p style={{fontSize:"13px",color:C.muted,marginBottom:"20px"}}>Commencez dès maintenant — c'est rapide.</p>
            <Btn onClick={onNew} variant="primary">Résilier mon premier contrat</Btn>
          </div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
            {resiliations.map((r,i)=>(
              <div key={r.id||i} style={{display:"flex",alignItems:"center",gap:"14px",padding:"14px 16px",background:C.white,borderRadius:"12px",border:`1px solid ${C.border}`,boxShadow:"0 1px 4px rgba(10,25,47,.04)"}}>
                <div style={{width:"36px",height:"36px",borderRadius:"9px",background:"#F1F5F9",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:900,color:"#475569",flexShrink:0}}>{(r.company||"XX").slice(0,2).toUpperCase()}</div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",marginBottom:"2px"}}>
                    <p style={{fontSize:"13px",fontWeight:700,color:C.navy}}>{r.company||"—"}</p>
                    {r.motifLabel&&<span style={{padding:"1px 8px",borderRadius:"999px",background:"#F1F5F9",color:C.muted,fontSize:"9px",fontWeight:800}}>{r.motifLabel}</span>}
                    {r.pack==="full"&&<span style={{padding:"1px 8px",borderRadius:"999px",background:"#DBEAFE",color:"#1D4ED8",fontSize:"9px",fontWeight:800}}>LRAR</span>}
                  </div>
                  <p style={{fontSize:"11px",color:C.muted}}>{r.date} · {[r.prenom,r.nom].filter(Boolean).join(" ")||"—"}</p>
                </div>
                {r.mensuel&&parseFloat(r.mensuel)>0&&<div style={{textAlign:"right",flexShrink:0}}><p style={{fontSize:"9px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",color:"#166534",marginBottom:"2px"}}>Éco/an</p><p style={{fontSize:"15px",fontWeight:900,color:"#166534",letterSpacing:"-0.03em"}}>{(parseFloat(r.mensuel)*12).toFixed(0)} €</p></div>}
                <select value={r.status||"En cours"} onChange={e=>onStatusChange(r.id,e.target.value)} style={{padding:"5px 10px",borderRadius:"999px",fontSize:"10px",fontWeight:700,border:"none",cursor:"pointer",fontFamily:"inherit",outline:"none",background:ST[r.status||"En cours"]?.bg||"#F1F5F9",color:ST[r.status||"En cours"]?.text||C.navy}}>
                  {["En cours","Envoyé","Résilié"].map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  ROOT
// ════════════════════════════════════════════════════════════════

export default function App() {
  const [view, setView] = useState("landing");
  const [company, setCompany] = useState(null);
  const [form, setForm] = useState({ prenom:"", nom:"", adresse:"", cp:"", ville:"", email:"", contrat:"", motif:"", mensuel:"" });
  const [file, setFile] = useState(null);
  const [pack, setPack] = useState(null);
  const [resiliations, setResiliations] = useState(loadRes);

  const handleSelect = (co) => { setCompany(co); setView("coords"); };

  const handleSuccess = (chosenPack) => {
    setPack(chosenPack);
    const motifObj = MOTIFS.find(m=>m.value===form.motif);
    const updated = addRes({ company:company?.nom, cat:company?.cat, prenom:form.prenom, nom:form.nom, contrat:form.contrat, mensuel:form.mensuel, motifLabel:motifObj?.label, pack:chosenPack });
    setResiliations(updated);
    setView("success");
  };

  const handleStatusChange = (id, status) => {
    const updated = resiliations.map(r=>r.id===id?{...r,status}:r);
    setResiliations(updated); saveRes(updated);
  };

  const reset = () => {
    setCompany(null);
    setForm({ prenom:"", nom:"", adresse:"", cp:"", ville:"", email:"", contrat:"", motif:"", mensuel:"" });
    setFile(null); setPack(null); setView("landing");
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      {view==="landing"   && <PageLanding    setView={setView} onSelect={handleSelect}/>}
      {view==="catalogue"  && <PageCatalogue  setView={setView} onSelect={handleSelect}/>}
      {view==="comment"   && <PageComment    setView={setView}/>}
      {view==="tarifs"    && <PageTarifs     setView={setView}/>}
      {view==="securite"  && <PageSecurite   setView={setView}/>}
      {view==="coords"    && <ViewCoordonnees company={company} form={form} setForm={setForm} setView={setView} resiliations={resiliations}/>}
      {view==="motif"     && <ViewMotif      company={company} form={form} setForm={setForm} file={file} setFile={setFile} setView={setView} resiliations={resiliations}/>}
      {view==="pricing"   && <ViewPricing    company={company} form={form} setView={setView} onSuccess={handleSuccess} resiliations={resiliations}/>}
      {view==="success"   && <ViewSuccess    company={company} form={form} pack={pack} setView={setView}/>}
      {view==="dashboard" && <ViewDashboard  resiliations={resiliations} setView={setView} onNew={reset} onStatusChange={handleStatusChange}/>}
    </>
  );
}
