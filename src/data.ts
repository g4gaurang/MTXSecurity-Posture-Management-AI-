export type InventoryItem = {
  id: number
  name: string
  purpose: string
  owner: string
  model: string
  data: string
  stage: string
  criticality: string
  assessment: string
  approval: string
  findings: number
  review: string
  description: string
  prohibited: string
}

export const challenges = [
  { title: 'Incomplete AI inventory', challenge: 'AI applications, embedded features, models, agents, and third-party services may enter through different business and technology channels.', response: 'Build a governed inventory from configured technical integrations, procurement information, application portfolios, and owner attestations.', roles: 'CISO · AI governance · Platform', info: 'Cloud metadata, procurement records, owner attestation', capability: 'Connected asset registration', control: 'Ownership and registration review', measure: 'Assets awaiting ownership' },
  { title: 'Unknown data use', challenge: 'Teams may lack a clear view of which datasets, prompts, documents, records, or knowledge sources an AI system uses.', response: 'Connect AI assets to documented data sources, classifications, lineage, approved purposes, and handling requirements.', roles: 'Privacy · Data office · App owners', info: 'Data sources, purpose, classification, retention', capability: 'Data and model lineage', control: 'Data-use review', measure: 'Systems missing classification' },
  { title: 'Inconsistent risk assessment', challenge: 'AI projects may be evaluated differently across departments and delivery teams.', response: 'Apply configurable assessment templates, review criteria, evidence requirements, approval workflows, and exception processes.', roles: 'Risk · Legal · Security', info: 'Use case, architecture, evidence, reviewers', capability: 'Assessment workflow', control: 'Release decision with conditions', measure: 'Assessments overdue' },
  { title: 'Prompt and application-layer attacks', challenge: 'AI applications may be affected by malicious instructions, unsafe tool calls, retrieval manipulation, excessive agency, or insecure output handling.', response: 'Document application controls and monitor supported runtime events through configured gateways or instrumentation.', roles: 'AppSec · SOC · AI engineering', info: 'Architecture, tools, telemetry, control point', capability: 'Runtime event context', control: 'Tool restriction and review routing', measure: 'Events routed for review' },
  { title: 'Third-party model and service risk', challenge: 'External models, APIs, datasets, plugins, and AI services may introduce security, privacy, availability, and contractual concerns.', response: 'Maintain provider records, approved-use conditions, assessments, dependencies, contracts, and review dates.', roles: 'Procurement · Legal · Security', info: 'Terms, evidence, hosting, versions', capability: 'Provider assessment', control: 'Approved-use conditions', measure: 'Provider reviews due' },
  { title: 'Governance disconnected from operations', challenge: 'Policy documents may not remain connected to deployed systems, runtime evidence, exceptions, and remediation.', response: 'Link policies and control requirements to AI assets, owners, approvals, findings, monitoring, and evidence.', roles: 'Governance · Audit · Product owners', info: 'Policies, assets, findings, evidence', capability: 'Control-to-asset mapping', control: 'Change-triggered reassessment', measure: 'Controls awaiting evidence' },
]

export const lifecycle = [
  { name: 'Discover', summary: 'Collect candidate asset context from approved sources.', items: ['Cloud resources', 'Model registries', 'Code repositories', 'AI gateways', 'Application inventories', 'SaaS-management tools', 'Procurement records', 'Owner attestations'] },
  { name: 'Register', summary: 'Create an accountable record for the proposed or deployed use.', items: ['System name', 'Owner', 'Business purpose', 'Users', 'Model and provider', 'Data sources', 'Deployment environment', 'Criticality', 'Lifecycle status'] },
  { name: 'Assess', summary: 'Review risk and supporting evidence before a decision.', items: ['Security assessment', 'Privacy review', 'Data-use review', 'Architecture review', 'Provider review', 'Application risk', 'Human oversight', 'Testing evidence'] },
  { name: 'Approve', summary: 'Record the decision, reviewers, conditions, and evidence.', items: ['Required reviewers', 'Approval conditions', 'Exceptions', 'Compensating controls', 'Release decision', 'Review date', 'Evidence'] },
  { name: 'Monitor', summary: 'Observe supported changes and policy events.', items: ['Deployment changes', 'Runtime policy events', 'Model or provider changes', 'Data-source changes', 'Control status', 'Incident findings', 'Review expiration'] },
  { name: 'Improve', summary: 'Track remediation and renew the operating decision.', items: ['Findings', 'Remediation', 'Retesting', 'Policy updates', 'Model changes', 'Lessons learned', 'Renewal review'] },
]

