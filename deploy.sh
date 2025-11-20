#!/bin/bash

APP_NAME="myapp"
SERVER_FILE="server.js"

echo "🌱 Päivitetään Git-repo..."
git add .
git commit -m "Automaattinen build ja deploy $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main

echo "📦 Asennetaan Node.js riippuvuudet..."
npm install

echo "⚡ Rakennetaan Vite tuotantoversio..."
npm run build

echo "🚀 Käynnistetään/päivitetään Node.js server PM2:lla..."
# PM2 listaus
pm2 list | grep "$APP_NAME" > /dev/null
if [ $? -eq 0 ]; then
    echo "♻️  Päivitetään olemassa oleva PM2-prosessi..."
    pm2 reload $APP_NAME
else
    echo "✨ Käynnistetään uusi PM2-prosessi..."
    pm2 start $SERVER_FILE --name $APP_NAME
fi

echo "✅ Deploy valmis! Sovellus käynnissä PM2:lla nimellä '$APP_NAME'."
