import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
import react from "@vitejs/plugin-react";

// import ViteSvgPlugin from 'vite-plugin-svg';
import svgr from "vite-plugin-svgr"; //para los archivos SVG
//import reactRefresh from "@vitejs/plugin-react-refresh";


// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react(),ViteSvgPlugin()],
  plugins: [react(), svgr(), ],
  // resolve: {
  //   alias: {
  //     "react-router-dom": require.resolve("react-router-dom"),
  //   },
  // },
});
