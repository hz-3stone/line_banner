import { createCanvas, loadImage, GlobalFonts } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';

// フォントを登録
GlobalFonts.registerFromPath('./src/NotoSansJP-VariableFont_wght.ttf', 'NotoSansJP');

const width = 800;
const height = 240;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// 1. 背景色
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, width, height);

// 2. 既存画像の合成（必要な場合）
const logo = await loadImage('./src/logo.png');
ctx.drawImage(logo, 136, 42, 156, 156);

// 3. テキスト描画
ctx.fillStyle = '#000';
ctx.font = 'bold 64px "NotoSansJP"';
ctx.translate(width, height / 2);
ctx.textAlign = 'right';
ctx.textBaseline = 'middle';
ctx.fillText('公式LINE', -100, 0);

// 4. ファイル出力
const outPath = './dist/output.png';
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
