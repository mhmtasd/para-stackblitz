{
  "bot-account": {
    "username": "Dukkan",
    "password": "fake3",
    "type": "legacy" // Offline mod için "legacy" kullanıyoruz
  },
  "server": {
    "ip": "play.reborncraft.pw",
    "port": 25565,
    "version": "1.19.3" // veya daha yüksek bir sürüm
  },
  "utils": {
    "auto-auth": {
      "enabled": true,
      "password": "fake3" // Otomatik oturum açma için şifre
    },
    "chat-messages": {
      "enabled": true,
      "repeat": true,
      "messages": ["/skyblock", "/is go EymanBey"],
      "repeat-delay": 5 // Eğer tekrarlama aktifleştirilirse, mesajın tekrarlama süresi (saniye)
    },
    "anti-afk": {
      "enabled": true
    },
    "auto-reconnect": true,
    "auto-reconnect-delay": 5000 // Yeniden bağlanma gecikmesi (ms)
  },
  "position": {
    "enabled": true,
    "x": 100,
    "y": 64,
    "z": 100
  },
  "chat-log": true // Sohbet günlüğü
}
