import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { fa } from "vuetify/iconsets/fa";

export default createVuetify({
  theme: {
    defaultTheme: "system", // 👈 Auto-adapt to user system preference
    themes: {
      light: {
        dark: false,
        colors: {
          background: "#FFFFFF",
          surface: "#FFFFFF",
          primary: "#1976D2",
          secondary: "#424242",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107",
        },
      },
      dark: {
        dark: true,
        colors: {
          background: "#121212",
          surface: "#1E1E1E",
          primary: "#90CAF9",
          secondary: "#B0BEC5",
          error: "#EF9A9A",
          info: "#81D4FA",
          success: "#A5D6A7",
          warning: "#FFE082",
        },
      },
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
  components,
  directives,
});
