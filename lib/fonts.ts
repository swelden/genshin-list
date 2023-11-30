import localFont from "next/font/local";

export const genshinFont = localFont({
  src: "../public/fonts/ja-jp.woff2",
  display: "swap",
  variable: "--font-genshin",
});
