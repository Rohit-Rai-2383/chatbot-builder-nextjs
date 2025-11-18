
import './globals.css';
import { Chatbot } from '../components/Chatbot';

export const metadata = { title: 'Chatbot Demo' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
