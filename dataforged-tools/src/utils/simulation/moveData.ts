import type { IOutcomesNumbers } from "@utils/simulation/OutcomeWithNumbers.js";


export const SaAOld: IOutcomesNumbers = {
  "Strong Hit": {
    momentum: 2,
    add: 1,
    markProgress: 0,
    clock: 0,
    match: {
      markProgress: 1
    }
  },
  "Weak Hit": {
    momentum: 0,
    add: 0,
    markProgress: 0,
    clock: 0,
    choose: {
      amount: 1,
      from: [
        { momentum: 2 },
        { add: 1 }
      ]
    }
  },
  Miss: {
    momentum: 0,
    add: 0,
    markProgress: 0,
    clock: 1,
    match: {
      clock: 2
    }
  }
};


export const faceDangerOld: IOutcomesNumbers = {
  "Strong Hit": {
    momentum: 0,
    add: 0,
    markProgress: 1,
    clock: 0,
    match: {
      markProgress: 2
    }
  },
  "Weak Hit": {
    momentum: 0,
    add: 0,
    markProgress: 1,
    clock: 1,
  },
  Miss: {
    momentum: 0,
    add: 0,
    markProgress: 0,
    clock: 1,
    match: {
      clock: 2
    }
  }
};

export const SaAnew: IOutcomesNumbers = {
  "Strong Hit": {
    momentum: 0,
    add: 0,
    markProgress: 0,
    clock: 0,
    choose: {
      amount: 2,
      from: [
        { momentum: 2 },
        { add: 1 },
        { markProgress: 1 }
      ]
    }
  },
  "Weak Hit": {
    momentum: 0,
    add: 0,
    markProgress: 0,
    clock: 0,
    choose: {
      amount: 1,
      from: [
        { momentum: 2 },
        { add: 1 },
        { markProgress: 1 }
      ]
    }
  },
  Miss: {
    momentum: 0,
    add: 0,
    markProgress: 0,
    clock: 1,
    match: {
      clock: 2
    }
  }
};

export const faceDangerNew: IOutcomesNumbers = {
  "Strong Hit": {
    momentum: 0,
    add: 0,
    markProgress: 2,
    clock: 0,
  },
  "Weak Hit": {
    momentum: 0,
    add: 0,
    markProgress: 2,
    clock: 1,
  },
  Miss: {
    momentum: 0,
    add: 0,
    markProgress: 0,
    clock: 1,
    match: {
      clock: 2
    }
  }
};