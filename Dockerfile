# Gunakan image Node.js resmi sebagai image dasar
FROM node:18-alpine

# Tetapkan direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependensi proyek
RUN npm install

# Salin semua file aplikasi
COPY . .


# Jalankan build aplikasi (misalnya menggunakan webpack atau tsc)
RUN npm run build

CMD ["npm", "run", "start"]

# CMD ["node", "dist/server.js"]
# Buka port yang digunakan aplikasi
EXPOSE 3000

# Jalankan aplikasi
# CMD ["node", "dist/server.js"]