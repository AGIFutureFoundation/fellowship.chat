# MONETIZATION — fellowship.chat revenue inventory

**Status: 2026-11-06. Source of truth for every revenue stream on this site.**
**Rules:** never invent revenue, customers, sales, or subscribers; never present a blocked stream as earning; nonprofit/for-profit lines exact. $0 has been earned through this site. Nothing on this site takes a payment today.

## Summary

| # | Stream | Status | Price | Unblocker |
|---|--------|--------|-------|-----------|
| 1 | Virtuals agent jobs (29) | Listed — blocked | $1–$150 USDC each | Deploy an instance per agent |
| 2 | Virtuals subscriptions (6) | Listed — blocked | $5–$30 USDC / period | Deploy an instance per agent |
| 3 | x402 tips on ideas | Planned | No price set | x402 endpoint must exist |
| 4 | x402 / ACP bounties | Planned | Priced via matched jobs | Deploy an instance per agent |
| 5 | Idea Exchange matched hires | Listed — blocked | Same as stream 1 | Deploy an instance per agent |
| 6 | Fellowship donations / tithes | Live (email-arranged) | No price set | None — email only, no payment link |
| 7 | Foundation donations / grants | Live (email-arranged) | No price set | None — email only, no payment link |
| 8 | BuilderSpace sponsorships | Open — none confirmed | No price set | Signed sponsor agreement |
| 9 | fellowship.chat premium tier | Does not exist | — | — |
| 10 | PBC / SmartCiti.X raises | Proposed only — NOT revenue | $0 raised | Formation + counsel + issuance |

**#1 unblocker overall: deploy the 5 Virtuals agents' instances.** Settle WAVE's hosting payment first, then deploy an instance for each agent. Until then, no hire can be fulfilled and no agent revenue can be earned.

---

## 1. Virtuals agent jobs — 29 jobs, listed-but-blocked

All 29 jobs are live listings on the Virtuals ACP Offerings marketplace (verified 2026-11-06 15:00 PST, read-only check). All have Require Funds ON. All are priced in USDC with the SLA shown. Payment rail: ACP USDC escrow on Base (Job created → Budget set → Job funded → Work submitted → Job completed; a verifier agent appears on completion — verification precedes payment release).

**Status: LISTED — BLOCKED.** The agents' instances are NOT deployed/online to receive and deliver hires. Omega's and WAVE's consoles show "No Instance — Deploy to get online" (verified 2026-11-06); WAVE's console adds that a hosting payment must be settled before it can redeploy. Tactile, ALS, and CMMC are listed with verified jobs/subs and no live instance verified. A hire funded today would wait in escrow with no agent to deliver it.

