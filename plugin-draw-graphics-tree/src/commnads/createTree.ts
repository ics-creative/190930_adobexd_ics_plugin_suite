import LineType from "../types/LineType";

const LENGTH_MULTIPLY = 0.8;
const DEGREE_BRANCH = 45;

export default function createTree(): LineType[] {
  const lines: LineType[] = [];

  // フラクタルの木を描く
  drawTree(0, 0, 400, 270, 10);
  // 枝を描く
  function drawTree(
    x1, // 始点のX座標
    y1, // 始点のY座標
    leng, // 枝の長さ
    angle, // 枝の伸びる方向(角度)
    level
  ) {
    // 再帰レベル
    // 次の枝の座標を算出
    const x2 = leng * Math.cos((angle * Math.PI) / 180) + x1;
    const y2 = leng * Math.sin((angle * Math.PI) / 180) + y1;
    // 線の種類を設定
    // 枝を結ぶ
    lines.push({
      startX: x1,
      startY: y1,
      endX: x2,
      endY: y2,
      color: 0xFF0000
    });
    // 細分化
    if (level > 0) {
      // 細分化レベルを更新
      level = level - 1;
      // 次の枝を描く
      drawTree(x2, y2, leng * LENGTH_MULTIPLY, angle + DEGREE_BRANCH, level);
      drawTree(x2, y2, leng * LENGTH_MULTIPLY, angle - DEGREE_BRANCH, level);
    }
  }

  return lines;
}
