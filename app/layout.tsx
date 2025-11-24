import "../styles/globals.css";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "../contexts/AuthContext";
export const metadata: Metadata = {
  title: "Northern Yetis FC",
  description: "Official site of Northern Yetis Football Club",
   icons: {
    icon: "/favicon/favicon.ico", 
    shortcut: "/favicon/clubFavicon.png", 
    apple: "/favicon/clubFavicon.png", 
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-secondary text-dark" suppressHydrationWarning={true}>
       <AuthProvider>
         <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
       </AuthProvider>
      </body>
    </html>
  );
}
