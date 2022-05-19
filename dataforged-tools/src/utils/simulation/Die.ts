import _ from "lodash-es";

const MINIMUM_DIE_SIDES = 1;

export class Die {
  private readonly _sides: number;
  public get sides(): number {
    return this._sides;
  }
  private _value: number;
  public get value(): number {
    return this._value;
  }
  public set value(value: number) {
    this._value = _.clamp(value, MINIMUM_DIE_SIDES, this.sides);
  }
  reroll() {
    this.value = _.random(1, this.sides);
  }
  valueOf(): number {
    return this.value;
  }
  toString(): string {
    return `${this.valueOf()}`;
  }

  constructor(sides: number, value: number = _.random(1, sides)) {
    if (sides < 2 || value > sides || value < 1) {
      throw new RangeError(`Bad arguments for new Die: ${JSON.stringify(arguments)}`);
    }
    this._sides = sides;
    this._value = value;
  }
}

