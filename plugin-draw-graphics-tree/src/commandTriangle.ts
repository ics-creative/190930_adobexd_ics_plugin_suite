import { Color, GraphicNode, Line } from "scenegraph";
import * as commands from "commands";
import { createTriangle } from "./createTriangle";
// import Vue from "vue";
// import Dialog from "./Dialog.vue";

/**
 * ダイアログを呼び出す
 */
// function createDialog(): HTMLDialogElement {
//   document.body.innerHTML = `<dialog><div class="container"></div></dialog>`;
//   const dialog = document.querySelector("dialog");
//   const container = document.querySelector(".container");
//   new Vue({
//     el: container,
//     components: { Dialog },
//     render(h) {
//       return h(Dialog, { props: { dialog, results: [] } });
//     }
//   });
//   return dialog;
// }

const lineData = createTriangle();

export function commandTriangle(selection: Selection) {
  // createDialog().showModal();

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
