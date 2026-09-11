import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'
import {
  Activity, AlertTriangle, ArrowRight, BadgeCheck, Bot, Boxes, Check,
  ChevronDown, ChevronRight, CircleDot, Cloud, Code2, FileCheck2,
  FileSearch, Filter, GitBranch, Menu, Network, Search, Settings2, ShieldCheck,
  SlidersHorizontal, Users, Workflow, X, Zap
} from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { challenges, inventory, lifecycle, providers, riskDomains, roadmap, roles, type InventoryItem } from './data'
import './styles.css'

const statusTone = (value: string) => {
  const key = value.toLowerCase()
  if (key.includes('approved') || key.includes('complete') || key.includes('available')) return 'green'
  if (key.includes('high') || key.includes('restricted') || key.includes('overdue')) return 'red'
  if (key.includes('review') || key.includes('conditional') || key.includes('required')) return 'amber'
  return 'slate'
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="micro-label"><CircleDot size={12} /> {children}</span>
}

function SectionTitle({ eyebrow, title, copy, id }: { eyebrow: string; title: string; copy?: string; id?: string }) {
  return <div className="section-heading">
    <Label>{eyebrow}</Label>
    <h2 id={id}>{title}</h2>
    {copy && <p>{copy}</p>}
  </div>
}

function Tabs({ items, active, onChange, label }: { items: string[]; active: string; onChange: (item: string) => void; label: string }) {
  return <div className="tabs" role="tablist" aria-label={label}>
    {items.map(item => <button key={item} role="tab" aria-selected={active === item} className={active === item ? 'active' : ''} onClick={() => onChange(item)}>{item}</button>)}
  </div>
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = ['Overview', 'AI Inventory', 'Risk', 'Guardrails', 'Runtime', 'Governance', 'Analytics']
  return <header className="site-header">
    <a className="brand" href="#top" aria-label="MTX AISPM home">
      <span className="brand-mark"><Network size={22} /></span>
      <span><strong>MTX</strong><small>AI Security Posture Management</small></span>
    </a>
    <button className="menu-button" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
      {open ? <X /> : <Menu />}<span className="sr-only">Menu</span>
    </button>
    <nav id="site-nav" className={open ? 'nav open' : 'nav'} aria-label="Primary">
      {links.map(link => <a key={link} href={`#${link.toLowerCase().replace('ai ', '').replace(' ', '-')}`} onClick={() => setOpen(false)}>{link}</a>)}
      <a className="button small" href="#contact" onClick={() => setOpen(false)}>Request a Demo</a>
    </nav>
  </header>
}

const heroMetrics = [
  ['24', 'Registered AI systems', 'green'], ['3', 'Ownership review', 'amber'],
  ['7', 'Models in production', 'cyan'], ['11', 'Open risk findings', 'red'],
  ['4', 'Policy exceptions', 'violet'], ['38', 'Runtime events', 'cyan'],
  ['5', 'Pending approvals', 'amber'], ['62%', 'Remediation on track', 'green'],
]

function Hero() {
  return <section className="hero" id="overview">
    <div className="hero-copy">
      <Label>AI Security Posture Management</Label>
      <h1>Bring AI assets, risks, controls, and accountability into one governed view</h1>
      <p className="lead">Discover AI systems through configured integrations, connect them to owners and data, assess relevant risks, and track controls from development through production.</p>
      <p>MTX AISPM helps security, AI, data, privacy, and governance teams understand how AI is being used across the organization. It links applications, models, agents, datasets, providers, and pipelines with ownership, findings, policies, approvals, exceptions, and remediation.</p>
      <div className="hero-actions">
        <a className="button" href="#ecosystem">Explore the AI Ecosystem <ArrowRight size={17} /></a>
        <a className="button secondary" href="#risk">Review an AI Risk Assessment</a>
        <a className="text-link" href="#contact">Request a Product Demonstration <ChevronRight size={16} /></a>
      </div>
    </div>
    <div className="product-window" aria-label="Illustrative AISPM interface">
      <div className="window-top"><span className="window-dots" aria-hidden="true">● ● ●</span><span>Illustrative AISPM interface</span><span className="live-pill">Demo data</span></div>
      <div className="window-summary">
        <div><small>AI posture workspace</small><strong>Portfolio overview</strong></div>
        <SlidersHorizontal size={20} />
      </div>
      <div className="metric-grid">
        {heroMetrics.map(([value, label, tone]) => <div className="metric" key={label}><span className={`metric-icon ${tone}`}><Activity size={15} /></span><strong>{value}</strong><small>{label}</small></div>)}
      </div>
      <div className="mini-flow">
        <div className="flow-head"><strong>AI asset relationships</strong><span>Risk context</span></div>
        <div className="flow-line" aria-hidden="true">
          <span className="node app">Application</span><i /><span className="node data">Knowledge</span><i /><span className="node model">Model</span>
        </div>
        <div className="finding-row"><AlertTriangle size={17} /><span><strong>Review required</strong><small>1 provider term · 2 control records</small></span><b>Open</b></div>
      </div>
      <p className="illustrative">Illustrative product data</p>
    </div>
  </section>
}

function Scope() {
  const items = [['6', 'AI asset categories'], ['6', 'Lifecycle stages'], ['5', 'Risk domains'], ['1', 'Governed AI inventory']]
  return <section className="scope-band" aria-labelledby="scope-title">
    <div><Label>Platform scope</Label><h2 id="scope-title">One operating view for AI context</h2></div>
    <div className="scope-stats">{items.map(([n, label]) => <div key={label}><strong>{n}</strong><span>{label}</span></div>)}</div>
    <details><summary>View scope definitions <ChevronDown size={16} /></summary>
      <div className="scope-detail"><p><strong>Asset categories:</strong> AI applications; models and providers; agents and tools; datasets and knowledge sources; development and deployment pipelines; runtime endpoints and integrations.</p><p><strong>Lifecycle:</strong> Discover, register, assess, approve, monitor, improve.</p><p><strong>Risk:</strong> Security; privacy and data protection; model and application behavior; third-party and supply-chain; governance and operational accountability.</p></div>
    </details>
  </section>
}

