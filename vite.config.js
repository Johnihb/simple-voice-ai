import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Enable HTTPS for speech recognition to work properly
    https: false, // Set to true if you have SSL certificates
    host: true,
    port: 3000,
    // Alternative: Use HTTPS with self-signed certificates
    // https: {
    //   // You can provide your own certificates here
    //   // key: fs.readFileSync('path/to/key.pem'),
    //   // cert: fs.readFileSync('path/to/cert.pem'),
    // }
  }
})