Hire links on the site open the ACP marketplace root (https://app.virtuals.io/acp) — search the agent name there. Per-agent profile URLs are not on record; none is guessed.

### Omega — 5 jobs + 1 subscription
| Job | Price (USDC) | Turnaround |
|---|---|---|
| hive_coordination_brief | $10 | 24h |
| hive_data_access | $25 | 24h |
| seat_status_check | $5 | 30 min |
| steward_onboarding_pack | $15 | 24h |
| hive_governance_audit | $75 | 72h |
| Subscription: hive_weekly_digest | $15 | 30 days |

### Tactile — 6 jobs + 2 subscriptions
| Job | Price (USDC) | Turnaround |
|---|---|---|
| workflow_plan | $10 | 24h |
| workflow_monitor_report | $5 | 30 min |
| sequencing_data_access | $25 | 24h |
| step_check | $1 | 5 min |
| workflow_template_pack | $15 | 24h |
| workflow_audit | $50 | 48h |
| Subscription: priority_workflow_support | $20 | 30 days |
| Subscription: premium (pre-existing) | $5 | 15 days |

### ALS Researcher — 6 jobs + 1 subscription
| Job | Price (USDC) | Turnaround |
|---|---|---|
| compound_library_snapshot | $10 | 24h |
| compound_research_report | $25 | 48h |
| compound_data_access | $50 | 24h |
| compound_lookup | $2 | 30 min |
| library_growth_report | $15 | 48h |
| compound_screening_pack | $150 | 72h |
| Subscription: library_weekly | $25 | 30 days |

### CMMC — 6 jobs + 1 subscription
| Job | Price (USDC) | Turnaround |
|---|---|---|
| readiness_check | $25 | 24h |
| compliance_gap_report | $50 | 48h |
| compliance_data_access | $10 | 24h |
| control_lookup | $2 | 30 min |
| policy_template | $15 | 24h |
| full_readiness_assessment | $150 | 72h |
| Subscription: compliance_watch | $20 | 30 days |

### WAVE — 6 jobs + 1 subscription
| Job | Price (USDC) | Turnaround |
|---|---|---|
| species_identification | $5 | 30 min |
| animal_voice_dataset | $25 | 48h |
| continuous_animal_voice_access | $50 | 24h |
| sound_clip_id | $1 | 5 min |
| species_acoustic_profile | $15 | 24h |
| expedition_sound_map | $100 | 72h |
| Subscription: field_listener | $30 | 30 days |

**Source:** Virtuals ACP marketplace, verified live 2026-11-06 15:00 PST (read-only reconciliation: all 29 jobs + 6 subscriptions confirmed present with exact prices/SLAs, nothing missing). Data file: `agents.json`.

---

## 2. Virtuals subscriptions — 6, listed-but-blocked

Same status and unblocker as §1. The subscription form on Virtuals has no description field — subscriptions are name/price/duration only. Prices: $5/15d (Tactile premium), $15/30d (Omega hive_weekly_digest), $20/30d (Tactile priority_workflow_support), $25/30d (ALS library_weekly), $20/30d (CMMC compliance_watch), $30/30d (WAVE field_listener).

---

## 3. x402 tips on ideas — planned

**Status: PLANNED. No price set. No endpoint exists.** x402 is the hub's designed payment standard (HTTP 402: server returns a 402 challenge, agent pays USDC on Base, retries with an X-PAYMENT header; a facilitator verifies and settles on-chain). No live x402 endpoint was verified in the family's files or systems (checked 2026-11-06). The Idea Exchange "Tip in USDC (x402)" buttons show the designed flow and take no payment. A tip becomes real only when an x402 endpoint exists for the hub — that is a build + approval step, not a live feature.

---

## 4. x402 / ACP bounties — planned

**Status: PLANNED.** A bounty is a funded job: pick a matched agent from an idea, fund it in USDC through ACP escrow on Base, and the verifier agent releases payment after delivery. The mechanism (ACP escrow) is verified live; the bounty flow itself is not wired on this site, and the agents' instances are offline, so no bounty can be placed or paid here today. Unblocker: deploy the agent instances (§1).

---

## 5. Idea Exchange matched hires — listed-but-blocked

Each seeded idea shows matched Virtuals jobs with real USDC prices and links to the ACP marketplace. The listings are real; the hire is blocked by the same instance-offline blocker as §1. The Idea Exchange composer is a demo (localStorage only) — it creates no listing, no order, and no revenue.

---

## 6. Fellowship donations / tithes — live, email-arranged

**Status: LIVE (arranged by email). No price set. No payment link exists on this site or on the church site.**
- Donation and tithe ONLY, arranged by email to agent@agifellowship.church.
- **No tax-deductibility claim:** no IRS 501(c)(3) determination letter is on file for the Fellowship (CA Nonprofit Religious Corp, Entity B20260229217, filed 2026-05-13, EIN 2026-05-18).
- Give page (live): https://www.agifellowship.church/get-involved/give.html — takes no payment, links to no donation platform.
- No donation route (bank/check/named platform) has been named by the owner yet — open decision. Nothing may be presented as a way to pay until one is named and counsel-reviewed.

---

## 7. Foundation donations / grants — live, email-arranged

**Status: LIVE (arranged by email). No price set. No payment link exists on this site.**
- Donation and grant ONLY (nonprofit track), arranged via x@agifuturefoundation.org.
- **No tax-deductibility claim:** no IRS 501(c)(3) determination letter is on file for the Foundation (CA Nonprofit Public Benefit Corp, Entity B20260196664, filed 2026-04-24, EIN 2026-05-07).
- Nonprofit track donation target (suggested, planning only): $250k–$750k. No amount has been raised through this site.
- The for-profit PBC track is a separate proposed track — see §10. Counsel must choose ONE track before any solicitation; do not run both.

---

## 8. BuilderSpace sponsorships — open, none confirmed

**Status: OPEN — NONE CONFIRMED. No price set. No sponsor named.**
- Sponsorships are being sought for the BuilderSpace hackathon tour (Jan–May 2027). 100 sponsor outreach drafts exist in the mailbox; none has been sent.
- No published tier or price. A sponsor is named only after a signed agreement.
- Source: BuilderSpace Luma events + Hostinger mailbox triage (2026-10-25 / 2026-11-06).

---

## 9. fellowship.chat premium tier — does not exist

No premium tier, no paywall, no price, no checkout. Nothing is sold for access to this hub. If a "go deeper" upsell is added later, it will be labeled planned ("coming soon") with no price until a real offering exists.

---

## 10. PBC / SmartCiti.X raises — proposed only, NOT revenue

**$0 raised. Nothing issued. Not an offer to sell securities.**
- For-profit PBC track (Tranche 1 SAFE $500k–$1.5M suggested, cap $8M–$15M suggested) and SmartCiti.X, Inc. ($25M suggested pre-money, $10M tranched) are PROPOSED only — the entities are not formed, funded, or offered. The Plans pages (plans/numbers.html) carry the "Information only — not an offer to sell securities. Nothing has been issued." banner.
- AGI Corp SAFE and PBC SAFE are alternative issuers, never both for the same round. Issuer must be chosen in writing first (new for-profit PBC, conversion, or AGI Corp). Counsel required before any solicitation.
- Source: corporate paperwork files 27, 29, 31, 32, 46, 52.

---

## What would change each status

| Stream | Exact unblocker |
|---|---|
| Agent jobs / subs / matched hires / bounties | Settle WAVE hosting payment → deploy an instance for each of the 5 agents → verify a hire fulfills end-to-end |
| x402 tips | Build + verify a live x402 endpoint for the hub; owner approves the flow and the recipient address |
| Fellowship / Foundation donations | Owner names a donation route (bank/check/platform) with counsel review; only then add a payment link |
| BuilderSpace sponsorships | A sponsor signs an agreement; only then name them and any amount |
| PBC / SmartCiti.X raises | Formation + counsel + written issuer choice + filed offering documents — a legal process, not a site change |

*Last updated 2026-11-06. Any change to a status above requires re-verification against the live source (Virtuals ACP, webmail, or the corporate files) and an update to this file.*
