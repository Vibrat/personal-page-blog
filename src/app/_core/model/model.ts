export interface Entity {
  name: string;
  operator: any;
}

export class Model {
  private _entities = {};

  constructor(...entities: Entity[]) {
    for (let i = 0; i < entities.length; i++) {
      this._entities[entities[i].name] = entities[i].operator;
    }
  }

  public call(entity: string, func: string, data: any) {
    if (!this._entities.hasOwnProperty(entity)) {
      throw new ModelError("EntityError", `Entity ${entity} does not exist`);
    }

    if (
      typeof this._entities[entity][func] !== "function"
    ) {
      throw new ModelError("FunctionError", `Function ${func} does not exist`);
    }

    if (!(this._entities[entity][func] instanceof Function)) {
      throw new ModelError("FunctionError", `${func} is not a function`);
    }

    return this._entities[entity][func](data);
  }
}

export class ModelError extends Error {
  public name: string;
  public message: string;

  constructor(name: string, message: string = "") {
    super(message);
    this.name = name;
    this.message = message;
  }
}
