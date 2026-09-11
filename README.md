# MTX AI Security Posture Management prototype

## Purpose

This repository contains an interactive, static product prototype for MTX AI Security Posture Management \(AISPM\). It demonstrates how AI inventory, ownership, risk assessments, policy context, runtime events, approvals, exceptions, and remediation could be presented in one browser experience.

The systems, providers, findings, events, and metrics shown in the prototype are fictional. The site does not connect to customer systems, process prompts, scan AI applications, or transmit form data.

## Technology stack

* React
* TypeScript
* Vite
* Responsive CSS
* Lucide React icons
* Recharts
* Local TypeScript data objects

## Local setup

Node.js 22 or a compatible current release is recommended.

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production build

```bash
npm run lint
npm run build
npm run preview
```

Vite writes the static site to `dist`. The Vite base path is relative, so generated assets work when GitHub Pages hosts the site below a repository subdirectory.

## GitHub Pages deployment

The workflow at `.github/workflows/deploy-pages.yml` builds and deploys `dist` after a push to `main`. In the repository settings, choose **GitHub Actions** as the Pages source. The workflow also supports manual dispatch.

## Product boundaries

### Design\-time assessment

The prototype shows reviews of documented use cases, architectures, datasets, models, providers, controls, and intended deployment patterns. Assessment quality depends on the evidence available to reviewers.

### Runtime monitoring

Prompt, response, retrieval, tool, and agent events require a configured gateway, proxy, SDK, logging layer, provider API, or application instrumentation. A dashboard without a supported event source does not provide runtime monitoring.

### Inline enforcement

Blocking or transforming content requires an approved execution path that can apply the configured action. Selecting a proposed control in the prototype does not deploy that control.

### Discovery and lineage

AI inventory depends on configured sources such as cloud platforms, model registries, application portfolios, procurement records, code repositories, security tools, and owner attestations. Lineage depends on available metadata and organizational practices. The prototype does not imply access to provider\-controlled training data.

## Content and sample data

* `src/data.ts` contains fictional inventory records, challenge content, risk domains, role views, provider records, and roadmap phases.
* `src/App.tsx` contains interface sections, interaction behavior, and supporting product copy.
* `src/styles.css` contains the responsive visual system and accessibility states.

## Updating risk domains

Edit the `riskDomains` array in `src/data.ts`. Keep each domain name, display tone, and list of review topics. Treat risk presentation as reviewer context rather than an objective or final decision.

## Replacing the contact action

The demonstration form currently uses local React state and does not submit information. Replace the `submit` handler in the `Contact` component in `src/App.tsx` with an approved contact workflow. Add privacy notice, consent, retention, validation, abuse protection, and error handling appropriate to that workflow before enabling transmission.

## Product\-claims review

Before external publication:

* Confirm product maturity labels and roadmap statements with MTX product leadership.
* Validate integration, telemetry, runtime control, and enforcement claims against supported architecture.
* Confirm third\-party assessment fields and applicable policy or legal language.
* Confirm whether implementation or managed services are offered and document service responsibilities.
* Review framework references as mappings, not certification or legal conclusions.
* Keep fictional data labels visible until approved evidence replaces sample values.
