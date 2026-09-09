/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/dashboard/*.{html,js,jsx,tsx}",
    "./pages/cue/*.{html,js,jsx,tsx}",
    "./pages/flip/*.{html,js,jsx,tsx}",
    "./pages/dashboard/users/*.{html,js,jsx,tsx}",
    "./pages/flip/orders/*.{html,js,jsx,tsx}",
    "./pages/flip/service/*.{html,js,jsx,tsx}",
    "./pages/flip/merchants/*.{html,js,jsx,tsx}",
    "./pages/cue/drivers/*.{html,js,jsx,tsx}",
    "./pages/*.{html,js,jsx,tsx}",
    "./src/components/*.{html,js,jsx,tsx}",
    "./src/components/ActionMenu/*.{html,js,jsx,tsx}",
    "./src/components/Forms/*.{html,js,jsx,tsx}",
    "./src/components/ModalContent/*.{html,js,jsx,tsx}",
    "./src/components/BoxComponents/*.{html,js,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        100: "10000",
      },
      boxShadow: {
        "2xl": "3px 5px 15px rgba(0, 0, 0, 0.12)",
        "3xl": "3px 15px 15px rgba(0, 0, 0, 0.12)",
        tableShadow: "0px 0px 1px rgba(177, 182, 183, 0.5)",
        actionShadow: "0px 0px 1px rgba(12, 26, 75, 0.7)",
      },
      colors: {
        lightGray: "#f5f5f5",
        softGray: "#c1c1c1",
        lightPurple: "#1D2939 ",
        Purple: "#49D3BA ",
        darkPurple: "#0195FF ",
        faintPurple: "rgba(24, 160, 251, 0.2)",
        lightDark: "rgba(16,24,40, .6)",
        primary: "#BBAC69",
        grey: "#101828",
        faintWhite: "rgba(255, 255, 255, .2)",
        offWhite: "rgba(239, 237, 255, .6)",
        text: "rgba(132, 135, 163, 1)",
        textD: "rgba(239, 237, 255, .6)",
        header: "rgba(6, 78, 200, 1)",
        grey90: "rgba(16, 24, 40, 1)",
      },
      backgroundImage: "linear-gradient(90deg, #122644 0%, #015FFF 100%)",
    },
  },

  plugins: [require("tailwindcss-children")],
};
