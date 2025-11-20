#!/bin/bash

APP_NAME="myapp"
FRONTEND_DIR="frontend"
BACKEND_FILE="backend/server.js"

# 1️⃣ Päivitä Git
echo "🌱 Päivitetään Git-repo..."
git add .
git commit -m "Automaattinen build ja deploy $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main

# 2️⃣ Asenna frontend-riippuvuudet
echo "📦 Asennetaan frontend riippuvuudet..."
cd $FRONTEND_DIR
npm install

# 3️⃣ Rakenna Vite frontend
echo "⚡ Rakennetaan Vite tuotantoversio..."
npm run build
cd ..

# 4️⃣ Käynnistä/päivitä Node.js server PM2:lla
echo "🚀 Käynnistetään/päivitetään Node.js backend PM2:lla..."
pm2 list | grep "$APP_NAME" > /dev/null
if [ $? -eq 0 ]; then
    echo "♻️  Päivitetään olemassa oleva PM2-prosessi..."
    pm2 reload $BACKEND_FILE --name $APP_NAME
else
    echo "✨ Käynnistetään uusi PM2-prosessi..."
    pm2 start $BACKEND_FILE --name $APP_NAME
fi

echo "✅ Deploy valmis! Sovellus käynnissä PM2:lla nimellä '$APP_NAME'."
