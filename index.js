const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let botConnected = false; // Bot bağlantı durumu

// Bot yapılandırma ayarları
const config = {
  botAccount: {
    username: "Dukkan",
    password: "fake3",
    type: "legacy"
  },
  server: {
    ip: "play.reborncraft.pw",
    port: 25565,
    version: "1.19.3"
  },
  utils: {
    autoAuth: {
      enabled: true,
      password: "fake3"
    },
    chatMessages: {
      enabled: true,
      messages: [
        { text: "Tanesi 520$ Sınırsız Demir Blok Alınır /is go EymanBey !!! (Alımlar aktif, dilediğiniz kadar satın!)", delay: 75 },
        { text: "/skyblock", delay: 5 },
        { text: "/is go EymanBey", delay: 5 }
      ]
    },
    antiAfk: {
      enabled: true
    },
    autoReconnect: true,
    autoReconnectDelay: 5000
  },
  position: {
    enabled: true,
    x: 100,
    y: 64,
    z: 100
  },
  chatLog: true
};

// Bot oluşturma
const bot = mineflayer.createBot({
  host: config.server.ip,
  port: config.server.port,
  username: config.botAccount.username,
  password: config.botAccount.password,
  version: config.server.version,
  auth: config.botAccount.type
});

// Web sunucusu
app.get('/', (req, res) => {
  if (botConnected) {
    res.send('Bot başarıyla bağlandı ve sohbetleri dinliyor.');
  } else {
    res.send('Bot bağlantı kurmaya çalışıyor...');
  }
});

// Sunucu bağlantısını başlat
app.listen(port, () => {
  console.log(`Sunucu ${port} numaralı bağlantı noktasında yürütülüyor.`);
});

// Bot olay dinleyicileri
bot.on('spawn', () => {
  console.log('Bot bağlandı!');
  botConnected = true;

  if (config.utils.autoAuth.enabled) {
    bot.chat(`/login ${config.utils.autoAuth.password}`);
    console.log(`Otomatik giriş: /login ${config.utils.autoAuth.password}`);
  }

  // Mesaj gönderme işlevi
  if (config.utils.chatMessages.enabled) {
    config.utils.chatMessages.messages.forEach((messageObj, index) => {
      setInterval(() => {
        bot.chat(messageObj.text);
        console.log(`Gönderildi: ${messageObj.text}`);
      }, messageObj.delay * 1000);
    });
  }

  if (config.utils.antiAfk.enabled) {
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => {
        bot.setControlState('jump', false);
      }, 100);
      console.log("Bot zıpladı.");
    }, 10000);
  }
});

bot.on('message', (message) => {
  console.log(message.toString());
});

bot.on('end', () => {
  console.log('Bot bağlantısı kesildi. Yeniden bağlanacak...');
  botConnected = false;
  setTimeout(() => {
    mineflayer.createBot({ 
      host: config.server.ip, 
      port: config.server.port, 
      username: config.botAccount.username, 
      password: config.botAccount.password, 
      version: config.server.version, 
      auth: config.botAccount.type 
    });
  }, config.utils.autoReconnectDelay);
});
