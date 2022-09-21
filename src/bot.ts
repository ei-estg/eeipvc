import { GatewayIntentBits, Partials } from "discord.js";
import { busCommand } from "./extensions/commands/groups/sas/bus";
import { pingCommand } from "./extensions/commands/groups/general/ping";
import { pisoCommand } from "./extensions/commands/groups/classroom/piso";
import { ribasCommand } from "./extensions/commands/groups/fun/ribeiro";
import { rodaEsse } from "./extensions/commands/groups/fun/rodaesse";
import { roastCoder } from "./extensions/commands/groups/fun/roastCoder";
import { servicesCommand } from "./extensions/commands/groups/classroom/servicesSchedule";
import { dadJoke } from "./extensions/commands/groups/fun/dadJokes";
import botConfig from "./botConfig.json";
import { ClientManager } from "./client";
import { onlyfansCommand } from "./extensions/commands/groups/fun/onlyfans";
import { dogeCoinCommand } from "./extensions/commands/groups/fun/dogecoinCommand";
import { php } from "./extensions/commands/groups/fun/killMe";
import { java } from "./extensions/commands/groups/fun/java";
import { etron } from "./extensions/commands/groups/fun/bestcar";

import "dotenv/config";
import { CommandsExtension } from "./extensions/commands";
import { GuildExtension } from "./extensions/guild";
import { ReactsHandler } from "./extensions/reacts";
import { scheduleCommand } from "./extensions/commands/groups/classroom/schedule";
import { mealsCommand } from "./extensions/commands/groups/sas/meals";

import i18next from "i18next";
import FsBackend from 'i18next-fs-backend'
import path from "path";


i18next
  .use(FsBackend)
  .init({
    initImmediate: false,
    debug: true,
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json')
    }
  })


console.log(i18next.t('abc'))

const bot = new ClientManager(
  botConfig,
  {
    intents: [
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessageReactions]
    ,
    partials: [
      Partials.Message,
      Partials.Channel,
      Partials.Reaction,
      Partials.GuildMember,
      Partials.User
    ]
  });

const [
  commands,
  reacts,
  guild
] = [
  new CommandsExtension(bot),
  new ReactsHandler(bot),
  new GuildExtension(bot)
]

commands.registerSlashCommands(
  pingCommand,
  php,
  etron,
  dogeCoinCommand,
  onlyfansCommand,
  ribasCommand,
  rodaEsse,
  roastCoder,
  dadJoke,
  servicesCommand,
  java,
  pisoCommand,
  busCommand,
  scheduleCommand,
  mealsCommand,
);

commands.registerSlashCommandsAutomatically()







/*const getChannelById = async (guildId: string, channelId: string) => {
  const guild = await bot.guilds.fetch(guildId);
  return guild.channels.cache.get(channelId) as TextChannel;
};

// CronJobs
/*
bot.handlers.timers.register({
  cronTime: botConfig.timmers.meals.cronTime,
  channel: () =>
    getChannelById(botConfig.guild.id, botConfig.timmers.meals.channelId),
  handler: () =>
    mealsCommand.run(undefined, {
      date: moment().add(1, "day").format("YYYY-MM-DD")
    })
});*/

/*
bot.handlers.timers.register({
  cronTime: botConfig.timmers.cineplace.cronTime,
  channel: () =>
    getChannelById(
      botConfig.guild.id,
      botConfig.timmers.cineplace.channelId
    ),
  handler: async () => {
    return moviesTimmerHander(
      await getChannelById(
        botConfig.guild.id,
        botConfig.timmers.cineplace.channelId
      )
    );
  }
});

bot.handlers.timers.register({
  cronTime: botConfig.timmers.minecraft.cronTime,
  channel: () =>
    getChannelById(
      botConfig.guild.id,
      botConfig.timmers.minecraft.channelId
    ),
  handler: async () => {
    return minecraftTimmerHandler(
      await getChannelById(
        botConfig.guild.id,
        botConfig.timmers.minecraft.channelId
      )
    );
  }
});

bot.handlers.timers.register({
  cronTime: botConfig.timmers.vitenoipvc.cronTime,
  channel: () =>
    getChannelById(
      botConfig.guild.id,
      botConfig.timmers.vitenoipvc.channelId
    ),
  handler: async () => {
    return instagramTimerHandler(
      await getChannelById(
        botConfig.guild.id,
        botConfig.timmers.vitenoipvc.channelId
      ),
      botConfig.timmers.vitenoipvc.instagramAccount
    );
  }
});

// Reactions
bot.handlers.reacts.giveRoles(botConfig.reacts);

*/

bot.run(process.env.DISCORD_BOT_TOKEN!)
  .then(() => console.log("Bot running"))
  .catch((err) => console.error(err));
