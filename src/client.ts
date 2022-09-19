import { Client, ClientApplication, ClientOptions } from "discord.js";

import { CommandsHandler } from "./handlers/commands";
import { TimersHandler } from "./handlers/timers";
import { ReactsHandler } from "./handlers/reacts";
import { REST } from "@discordjs/rest";

export class BotClient extends Client {
  private readonly _config: any;
  private _restClient!: REST;
  private _application!: ClientApplication;

  public handlers: { [key: string]: any } = {};

  constructor(botConfig: any, options: ClientOptions) {
    super(options);

    this.handlers = {
      commands: new CommandsHandler(this._config),
      timers: new TimersHandler(),
      reacts: new ReactsHandler()
    };

    this._config = botConfig;
  }

  async login(token: string): Promise<string> {
    let login = super.login(token);

    this._restClient = new REST({ version: "10" }).setToken(token);


    // Commands
    this.on(
      "message",
      this.handlers.commands.onMessage.bind(this.handlers.commands)
    );

    this.on("interactionCreate", this.handlers.commands.onInteractionCreate.bind(this.handlers.commands));

    // CronJobs
    this.on("ready", async () => {
      this._application = await this.application!;


      this.handlers.commands.setProps({
        restClient: this._restClient,
        clientApp: this._application
      });

      this.handlers.timers.onReady();
      this.handlers.commands.onReady();
    });

    // Reactions
    this.on(
      "messageReactionAdd",
      this.handlers.reacts.onReactAdd.bind(this.handlers.reacts)
    );
    this.on(
      "messageReactionRemove",
      this.handlers.reacts.onReactionRemove.bind(this.handlers.reacts)
    );
    this.on("ready", () => this.handlers.reacts.onReady(this));


    return login;
  }
}
