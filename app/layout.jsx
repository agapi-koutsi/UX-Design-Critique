export const metadata = {
  title: "AI Design Critique Panel",
  description: "A multi-agent AI design review panel.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