function Challenges() {
  const [active, setActive] = useState(0)
  const item = challenges[active]
  return <section className="section" aria-labelledby="challenge-title">
    <SectionTitle eyebrow="AI security challenges" title="Turn fragmented AI context into actionable review" copy="Select a challenge to see the information and operating response it may require." id="challenge-title" />
    <div className="challenge-layout">
      <div className="challenge-list" role="tablist" aria-label="AI security challenges">
        {challenges.map((c, i) => <button role="tab" aria-selected={i === active} key={c.title} className={i === active ? 'active' : ''} onClick={() => setActive(i)}><span>0{i + 1}</span><strong>{c.title}</strong><ChevronRight size={18} /></button>)}
      </div>
      <article className="challenge-detail" role="tabpanel">
        <Label>Selected challenge</Label><h3>{item.title}</h3>
        <p><strong>Challenge:</strong> {item.challenge}</p>
        <p><strong>MTX response:</strong> {item.response}</p>
        <div className="detail-grid">
          {[['Affected roles', item.roles], ['Information required', item.info], ['Product capability', item.capability], ['Potential control', item.control], ['Suggested measure', item.measure]].map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}
        </div>
      </article>
    </div>
  </section>
}

function Lifecycle() {
  const [active, setActive] = useState(0)
  const stage = lifecycle[active]
  return <section className="section dark-section" aria-labelledby="lifecycle-title">
    <SectionTitle eyebrow="AI lifecycle explorer" title="Carry governance context through change" copy="Move through the lifecycle to view the records and decisions connected to each stage." id="lifecycle-title" />
    <div className="lifecycle-tabs" role="tablist" aria-label="Lifecycle stage">
      {lifecycle.map((s, i) => <button key={s.name} role="tab" aria-selected={i === active} onClick={() => setActive(i)} className={i === active ? 'active' : ''}><span>{i + 1}</span>{s.name}</button>)}
    </div>
    <div className="lifecycle-panel" role="tabpanel">
      <div><Label>Stage {active + 1} of 6</Label><h3>{stage.name}</h3><p>{stage.summary}</p><div className="stage-progress"><span style={{ width: `${(active + 1) / 6 * 100}%` }} /></div></div>
      <div className="check-list">{stage.items.map(item => <span key={item}><Check size={15} /> {item}</span>)}</div>
    </div>
  </section>
}

const ecosystemNodes = [
  { name: 'Benefits Assistant', type: 'Application', x: 90, y: 80, risk: 'Moderate' },
  { name: 'Case Summary Agent', type: 'Agent', x: 90, y: 210, risk: 'High' },
  { name: 'Internal Knowledge Base', type: 'Dataset', x: 300, y: 45, risk: 'Low' },
  { name: 'Document Repository', type: 'Retrieval', x: 300, y: 145, risk: 'Moderate' },
  { name: 'API Tool', type: 'Tool', x: 300, y: 245, risk: 'High' },
  { name: 'External Model Provider', type: 'Provider', x: 515, y: 80, risk: 'Moderate' },
  { name: 'Human Reviewer', type: 'Control', x: 515, y: 210, risk: 'Low' },
]

function Ecosystem() {
  const [type, setType] = useState('Any asset type')
  const [selected, setSelected] = useState(ecosystemNodes[0])
  const visible = type === 'Any asset type' ? ecosystemNodes : ecosystemNodes.filter(n => n.type === type)
  return <section className="section" id="ecosystem" aria-labelledby="ecosystem-title">
    <SectionTitle eyebrow="Illustrative relationship map" title="See AI systems in their operating context" copy="Filter fictional assets and inspect their relationships. Discovery depends on configured sources and available metadata." id="ecosystem-title" />
    <div className="filter-bar">
      <label><Filter size={16} /><span className="sr-only">Asset type</span><select value={type} onChange={e => setType(e.target.value)}><option>Any asset type</option>{['Application', 'Agent', 'Dataset', 'Retrieval', 'Tool', 'Provider', 'Control'].map(x => <option key={x}>{x}</option>)}</select></label>
      {['Business unit: Any', 'Lifecycle: Active', 'Risk: Any', 'Provider: Any', 'Data: Any', 'Approval: Any'].map(x => <button key={x} className="filter-chip">{x}<ChevronDown size={13} /></button>)}
    </div>
    <div className="map-layout">
      <div className="map-card">
        <svg className="ecosystem-svg" viewBox="0 0 650 300" role="img" aria-labelledby="map-title map-desc">
          <title id="map-title">Illustrative AI ecosystem relationship map</title>
          <desc id="map-desc">Benefits Assistant and Case Summary Agent connect to data, retrieval, tool, provider, and human review assets.</desc>
          <g className="edges" aria-hidden="true"><path d="M150 80H275M150 95L275 145M150 210L275 155M150 210L275 245M365 45L490 80M365 145L490 90M365 245L490 210M150 210H490" /></g>
          {visible.map(n => <g key={n.name} role="button" tabIndex={0} aria-label={`${n.name}, ${n.type}, ${n.risk} risk`} onClick={() => setSelected(n)} onKeyDown={(e: KeyboardEvent<SVGGElement>) => (e.key === 'Enter' || e.key === ' ') && setSelected(n)} className={`svg-node ${selected.name === n.name ? 'selected' : ''}`} transform={`translate(${n.x} ${n.y})`}>
            <rect x="-65" y="-25" width="130" height="50" rx="10" /><text textAnchor="middle" y="-3">{n.name.length > 19 ? `${n.name.slice(0, 18)}…` : n.name}</text><text className="node-type" textAnchor="middle" y="14">{n.type}</text>
          </g>)}
        </svg>
        <p className="illustrative">Illustrative product data</p>
      </div>
      <aside className="map-inspector"><Label>Selected asset</Label><span className={`status ${statusTone(selected.risk)}`}>{selected.risk} risk</span><h3>{selected.name}</h3><p>{selected.type} connected through documented relationships and configured metadata sources.</p><dl><div><dt>Owner</dt><dd>{selected.type === 'Control' ? 'Operations Review' : 'Digital Services'}</dd></div><div><dt>Lifecycle</dt><dd>Production</dd></div><div><dt>Approval</dt><dd>Conditional</dd></div></dl></aside>
    </div>
    <details className="table-alternative"><summary>View accessible table alternative</summary><div className="table-scroll"><table><thead><tr><th>Asset</th><th>Type</th><th>Relationship context</th><th>Risk</th></tr></thead><tbody>{ecosystemNodes.map(n => <tr key={n.name}><th scope="row">{n.name}</th><td>{n.type}</td><td>Connected to the illustrative AI service workflow</td><td>{n.risk}</td></tr>)}</tbody></table></div></details>
  </section>
}

