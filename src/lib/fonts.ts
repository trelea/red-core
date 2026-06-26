import { Oswald, Inter, Orbitron, Montserrat, Urbanist } from "next/font/google";

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

// Wide, squared industrial display face (Eurostile-style). Used for hero/headings.
export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-orbitron",
});
