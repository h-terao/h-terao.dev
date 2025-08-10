import fs from "node:fs";
import satori from "satori";
import sharp from "sharp";
import { siteConfig } from "@/site.config";

export const makeOpenGraphImage = async (title: string): Promise<ArrayBuffer> => {
  const titleFont = fs.readFileSync("./public/fonts/IBMPlexSansJP-SemiBold.ttf");
  const logoFont = fs.readFileSync(
    "./public/fonts/MADE Evolve Sans Regular EVO (PERSONAL USE).otf",
  );

  const svg = await satori(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        backgroundColor: "#f5f5f5",
        padding: "0 64px 32px",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2
          style={{
            fontSize: 64,
            fontWeight: "semibold",
            color: "#111827",
            textAlign: "left",
            fontFamily: "title",
          }}
        >
          {title}
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          fontSize: 48,
          fontWeight: "regular",
          fontFamily: "logo",
          color: "#c79a42",
        }}
      >
        {siteConfig.title.toUpperCase()}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "logo",
          data: logoFont,
          style: "normal",
          weight: 400,
        },
        {
          name: "title",
          data: titleFont,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );

  const buffer = await sharp(Buffer.from(svg)).png().toBuffer();

  const arrayBuffer = new ArrayBuffer(buffer.byteLength);
  new Uint8Array(arrayBuffer).set(buffer);
  return arrayBuffer;
};
