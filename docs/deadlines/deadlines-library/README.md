**@epilot/switching-deadlines**

***

# epilot Contract Switching Deadlines Utilities

A TypeScript library for handling German energy market compliance requirements, specifically supplier switching deadlines as defined by **GPKE** (power) and **GeLi Gas** (gas).

This library is regularly updated to reflect the latest calendar updates. You can find the changelog at [here](documents/CHANGELOG.md).

## ✨ Features

📅 **Automatic calculation of switching deadlines**

Handles supplier switching deadlines for power and gas according to GPKE and GeLi Gas.

🔄 **Use-case and commodity-aware**

Separate rules for **power (Strom)** and **gas (Gas)**, covering multiple switching scenarios:
- Supplier switch (Lieferantenwechsel)
- Relocation (Umzug)
- New connection / initial supply (Neuanlage / Erstbelieferung)

🕑 **Public and special holidays included**

Accounts for one-time public holidays and special holidays (_Sonderfeiertage_), e.g.:
- 8 May 2025 (_Tag der Befreiung_, Berlin public holiday)
- 6 June 2025 (_Einmaliger Sonderfeiertag zur Einführung des LFW24_)

## 🚀 Quick Start

Install via `npm`, `yarn`, or `pnpm`:

```bash
npm install @epilot/switching-deadlines
```

The library provides helper functions for simple calculations.
With `calculateDeadline`, you can calculate the deadline for a given commodity, use case, and date:

```typescript
import { calculateDeadline, Commodity, UseCase } from '@epilot/switching-deadlines';

const result = calculateDeadline({
  commodity: Commodity.POWER,
  useCase: UseCase.SWITCH,
  requiresTermination: true,
  fromDate: '2025-10-01'
});

console.log(result); // '2025-10-07'
```

For multiple calculations, use the `DeadlineCalculator` class directly:

```typescript
import { DeadlineCalculator, Commodity, UseCase } from '@epilot/switching-deadlines';

const calculator = new DeadlineCalculator()
const today = new Date()

const relocationResult = calculator.calculateEarliestStartDate(
  {
    commodity: Commodity.POWER,
    useCase: UseCase.RELOCATION,
    requiresTermination: false
  },
  today
)

const switchResult = calculator.calculateEarliestStartDate(
  {
    commodity: Commodity.POWER,
    useCase: UseCase.SWITCH,
    requiresTermination: true
  },
  today
)

console.log(
  `${`The earliest start date is ${relocationResult.earliestStartDate} for relocation and ${switchResult.earliestStartDate} for switching`}`
)
```
You can find more information in the 📖 [usage examples](documents/EXAMPLES.md).

Comprehensive documentation and background information are available in the 👉 [epilot dev center](https://docs.epilot.io/docs/deadlines/intro).

## 📜 Disclaimer

This library is provided as an open-source contribution to the community to support flexibility when building custom systems around the epilot Energy XRM. It is not intended as a standalone product. Support is only provided for epilot customers.

If you are an active epilot contract, you can alternatively use our [Switching Deadlines REST API](https://docs.epilot.io/api/deadlines), which offers the same logic as a web service.

For questions or feedback regarding this library, please reach out to the epilot team.

---

Built with ❤️ love & dedication 🔥 by team Tauro at epilot.
