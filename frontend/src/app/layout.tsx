import "./globals.css";
import Navbar04 from "../../utils/Navbar04/Navbar04.jsx"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
      >
        <Navbar04 />
        {children}
      </body>
    </html>
  );
}
