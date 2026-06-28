import { Oswald, Inter, Montserrat, Urbanist } from "next/font/google";
import localFont from "next/font/local";

export const oswald = Oswald({
  subsets: ["latin"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const urbanist = Urbanist({
  subsets: ["latin"],
});

export const inter = Inter({
  subsets: ["latin"],
});

// Microgramma D Extended Bold — wide squared industrial display face
// (Eurostile lineage). Used for hero/headings. Only the Bold weight ships.
export const microgramma = localFont({
  src: "../../public/assets/Microgramma D Extended Bold.otf",
  weight: "700",
  style: "normal",
  variable: "--font-microgramma",
  display: "swap",
});
