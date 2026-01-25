import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; // if you have other global styles

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
