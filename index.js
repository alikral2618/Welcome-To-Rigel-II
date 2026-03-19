require("dotenv").config()

// Welcome to Rigel II
const { Client, GatewayIntentBits, ActivityType } = require('discord.js'); // 🔥 TEK SATIRDA TOPLADIK
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// Bot hazır olduğunda
client.once('ready', () => {
  console.log(`${client.user.tag} aktif!`);

  const setStatus = () => {
    const statuses = [
      'Sunucuyu izliyor',
      'Komutları izliyor',
      `${client.guilds.cache.size} sunucuya bakıyor`
    ];

    const random = statuses[Math.floor(Math.random() * statuses.length)];

    client.user.setPresence({
      status: 'dnd',
      activities: [{
        name: random,
        type: ActivityType.Watching
      }]
    });

    console.log("Status güncellendi:", random); // 🔥 debug
  };

  // İlk çalıştır
  setStatus();

  // 10 saniyede bir değiştir
  setInterval(setStatus, 10000);
});

// Metin komutları
client.on('messageCreate', message => {
  if (message.content === '.ping') {
    message.reply('Pong!');
  }

  if (message.content === '.join') {
    const { channel } = message.member.voice;
    if (!channel) return message.reply('Önce bir ses kanalına gir!');

    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: false
    });

    message.reply(`Ses kanalına katıldım: ${channel.name}`);
  }
});

console.log("TOKEN:", process.env.TOKEN);
client.login(process.env.TOKEN);
