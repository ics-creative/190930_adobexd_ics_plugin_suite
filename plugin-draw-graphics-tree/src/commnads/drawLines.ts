import { Color, GraphicNode, Line } from "scenegraph";
import * as commands from "commands";
import LineType from "../types/LineType";

export default function drawLines(selection: Selection, lineData: LineType[]) {
  // [1]
  const lines = []; // [2]

  lineData.forEach(data => {
    // [3]
    const line = new Line(); // [4.i]

    line.setStartEnd(
      // [4.ii]
      data.startX,
      data.startY,
      data.endX,
      data.endY
    );

    line.strokeEnabled = true; // [4.iii]
    line.stroke = new Color("#FF0000"); // [4.iv]
    line.strokeWidth = 3; // [4.v]
    line.strokeEndCaps = (GraphicNode as any).STROKE_CAP_ROUND; // [4.v]

    lines.push(line); // [4.vi]

    (selection.editContext as any).addChild(line); // [4.vii]
  });

  selection.items = lines; // [5]
  commands.group(); // [6]
}
