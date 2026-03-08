import { ImageResponse } from "next/og";

export const alt =
  "Red Core - Professional Concrete Cutting & Core Drilling Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1E2C32",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-2px",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            RED CORE
          </div>
          <div
            style={{
              width: 120,
              height: 4,
              backgroundColor: "#3A7A94",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontSize: 28,
              color: "#7BB8D4",
              textAlign: "center",
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            Professional Concrete Cutting
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#7BB8D4",
              textAlign: "center",
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            & Core Drilling Services
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              "Core Drilling",
              "Slab Cutting",
              "Wall Saw",
              "Hand Saw",
              "Demolition",
            ].map((service) => (
              <div
                key={service}
                style={{
                  padding: "8px 20px",
                  border: "2px solid #3A7A94",
                  borderRadius: 4,
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                {service}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#c9c9c9",
              marginTop: "16px",
            }}
          >
            Agawam, MA · (413)-666-2026
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
