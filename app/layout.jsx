import "@styles/globals.css";
import LayoutShell from "./LayoutShell";

export const metadata = {
  title: "Netflix",
  description: "Dummy Netflix Application",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <LayoutShell children={children} />
      </body>
    </html>
  );
};

export default RootLayout;
