# Gunakan image Node.js resmi sebagai image dasar
FROM node:18-alpine

# Tetapkan direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependensi proyek
RUN npm install
RUN npm install -g typescript
# Salin semua file aplikasi
COPY . .



# CMD ["node", "dist/server.js"]
RUN tsc
# Buka port yang digunakan aplikasi
EXPOSE 3000

# Jalankan aplikasi
CMD ["node", "dist/server.js"]