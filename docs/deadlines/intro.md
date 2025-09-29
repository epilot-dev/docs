---
title: Switching Deadlines
sidebar_position: 0
---

# Contract Switching Deadlines

[[API Docs](/api/deadlines)] [[API SDK](https://www.npmjs.com/package/@epilot/deadlines-client)] - [[Standalone Library](https://www.npmjs.com/package/@epilot/switching-deadlines)]

Both power and gas contract switching in the German energy market comes with strict legal deadlines. Since June 2025, power contracts without minimum terms can be switched within 24 hours. For gas, the switching period is currently between 10 and 13 working days, but retrospective switches within six weeks are possible in relocation and new registration scenarios.

epilot provides several ways to reliably calculate and validate these deadlines:

- The Switching Deadlines API provides a centralised, simple [REST API](/api/deadlines) to calculate and validate supplier switching deadlines for power and gas in the German energy market. It is available to all epilot customers to integrate into their own systems.
- As a contribution to the wider community, epilot has open-sourced the [Switching Deadlines library](https://github.com/epilot-dev/switching-deadlines) for NodeJS. This library serves as basis for our API implementation. You can find more information on how to use it in the [documentation](/docs/deadlines/deadlines-library/).