export const inventory: InventoryItem[] = [
  { id: 1, name: 'Benefits Assistant', purpose: 'Explain public program information', owner: 'Digital Services', model: 'Northstar / NS-LM 3', data: 'Public', stage: 'Production', criticality: 'Moderate', assessment: 'Complete', approval: 'Approved', findings: 1, review: '18 Nov 2026', description: 'Public information assistant grounded in approved program content.', prohibited: 'Eligibility decisions or case-specific advice.' },
  { id: 2, name: 'Document Review Service', purpose: 'Support document classification', owner: 'Operations', model: 'Internal classifier 2.4', data: 'Confidential', stage: 'Pilot', criticality: 'High', assessment: 'Under review', approval: 'Under review', findings: 4, review: '02 Oct 2026', description: 'Classifies documents to support specialist review queues.', prohibited: 'Automated adverse action or final records decisions.' },
  { id: 3, name: 'Staff Knowledge Assistant', purpose: 'Retrieve internal policy guidance', owner: 'Knowledge Office', model: 'Meridian / M-Assist', data: 'Internal', stage: 'Production', criticality: 'Moderate', assessment: 'Conditional', approval: 'Approved', findings: 2, review: '24 Sep 2026', description: 'Retrieval assistant for approved internal policies.', prohibited: 'Retrieval outside the authorized staff corpus.' },
  { id: 4, name: 'Forecasting Model', purpose: 'Operational demand planning', owner: 'Planning', model: 'Internal forecast 7.1', data: 'Internal', stage: 'Development', criticality: 'Moderate', assessment: 'Complete', approval: 'Restricted', findings: 1, review: '11 Dec 2026', description: 'Produces planning estimates from aggregated operational history.', prohibited: 'Individual-level decisions or performance assessment.' },
  { id: 5, name: 'Case Summary Agent', purpose: 'Draft case summaries for review', owner: 'Ownership required', model: 'Civic Language / CL-2', data: 'Sensitive personal data', stage: 'Discovery', criticality: 'High', assessment: 'Not started', approval: 'Ownership required', findings: 6, review: 'Not scheduled', description: 'Candidate agent observed in an approved application portfolio review.', prohibited: 'Sending, publishing, or updating case records without review.' },
  { id: 6, name: 'Archive Search Prototype', purpose: 'Evaluate semantic archive search', owner: 'Records', model: 'Northstar / Embed 2', data: 'Confidential', stage: 'Retired', criticality: 'Low', assessment: 'Archived', approval: 'Retired', findings: 0, review: 'Closed', description: 'Retired evaluation of semantic retrieval for archived material.', prohibited: 'Production or public use.' },
  { id: 7, name: 'Code Assistance Pilot', purpose: 'Support approved development tasks', owner: 'Engineering Enablement', model: 'Meridian / Code M-4', data: 'Internal', stage: 'Pilot', criticality: 'Moderate', assessment: 'Under review', approval: 'Under review', findings: 3, review: '07 Oct 2026', description: 'Limited code assistance pilot in selected repositories.', prohibited: 'Use with credentials, production records, or restricted repositories.' },
]

