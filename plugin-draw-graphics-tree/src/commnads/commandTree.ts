import createTree from "./createTree";
import drawLines from "./drawLines";

const lineData = createTree();

export default function commandTree(selection: Selection) {
  drawLines(selection, lineData);
}
