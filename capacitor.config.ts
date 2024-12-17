import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.coveredministries.prayerwheel",
  appName: "prayer-wheel-react",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
