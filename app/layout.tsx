import "./globals.css";
import ReduxProvider from "./provider";

export const metadata = {
  title: "Next15 Redux Users",
  description: "Тестовое задание"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
