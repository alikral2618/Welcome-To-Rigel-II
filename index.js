require("dotenv").config()

const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
//Welcome To Rigel II
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
      '👀 Sunucuyu izliyor',
      '⚙️ Komutları izliyor',
      `🌐 ${client.guilds.cache.size} sunucuya bakıyor`,
      '🎥 YouTube: @NextAli', // 👈 BURAYI KENDİ KANALINLA DEĞİŞTİR
      '🚀 Aktif!'
    ];

    const random = statuses[Math.floor(Math.random() * statuses.length)];

    client.user.setPresence({
      status: 'dnd',
      activities: [{
        name: random,
        type: ActivityType.Watching
      }]
    });

    console.log("Status:", random);
  };

  setStatus();
  setInterval(setStatus, 10000);
});

// Komutlar
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

  // 🔥 YouTube komutu (tıklanabilir link)
  if (message.content === '.youtube') {
    message.reply('📺 Kanalım: https://www.youtube.com/@NextAli%C4%A6/featured');
  }
});

console.log("TOKEN:", process.env.TOKEN);
client.login(process.env.TOKEN);
