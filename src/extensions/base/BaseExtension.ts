import { ClientManager } from "../../client";

export abstract class BaseExtension<T> {
  protected constructor(protected _manager: ClientManager) {
    _manager.client.on('ready', this._setup.bind(this))
  }

  protected abstract _setup();
}
