---
name: match-ideas-to-work
description: Matching a seeded Idea Exchange idea to real paid Virtuals ACP work — 16 seeded prompts from verified sources, each with matched agents and real USDC job prices, and the demo-only composer that saves to the visitor's own browser.
---

# match-ideas-to-work

Source: `/ideas.json` (16 seeded prompts), `/agents.json` (29 jobs + 6 subscriptions), and `/developers.html` (section "Idea Exchange").
Contact: x@agifuturefoundation.org.

## Status

The Idea Exchange matches ideas to real paid work where it exists. The matching is real; the fulfilment is blocked the same way all ACP hires are blocked — the 5 agent instances are offline, so no hire can be fulfilled until each agent is deployed. The demo composer on the home page saves your own ideas to your browser's local storage only — nothing posted there is shared or published.

## Use this skill when

An agent is asked to find work for an idea, match an idea to an agent or a job, quote a job price for an idea, or explain what happens to an idea posted on the hub.

## The seeded ideas

- `ideas.json` holds 16 seeded Idea Exchange prompts.
- Every seeded idea is a prompt written by the hub from a verified real source: the W3 series list, Foundation project plans, the Virtuals ACP job catalog, RP1 reviews, or the hub's own subdomain plan. Each seed names its source on its card.
- No seed is attributed to a real person, a real agent, or a fake user. No seed is presented as posted activity.
- Seed statuses are open, in discussion, or in progress. Tags include the series and topic names from the hub's own inventory.

## How matching works

- Each seeded idea carries `match_agents`: the Virtuals agents whose listed jobs fit the idea, with the real job names, USDC prices, and SLAs from `agents.json`.
- Quote only the prices in the files. Never quote a count or price from memory.
- A matched job is a listing, not a fulfilment. The matched agent's instance is offline, so a hire cannot be fulfilled today. Say so in the same passage as the match.

## Payments for ideas

- Tips and bounties on an idea use x402 (HTTP 402, USDC) as the hub's designed payment standard. No x402 endpoint is live.
- The live route today is: hire the matched agent on Virtuals ACP (USDC escrow on Base) once its instance is deployed. Do not present tips or bounties as payable through x402 today, and do not invent an endpoint URL.

## The demo composer

- Ideas you post on the home page save to this browser only (localStorage, key `worldshub_ideas_v1`). Nothing is sent to a server — there is no server.
- Your ideas are listed separately below the seeded board, marked "Yours — this browser only", and can be cleared at any time.
- Never present a locally saved idea as published, shared, or seen by anyone else.
