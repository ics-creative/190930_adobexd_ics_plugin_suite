type LineType = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color: number;
};

export function createTriangle(): LineType[] {
  // ステージを作成
  // 正三角形の一辺の大きさを指定
  const SIZE = 600;
  // 正三角形の高さを求める
  const HEIGHT = SIZE * Math.sin((60 * Math.PI) / 180);

  const lines: LineType[] = [];

  // フラクタルの三角形を描く
  drawTriangle(6, 0, HEIGHT, SIZE / 2, 0, SIZE, HEIGHT);

  // 三角形を描く関数
  function drawTriangle(level, x1, y1, x2, y2, x3, y3) {
    // 再帰レベルが0になったら描く
    if (level <= 0) {
      // 三角形を描く

      lines.push({
        startX: x1,
        startY: y1,
        endX: x2,
        endY: y2,
        color: 0xff0000
      });
      lines.push({
        startX: x2,
        startY: y2,
        endX: x3,
        endY: y3,
        color: 0xff0000
      });
    } else {
      // 再帰レベルが 0 になるまで細分化を行う
      // 正三角形の3辺の中点を求める
      // 1辺目の中点
      const nx1 = (x1 + x2) / 2;
      const ny1 = (y1 + y2) / 2;
      // 2辺目の中点
      const nx2 = (x2 + x3) / 2;
      const ny2 = (y2 + y3) / 2;
      // 3辺目の中点
      const nx3 = (x3 + x1) / 2;
      const ny3 = (y3 + y1) / 2;
      // 再帰レベルを更新
      level = level - 1;
      // 中点を元に細分化を行う
      drawTriangle(level, x1, y1, nx1, ny1, nx3, ny3);
      drawTriangle(level, x2, y2, nx1, ny1, nx2, ny2);
      drawTriangle(level, x3, y3, nx2, ny2, nx3, ny3);
    }
  }

  return lines;
}
