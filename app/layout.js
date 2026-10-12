import "./globals.css";
import AuthProvider from "../components/AuthProvider";
import ProgressProvider from "../components/ProgressProvider";
import Toggles from "../components/Toggles";
export const metadata={title:"LazyKeys - type fast, stay lazy",description:"A lazy person's typing course"};
export default function L({children}){return <html lang="en" data-theme="dark"><body><AuthProvider><ProgressProvider><Toggles/>{children}</ProgressProvider></AuthProvider></body></html>}
