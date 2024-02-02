import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// import ViteSvgPlugin from 'vite-plugin-svg';
import svgr from "vite-plugin-svgr";//para los archivos SVG


// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react(),ViteSvgPlugin()],
  plugins: [react(),svgr()]
})
