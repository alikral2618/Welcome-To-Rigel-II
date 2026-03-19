require("dotenv").config()

// Welcome to Rigel II
const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates // ses kanalları için
  ]
});

// Bot hazır olduğunda
client.once('ready', () => {
  console.log('Bot aktif!');
  
  // 🔥 BURASI SENİN İSTEDİĞİN KISIM
 setInterval(() => {
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
}, 10000);
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

// Token
console.log("TOKEN:", process.env.TOKEN);
client.login(process.env.TOKEN);
