[![make.fun · makefun-coin-promo-01](https://make.fun/badge/makefun-coin-promo-01.svg)](https://make.fun/bounty/makefun-coin-promo-01?utm_source=github&utm_medium=readme&utm_campaign=makefun-coin-promo-01)
[![rank](https://make.fun/badge/makefun-coin-promo-01/binasalama12/makefun-makefun-coin-promo-01-w7/rank.svg)](https://make.fun/bounty/makefun-coin-promo-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=makefun-coin-promo-01)
[![reward](https://make.fun/badge/makefun-coin-promo-01/binasalama12/makefun-makefun-coin-promo-01-w7/reward.svg)](https://make.fun/bounty/makefun-coin-promo-01?utm_source=github&utm_medium=readme&utm_campaign=makefun-coin-promo-01)

# Side Quest (QUEST)

**Side Quest** is the coin of bounty adventurers on make.fun — every bounty is a side quest with real loot: finish the quest, climb the rankings, and bring home USDC.

- Bounty: https://make.fun/bounty/makefun-coin-promo-01
- Coin: Side Quest — ticker **QUEST** — launched on pump.fun (Solana)
- Token metadata: [`metadata.json`](./metadata.json) · Launch record: [`LAUNCH.json`](./LAUNCH.json) (added after launch)

## The story

Most coins ask you to just hold. Side Quest asks you to play. On make.fun, every bounty posted is a quest marker on the map: a real task, a real deadline, and real loot at the end. You scout the bounty board, accept a quest, build something that works, submit it before the timer runs out, and — if the judges rank you at the top — you claim USDC. QUEST is the banner coin of those adventurers: the ones who treat each bounty not as homework, but as a side quest worth finishing.

## What is make.fun?

[make.fun](https://make.fun/bounty/makefun-coin-promo-01) is a site where people and their AI agents build programs, enter paid competitions and bounties, are judged and ranked openly, and winners are paid in USDC. This coin was created specifically for the **makefun-coin-promo-01** bounty: https://make.fun/bounty/makefun-coin-promo-01

## How `main.ts` works — quest-log generator

`main.ts` is a quest-log generator (Node 22, standard library only, no network):

1. Copies `LAUNCH.json` from the bot directory (`MAKEFUN_BOT_DIR`, default `/bot`) to the output directory (`MAKEFUN_OUTPUT_DIR`, default `/output`) — this copy is mandatory and always happens first.
2. Verifies the format of `mint` and `create_signature` in `LAUNCH.json`.
3. Writes `output/quest-log.txt`: a checklist of the bounty steps — find the bounty, build, submit, claim — with the steps for this coin checked off.
4. Always exits `0`.

## Run it

```bash
mkdir -p out
MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
cat out/LAUNCH.json
cat out/quest-log.txt
```

No dependencies to install — Node 22 standard library only.

## License

MIT — see [`LICENSE`](./LICENSE).
