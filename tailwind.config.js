
function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        skin: {
          primary: withOpacity('--primary'),
          // secondary: withOpacity("--secondary"),
          accent: withOpacity('--accent'),
          neutral: withOpacity('--neutral'),
          white: withOpacity('--white'),
        },
        dashboard:{
          primary:"#00728d",
          dark:"#1d2939",
          green:"#1d2939",
          red:"#fa0101 "
        },
        auth:{
          gray:"#71748d",
          blue:"#5969ff",
          red:"#dc3545",
          hover_color:"#0069d9",
          facebook_blue:"#3c73df",
          twitter_blue:"#2caeff",
          border_color:"#d2d2e4",
          title_color:"#3d405c"

        }
      },
    },
  },
  plugins: [],
};