function DetailDrawer({ item, close }: { item: InventoryItem; close: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    closeRef.current?.focus()
    const handler = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [close])
  const sections = [
    ['Intended use', item.purpose], ['Prohibited use', item.prohibited], ['Owner', item.owner], ['Users', 'Approved staff or public users by deployment'],
    ['Data sources', `${item.data} sources documented in the asset record`], ['Models', item.model], ['Agents and tools', item.name.includes('Agent') ? 'Knowledge search · Draft creation' : 'No agent tools documented'],
    ['Deployment environments', item.stage], ['Assessments', item.assessment], ['Controls', 'Access, review, logging, and change control records'], ['Exceptions', item.approval === 'Approved' ? 'One active condition' : 'None recorded'],
    ['Runtime events', `${Math.max(item.findings * 3, 2)} illustrative events`], ['Change history', 'Model record updated 08 Sep 2026'],
  ]
  return <div className="drawer-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && close()}>
    <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      <div className="drawer-head"><div><Label>AI system record · Illustrative</Label><h2 id="drawer-title">{item.name}</h2></div><button ref={closeRef} className="icon-button" onClick={close}><X /><span className="sr-only">Close details</span></button></div>
      <p className="drawer-description">{item.description}</p>
      <div className="drawer-status"><span className={`status ${statusTone(item.approval)}`}>{item.approval}</span><span>{item.findings} open findings</span><span>Review: {item.review}</span></div>
      <div className="drawer-sections">{sections.map(([label, value]) => <section key={label}><h3>{label}</h3><p>{value}</p></section>)}</div>
      <p className="boundary-note"><AlertTriangle size={16} /> Fictional system record for product demonstration.</p>
    </aside>
  </div>
}

function Inventory() {
  const tabs = ['Registered', 'Under review', 'Approved', 'Restricted', 'Retired', 'Ownership required']
  const [tab, setTab] = useState('Registered')
  const [search, setSearch] = useState('')
  const [sortAsc, setSortAsc] = useState(true)
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<InventoryItem | null>(null)
  const filtered = useMemo(() => inventory.filter(item => {
    const tabMatch = tab === 'Registered' || item.approval.toLowerCase() === tab.toLowerCase() || (tab === 'Under review' && item.assessment === 'Under review')
    return tabMatch && `${item.name} ${item.purpose} ${item.owner}`.toLowerCase().includes(search.toLowerCase())
  }).sort((a, b) => sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)), [tab, search, sortAsc])
  const pages = Math.max(1, Math.ceil(filtered.length / 4))
  const rows = filtered.slice((page - 1) * 4, page * 4)
  return <section className="section inventory-section" id="inventory" aria-labelledby="inventory-title">
    <SectionTitle eyebrow="AI inventory workspace" title="Connect each AI system to an accountable record" copy="Search and review fictional system records. Inventory scope reflects configured integrations and owner-provided information." id="inventory-title" />
    <Tabs items={tabs} active={tab} onChange={value => { setTab(value); setPage(1) }} label="Inventory status" />
    <div className="table-toolbar"><label className="search-box"><Search size={17} /><span className="sr-only">Search inventory</span><input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} placeholder="Search systems, purpose, owner" /></label><button className="button secondary small" onClick={() => setSortAsc(!sortAsc)}>Sort {sortAsc ? 'A–Z' : 'Z–A'} <ChevronDown size={15} /></button></div>
    <div className="table-scroll"><table className="inventory-table"><caption className="sr-only">Illustrative AI system inventory</caption><thead><tr>{['AI system', 'Business purpose', 'Owner', 'Model or provider', 'Data', 'Stage', 'Criticality', 'Assessment', 'Approval', 'Findings', 'Next review'].map(h => <th key={h} scope="col">{h}</th>)}</tr></thead>
      <tbody>{rows.map(item => <tr key={item.id} onClick={() => setSelected(item)}><th scope="row"><button className="row-link" onClick={() => setSelected(item)}>{item.name}<ChevronRight size={15} /></button></th><td>{item.purpose}</td><td>{item.owner}</td><td>{item.model}</td><td>{item.data}</td><td>{item.stage}</td><td><span className={`status ${statusTone(item.criticality)}`}>{item.criticality}</span></td><td>{item.assessment}</td><td><span className={`status ${statusTone(item.approval)}`}>{item.approval}</span></td><td>{item.findings}</td><td>{item.review}</td></tr>)}</tbody></table></div>
    {rows.length === 0 && <p className="empty-state">No fictional records match these filters.</p>}
    <div className="pagination"><span>Page {page} of {pages} · {filtered.length} records</span><div><button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button><button disabled={page === pages} onClick={() => setPage(page + 1)}>Next</button></div></div>
    <p className="illustrative">Illustrative product data</p>
    {selected && <DetailDrawer item={selected} close={() => setSelected(null)} />}
  </section>
}

const shadowSteps = ['Potential AI activity observed', 'Evidence collected from an approved source', 'Ownership review opened', 'Business purpose documented', 'Risk assessment initiated', 'Use disposition recorded']

