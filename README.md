# Pizza Calculator

**A precise, opinionated pizza dough calculator built for people who care about their crust.**

Live at [pizzacalculator.net](https://pizzacalculator.net)

---

## Features

- **Dough type presets** — Neapolitan, New York, Detroit, and Focaccia with tuned hydration ratios and fermentation profiles
- **Fermentation timeline** — backward-calculates from your target serving time, adjusting for ambient and fridge temperatures
- **Per-oven baking instructions** — home vs. professional ovens with automatic hydration adjustments
- **Baker's percentage controls** — fine-tune hydration, salt, yeast, oil, and sugar
- **Imperial & metric units** — switch freely, conversions happen in real-time
- **Shareable recipes** — every setting is encoded in the URL
- **Step-by-step dough guide** — from mixing to baking, with tips for each stage

## Development

**Prerequisites:** Node.js 24+, pnpm 10+

```bash
pnpm install
pnpm build     # production build
pnpm test      # run tests
pnpm lint      # lint + format check
pnpm checkTs   # type check
```

## License

[Apache 2.0](LICENSE)