export const riskDomains = [
  { name: 'Security', tone: 'red', items: ['Prompt injection', 'Insecure output handling', 'Excessive permissions', 'Unsafe tool access', 'Model endpoint exposure', 'Dependency risk', 'Secrets handling'] },
  { name: 'Privacy & data', tone: 'violet', items: ['Sensitive prompt data', 'Training-data use', 'Retention', 'Provider data handling', 'Cross-border processing', 'Data minimization', 'User notice'] },
  { name: 'Model & application', tone: 'amber', items: ['Unsupported output', 'Performance drift', 'Retrieval quality', 'Hallucination risk', 'Bias concerns', 'Human review', 'Failure handling'] },
  { name: 'Third party', tone: 'cyan', items: ['Model provider', 'Dataset origin', 'Open-source components', 'Contract terms', 'Version changes', 'Availability dependency', 'Provider monitoring'] },
  { name: 'Governance', tone: 'green', items: ['Named owner', 'Intended purpose', 'Approval', 'Documentation', 'Testing', 'Monitoring', 'Incident procedures', 'Review cadence'] },
]

export const roles = {
  'CISO': ['AI asset inventory', 'Priority findings', 'Runtime events', 'Third-party exposure', 'Remediation', 'Policy coverage'],
  'Chief AI or data officer': ['AI portfolio', 'Business ownership', 'Model usage', 'Governance status', 'Deployment pipeline', 'Review schedule'],
  'AI governance leader': ['Use-case assessments', 'Approvals', 'Conditions', 'Exceptions', 'Framework mappings', 'Evidence'],
  'AI engineer': ['Assigned systems', 'Pipeline findings', 'Model versions', 'Required controls', 'Testing', 'Remediation tasks'],
  'Application owner': ['Intended use', 'Data sources', 'Assessment status', 'Open findings', 'Approval conditions', 'Review date'],
  'Privacy or legal reviewer': ['Data classifications', 'Provider terms', 'Retention', 'Intended purpose', 'User notice', 'Exceptions'],
  'Security analyst': ['Runtime events', 'Prompt-related findings', 'Tool-call activity', 'Model endpoint events', 'Investigation context', 'Escalation'],
}

export const providers = [
  { name: 'Northstar Model Services', service: 'Commercial model API', use: 'Public information and embeddings', data: 'Public or approved confidential data', retention: 'Per deployment agreement', training: 'Requires contract validation', region: 'Selected hosting region', status: 'Security evidence under review', contract: 'Conditional', review: '18 Nov 2026' },
  { name: 'Meridian AI Platform', service: 'Managed AI platform', use: 'Internal staff and code assistance', data: 'Internal data within approved use', retention: 'Configurable; validation required', training: 'Opt-out term recorded', region: 'Regional deployment selected', status: 'Evidence received', contract: 'Approved with conditions', review: '24 Sep 2026' },
  { name: 'Civic Language Systems', service: 'Language model service', use: 'Case summary evaluation', data: 'Sensitive data proposed', retention: 'Terms awaiting review', training: 'Terms awaiting review', region: 'Requires validation', status: 'Evidence requested', contract: 'Under review', review: 'Not scheduled' },
]

export const roadmap = [
  { name: 'Establish governance scope', items: ['Define AI assets', 'Identify stakeholders', 'Establish ownership', 'Select risk domains', 'Define assessment criteria'] },
  { name: 'Build the initial inventory', items: ['Connect selected systems', 'Import known use cases', 'Assign owners', 'Classify data and models', 'Identify review gaps'] },
  { name: 'Operationalize assessment', items: ['Configure questionnaires', 'Establish review workflows', 'Link controls', 'Record evidence', 'Manage approvals and exceptions'] },
  { name: 'Add runtime visibility', items: ['Identify control points', 'Configure supported telemetry', 'Define runtime policies', 'Route security events', 'Test escalation'] },
  { name: 'Expand and improve', items: ['Add business units', 'Add integrations', 'Refine policies', 'Review model and provider changes', 'Track remediation', 'Reassess higher-risk systems'] },
]
