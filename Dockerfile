# Gunakan image Node.js resmi sebagai image dasar
FROM node:14-alpine

# Tetapkan direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependensi proyek
RUN npm install

# Salin semua file aplikasi
COPY . .

# Build file TypeScript (jika diperlukan)
RUN npm run build

# Buka port yang digunakan aplikasi
EXPOSE 9000

# Jalankan aplikasi
CMD ["node", "dist/server.js"]
