import { useState, useEffect, useRef } from "react";

// ════════════════════════════════════════════════════════════════
//  CONSTANTS & DATA
// ════════════════════════════════════════════════════════════════

const COMPANIES = [
  { id:"tc-01",nom:"Orange",      cat:"Télécom",  logo:"https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg" },
  { id:"tc-02",nom:"SFR",         cat:"Télécom",  logo:"https://upload.wikimedia.org/wikipedia/commons/b/be/SFR_logo.svg" },
  { id:"tc-03",nom:"Bouygues",    cat:"Télécom",  logo:"https://upload.wikimedia.org/wikipedia/commons/c/ce/Bouygues_Telecom_2015.svg" },
  { id:"tc-04",nom:"Free",        cat:"Télécom",  logo:"https://upload.wikimedia.org/wikipedia/commons/b/bd/Free_logo.svg" },
  { id:"tc-10",nom:"Canal+",      cat:"Télécom",  logo:"https://upload.wikimedia.org/wikipedia/commons/2/27/Canal%2B.svg" },
  { id:"sp-01",nom:"Basic-Fit",   cat:"Sport",    logo:"https://upload.wikimedia.org/wikipedia/commons/4/4b/Basic-Fit_Logo.svg" },
  { id:"sp-04",nom:"Neoness",     cat:"Sport",    logo:"https://upload.wikimedia.org/wikipedia/fr/5/52/Logo_Neoness.png" },
  { id:"as-01",nom:"AXA",         cat:"Assurance",logo:"https://upload.wikimedia.org/wikipedia/commons/9/94/AXA_Logo.svg" },
  { id:"as-03",nom:"Allianz",     cat:"Assurance",logo:"https://upload.wikimedia.org/wikipedia/commons/d/d4/Allianz_Logo.svg" },
  { id:"as-05",nom:"MAIF",        cat:"Assurance",logo:"https://upload.wikimedia.org/wikipedia/commons/3/3d/Logo_MAIF.svg" },
  { id:"en-01",nom:"EDF",         cat:"Énergie",  logo:"https://upload.wikimedia.org/wikipedia/commons/1/12/EDF_logo.svg" },
  { id:"en-02",nom:"Engie",       cat:"Énergie",  logo:"https://upload.wikimedia.org/wikipedia/commons/c/c3/Engie_logo.svg" },
  { id:"ps-04",nom:"Netflix",     cat:"Streaming",logo:"https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { id:"ps-07",nom:"Spotify",     cat:"Streaming",logo:"https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" },
  { id:"ps-05",nom:"Disney+",     cat:"Streaming",logo:"https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg" },
  { id:"dv-03",nom:"Verisure",    cat:"Divers",   logo:null },
  { id:"dv-04",nom:"Nespresso",   cat:"Divers",   logo:null },
];

const FEATURED = ["tc-01","tc-02","tc-03","tc-04","sp-01","as-01","en-01","ps-04"];

const MOTIFS = [
  { value:"hamon",  icon:"🔓", label:"Résiliation libre",  badge:"Loi Hamon",    badgeC:"#1D4ED8", badgeBg:"#DBEAFE", desc:"Après 12 mois d'engagement, sans frais ni justification.", loi:"Art. L.215-1 Code de la consommation" },
  { value:"chatel", icon:"📈", label:"Hausse de tarif",    badge:"Loi Chatel",   badgeC:"#166534", badgeBg:"#DCFCE7", desc:"Résiliation gratuite suite à toute augmentation unilatérale.", loi:"Loi n° 2005-67 — Art. L.221-13 Code de la consommation" },
  { value:"demena", icon:"🏠", label:"Déménagement",       badge:"Art. L.224-28",badgeC:"#334155", badgeBg:"#F1F5F9", desc:"Résiliation anticipée sans frais hors zone couverte.", loi:"Art. L.224-28 Code de la consommation" },
  { value:"emploi", icon:"💼", label:"Perte d'emploi",     badge:"Force majeure", badgeC:"#92400E", badgeBg:"#FEF3C7", desc:"Force majeure : résiliation pour motif économique sérieux.", loi:"Art. 1218 Code civil" },
];

const CAT_COLORS = {
  Télécom:   { bg:"#EFF6FF", text:"#1D4ED8", dot:"#3B82F6" },
  Sport:     { bg:"#F0FDF4", text:"#166534", dot:"#22C55E" },
  Assurance: { bg:"#FFF7ED", text:"#9A3412", dot:"#F97316" },
  Énergie:   { bg:"#FEFCE8", text:"#854D0E", dot:"#EAB308" },
  Streaming: { bg:"#FDF4FF", text:"#701A75", dot:"#D946EF" },
  Divers:    { bg:"#F8FAFC", text:"#334155", dot:"#94A3B8" },
};

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

const LS_KEY = "kc_resiliations_v2";
function loadResiliations() { try { return JSON.parse(localStorage.getItem(LS_KEY)||"[]"); } catch { return []; } }
function saveResiliations(list) { try { localStorage.setItem(LS_KEY, JSON.stringify(list)); } catch {} }
function addResilitation(entry) {
  const list = loadResiliations();
  list.unshift({ ...entry, id:Date.now(), date:new Date().toLocaleDateString("fr-FR"), status:"En cours" });
  saveResiliations(list);
  return list;
}

// ════════════════════════════════════════════════════════════════
//  DESIGN TOKENS
// ════════════════════════════════════════════════════════════════

const C = { navy:"#0A192F", green:"#00FF41", bg:"#F2F4F7", white:"#FFFFFF", slate:"#64748B", border:"#E2E8F0", muted:"#94A3B8" };

const T = {
  label:       { fontSize:"10px", fontWeight:700, letterSpacing:"0.16em", textTransform:"uppercase", color:C.muted, marginBottom:"5px", display:"block" },
  sectionTitle:{ fontSize:"10px", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:C.muted, marginBottom:"16px" },
  card:        { background:C.white, borderRadius:"12px", border:`1px solid ${C.border}`, padding:"20px" },
};

// ════════════════════════════════════════════════════════════════
//  MICRO COMPONENTS
// ════════════════════════════════════════════════════════════════

const Icon = ({ d, s=16, w=2 }) => (
  <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={w}>
    <path strokeLinecap="round" strokeLinejoin="round" d={d}/>
  </svg>
);

const PATHS = {
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
  cal:    "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
};

function Btn({ children, onClick, variant="primary", disabled=false, style={} }) {
  const base = { display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", border:"none", cursor:disabled?"not-allowed":"pointer", fontFamily:"inherit", fontWeight:800, letterSpacing:"0.12em", textTransform:"uppercase", transition:"all .18s", borderRadius:"9px", fontSize:"11px", padding:"11px 20px" };
  const vars = {
    primary:  { background:disabled?"#E2E8F0":C.navy, color:disabled?"#94A3B8":"white", boxShadow:disabled?"none":"0 4px 16px rgba(10,25,47,.22)" },
    secondary:{ background:C.white, color:C.slate, border:`1.5px solid ${C.border}` },
    green:    { background:disabled?"#E2E8F0":C.green, color:disabled?"#94A3B8":C.navy, boxShadow:disabled?"none":"0 4px 20px rgba(0,255,65,.35)", fontWeight:900 },
  };
  return <button onClick={disabled?undefined:onClick} style={{...base,...vars[variant],...style}}>{children}</button>;
}

function TField({ value, onChange, placeholder, type="text" }) {
  const [f, setF] = useState(false);
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      onFocus={()=>setF(true)} onBlur={()=>setF(false)}
      style={{ width:"100%", padding:"9px 12px", borderRadius:"8px", fontSize:"13px", fontWeight:400, border:`1px solid ${f?"#94A3B8":C.border}`, background:C.white, outline:"none", fontFamily:"inherit", color:C.navy, boxSizing:"border-box", transition:"border-color .15s" }}/>
  );
}

function Badge({ children, color="#334155", bg="#F1F5F9" }) {
  return <span style={{ padding:"1px 8px", borderRadius:"999px", fontSize:"9px", fontWeight:800, letterSpacing:"0.08em", background:bg, color, whiteSpace:"nowrap" }}>{children}</span>;
}

// ════════════════════════════════════════════════════════════════
//  NAV
// ════════════════════════════════════════════════════════════════

function Nav({ view, onDashboard, resiliations }) {
  return (
    <div style={{ background:C.white, borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:100 }}>
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"13px 2rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"9px", cursor:"pointer" }} onClick={()=>window.location.reload()}>
          <div style={{ width:"28px", height:"28px", background:C.navy, borderRadius:"5px", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ width:"2.5px", height:"13px", background:C.green, borderRadius:"2px", transform:"rotate(12deg)" }}/>
          </div>
          <span style={{ fontWeight:900, letterSpacing:"-0.04em", fontSize:"0.95rem", textTransform:"uppercase", color:C.navy }}>Kill‑Contract</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          {resiliations.length > 0 && (
            <button onClick={onDashboard} style={{ display:"flex", alignItems:"center", gap:"6px", padding:"7px 14px", borderRadius:"8px", border:`1px solid ${C.border}`, background:view==="dashboard"?C.navy:C.white, color:view==="dashboard"?"white":C.slate, fontSize:"11px", fontWeight:700, cursor:"pointer", fontFamily:"inherit", transition:"all .18s" }}>
              <Icon d={PATHS.chart} s={13}/>
              Mon espace
              <span style={{ background:view==="dashboard"?"rgba(0,255,65,.2)":"#EFF6FF", color:view==="dashboard"?C.green:"#1D4ED8", padding:"1px 6px", borderRadius:"999px", fontSize:"9px", fontWeight:800 }}>{resiliations.length}</span>
            </button>
          )}
          <div style={{ width:"32px", height:"32px", borderRadius:"50%", background:"#F1F5F9", border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", color:C.muted }}>
            <Icon d={PATHS.user} s={15}/>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  STEPPER
// ════════════════════════════════════════════════════════════════

function Stepper({ step }) {
  const steps = ["Entreprise","Coordonnées","Motif & Préavis","Paiement"];
  return (
    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"center", gap:0, marginBottom:"2.5rem" }}>
      {steps.map((s,i) => {
        const done=i+1<step, active=i+1===step;
        return (
          <div key={i} style={{ display:"flex", alignItems:"center" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"5px" }}>
              <div style={{ width:"34px", height:"34px", borderRadius:"50%", background:done?"#22C55E":active?C.navy:"white", border:`2px solid ${done?"#22C55E":active?C.navy:"#D1D5DB"}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:800, color:(done||active)?"white":"#D1D5DB" }}>
                {done ? <Icon d={PATHS.check} s={15} w={3}/> : i+1}
              </div>
              <span style={{ fontSize:"9px", fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:active?C.navy:done?"#6B7280":"#D1D5DB", whiteSpace:"nowrap" }}>{s}</span>
            </div>
            {i<3 && <div style={{ width:"68px", height:"2px", margin:"0 4px 18px", background:done?C.navy:"#E5E7EB", borderRadius:"2px" }}/>}
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  LETTER PREVIEW
// ════════════════════════════════════════════════════════════════

function LetterPreview({ company, form, motif }) {
  const today = new Date().toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"});
  const motifObj = MOTIFS.find(m=>m.value===motif);
  const body = LEGAL_BODY(motif, form);
  const lines = (company?.adresse||"").split(",");
  return (
    <div>
      <p style={T.sectionTitle}>Aperçu sécurisé</p>
      <div style={{ background:C.white, borderRadius:"12px", border:"1px solid #E4E9EF", boxShadow:"0 2px 6px rgba(10,25,47,.04), 0 16px 48px rgba(10,25,47,.09)", overflow:"hidden" }}>
        <div style={{ padding:"18px 20px 0" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"12px" }}>
            <div style={{ display:"flex", gap:"10px" }}>
              <div style={{ width:"32px", height:"32px", borderRadius:"7px", background:"#F1F5F9", border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", fontWeight:900, color:"#475569", flexShrink:0 }}>
                {(company?.nom||"XX").slice(0,2).toUpperCase()}
              </div>
              <div>
                <p style={{ fontSize:"12px", fontWeight:700, color:C.navy, marginBottom:"2px" }}>{company?.nom||"Entreprise"} — Service Résiliation</p>
                {lines.slice(0,2).map((l,i)=><p key={i} style={{ fontSize:"10px", color:C.muted, lineHeight:"1.6" }}>{l.trim()}</p>)}
              </div>
            </div>
            <div style={{ textAlign:"right", flexShrink:0 }}>
              <p style={{ fontSize:"10px", color:C.muted }}>Paris, {today}</p>
              <p style={{ fontSize:"9px", fontWeight:700, color:"#CBD5E1", letterSpacing:"0.1em", marginTop:"2px" }}>LRAR</p>
            </div>
          </div>
          {motifObj && <div style={{ marginBottom:"10px" }}><Badge color="#166534" bg="#DCFCE7">✦ {motifObj.badge} appliqué</Badge></div>}
          <p style={{ fontSize:"12px", fontWeight:700, color:C.navy, marginBottom:"14px" }}>Objet : Demande de résiliation de contrat</p>
          <div style={{ position:"relative", minHeight:"180px", overflow:"hidden" }}>
            <div style={{ filter:"blur(4px)", userSelect:"none", pointerEvents:"none", fontSize:"11px", lineHeight:"1.8", color:"#374151", position:"relative" }}>
              {[0,1,2].map(i=>(
                <div key={i} style={{ position:"absolute", top:`${8+i*36}%`, left:"-5%", fontSize:"36px", fontWeight:900, color:"rgba(10,25,47,.04)", transform:"rotate(-30deg)", whiteSpace:"nowrap", letterSpacing:"0.2em", userSelect:"none", pointerEvents:"none" }}>BROUILLON</div>
              ))}
              <div style={{ position:"relative", zIndex:1 }}>{body.split("\n\n").map((p,i)=><p key={i} style={{ marginBottom:"9px" }}>{p}</p>)}</div>
            </div>
          </div>
        </div>
        <div style={{ padding:"12px 20px", borderTop:`1px solid #F1F5F9`, display:"flex", justifyContent:"center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", padding:"7px 16px", borderRadius:"999px", border:`1px solid ${C.border}`, background:C.white, fontSize:"11px", fontWeight:600, color:C.slate }}>
            <Icon d={PATHS.lock} s={12}/> Contenu protégé — complétez les étapes
          </div>
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"7px", marginTop:"10px" }}>
        {["Loi Hamon / Chatel","Code conso. 2024","PDF immédiat","Recommandé AR"].map(t=>(
          <div key={t} style={{ display:"flex", alignItems:"center", gap:"7px", padding:"8px 11px", background:C.white, border:`1px solid #E8ECF0`, borderRadius:"8px" }}>
            <span style={{ color:"#22C55E", flexShrink:0 }}><Icon d={PATHS.check} s={12} w={2.5}/></span>
            <span style={{ fontSize:"11px", fontWeight:600, color:"#475569" }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  VIEW 1 : COMPANY SELECTOR
// ════════════════════════════════════════════════════════════════

function ViewSelector({ onSelect }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("Tous");
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState(null);
  const [logoErr, setLogoErr] = useState({});
  const cats = ["Tous","Télécom","Sport","Assurance","Énergie","Streaming","Divers"];
  const active = search||cat!=="Tous";
  const list = COMPANIES.filter(c=>c.nom.toLowerCase().includes(search.toLowerCase())&&(cat==="Tous"||c.cat===cat));
  const display = active||showAll ? list : list.filter(c=>FEATURED.includes(c.id));

  return (
    <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"2.5rem 2rem" }}>
      <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:"7px", padding:"4px 14px", borderRadius:"999px", background:C.white, border:`1px solid ${C.border}`, boxShadow:"0 2px 8px rgba(10,25,47,.05)", marginBottom:"1.25rem" }}>
          <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#22C55E" }}/>
          <span style={{ fontSize:"10px", fontWeight:800, letterSpacing:"0.2em", textTransform:"uppercase", color:C.muted }}>Étape 01 — Sélection</span>
        </div>
        <h1 style={{ fontSize:"clamp(2.5rem,7vw,4.5rem)", fontWeight:900, letterSpacing:"-0.04em", lineHeight:.95, marginBottom:"1rem", color:C.navy }}>
          Qui voulez-vous<br/><span style={{ WebkitTextStroke:`2px ${C.navy}`, color:"transparent" }}>quitter</span> ?
        </h1>
        <p style={{ fontSize:"1rem", color:C.slate, maxWidth:"440px", margin:"0 auto", lineHeight:1.6 }}>Résiliation immédiate, légale et sans effort.</p>
      </div>

      <div style={{ maxWidth:"580px", margin:"0 auto 1.75rem" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px", background:C.white, borderRadius:"12px", padding:"8px 8px 8px 16px", border:`1.5px solid ${C.border}`, boxShadow:"0 4px 20px rgba(10,25,47,.06)" }}>
          <span style={{ color:"#CBD5E1", flexShrink:0 }}><Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" s={18}/></span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher une entreprise à résilier…" style={{ flex:1, border:"none", outline:"none", fontSize:"14px", fontWeight:500, color:C.navy, background:"transparent", fontFamily:"inherit" }}/>
          {search && <button onClick={()=>setSearch("")} style={{ color:C.muted, background:"none", border:"none", cursor:"pointer", padding:"2px" }}><Icon d={PATHS.x} s={14}/></button>}
        </div>
      </div>

      <div style={{ display:"flex", gap:"7px", flexWrap:"wrap", justifyContent:"center", marginBottom:"2rem" }}>
        {cats.map(c=>{
          const isA=cat===c; const cc=c!=="Tous"?CAT_COLORS[c]:null;
          return (
            <button key={c} onClick={()=>setCat(c)} style={{ padding:"6px 14px", borderRadius:"999px", cursor:"pointer", fontSize:"11px", fontWeight:700, border:`1.5px solid ${isA?C.navy:C.border}`, background:isA?C.navy:cc?cc.bg:C.white, color:isA?"white":cc?cc.text:C.slate, transition:"all .18s", fontFamily:"inherit" }}>
              {c!=="Tous"&&cc&&<span style={{ display:"inline-block", width:"5px", height:"5px", borderRadius:"50%", background:isA?C.green:cc.dot, marginRight:"5px", verticalAlign:"middle" }}/>}
              {c}{c!=="Tous"&&<span style={{ marginLeft:"5px", fontSize:"9px", opacity:.6 }}>{COMPANIES.filter(x=>x.cat===c).length}</span>}
            </button>
          );
        })}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:"10px", marginBottom:"1.5rem" }}>
        {display.map(co=>{
          const isSel=selected?.id===co.id; const cc=CAT_COLORS[co.cat]||CAT_COLORS.Divers; const hasLogo=co.logo&&!logoErr[co.id];
          return (
            <div key={co.id} onClick={()=>setSelected(s=>s?.id===co.id?null:co)} style={{ padding:"1.25rem 0.75rem", borderRadius:"12px", cursor:"pointer", background:isSel?C.navy:C.white, border:`2px solid ${isSel?C.navy:C.border}`, transform:isSel?"translateY(-3px)":"none", boxShadow:isSel?"0 16px 40px rgba(10,25,47,.3)":"0 2px 8px rgba(10,25,47,.04)", transition:"all .25s cubic-bezier(.16,1,.3,1)", display:"flex", flexDirection:"column", alignItems:"center", gap:"10px", minHeight:"120px", position:"relative" }}>
              {isSel&&<div style={{ position:"absolute", top:"8px", right:"8px", width:"18px", height:"18px", borderRadius:"50%", background:C.green, display:"flex", alignItems:"center", justifyContent:"center" }}><Icon d={PATHS.check} s={10} w={4}/></div>}
              <div style={{ width:"64px", height:"34px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                {hasLogo ? (
                  <img src={co.logo} alt={co.nom} onError={()=>setLogoErr(e=>({...e,[co.id]:true}))} style={{ maxWidth:"64px", maxHeight:"32px", objectFit:"contain", filter:isSel?"brightness(0) invert(1)":"grayscale(100%)", opacity:isSel?.9:.6, transition:"all .25s" }}/>
                ) : (
                  <div style={{ width:"38px", height:"38px", borderRadius:"10px", background:isSel?"rgba(0,255,65,.12)":cc.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", fontWeight:900, color:isSel?C.green:cc.text }}>{co.nom.slice(0,2).toUpperCase()}</div>
                )}
              </div>
              <div style={{ textAlign:"center" }}>
                <p style={{ fontSize:"11px", fontWeight:800, textTransform:"uppercase", letterSpacing:"0.02em", color:isSel?"white":C.navy, marginBottom:"3px" }}>{co.nom}</p>
                <span style={{ fontSize:"9px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:isSel?"rgba(255,255,255,.45)":C.muted }}>
                  <span style={{ display:"inline-block", width:"4px", height:"4px", borderRadius:"50%", background:isSel?C.green:cc.dot, marginRight:"4px", verticalAlign:"middle" }}/>{co.cat}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {!active&&(
        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <button onClick={()=>setShowAll(v=>!v)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:"13.5px", color:C.slate, fontFamily:"inherit" }}>
            {showAll ? "← Réduire le catalogue" : <span><span style={{ opacity:.65 }}>{COMPANIES.length-FEATURED.length} autres sociétés disponibles</span> — <span style={{ fontWeight:700, color:C.navy, textDecoration:"underline", textDecorationThickness:"2px", textUnderlineOffset:"3px" }}>Voir tout le catalogue →</span></span>}
          </button>
        </div>
      )}

      {selected&&(
        <div style={{ background:C.navy, borderRadius:"16px", padding:"1.5rem", marginTop:"1rem", position:"relative", overflow:"hidden", boxShadow:"0 24px 60px rgba(10,25,47,.4)" }}>
          <div style={{ position:"absolute", top:0, right:0, width:"180px", height:"180px", background:"radial-gradient(circle,rgba(0,255,65,.06),transparent 70%)", borderRadius:"50%", transform:"translate(30%,-30%)" }}/>
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:"rgba(0,255,65,.1)", border:"1px solid rgba(0,255,65,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"15px", fontWeight:900, color:C.green }}>{selected.nom.slice(0,2).toUpperCase()}</div>
                <div>
                  <p style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(255,255,255,.35)", marginBottom:"2px" }}>Cible sélectionnée</p>
                  <h3 style={{ fontSize:"1.15rem", fontWeight:900, color:"white", letterSpacing:"-0.03em" }}>{selected.nom}</h3>
                </div>
              </div>
              <button onClick={()=>setSelected(null)} style={{ color:"rgba(255,255,255,.4)", background:"none", border:"1px solid rgba(255,255,255,.1)", borderRadius:"7px", padding:"5px", cursor:"pointer" }}><Icon d={PATHS.x} s={14}/></button>
            </div>
            <button onClick={()=>onSelect(selected)} style={{ width:"100%", marginTop:"1.25rem", padding:"13px", borderRadius:"10px", background:C.green, color:C.navy, border:"none", cursor:"pointer", fontSize:"11px", fontWeight:900, letterSpacing:"0.15em", textTransform:"uppercase", fontFamily:"inherit", boxShadow:"0 8px 24px rgba(0,255,65,.4)", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
              Initier la résiliation <Icon d={PATHS.right} s={14} w={2.5}/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  VIEW 2 : COORDONNÉES
// ════════════════════════════════════════════════════════════════

function ViewCoordonnees({ company, form, setForm, onBack, onNext }) {
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const ok = form.prenom&&form.nom&&form.adresse&&form.cp&&form.ville&&form.email&&form.contrat&&form.mensuel;
  return (
    <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"2rem 2rem" }}>
      <Stepper step={2}/>
      {company&&(
        <div style={{ marginBottom:"1.5rem" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"5px 14px 5px 5px", background:C.white, borderRadius:"999px", border:`1px solid ${C.border}` }}>
            <div style={{ width:"24px", height:"24px", borderRadius:"6px", background:"#F1F5F9", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"9px", fontWeight:900, color:"#475569" }}>{company.nom.slice(0,2).toUpperCase()}</div>
            <span style={{ fontSize:"12px", fontWeight:700, color:C.navy }}>{company.nom}</span>
            <span style={{ fontSize:"10px", color:C.muted }}>· {company.cat}</span>
          </div>
        </div>
      )}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2.5rem", alignItems:"start" }}>
        <div>
          <p style={T.sectionTitle}>02 — Vos coordonnées</p>
          <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
              <div><span style={T.label}>Prénom</span><TField value={form.prenom} onChange={e=>set("prenom",e.target.value)} placeholder="Jean"/></div>
              <div><span style={T.label}>Nom</span><TField value={form.nom} onChange={e=>set("nom",e.target.value)} placeholder="Dupont"/></div>
            </div>
            <div><span style={T.label}>Adresse</span><TField value={form.adresse} onChange={e=>set("adresse",e.target.value)} placeholder="12 rue de la Paix"/></div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
              <div><span style={T.label}>Code postal</span><TField value={form.cp} onChange={e=>set("cp",e.target.value)} placeholder="75001"/></div>
              <div><span style={T.label}>Ville</span><TField value={form.ville} onChange={e=>set("ville",e.target.value)} placeholder="Paris"/></div>
            </div>
            <div><span style={T.label}>Email</span><TField value={form.email} onChange={e=>set("email",e.target.value)} placeholder="jean@example.com" type="email"/></div>
            <div><span style={T.label}>N° de contrat</span><TField value={form.contrat} onChange={e=>set("contrat",e.target.value)} placeholder="Référence sur votre facture"/></div>
            <div style={{ background:"#FAFBFC", borderRadius:"10px", border:`1px solid ${C.border}`, padding:"14px" }}>
              <span style={T.label}>Prix mensuel de l'abonnement (€)</span>
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <TField value={form.mensuel} onChange={e=>set("mensuel",e.target.value.replace(/[^0-9.]/g,""))} placeholder="ex : 29.99"/>
                {form.mensuel&&parseFloat(form.mensuel)>0&&(
                  <div style={{ flexShrink:0, padding:"8px 14px", borderRadius:"8px", background:"#F0FDF4", border:"1px solid #BBF7D0", textAlign:"center" }}>
                    <p style={{ fontSize:"9px", fontWeight:700, color:"#166534", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"1px" }}>Économie/an</p>
                    <p style={{ fontSize:"16px", fontWeight:900, color:"#166534", letterSpacing:"-0.03em" }}>{(parseFloat(form.mensuel)*12).toFixed(0)} €</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div style={{ display:"flex", gap:"8px", marginTop:"20px" }}>
            <Btn variant="secondary" onClick={onBack}><Icon d={PATHS.left} s={13}/> Retour</Btn>
            <Btn variant="primary" onClick={onNext} disabled={!ok} style={{ flex:1 }}>{ok?"Continuer →":"Remplissez tous les champs"}</Btn>
          </div>
        </div>
        <div style={{ position:"sticky", top:"1.5rem" }}><LetterPreview company={company} form={form} motif={form.motif}/></div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  AI ANALYZER
// ════════════════════════════════════════════════════════════════

function ContractAnalyzer() {
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [fileName, setFileName] = useState("");
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef();

  const analyze = (f) => {
    if (!f) return;
    setFileName(f.name); setStatus("loading"); setProgress(0);
    const interval = setInterval(()=>setProgress(p=>{ if(p>=95){clearInterval(interval);return p;} return p+Math.random()*18; }),200);
    setTimeout(()=>{
      clearInterval(interval); setProgress(100);
      const findings = [
        { type:"success", icon:"🎯", title:"Loi Hamon détectée", detail:"Votre contrat a plus de 12 mois — vous pouvez résilier sans frais, sans justification, à tout moment.", law:"Art. L.215-1 Code de la consommation", savings:"Résiliation immédiate possible" },
        { type:"warning", icon:"📈", title:"Clause de hausse tarifaire détectée", detail:"Une augmentation de tarif a été appliquée sans accord — résiliation possible sous Loi Chatel.", law:"Art. L.221-13 Code de la consommation", savings:"Résiliation sans préavis possible" },
        { type:"success", icon:"🔓", title:"Engagement arrivé à terme", detail:"La période d'engagement est échue. Aucune pénalité pour résiliation immédiate.", law:"Art. L.224-33 Code de la consommation", savings:"0 € de pénalité" },
      ];
      setResult(findings[Math.floor(Math.random()*findings.length)]); setStatus("result");
    },2800);
  };

  return (
    <div style={{ ...T.card, marginBottom:"14px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" }}>
        <div style={{ width:"32px", height:"32px", borderRadius:"9px", background:`linear-gradient(135deg,${C.navy},#1e3a5f)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon d={PATHS.spark} s={16} w={2.5}/>
        </div>
        <div>
          <p style={{ fontSize:"13px", fontWeight:800, color:C.navy, letterSpacing:"-0.01em" }}>Analyseur de Contrat IA</p>
          <p style={{ fontSize:"10px", color:C.muted }}>Détecte automatiquement vos droits de résiliation</p>
        </div>
        <span style={{ marginLeft:"auto", padding:"2px 9px", borderRadius:"999px", fontSize:"9px", fontWeight:800, background:"linear-gradient(90deg,#DBEAFE,#EDE9FE)", color:"#1D4ED8" }}>IA</span>
      </div>

      {status==="idle"&&(
        <div onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);analyze(e.dataTransfer.files[0])}} onClick={()=>fileRef.current?.click()} style={{ border:`2px dashed ${drag?"#94A3B8":C.border}`, borderRadius:"10px", padding:"24px 16px", textAlign:"center", cursor:"pointer", background:drag?"#F8FAFC":"#FAFBFC" }}>
          <div style={{ color:"#CBD5E1", display:"flex", justifyContent:"center", marginBottom:"8px" }}><Icon d={PATHS.upload} s={26} w={1.5}/></div>
          <p style={{ fontSize:"13px", fontWeight:700, color:C.navy, marginBottom:"3px" }}>Analysez votre contrat pour trouver une faille</p>
          <p style={{ fontSize:"11px", color:"#3B82F6", fontWeight:500, marginBottom:"3px" }}>ou cliquez pour parcourir</p>
          <p style={{ fontSize:"10px", color:C.muted }}>PDF, JPG ou PNG — 10 Mo max</p>
          <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display:"none" }} onChange={e=>analyze(e.target.files[0])}/>
        </div>
      )}

      {status==="loading"&&(
        <div style={{ padding:"20px 0" }}>
          <p style={{ fontSize:"12px", fontWeight:600, color:C.navy, marginBottom:"12px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>📄 {fileName}</p>
          <div style={{ marginBottom:"8px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"5px" }}>
              <span style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:C.muted }}>Analyse en cours…</span>
              <span style={{ fontSize:"10px", fontWeight:800, color:C.navy }}>{Math.round(progress)}%</span>
            </div>
            <div style={{ height:"5px", background:"#F1F5F9", borderRadius:"999px", overflow:"hidden" }}>
              <div style={{ height:"100%", borderRadius:"999px", width:`${progress}%`, background:`linear-gradient(90deg,${C.navy},#3B82F6)`, transition:"width .2s" }}/>
            </div>
          </div>
          {["Lecture du document…","Analyse des clauses…","Vérification des lois…","Calcul de vos droits…"].map((s,i)=>{
            const done=progress>25*(i+1), active=progress>25*i&&progress<=25*(i+1);
            return (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"4px 0", opacity:done||active?1:.3 }}>
                <div style={{ width:"14px", height:"14px", borderRadius:"50%", background:done?"#22C55E":active?C.navy:"#E2E8F0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  {done&&<Icon d={PATHS.check} s={8} w={3}/>}
                </div>
                <span style={{ fontSize:"11px", color:done?"#166534":active?C.navy:C.muted, fontWeight:done||active?600:400 }}>{s}</span>
              </div>
            );
          })}
        </div>
      )}

      {status==="result"&&result&&(
        <div>
          <div style={{ padding:"14px 16px", borderRadius:"10px", background:result.type==="success"?"#F0FDF4":"#FFFBEB", border:`1.5px solid ${result.type==="success"?"#86EFAC":"#FCD34D"}`, marginBottom:"10px" }}>
            <div style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
              <span style={{ fontSize:"20px", flexShrink:0 }}>{result.icon}</span>
              <div>
                <p style={{ fontSize:"13px", fontWeight:800, color:C.navy, marginBottom:"4px" }}>{result.title}</p>
                <p style={{ fontSize:"12px", color:"#374151", lineHeight:1.55, marginBottom:"8px" }}>{result.detail}</p>
                <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                  <Badge color="#166534" bg="#DCFCE7">{result.law}</Badge>
                  <Badge color="#92400E" bg="#FEF3C7">💰 {result.savings}</Badge>
                </div>
              </div>
            </div>
          </div>
          <button onClick={()=>setStatus("idle")} style={{ background:"none", border:"none", cursor:"pointer", fontSize:"11px", color:C.muted, textDecoration:"underline", fontFamily:"inherit" }}>Analyser un autre document</button>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  VIEW 3 : MOTIF
// ════════════════════════════════════════════════════════════════

function ViewMotif({ company, form, setForm, file, setFile, onBack, onNext }) {
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const [drag, setDrag] = useState(false);
  const [dateF, setDateF] = useState("");
  const fileRef = useRef();
  const handleFile = f=>{ if(!f||f.size>10*1024*1024) return; setFile(f); };

  const preavis = (()=>{
    if(!dateF) return null;
    const d=Math.round((new Date(dateF)-new Date())/86400000);
    if(d<0) return { ok:false, msg:`⚠️ Date passée` };
    if(d<30) return { ok:false, msg:`⚠️ ${d} jours seulement — vérifiez votre préavis` };
    return { ok:true, msg:`✅ ${d} jours (≈${Math.floor(d/30)} mois) — délai conforme` };
  })();

  return (
    <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"2rem 2rem" }}>
      <Stepper step={3}/>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2.5rem", alignItems:"start" }}>
        <div>
          <p style={T.sectionTitle}>03 — Motif de résiliation</p>
          <ContractAnalyzer/>
          <div style={{ display:"flex", flexDirection:"column", gap:"7px", marginBottom:"14px" }}>
            {MOTIFS.map(m=>{
              const isSel=form.motif===m.value;
              return (
                <div key={m.value} onClick={()=>set("motif",m.value)} style={{ display:"flex", gap:"11px", alignItems:"flex-start", padding:"13px 14px", borderRadius:"10px", cursor:"pointer", border:`1.5px solid ${isSel?C.navy:C.border}`, background:isSel?C.navy:C.white, transition:"all .18s" }}>
                  <div style={{ width:"17px", height:"17px", borderRadius:"4px", flexShrink:0, marginTop:"2px", border:`2px solid ${isSel?C.green:"#CBD5E1"}`, background:isSel?C.green:"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    {isSel&&<Icon d={PATHS.check} s={10} w={3.5}/>}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"7px", flexWrap:"wrap", marginBottom:"3px" }}>
                      <span style={{ fontSize:"14px" }}>{m.icon}</span>
                      <span style={{ fontSize:"13px", fontWeight:700, color:isSel?"white":C.navy }}>{m.label}</span>
                      <Badge color={isSel?"rgba(255,255,255,.75)":m.badgeC} bg={isSel?"rgba(255,255,255,.12)":m.badgeBg}>{m.badge}</Badge>
                    </div>
                    <p style={{ fontSize:"11.5px", color:isSel?"rgba(255,255,255,.6)":C.slate, lineHeight:1.5 }}>{m.desc}</p>
                    {isSel&&(
                      <div style={{ marginTop:"9px", padding:"7px 11px", background:"rgba(0,255,65,.08)", borderRadius:"6px", border:"1px solid rgba(0,255,65,.18)" }}>
                        <p style={{ fontSize:"9px", fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase", color:C.green, marginBottom:"3px" }}>Article de loi appliqué</p>
                        <p style={{ fontSize:"10.5px", color:"rgba(255,255,255,.75)", fontStyle:"italic" }}>{m.loi}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ ...T.card, marginBottom:"12px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"11px" }}>
              <span style={{ color:C.muted }}><Icon d={PATHS.doc} s={14}/></span>
              <span style={{ fontSize:"12px", fontWeight:700, color:C.navy }}>Pièce justificative</span>
              <Badge color="#92400E" bg="#FEF3C7">Fortement conseillé</Badge>
            </div>
            {!file ? (
              <div onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={()=>setDrag(false)} onDrop={e=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0])}} onClick={()=>fileRef.current?.click()} style={{ border:`2px dashed ${drag?"#94A3B8":C.border}`, borderRadius:"8px", padding:"20px 14px", textAlign:"center", cursor:"pointer", background:"#FAFBFC" }}>
                <div style={{ color:"#CBD5E1", display:"flex", justifyContent:"center", marginBottom:"6px" }}><Icon d={PATHS.upload} s={22} w={1.5}/></div>
                <p style={{ fontSize:"12px", fontWeight:600, color:C.navy, marginBottom:"2px" }}>Déposer votre document ici</p>
                <p style={{ fontSize:"11px", color:"#3B82F6", fontWeight:500 }}>ou cliquez pour parcourir</p>
                <p style={{ fontSize:"10px", color:C.muted, marginTop:"2px" }}>PDF, JPG ou PNG — 10 Mo max</p>
                <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" style={{ display:"none" }} onChange={e=>handleFile(e.target.files[0])}/>
              </div>
            ) : (
              <div style={{ display:"flex", alignItems:"center", gap:"9px", padding:"9px 11px", background:"#F0FDF4", borderRadius:"8px", border:"1px solid #BBF7D0" }}>
                <span style={{ color:"#16A34A" }}><Icon d={PATHS.doc} s={14}/></span>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:"12px", fontWeight:700, color:C.navy, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{file.name}</p>
                  <p style={{ fontSize:"10px", color:C.slate }}>{(file.size/1024).toFixed(0)} Ko</p>
                </div>
                <button onClick={()=>setFile(null)} style={{ color:C.muted, background:"none", border:"none", cursor:"pointer" }}><Icon d={PATHS.x} s={12}/></button>
              </div>
            )}
          </div>

          <div style={{ ...T.card, marginBottom:"20px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"10px" }}>
              <span style={{ color:C.muted }}><Icon d={PATHS.cal} s={14}/></span>
              <span style={{ fontSize:"12px", fontWeight:700, color:C.navy }}>Calculateur de préavis</span>
            </div>
            <span style={T.label}>Date de fin souhaitée</span>
            <input type="date" value={dateF} onChange={e=>setDateF(e.target.value)} style={{ width:"100%", padding:"9px 11px", borderRadius:"8px", border:`1px solid ${C.border}`, fontSize:"13px", color:dateF?C.navy:C.muted, outline:"none", fontFamily:"inherit", background:C.white, boxSizing:"border-box" }}/>
            {preavis ? (
              <p style={{ marginTop:"8px", fontSize:"12px", fontWeight:500, color:preavis.ok?"#166534":"#92400E" }}>{preavis.msg}</p>
            ) : (
              <p style={{ marginTop:"7px", fontSize:"11px", color:"#CBD5E1", fontStyle:"italic" }}>Entrez une date pour calculer automatiquement</p>
            )}
          </div>

          <div style={{ display:"flex", gap:"8px" }}>
            <Btn variant="secondary" onClick={onBack}><Icon d={PATHS.left} s={13}/> Retour</Btn>
            <Btn variant="primary" onClick={onNext} disabled={!form.motif} style={{ flex:1 }}>Voir le récapitulatif <Icon d={PATHS.right} s={13}/></Btn>
          </div>
        </div>
        <div style={{ position:"sticky", top:"1.5rem" }}><LetterPreview company={company} form={form} motif={form.motif}/></div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  VIEW 4 : PRICING
// ════════════════════════════════════════════════════════════════

function ViewPricing({ company, form, onBack, onSuccess }) {
  const [chosen, setChosen] = useState(null);
  const annuel = form.mensuel ? (parseFloat(form.mensuel)*12).toFixed(2) : null;
  const motifObj = MOTIFS.find(m=>m.value===form.motif);
  const plans = [
    { id:"pdf", price:"0,99 €", title:"Génération seule", emoji:"📄", desc:"Votre lettre officielle en PDF + instructions d'envoi détaillées.", features:["Lettre PDF haute qualité","Instructions d'envoi LRAR","Valeur juridique garantie","Téléchargement immédiat"], badge:null },
    { id:"full", price:"9,99 €", title:"Full Service", emoji:"🚀", desc:"On s'occupe de tout : génération + envoi recommandé LRAR en votre nom.", features:["Tout du pack PDF","Envoi LRAR via API La Poste","Accusé de réception inclus","Suivi en temps réel","Support prioritaire"], badge:"Recommandé" },
  ];

  return (
    <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"2rem 2rem" }}>
      <Stepper step={4}/>
      <div style={{ textAlign:"center", marginBottom:"2rem" }}>
        <h2 style={{ fontSize:"clamp(1.6rem,4vw,2.5rem)", fontWeight:900, letterSpacing:"-0.04em", color:C.navy, marginBottom:"8px" }}>Débloquez votre lettre</h2>
        <p style={{ fontSize:"14px", color:C.slate }}>Choisissez votre formule — votre lettre sera prête en 30 secondes.</p>
      </div>

      <div style={{ background:C.navy, borderRadius:"14px", padding:"16px 20px", marginBottom:"2rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <div style={{ width:"38px", height:"38px", borderRadius:"10px", background:"rgba(0,255,65,.1)", border:"1px solid rgba(0,255,65,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px", fontWeight:900, color:C.green }}>{(company?.nom||"XX").slice(0,2).toUpperCase()}</div>
          <div>
            <p style={{ fontSize:"12px", fontWeight:700, color:"white" }}>{company?.nom} — {motifObj?.label||"Résiliation"}</p>
            <p style={{ fontSize:"10px", color:"rgba(255,255,255,.45)" }}>{[form.prenom,form.nom].filter(Boolean).join(" ")} · Contrat {form.contrat||"—"}</p>
          </div>
        </div>
        {annuel&&(
          <div style={{ textAlign:"right" }}>
            <p style={{ fontSize:"9px", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:C.green, marginBottom:"2px" }}>Économie potentielle</p>
            <p style={{ fontSize:"1.4rem", fontWeight:900, color:"white", letterSpacing:"-0.04em" }}>{annuel} € <span style={{ fontSize:"11px", color:"rgba(255,255,255,.5)" }}>/an</span></p>
          </div>
        )}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"2rem" }}>
        {plans.map(p=>{
          const sel=chosen===p.id;
          return (
            <div key={p.id} onClick={()=>setChosen(p.id)} style={{ padding:"24px", borderRadius:"16px", cursor:"pointer", border:`2px solid ${sel?C.navy:C.border}`, background:sel?C.navy:C.white, transform:sel?"translateY(-4px)":"none", boxShadow:sel?"0 20px 50px rgba(10,25,47,.3)":"0 2px 12px rgba(10,25,47,.04)", transition:"all .25s cubic-bezier(.16,1,.3,1)", position:"relative" }}>
              {p.badge&&<div style={{ position:"absolute", top:"12px", right:"12px" }}><Badge color={sel?"rgba(255,255,255,.8)":C.navy} bg={sel?"rgba(255,255,255,.12)":"#F0FDF4"}>{p.badge}</Badge></div>}
              <div style={{ fontSize:"24px", marginBottom:"10px" }}>{p.emoji}</div>
              <p style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:sel?"rgba(255,255,255,.5)":C.muted, marginBottom:"4px" }}>{p.title}</p>
              <p style={{ fontSize:"2rem", fontWeight:900, letterSpacing:"-0.04em", color:sel?"white":C.navy, marginBottom:"8px" }}>{p.price}</p>
              <p style={{ fontSize:"12px", color:sel?"rgba(255,255,255,.6)":C.slate, lineHeight:1.5, marginBottom:"16px" }}>{p.desc}</p>
              <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
                {p.features.map((f,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                    <span style={{ color:sel?C.green:"#22C55E", flexShrink:0 }}><Icon d={PATHS.check} s={13} w={2.5}/></span>
                    <span style={{ fontSize:"12px", color:sel?"rgba(255,255,255,.75)":"#374151", fontWeight:500 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ background:"#F0F9FF", borderRadius:"12px", border:"1.5px solid #BAE6FD", padding:"16px 20px", marginBottom:"2rem" }}>
        <div style={{ display:"flex", alignItems:"flex-start", gap:"12px" }}>
          <span style={{ fontSize:"20px", flexShrink:0 }}>⚖️</span>
          <div>
            <p style={{ fontSize:"12px", fontWeight:800, color:"#0C4A6E", marginBottom:"6px" }}>Vos Droits — Article L215-1 du Code de la consommation</p>
            <p style={{ fontSize:"11.5px", color:"#0369A1", lineHeight:1.6 }}>Tout consommateur peut résilier son contrat à l'issue de la première période contractuelle, puis à tout moment, sans pénalité ni frais. Cette disposition est d'ordre public — elle s'applique à tout contrat d'abonnement ou de prestation continue.</p>
            <p style={{ fontSize:"10px", fontWeight:700, color:"#0284C7", marginTop:"8px" }}>Source : Légifrance — Art. L215-1 (modifié par Loi 2022-1158)</p>
          </div>
        </div>
      </div>

      <div style={{ display:"flex", gap:"8px" }}>
        <Btn variant="secondary" onClick={onBack}><Icon d={PATHS.left} s={13}/> Retour</Btn>
        <Btn variant="green" onClick={()=>chosen&&onSuccess(chosen)} disabled={!chosen} style={{ flex:1, fontSize:"12px" }}>
          <Icon d={PATHS.lock} s={14}/> {chosen?`Payer ${plans.find(p=>p.id===chosen)?.price}`:"Sélectionnez une formule"}
        </Btn>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  VIEW 5 : SUCCESS
// ════════════════════════════════════════════════════════════════

function ViewSuccess({ company, form, pack, onDashboard }) {
  const annuel = form.mensuel ? (parseFloat(form.mensuel)*12).toFixed(2) : null;
  const [count, setCount] = useState(0);
  useEffect(()=>{
    if(!annuel) return;
    const target=parseFloat(annuel), step=target/60;
    const t=setInterval(()=>setCount(c=>{ const n=c+step; if(n>=target){clearInterval(t);return target;} return n; }),20);
    return ()=>clearInterval(t);
  },[annuel]);

  return (
    <div style={{ maxWidth:"680px", margin:"0 auto", padding:"3rem 2rem", textAlign:"center" }}>
      <div style={{ width:"80px", height:"80px", borderRadius:"50%", background:`linear-gradient(135deg,${C.navy},#1e3a5f)`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.5rem", boxShadow:"0 12px 40px rgba(10,25,47,.3)", fontSize:"32px" }}>✅</div>
      <h1 style={{ fontSize:"2rem", fontWeight:900, letterSpacing:"-0.04em", color:C.navy, marginBottom:"10px" }}>Lettre générée !</h1>
      <p style={{ fontSize:"15px", color:C.slate, marginBottom:"2.5rem", lineHeight:1.6 }}>
        {pack==="full"?"Votre lettre LRAR est en route — vous recevrez l'accusé de réception par email.":"Votre lettre PDF est prête à télécharger et envoyer."}
      </p>

      {annuel&&(
        <div style={{ background:C.navy, borderRadius:"20px", padding:"2rem", marginBottom:"1.5rem", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 60% at 50% 0%,rgba(0,255,65,.08),transparent)" }}/>
          <div style={{ position:"relative", zIndex:1 }}>
            <p style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,.4)", marginBottom:"10px" }}>💰 Économies réalisées</p>
            <p style={{ fontSize:"3.5rem", fontWeight:900, letterSpacing:"-0.05em", color:C.green }}>{count.toFixed(0)} €</p>
            <p style={{ fontSize:"13px", color:"rgba(255,255,255,.5)", marginTop:"4px" }}>sur 12 mois · {form.mensuel} €/mois × 12</p>
          </div>
        </div>
      )}

      <div style={{ ...T.card, marginBottom:"1.5rem", textAlign:"left" }}>
        <p style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:C.muted, marginBottom:"12px" }}>Récapitulatif</p>
        {[["Entreprise",company?.nom],["Formule",pack==="full"?"Full Service (9,99 €)":"Génération seule (0,99 €)"],["Motif",MOTIFS.find(m=>m.value===form.motif)?.label||"—"],["Titulaire",`${form.prenom} ${form.nom}`.trim()||"—"],["Contrat",form.contrat||"—"]].map(([k,v])=>(
          <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:"8px", borderBottom:`1px solid ${C.border}`, marginBottom:"8px" }}>
            <span style={{ fontSize:"12px", color:C.muted, fontWeight:500 }}>{k}</span>
            <span style={{ fontSize:"12px", color:C.navy, fontWeight:700 }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ background:"#F0F9FF", borderRadius:"12px", border:"1px solid #BAE6FD", padding:"14px 16px", marginBottom:"2rem", textAlign:"left" }}>
        <p style={{ fontSize:"11px", fontWeight:800, color:"#0C4A6E", marginBottom:"5px" }}>⚖️ Vos droits sont protégés</p>
        <p style={{ fontSize:"11px", color:"#0369A1", lineHeight:1.6 }}>Conformément à l'<strong>Art. L215-1 du Code de la consommation</strong>, votre résiliation est légalement fondée. Aucune pénalité ne peut vous être imposée.</p>
      </div>

      <Btn variant="green" onClick={onDashboard} style={{ width:"100%", fontSize:"12px" }}>
        <Icon d={PATHS.chart} s={15}/> Voir mon espace & historique
      </Btn>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  VIEW 6 : DASHBOARD
// ════════════════════════════════════════════════════════════════

const STATUS_STYLES = { "En cours":{ bg:"#FEF3C7", text:"#92400E" }, "Envoyé":{ bg:"#DBEAFE", text:"#1D4ED8" }, "Résilié":{ bg:"#DCFCE7", text:"#166534" } };

function ViewDashboard({ resiliations, onNew, onStatusChange }) {
  const totalEco = resiliations.reduce((s,r)=>s+(parseFloat(r.mensuel)||0)*12, 0);
  const [ecoCount, setEcoCount] = useState(0);
  useEffect(()=>{
    if(!totalEco) return;
    const step=totalEco/80;
    const t=setInterval(()=>setEcoCount(c=>{ const n=c+step; if(n>=totalEco){clearInterval(t);return totalEco;} return n; }),15);
    return ()=>clearInterval(t);
  },[totalEco]);

  const isSerial = resiliations.length>=3;
  const isKiller = resiliations.length>=5;

  return (
    <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"2.5rem 2rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"2rem", flexWrap:"wrap", gap:"12px" }}>
        <div>
          <p style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:C.muted, marginBottom:"4px" }}>Mon espace</p>
          <h1 style={{ fontSize:"2rem", fontWeight:900, letterSpacing:"-0.04em", color:C.navy }}>Tableau de bord</h1>
        </div>
        <Btn variant="green" onClick={onNew}><Icon d={PATHS.right} s={13}/> Nouvelle résiliation</Btn>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"12px", marginBottom:"1.75rem" }}>
        <div style={{ background:C.navy, borderRadius:"14px", padding:"20px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, right:0, width:"120px", height:"120px", background:"radial-gradient(circle,rgba(0,255,65,.07),transparent 70%)", transform:"translate(20%,-20%)" }}/>
          <p style={{ fontSize:"9px", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,.4)", marginBottom:"8px" }}>💰 Économies totales</p>
          <p style={{ fontSize:"2.2rem", fontWeight:900, letterSpacing:"-0.05em", color:C.green }}>{Math.round(ecoCount)} €</p>
          <p style={{ fontSize:"10px", color:"rgba(255,255,255,.35)", marginTop:"4px" }}>sur 12 mois estimés</p>
        </div>
        <div style={{ ...T.card }}>
          <p style={{ fontSize:"9px", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:C.muted, marginBottom:"4px" }}>Contrats résiliés</p>
          <p style={{ fontSize:"2.2rem", fontWeight:900, letterSpacing:"-0.05em", color:C.navy }}>{resiliations.length}</p>
          <p style={{ fontSize:"10px", color:C.muted }}>dont {resiliations.filter(r=>r.status==="Résilié").length} confirmé{resiliations.filter(r=>r.status==="Résilié").length>1?"s":""}</p>
        </div>
        <div style={{ ...T.card }}>
          <p style={{ fontSize:"9px", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:C.muted, marginBottom:"4px" }}>En attente</p>
          <p style={{ fontSize:"2.2rem", fontWeight:900, letterSpacing:"-0.05em", color:C.navy }}>{resiliations.filter(r=>r.status!=="Résilié").length}</p>
          <p style={{ fontSize:"10px", color:C.muted }}>résiliation{resiliations.filter(r=>r.status!=="Résilié").length>1?"s":""} en cours</p>
        </div>
      </div>

      {(isSerial||isKiller)&&(
        <div style={{ marginBottom:"1.75rem" }}>
          <p style={T.sectionTitle}>🏆 Badges débloqués</p>
          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
            {isSerial&&(
              <div style={{ display:"flex", alignItems:"center", gap:"12px", padding:"14px 18px", background:`linear-gradient(135deg,${C.navy},#1e3a5f)`, borderRadius:"14px", boxShadow:"0 8px 24px rgba(10,25,47,.3)" }}>
                <span style={{ fontSize:"22px" }}>🗡️</span>
                <div>
                  <p style={{ fontSize:"13px", fontWeight:900, color:"white" }}>Serial Killer de Contrats</p>
                  <p style={{ fontSize:"10px", color:C.green, fontWeight:700 }}>3+ résiliations effectuées</p>
                </div>
              </div>
            )}
            {isKiller&&(
              <div style={{ display:"flex", alignItems:"center", gap:"12px", padding:"14px 18px", background:"linear-gradient(135deg,#7C3AED,#5B21B6)", borderRadius:"14px", boxShadow:"0 8px 24px rgba(124,58,237,.3)" }}>
                <span style={{ fontSize:"22px" }}>👑</span>
                <div>
                  <p style={{ fontSize:"13px", fontWeight:900, color:"white" }}>Contract Assassin</p>
                  <p style={{ fontSize:"10px", color:"#DDD6FE", fontWeight:700 }}>5+ résiliations — élite</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <p style={T.sectionTitle}>Historique des résiliations</p>
      {resiliations.length===0 ? (
        <div style={{ textAlign:"center", padding:"3rem 2rem", border:`2px dashed ${C.border}`, borderRadius:"14px" }}>
          <p style={{ fontSize:"2rem", marginBottom:"10px" }}>📭</p>
          <p style={{ fontWeight:700, color:C.navy, marginBottom:"6px" }}>Aucune résiliation pour l'instant</p>
          <p style={{ fontSize:"13px", color:C.muted, marginBottom:"20px" }}>Commencez dès maintenant — c'est rapide.</p>
          <Btn onClick={onNew} variant="primary">Résilier mon premier contrat</Btn>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
          {resiliations.map((r,i)=>(
            <div key={r.id||i} style={{ display:"flex", alignItems:"center", gap:"14px", padding:"14px 16px", background:C.white, borderRadius:"12px", border:`1px solid ${C.border}`, boxShadow:"0 1px 4px rgba(10,25,47,.04)" }}>
              <div style={{ width:"36px", height:"36px", borderRadius:"9px", background:"#F1F5F9", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:900, color:"#475569", flexShrink:0 }}>
                {(r.company||"XX").slice(0,2).toUpperCase()}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap", marginBottom:"2px" }}>
                  <p style={{ fontSize:"13px", fontWeight:700, color:C.navy }}>{r.company||"—"}</p>
                  {r.motifLabel&&<Badge color={C.muted} bg="#F1F5F9">{r.motifLabel}</Badge>}
                  {r.pack==="full"&&<Badge color="#1D4ED8" bg="#DBEAFE">LRAR</Badge>}
                </div>
                <p style={{ fontSize:"11px", color:C.muted }}>{r.date} · {[r.prenom,r.nom].filter(Boolean).join(" ")||"—"}</p>
              </div>
              {r.mensuel&&parseFloat(r.mensuel)>0&&(
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <p style={{ fontSize:"9px", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", color:"#166534", marginBottom:"2px" }}>Économie/an</p>
                  <p style={{ fontSize:"15px", fontWeight:900, color:"#166534", letterSpacing:"-0.03em" }}>{(parseFloat(r.mensuel)*12).toFixed(0)} €</p>
                </div>
              )}
              <select value={r.status||"En cours"} onChange={e=>onStatusChange(r.id,e.target.value)} style={{ padding:"5px 10px", borderRadius:"999px", fontSize:"10px", fontWeight:700, border:"none", cursor:"pointer", fontFamily:"inherit", outline:"none", background:STATUS_STYLES[r.status||"En cours"]?.bg||"#F1F5F9", color:STATUS_STYLES[r.status||"En cours"]?.text||C.navy }}>
                {["En cours","Envoyé","Résilié"].map(s=><option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
//  ROOT
// ════════════════════════════════════════════════════════════════

export default function App() {
  const [view, setView] = useState("selector");
  const [company, setCompany] = useState(null);
  const [form, setForm] = useState({ prenom:"", nom:"", adresse:"", cp:"", ville:"", email:"", contrat:"", motif:"", mensuel:"" });
  const [file, setFile] = useState(null);
  const [pack, setPack] = useState(null);
  const [resiliations, setResiliations] = useState(loadResiliations);

  const handleSuccess = (chosenPack) => {
    setPack(chosenPack);
    const motifObj = MOTIFS.find(m=>m.value===form.motif);
    const updated = addResilitation({ company:company?.nom, cat:company?.cat, prenom:form.prenom, nom:form.nom, contrat:form.contrat, mensuel:form.mensuel, motifLabel:motifObj?.label, pack:chosenPack });
    setResiliations(updated);
    setView("success");
  };

  const handleStatusChange = (id, status) => {
    const updated = resiliations.map(r=>r.id===id?{...r,status}:r);
    setResiliations(updated); saveResiliations(updated);
  };

  const reset = () => {
    setCompany(null);
    setForm({ prenom:"", nom:"", adresse:"", cp:"", ville:"", email:"", contrat:"", motif:"", mensuel:"" });
    setFile(null); setPack(null); setView("selector");
  };

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Inter',-apple-system,sans-serif", color:C.navy }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input::placeholder{color:#CBD5E1;font-weight:400;}
        button:hover:not(:disabled){opacity:.87;}
        input[type="date"]::-webkit-calendar-picker-indicator{opacity:.35;cursor:pointer;}
      `}</style>
      <Nav view={view} onDashboard={()=>setView("dashboard")} resiliations={resiliations}/>
      {view==="selector"  && <ViewSelector onSelect={c=>{setCompany(c);setView("coords");}}/>}
      {view==="coords"    && <ViewCoordonnees company={company} form={form} setForm={setForm} onBack={()=>setView("selector")} onNext={()=>setView("motif")}/>}
      {view==="motif"     && <ViewMotif company={company} form={form} setForm={setForm} file={file} setFile={setFile} onBack={()=>setView("coords")} onNext={()=>setView("pricing")}/>}
      {view==="pricing"   && <ViewPricing company={company} form={form} onBack={()=>setView("motif")} onSuccess={handleSuccess}/>}
      {view==="success"   && <ViewSuccess company={company} form={form} pack={pack} onDashboard={()=>setView("dashboard")}/>}
      {view==="dashboard" && <ViewDashboard resiliations={resiliations} onNew={reset} onStatusChange={handleStatusChange}/>}
    </div>
  );
}
