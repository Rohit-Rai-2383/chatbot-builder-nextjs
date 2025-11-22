import "./globals.css";
import { Chatbot } from "../components/Chatbot";

export const metadata = { title: "Chatbot Demo" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Chatbot
          token={process.env.NEXT_PUBLIC_BOT_TOKEN}
          socketUrl={process.env.NEXT_PUBLIC_WEB_SOCKET_URL}
        />
      </body>
    </html>
  );
}
