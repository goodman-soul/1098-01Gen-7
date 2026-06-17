/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      // 主题色配置
      colors: {
        primary: "#FF8C42", // 暖橙
        secondary: "#2D6A4F", // 森林绿
        background: "#FFF9F0", // 米白
        accent: "#FFB088", // 浅橙
        dark: "#333333", // 深灰
      },
      // 自定义字体
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: [
          '"PingFang SC"',
          '"Microsoft YaHei"',
          '"Hiragino Sans GB"',
          "sans-serif",
        ],
      },
      // 圆角扩展
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      // 关键帧动画定义
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      // 动画扩展
      animation: {
        fadeIn: "fadeIn 0.6s ease-out forwards",
        slideUp: "slideUp 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};
