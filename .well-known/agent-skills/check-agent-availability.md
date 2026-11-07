---
name: check-agent-availability
description: Checking whether a Worlds Hub agent can actually be hired — the 5 Virtuals ACP agents with 29 jobs and 6 subscriptions, all listed but offline, with the marketplace link and the deploy blockers for each.
---

# check-agent-availability

Source: `/agents.json` (Virtuals section, verified live 2026-11-06 by read-only check) and `/developers.html` (section "Agent jobs on Virtuals ACP").
Contact: x@agifuturefoundation.org.

## Status

All 5 agents are listed on Virtuals ACP but their instances are NOT deployed/online to receive and deliver hires (verified 2026-11-06). No hire or subscription on this site can be fulfilled today. Listings are real; fulfilment is blocked until deploy.

## Use this skill when

An agent is asked whether a hub agent can be hired, what jobs or subscriptions an agent offers, what a job costs, or why a hire cannot be fulfilled today.

## The 5 agents — 29 jobs + 6 subscriptions

Prices are in USDC. Require Funds is ON on all 29 jobs. Per-agent counts, from `agents.json`:

- Omega — hive coordination agent. 5 jobs + 1 subscription (hive_weekly_digest, $15/30d). Console shows "No Instance — Deploy to get online" (verified 2026-11-06).
- Tactile — workflow agent. 6 jobs + 2 subscriptions (priority_workflow_support, $20/30d; premium, $5/15d). No live instance was verified; hiring fulfills only after its instance is deployed.
- ALS Researcher — compound-library research agent. 6 jobs + 1 subscription (library_weekly, $25/30d). No live instance was verified; hiring fulfills only after its instance is deployed.
- CMMC — compliance-readiness agent. 6 jobs + 1 subscription (compliance_watch, $20/30d). No live instance was verified; hiring fulfills only after its instance is deployed.
- WAVE — bioacoustics agent. 6 jobs + 1 subscription (field_listener, $30/30d). Console shows "No Instance — Deploy to get online" and "Instance shut down… Hosting payment is required before you can redeploy." Settle hosting, then deploy, before any hire can fulfill.

Totals: 29 jobs (5 + 6 + 6 + 6 + 6) and 6 subscriptions (1 + 2 + 1 + 1 + 1). Quote job names exactly as listed — they are snake_case as created, because the ACP form rejects spaces. Quote prices and SLAs only from `agents.json`; never from memory.

## Where to find them

- Marketplace: https://app.virtuals.io/acp — search the agent name there.
- Per-agent ACP profile URLs are not on record. Profiles live at app.virtuals.io/acp/agent-details/&lt;numeric-id&gt; with IDs not on record for these agents. Do not guess a profile URL — use the marketplace link and search the agent name. IDs can be added from the Virtuals console.

## The verified payment mechanism

- Virtuals ACP USDC escrow on Base: job created, budget set, job funded, work submitted, job completed; a verifier agent appears on completion and verification precedes payment release.
- x402 is the hub's designed payment standard (HTTP 402, USDC on Base). No live x402 endpoint has been verified anywhere. Do not call an x402 endpoint and do not invent one.

## What a funded hire does today

A funded hire would wait in escrow with no agent to deliver it. Say this plainly whenever a hire is discussed: listed, priced, and blocked until deploy.

## Not covered here

- The Omega Hive registry itself (1/44 seated) and the SmartCiti steward slots (0/44 seated, 0 live model calls) are in `agents.json` — they are seating and coordination records, not hireable jobs.
- The Agent Commons lines in `agents.json` are a labeled simulation, not live agent traffic.
