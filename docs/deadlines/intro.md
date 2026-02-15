---
title: Switching Deadlines
sidebar_position: 0
---

# Contract Switching Deadlines

[[API Docs](/api/pricing)] [[SDK](https://www.npmjs.com/package/@epilot/deadlines-client)] [[Standalone Library](https://www.npmjs.com/package/@epilot/switching-deadlines)]

German energy market regulations impose strict deadlines for power and gas contract switching. Since June 2025, power contracts without minimum terms can switch within 24 hours. Gas switching takes 10-13 working days, with retrospective switches possible within six weeks for relocation and new registration scenarios.

epilot provides two ways to calculate and validate these deadlines:

- **Switching Deadlines API** -- a [REST API](/api/pricing) that calculates and validates supplier switching deadlines for power and gas.
- **Open-source library** -- the [Switching Deadlines library](https://github.com/epilot-dev/switching-deadlines) for Node.js. This library powers the API and is freely available. See the [library documentation](/docs/deadlines/deadlines-library/) for usage.
