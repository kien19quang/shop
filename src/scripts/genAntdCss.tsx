import fs from "fs";
import { extractStyle } from "@ant-design/static-style-extract";
import Theme from '../styles/theme';

const outputPath = "./public/antd.min.css";

// 1. default theme

// const css = extractStyle();

// 2. With custom theme

const css = extractStyle(Theme);

fs.writeFileSync(outputPath, css);

console.log(`🎉 Antd CSS generated at ${outputPath}`);