function ShadowReview() {
  const [step, setStep] = useState(2)
  const [source, setSource] = useState('Application portfolio')
  return <section className="section split-section">
    <div><SectionTitle eyebrow="Shadow AI review" title="Investigate unregistered AI use with supporting context" copy="AISPM organizes evidence from approved sources; it does not independently identify every unregistered deployment." />
      <label className="field"><span>Evidence source</span><select value={source} onChange={e => setSource(e.target.value)}>{['Cloud inventory', 'AI gateway', 'SaaS inventory', 'Application portfolio', 'Procurement record', 'Code repository', 'Network or browser security event', 'Employee disclosure'].map(x => <option key={x}>{x}</option>)}</select></label>
      <p className="boundary-note"><Users size={17} /> Reviews are presented at system level, not as individual employee monitoring.</p>
    </div>
    <ol className="workflow-list">{shadowSteps.map((s, i) => <li key={s} className={i <= step ? 'done' : ''}><button onClick={() => setStep(i)}><span>{i < step ? <Check size={15} /> : i + 1}</span><div><strong>{s}</strong><small>{i === 1 ? `Source: ${source}` : i === 5 ? 'Approved, restricted, remediated, or unrelated' : 'Illustrative workflow record'}</small></div></button></li>)}</ol>
  </section>
}

