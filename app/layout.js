import "./globals.css";
import AuthProvider from "../components/AuthProvider";
import ProgressProvider from "../components/ProgressProvider";
import Toggles from "../components/Toggles";
export const metadata = {
  title: "LazyKeys - type fast, stay lazy",
  description: "A lazy person's typing course",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  manifest: "/manifest.json"
};
export default function L({children}){return <html lang="en" data-theme="dark"><body><AuthProvider><ProgressProvider><Toggles/>{children}</ProgressProvider></AuthProvider></body></html>}
