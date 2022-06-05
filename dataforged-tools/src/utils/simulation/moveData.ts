import { MoveOutcome } from "@json_out/index.js";
import { NumericOutcomes } from "@utils/simulation/NumericOutcomes.js";

export const finishTheScene = new NumericOutcomes("Finish the Scene", {
  "Strong Hit": {
    outcome: MoveOutcome["Strong Hit"],
    choose: { from: [{}] }
  },
  "Weak Hit": {
    outcome: MoveOutcome["Weak Hit"],
    choose: { from: [{}] }
  },
  Miss: {
    outcome: MoveOutcome["Miss"],
    choose: { from: [{}] }
  }
});

export const SaA_may20 = new NumericOutcomes("Secure an Advantage", {
  "Strong Hit": {
    outcome: MoveOutcome["Strong Hit"],
    chooseOnMatch: {
      amount: 1,
      from: [{
        markProgress: 1, momentum: 2, add: 1,
      }]
    },
    choose: {
      amount: 1,
      from: [{ momentum: 2, add: 1, }]
    },
  },
  "Weak Hit": {
    outcome: MoveOutcome["Weak Hit"],
    choose: {
      amount: 1,
      from: [
        { momentum: 2 },
        { add: 1 }
      ]
    }
  },
  Miss: {
    outcome: MoveOutcome.Miss,
    choose: {
      amount: 1,
      from: [{ tickClock: 1 }]
    },
    chooseOnMatch: {
      amount: 1,
      from: [{ tickClock: 2 }]
    }
  }
})
;

export const FD_may20 = new NumericOutcomes("Face Danger",{
  "Strong Hit": {
    outcome: MoveOutcome["Strong Hit"],
    chooseOnMatch: {
      amount: 1,
      from: [{ markProgress: 2 }]
    },
    choose: {
      amount: 1,
      from: [{ markProgress: 1 }]
    },
  },
  "Weak Hit": {
    outcome: MoveOutcome["Weak Hit"],
    choose: {
      amount: 1,
      from: [{ markProgress: 1, tickClock: 1 }]
    }
  },
  Miss: {
    outcome: MoveOutcome.Miss,
    choose: {
      amount: 1,
      from: [{ tickClock: 1 }]
    },
    chooseOnMatch: {
      amount: 1,
      from: [{ tickClock: 2 }]
    }
  }
});


export const SaA_ironsworn = new NumericOutcomes("Secure an Advantage", {
  "Strong Hit": {
    outcome: MoveOutcome["Strong Hit"],
    choose: {
      amount: 1,
      from: [
        { momentum: 2 },
        { add: 1 }
      ]
    },
  },
  "Weak Hit": {
    outcome: MoveOutcome["Weak Hit"],
    choose: {
      amount: 1,
      from: [{ momentum: 1 }]
    }
  },
  Miss: {
    outcome: MoveOutcome.Miss,
    choose: {
      amount: 1,
      from: [{ tickClock: 1 }]
    }
  }
});

export const FD_ironsworn = new NumericOutcomes("Face Danger", {
  "Strong Hit": {
    outcome: MoveOutcome["Strong Hit"],
    choose: {
      amount: 1,
      from: [{ markProgress: 1 }]
    },
  },
  "Weak Hit": {
    outcome: MoveOutcome["Weak Hit"],
    choose: {
      amount: 1,
      from: [{ markProgress: 1, tickClock: 1 }]
    }
  },
  Miss: {
    outcome: MoveOutcome.Miss,
    choose: {
      amount: 1,
      from: [{ tickClock: 1 }]
    }
  }
});