function RiskWorkspace() {
  const [active, setActive] = useState(0)
  const domain = riskDomains[active]
  const [finding, setFinding] = useState(domain.items[0])
  return <section className="section dark-section" id="risk" aria-labelledby="risk-title">
    <SectionTitle eyebrow="AI risk assessment" title="Review risk as evidence-informed judgment" copy="Assessment outputs support reviewer decisions; displayed risk levels are not objective certainty." id="risk-title" />
    <div className="risk-workspace">
      <div className="risk-domains" role="tablist" aria-label="Risk domains">{riskDomains.map((d, i) => <button key={d.name} role="tab" aria-selected={active === i} className={active === i ? 'active' : ''} onClick={() => { setActive(i); setFinding(d.items[0]) }}><span className={`risk-dot ${d.tone}`} />{d.name}<b>{d.items.length}</b></button>)}</div>
      <div className="risk-panel" role="tabpanel"><div className="risk-items">{domain.items.map(item => <button className={finding === item ? 'selected' : ''} onClick={() => setFinding(item)} key={item}>{item}<ChevronRight size={15} /></button>)}</div>
      <article className="finding-card"><div className="finding-title"><span className="status amber">Requires review</span><small>Illustrative finding</small></div><h3>{finding}</h3>
        <dl>{[
          ['Evidence', 'Architecture record and reviewer note'], ['Potential impact', 'Use could exceed documented operating conditions'], ['Current control', 'Access restriction and staff review'], ['Residual concern', 'Control evidence requires validation'], ['Assigned owner', 'Application Security'], ['Remediation', 'Provide test evidence and update runbook'], ['Approval status', 'Conditional review'],
        ].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </article></div>
    </div>
  </section>
}

const lineageNodes = [
  ['Source data', 'Records Office', 'Confidential'], ['Data preparation', 'Data Engineering', 'Confidential'], ['Fine-tuning dataset', 'Model Team', 'Restricted'],
  ['Model', 'AI Platform', 'Internal'], ['AI application', 'Digital Services', 'Internal'], ['Retrieval source', 'Knowledge Office', 'Internal'],
  ['Agent tool', 'Platform Operations', 'Confidential'], ['Output', 'Application Owner', 'Confidential'], ['Human reviewer', 'Operations', 'Confidential'], ['Downstream system', 'Records Platform', 'Confidential'],
]

function Lineage() {
  const [active, setActive] = useState(0)
  const node = lineageNodes[active]
  return <section className="section" aria-labelledby="lineage-title">
    <SectionTitle eyebrow="Data and model lineage" title="Trace documented data, model, and action relationships" copy="Lineage depends on available metadata, integrations, and organizational practices. Provider-controlled training data is not represented without evidence." id="lineage-title" />
    <div className="lineage-layout"><div className="lineage" role="list" aria-label="Illustrative lineage nodes">{lineageNodes.map((n, i) => <button role="listitem" key={n[0]} className={active === i ? 'active' : ''} onClick={() => setActive(i)}><span>{i + 1}</span><strong>{n[0]}</strong><small>{n[2]}</small></button>)}</div>
      <aside className="lineage-detail"><Label>Selected lineage node</Label><h3>{node[0]}</h3><dl>{[['Owner', node[1]], ['Classification', node[2]], ['Approved purpose', 'Document-assistance evaluation'], ['Location', 'Approved regional environment'], ['Retention', 'Per records schedule'], ['Version', 'Record 2.3'], ['Review status', 'Condition recorded'], ['Related findings', '2 open']].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl><p className="illustrative">Illustrative product data</p></aside></div>
  </section>
}

function PolicyBuilder() {
  const options = {
    'AI use case': ['Internal staff assistant', 'Public information assistant', 'Document summarization', 'Application review support', 'Forecasting', 'Agentic workflow', 'Code assistance'],
    'Data classification': ['Confidential', 'Public', 'Internal', 'Sensitive personal data', 'Regulated data'],
    'User group': ['Specialist staff', 'Public user', 'General employee', 'Privileged administrator', 'Contractor'],
    'Model type': ['Managed cloud model', 'Internally hosted', 'Commercial API', 'Open-source model', 'Embedded SaaS model'],
  }
  const [values, setValues] = useState<Record<string, string>>({ 'AI use case': 'Internal staff assistant', 'Data classification': 'Confidential', 'User group': 'Specialist staff', 'Model type': 'Managed cloud model' })
  const controls = ['Human review', 'Input filtering', 'Output review', 'Retrieval restrictions', 'Tool allowlist', 'Data masking', 'Logging', 'Rate limits', 'Approval', 'Incident escalation']
  const [selected, setSelected] = useState(['Human review', 'Retrieval restrictions', 'Logging', 'Approval'])
  const toggle = (control: string) => setSelected(s => s.includes(control) ? s.filter(x => x !== control) : [...s, control])
  return <section className="section policy-section" id="guardrails" aria-labelledby="policy-title">
    <SectionTitle eyebrow="Policy and guardrail builder" title="Translate use context into proposed controls" copy="Selections create an illustrative policy record. A selected control is not evidence that technical enforcement has been deployed." id="policy-title" />
    <div className="builder-grid"><div className="builder-form">{Object.entries(options).map(([label, opts]) => <label className="field" key={label}><span>{label}</span><select value={values[label]} onChange={e => setValues({ ...values, [label]: e.target.value })}>{opts.map(o => <option key={o}>{o}</option>)}</select></label>)}
      <fieldset><legend>Proposed controls</legend><div className="control-chips">{controls.map(c => <button type="button" aria-pressed={selected.includes(c)} onClick={() => toggle(c)} key={c}>{selected.includes(c) && <Check size={14} />}{c}</button>)}</div></fieldset>
    </div><article className="policy-output"><Label>Illustrative policy summary</Label><ShieldCheck size={32} /><h3>{values['AI use case']}</h3><p>This {values['AI use case'].toLowerCase()} handles {values['Data classification'].toLowerCase()} information for {values['User group'].toLowerCase()} users with a {values['Model type'].toLowerCase()}. Proposed controls include {selected.length ? selected.join(', ').toLowerCase() : 'review before release'}.</p><div className="policy-meta"><span>Policy status<strong>Draft</strong></span><span>Deployment evidence<strong>Required</strong></span></div><p className="boundary-note"><AlertTriangle size={15} /> Technical operation requires a supported enforcement point and deployment validation.</p></article></div>
  </section>
}

const runtimeSteps = ['User or system request', 'Input-policy evaluation', 'Model request', 'Retrieval or tool activity', 'Model response', 'Output-policy evaluation', 'Human or system action', 'Security and governance event']
const runtimeEvents = ['Sensitive-data pattern detected', 'Unapproved model requested', 'Restricted knowledge source accessed', 'Tool call outside approved scope', 'Output requires review', 'Policy exception used', 'Model version changed', 'Elevated activity volume']

function Runtime() {
  const [active, setActive] = useState(1)
  const [event, setEvent] = useState(runtimeEvents[0])
  return <section className="section dark-section" id="runtime" aria-labelledby="runtime-title">
    <SectionTitle eyebrow="Runtime observability" title="Observe supported AI activity at configured control points" copy="Monitoring depends on configured gateways, proxies, SDKs, logs, APIs, or application instrumentation." id="runtime-title" />
    <div className="runtime-flow" role="list" aria-label="Runtime event flow">{runtimeSteps.map((step, i) => <button role="listitem" key={step} onClick={() => setActive(i)} className={active === i ? 'active' : ''}><span>{i + 1}</span><strong>{step}</strong>{i < runtimeSteps.length - 1 && <ArrowRight aria-hidden="true" />}</button>)}</div>
    <div className="runtime-panel"><div><Label>Stage {active + 1}</Label><h3>{runtimeSteps[active]}</h3><p>Context is recorded when a supported control point provides the relevant event and asset identifiers.</p></div><label className="field"><span>Illustrative event</span><select value={event} onChange={e => setEvent(e.target.value)}>{runtimeEvents.map(x => <option key={x}>{x}</option>)}</select><small>Current selection: {event}</small></label></div>
  </section>
}

function PromptScenario() {
  const steps = ['User submits a request', 'Application retrieves an untrusted document', 'Document includes instructions intended to alter behavior', 'Configured control flags retrieved content', 'Tool access is restricted', 'Event is routed for review', 'Analyst records a disposition']
  const [active, setActive] = useState(0)
  return <section className="section scenario-section"><div><SectionTitle eyebrow="Safe scenario" title="Review a prompt-injection event without attack content" copy="Controls can reduce risk but cannot reliably identify every prompt-injection attempt." /><p className="boundary-note"><ShieldCheck size={17} /> This scenario omits actionable attack text and bypass techniques.</p></div>
    <div className="scenario-card"><div className="scenario-progress">{steps.map((_, i) => <span key={i} className={i <= active ? 'active' : ''} />)}</div><Label>Step {active + 1} of {steps.length}</Label><h3>{steps[active]}</h3><p>{active < 3 ? 'Application context is recorded for policy evaluation.' : active < 6 ? 'A configured control applies the documented response.' : 'The review outcome remains linked to the AI asset.'}</p><div className="scenario-actions"><button className="button secondary" disabled={active === 0} onClick={() => setActive(active - 1)}>Previous</button><button className="button" disabled={active === steps.length - 1} onClick={() => setActive(active + 1)}>Continue <ArrowRight size={16} /></button></div></div>
  </section>
}

const agentTools = [
  ['Knowledge search', 'Search approved sources', 'No external source access', 'Internal', 'No approval for read', 'Query and source logged', '10 results', 'Review cited source'],
  ['Document retrieval', 'Retrieve authorized records', 'No cross-case retrieval', 'Confidential', 'Role-based access', 'Document ID logged', 'Single case', 'Staff confirms scope'],
  ['Case lookup', 'Read assigned case', 'No record update', 'Sensitive', 'Approval required', 'Access logged', 'One assigned case', 'Reviewer validates need'],
  ['Email drafting', 'Create a draft', 'No autonomous send', 'Internal', 'Human approval', 'Draft activity logged', 'One draft', 'Staff edits and sends'],
  ['Ticket creation', 'Prepare ticket details', 'No priority override', 'Internal', 'Human approval', 'Submission logged', 'One ticket', 'Staff submits'],
]

function AgentControls() {
  const [active, setActive] = useState(0)
  const [mode, setMode] = useState('Approval required')
  const tool = agentTools[active]
  return <section className="section agent-section"><SectionTitle eyebrow="Agentic AI governance" title="Set bounded operating conditions for agent tools" copy="The illustrative agent does not make autonomous consequential decisions." />
    <div className="agent-layout"><div className="agent-rail"><div className="agent-icon"><Bot /></div><h3>Case Summary Agent</h3><label className="field"><span>Operating mode</span><select value={mode} onChange={e => setMode(e.target.value)}>{['Observe', 'Recommend', 'Approval required', 'Preapproved limited action'].map(x => <option key={x}>{x}</option>)}</select></label>{agentTools.map((t, i) => <button onClick={() => setActive(i)} className={active === i ? 'active' : ''} key={t[0]}>{t[0]}<ChevronRight size={15} /></button>)}</div>
      <article className="tool-detail"><div><Label>Tool boundary</Label><span className="status amber">{mode}</span></div><h3>{tool[0]}</h3><dl>{[['Allowed action', tool[1]], ['Restricted action', tool[2]], ['Data boundary', tool[3]], ['Approval requirement', tool[4]], ['Logging', tool[5]], ['Maximum action scope', tool[6]], ['Human-review point', tool[7]]].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></article></div>
  </section>
}

function ProviderAssessment() {
  const [active, setActive] = useState(0)
  const p = providers[active]
  return <section className="section provider-section"><SectionTitle eyebrow="Third-party AI assessment" title="Document provider terms, evidence, and dependencies" copy="Fictional provider names and records are used for demonstration." />
    <div className="provider-layout"><div className="provider-list">{providers.map((provider, i) => <button key={provider.name} onClick={() => setActive(i)} className={active === i ? 'active' : ''}><span className="provider-mark">{provider.name.split(' ').map(w => w[0]).join('').slice(0, 2)}</span><span><strong>{provider.name}</strong><small>{provider.service}</small></span><ChevronRight /></button>)}</div>
      <article className="provider-card"><div><Label>Provider record</Label><span className={`status ${statusTone(p.contract)}`}>{p.contract}</span></div><h3>{p.name}</h3><dl>{[['Service type', p.service], ['Intended use', p.use], ['Data submitted', p.data], ['Data retention', p.retention], ['Training-use terms', p.training], ['Hosting region', p.region], ['Subprocessors', 'List requires validation'], ['Security evidence', p.status], ['Model versioning', 'Change notice documented'], ['Exit considerations', 'Export and replacement plan required'], ['Review date', p.review]].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl><p className="illustrative">Illustrative product data</p></article></div>
  </section>
}

function Frameworks() {
  const catalogs = ['NIST AI Risk Management Framework', 'OWASP guidance for generative AI and LLM applications', 'MITRE ATLAS', 'Organizational security and privacy policies', 'Agency responsible-AI requirements']
  const [active, setActive] = useState(0)
  return <section className="section frameworks"><SectionTitle eyebrow="Framework mapping" title="Map organizational controls to recognized AI-risk resources" copy="Reference catalogs are configurable and support governance evidence organization." />
    <div className="mapping"><div>{catalogs.map((x, i) => <button className={active === i ? 'active' : ''} onClick={() => setActive(i)} key={x}><FileCheck2 /><span><strong>{x}</strong><small>Configurable reference mapping</small></span><ChevronRight /></button>)}</div><article><Label>Selected catalog</Label><h3>{catalogs[active]}</h3><div className="mapping-row"><span>Organizational control</span><ArrowRight /><span>Reference entry</span></div><div className="mapping-row"><span>Assessment evidence</span><ArrowRight /><span>Review note</span></div><p>Status: <span className="status amber">Requires validation</span></p></article></div>
    <p className="boundary-note"><AlertTriangle size={17} /> Framework mappings support governance and evidence organization. They do not constitute certification or a legal determination of compliance.</p>
  </section>
}

const governanceSteps = ['AI use case proposed', 'Owner assigned', 'Data and architecture documented', 'Risk assessment completed', 'Required reviewers consulted', 'Conditions and exceptions recorded', 'Deployment approved or restricted', 'Runtime monitoring activated', 'Periodic review scheduled', 'Changes trigger reassessment']

function Governance() {
  const actions = ['Assign reviewer', 'Record condition', 'Request evidence', 'Approve with conditions', 'Restrict a use', 'Schedule reassessment', 'Open remediation']
  const [progress, setProgress] = useState(4)
  const [activity, setActivity] = useState<string[]>(['Architecture evidence requested'])
  const act = (action: string) => { setActivity(a => [`${action} recorded locally`, ...a].slice(0, 3)); setProgress(Math.min(9, progress + 1)) }
  return <section className="section dark-section" id="governance" aria-labelledby="governance-title">
    <SectionTitle eyebrow="Governance and approval workflow" title="Make decisions, conditions, and evidence traceable" copy="Simulate workflow actions in this browser. No information is transmitted." id="governance-title" />
    <div className="governance-layout"><ol className="approval-flow">{governanceSteps.map((s, i) => <li className={i <= progress ? 'done' : ''} key={s}><span>{i < progress ? <Check size={14} /> : i + 1}</span><strong>{s}</strong></li>)}</ol>
      <aside className="action-panel"><Label>Local workflow simulation</Label><h3>Document Review Service</h3><div className="action-grid">{actions.map(x => <button onClick={() => act(x)} key={x}>{x}<ArrowRight size={14} /></button>)}</div><h4>Recent activity</h4>{activity.map((x, i) => <p className="activity-item" key={`${x}${i}`}><CircleDot size={13} />{x}</p>)}<small>Stored only in page memory for this session.</small></aside></div>
  </section>
}

const chartData = [
  { name: 'Security', value: 11 }, { name: 'Privacy', value: 7 }, { name: 'Behavior', value: 9 }, { name: 'Third party', value: 6 }, { name: 'Governance', value: 8 },
]
const pieData = [{ name: 'Approved', value: 14 }, { name: 'Under review', value: 6 }, { name: 'Restricted', value: 3 }, { name: 'Ownership required', value: 1 }]
const colors = ['#62d6e8', '#a98cf5', '#f4b860', '#ef6a6a']

function Analytics() {
  const groups = {
    'AI inventory': [['Registered AI systems', '24'], ['Systems under review', '6'], ['Ownership required', '3'], ['Models in production', '7'], ['Third-party services', '9'], ['Retired systems', '4']],
    'Assessment': [['Assessments completed', '18'], ['Assessments overdue', '3'], ['Open findings', '41'], ['Evidence requests', '8'], ['Conditional approvals', '5']],
    'Governance': [['Approved use cases', '14'], ['Restricted use cases', '3'], ['Active exceptions', '4'], ['Expiring exceptions', '2'], ['Reviews due', '7'], ['Policy coverage', '76%']],
    'Runtime': [['Policy events', '38'], ['Sensitive-data events', '6'], ['Restricted tool calls', '4'], ['Unapproved model requests', '3'], ['Human-review events', '12'], ['Integration health', 'Review']],
    'Remediation': [['Findings assigned', '31'], ['Findings in progress', '17'], ['Overdue remediation', '5'], ['Retesting status', '8 due'], ['Closed findings', '22'], ['Reopened findings', '2']],
  }
  const [active, setActive] = useState('AI inventory')
  return <section className="section analytics-section" id="analytics" aria-labelledby="analytics-title">
    <SectionTitle eyebrow="Analytics and recommended measures" title="Review posture signals without treating metrics as outcomes" copy="Every value below is fictional and demonstrates a potential product view." id="analytics-title" />
    <Tabs items={Object.keys(groups)} active={active} onChange={setActive} label="Analytics category" />
    <div className="analytics-grid"><div className="analytics-metrics">{groups[active as keyof typeof groups].map(([label, value]) => <div key={label}><small>{label}</small><strong>{value}</strong><span>Illustrative product data</span></div>)}</div>
      <div className="chart-card"><div><strong>Findings by risk domain</strong><small>Illustrative product data</small></div><ResponsiveContainer width="100%" height={230}><BarChart data={chartData} margin={{ left: -20 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dfe5eb" /><XAxis dataKey="name" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip /><Bar dataKey="value" fill="#3769e8" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div>
      <div className="chart-card"><div><strong>Portfolio approval state</strong><small>Illustrative product data</small></div><ResponsiveContainer width="100%" height={180}><PieChart><Pie data={pieData} dataKey="value" nameKey="name" innerRadius={48} outerRadius={76}>{pieData.map((_, i) => <Cell key={i} fill={colors[i]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer><ul className="chart-legend">{pieData.map((x, i) => <li key={x.name}><span style={{ background: colors[i] }} />{x.name}: {x.value}</li>)}</ul></div></div>
  </section>
}

function RoleExperience() {
  const names = Object.keys(roles)
  const [active, setActive] = useState(names[0])
  return <section className="section role-section"><SectionTitle eyebrow="Role-based experiences" title="Give each team the context needed for its decisions" copy="Select a role to preview a focused workspace." />
    <div className="role-layout"><div className="role-list" role="tablist" aria-label="User role">{names.map(x => <button role="tab" aria-selected={active === x} className={active === x ? 'active' : ''} onClick={() => setActive(x)} key={x}>{x}<ChevronRight size={16} /></button>)}</div>
      <div className="role-preview" role="tabpanel"><div className="preview-top"><Label>{active} workspace</Label><Settings2 size={18} /></div><h3>Good afternoon</h3><p>Review the fictional portfolio items relevant to your responsibilities.</p><div className="role-cards">{roles[active as keyof typeof roles].map((x, i) => <div key={x}><span>{i + 1 < 10 ? `0${i + 1}` : i + 1}</span><strong>{x}</strong><small>{i % 2 ? 'Review current status' : '3 items need attention'}</small></div>)}</div><p className="illustrative">Illustrative product data</p></div></div>
  </section>
}

const architecture = [
  ['AI development ecosystem', Code2, ['Code repositories', 'Data pipelines', 'Model registries', 'ML platforms', 'CI/CD', 'Testing tools']],
  ['AI runtime ecosystem', Zap, ['AI applications', 'AI agents', 'AI gateways', 'Model APIs', 'Retrieval systems', 'Tools', 'Hosted models']],
  ['Enterprise context', Cloud, ['Cloud security', 'Identity', 'Data catalog', 'CMDB', 'Application portfolio', 'Procurement', 'Privacy tools', 'SIEM', 'Ticketing']],
  ['MTX AISPM', Network, ['AI inventory', 'Ownership', 'Lineage', 'Risk assessment', 'Policy mapping', 'Runtime events', 'Findings', 'Approvals', 'Remediation', 'Reporting']],
  ['User experiences', Users, ['Executive posture view', 'Governance workspace', 'Engineering queue', 'Security operations', 'Audit and evidence']],
] as const

function Architecture() {
  const [active, setActive] = useState(3)
  const Icon = architecture[active][1]
  return <section className="section dark-section"><SectionTitle eyebrow="Integration architecture" title="Connect AISPM with approved enterprise context" copy="The diagram presents integration categories, not validated vendor connections." />
    <div className="architecture" role="tablist" aria-label="Architecture layer">{architecture.map(([name, LayerIcon], i) => <button key={name} role="tab" aria-selected={active === i} onClick={() => setActive(i)} className={active === i ? 'active' : ''}><LayerIcon /><strong>{name}</strong><small>{architecture[i][2].length} context types</small></button>)}</div>
    <div className="architecture-detail" role="tabpanel"><Icon /><div><Label>Selected architecture layer</Label><h3>{architecture[active][0]}</h3></div><div className="architecture-items">{architecture[active][2].map(x => <span key={x}>{x}</span>)}</div></div>
  </section>
}

function Roadmap() {
  const [active, setActive] = useState(0)
  return <section className="section roadmap-section"><SectionTitle eyebrow="Deployment and adoption roadmap" title="Build capability in phases shaped by organizational scope" copy="No fixed implementation duration is implied." />
    <div className="roadmap-tabs" role="tablist" aria-label="Adoption phase">{roadmap.map((r, i) => <button role="tab" aria-selected={active === i} className={active === i ? 'active' : ''} onClick={() => setActive(i)} key={r.name}><span>Phase {i + 1}</span><strong>{r.name}</strong></button>)}</div>
    <div className="roadmap-panel" role="tabpanel"><div><Label>Phase {active + 1}</Label><h3>{roadmap[active].name}</h3></div><div className="check-list">{roadmap[active].items.map(x => <span key={x}><Check size={15} />{x}</span>)}</div></div>
  </section>
}

function OfferingAndMaturity() {
  const offerings = [
    ['AISPM platform', Boxes, ['AI asset inventory', 'Ownership management', 'Data and model lineage', 'Risk assessments', 'Policy and control mapping', 'Approval workflows', 'Runtime-event management', 'Exceptions and remediation', 'Analytics and reporting']],
    ['Implementation services', Workflow, ['AI ecosystem discovery', 'Governance design', 'Integration configuration', 'Inventory development', 'Assessment configuration', 'Policy mapping', 'Runtime architecture', 'Testing', 'Training and deployment']],
    ['Managed services', Users, ['Requires confirmation of MTX offering', 'Service coverage and responsibilities require validation', 'No continuous-monitoring commitment is presented']],
  ] as const
  return <><section className="section offering-section"><SectionTitle eyebrow="Product and services model" title="Separate platform capability from delivery responsibility" />
    <div className="offering-grid">{offerings.map(([name, Icon, items]) => <article key={name}><Icon /><h3>{name}</h3><ul>{items.map(x => <li key={x}><Check size={14} />{x}</li>)}</ul>{name === 'Managed services' && <span className="status amber">Requires validation</span>}</article>)}</div>
  </section>
  <section className="section maturity-section"><SectionTitle eyebrow="Evidence and readiness" title="Product maturity and operating evidence" copy="Status labels distinguish presented capability from items that need deployment-specific validation." />
    <div className="maturity-table table-scroll"><table><thead><tr><th>Capability area</th><th>Status</th><th>Evidence note</th></tr></thead><tbody>
      <tr><th scope="row">Inventory and assessment workspace</th><td><span className="status green">Available</span></td><td>Prototype interaction available</td></tr>
      <tr><th scope="row">Integration and control configuration</th><td><span className="status cyan">Configured per deployment</span></td><td>Depends on selected systems and architecture</td></tr>
      <tr><th scope="row">Provider-specific connectors</th><td><span className="status amber">Requires validation</span></td><td>Support claims must be confirmed</td></tr>
      <tr><th scope="row">Additional workflow capability</th><td><span className="status slate">Planned</span></td><td>Roadmap statement requires MTX approval</td></tr>
    </tbody></table></div>
  </section></>
}

function Why() {
  const items = [
    ['A connected AI inventory', 'Link AI applications, models, agents, datasets, providers, owners, and deployment status.', GitBranch],
    ['Risk viewed in context', 'Connect findings with business purpose, data sensitivity, architecture, controls, and ownership.', FileSearch],
    ['Governance tied to operations', 'Manage assessments, approvals, conditions, exceptions, runtime events, and remediation within one operating view.', BadgeCheck],
    ['Lifecycle support', 'Apply governance from initial use-case review through development, production monitoring, change, and retirement.', Workflow],
  ] as const
  return <section className="section why-section"><SectionTitle eyebrow="Why MTX AISPM" title="A practical operating layer for AI risk and governance" />
    <div className="why-grid">{items.map(([title, copy, Icon], i) => <article key={title}><span>0{i + 1}</span><Icon /><h3>{title}</h3><p>{copy}</p></article>)}</div>
  </section>
}

function Contact() {
  const [sent, setSent] = useState(false)
  const submit = (e: FormEvent) => { e.preventDefault(); setSent(true) }
  return <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="contact-copy"><Label>Request a conversation</Label><h2 id="contact-title">Build a governed view of AI adoption and risk</h2><p>Explore how MTX AI Security Posture Management can connect AI inventory, risk assessments, policies, runtime events, and remediation.</p><div className="contact-links"><a href="#contact-form">Request an AISPM Demonstration <ArrowRight /></a><a href="#contact-form">Schedule an AI Security Assessment <ArrowRight /></a><a href="#contact-form">Discuss an AI Governance Roadmap <ArrowRight /></a></div><p className="local-note"><ShieldCheck /> Prototype form: information remains in this browser and is not transmitted.</p></div>
    <div className="contact-form-wrap" id="contact-form">{sent ? <div className="confirmation" role="status"><span><Check /></span><h3>Request recorded locally</h3><p>This prototype did not transmit your information. Connect the form to an approved contact workflow before publication.</p><button className="button secondary" onClick={() => setSent(false)}>Submit another demonstration</button></div> :
      <form onSubmit={submit}><div className="form-grid"><label className="field"><span>Name</span><input required autoComplete="name" /></label><label className="field"><span>Organization</span><input required autoComplete="organization" /></label><label className="field"><span>Role</span><input required autoComplete="organization-title" /></label><label className="field"><span>Email</span><input required type="email" autoComplete="email" /></label><label className="field"><span>AI adoption stage</span><select required defaultValue=""><option value="" disabled>Select a stage</option><option>Exploring</option><option>Piloting</option><option>Scaling</option><option>Operating</option></select></label><label className="field"><span>Primary concern</span><select required defaultValue=""><option value="" disabled>Select a concern</option><option>Inventory</option><option>Risk assessment</option><option>Runtime context</option><option>Governance</option></select></label><label className="field full"><span>Current governance approach</span><input placeholder="Optional" /></label><label className="field full"><span>Message</span><textarea rows={4} placeholder="Optional context" /></label></div><button className="button" type="submit">Request a local demonstration <ArrowRight size={16} /></button><small>Required fields are marked by browser validation.</small></form>}</div>
  </section>
}

function App() {
  return <><a className="skip-link" href="#main">Skip to main content</a><Header /><main id="main"><div id="top" /><Hero /><Scope /><Challenges /><Lifecycle /><Ecosystem /><Inventory /><ShadowReview /><RiskWorkspace /><Lineage /><PolicyBuilder /><Runtime /><PromptScenario /><AgentControls /><ProviderAssessment /><Frameworks /><Governance /><Analytics /><RoleExperience /><Architecture /><Roadmap /><OfferingAndMaturity /><Why /><Contact /></main>
    <footer><a className="brand footer-brand" href="#top"><span className="brand-mark"><Network size={20} /></span><span><strong>MTX AISPM</strong><small>AI security posture, in context.</small></span></a><p>Static product prototype · Fictional systems and data · No information is transmitted</p><a href="#top">Back to top <ArrowRight size={15} /></a></footer>
    <a className="back-top" href="#top" aria-label="Back to top"><ChevronRight /></a></>
}

export default App
