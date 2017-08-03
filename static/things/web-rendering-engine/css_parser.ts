import {Node} from './node.js';

export class Stylesheet {
  rules: Array<Ruleset>;

  constructor() {
    this.rules = [];
  }
}

export class Ruleset {
  selector: Selector;
  declarations: Array<Declaration>;

  constructor() {
    this.declarations = [];
  }
}

export class Selector {
  tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }

  matches(node: Node): boolean {
    alert
    return node.name === this.tag;
  }

  get specificity() {
    if(this.tag === '*') return 0;
    return 1;
  }
}

export class Declaration {
  propertyName: string;
  value: string;

  constructor(propertyName, value: string) {
    this.propertyName = propertyName;
    this.value = value;
  }
}

export class Parser {
  private _input: string;

  constructor(input: string) {
    this._input = input.trimLeft();
  }

  private advanceAndTrim(n: number): string {
    const r = this._input.slice(0, n).trim();
    this._input = this._input.slice(n+1).trimLeft();
    return r;
  }

  parseStylesheet(): Stylesheet {
    const stylesheet = new Stylesheet();
    while(this._input.length > 0) {
      stylesheet.rules.push(this.parseRuleset());
    }
    return stylesheet;
  }

  private parseRuleset(): Ruleset {
    const idx = this._input.indexOf('{');
    if(idx === -1)
      throw new Error('Invalid Ruleset');
    const ruleset = new Ruleset();
    ruleset.selector = new Selector(this.advanceAndTrim(idx));
    while(this._input[0] !== '}') {
      ruleset.declarations.push(this.parseDeclaration());
    }
    // Slice off '{'
    this.advanceAndTrim(1);
    return ruleset;
  }

  private parseDeclaration(): Declaration {
    let idx = this._input.indexOf(':');
    if(idx === -1)
      throw new Error('Invalid property definition');
    const propertyName = this.advanceAndTrim(idx);
    idx = this._input.indexOf(';');
    if(idx === -1)
      throw new Error('Invalid value definition');
    const value = this.advanceAndTrim(idx);
    return new Declaration(propertyName, value);
  }
}
