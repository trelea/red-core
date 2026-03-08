import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Red Core - Professional Concrete Cutting & Core Drilling Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const logoData = await readFile(join(process.cwd(), "public/logo.png"));
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#1E2C32",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.03,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Red accent bar — left edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 6,
            height: "100%",
            backgroundColor: "#C8102E",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 80px",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Top: Logo */}
          <div style={{ display: "flex" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoBase64}
              alt="Red Core"
              height={56}
            />
          </div>

          {/* Middle: Headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-1.5px",
                lineHeight: 1.15,
              }}
            >
              Concrete Cutting &
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-1.5px",
                lineHeight: 1.15,
              }}
            >
              Core Drilling Services
            </div>
            <div
              style={{
                width: 64,
                height: 3,
                backgroundColor: "#C8102E",
                marginTop: "8px",
                display: "flex",
              }}
            />
          </div>

          {/* Bottom: Services + Location */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "24px",
              }}
            >
              {["Core Drilling", "Slab Cutting", "Wall Saw", "Hand Saw", "Demolition"].map(
                (service) => (
                  <div
                    key={service}
                    style={{
                      fontSize: 15,
                      color: "rgba(255,255,255,0.5)",
                      fontWeight: 500,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {service}
                  </div>
                )
              )}
            </div>
            <div
              style={{
                fontSize: 15,
                color: "#7BB8D4",
                fontWeight: 500,
                letterSpacing: "0.5px",
              }}
            >
              Agawam, MA
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
