import createTriangle from "./createTriangle";
import drawLines from "./drawLines";
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

export default function commandTriangle(selection: Selection) {
  // createDialog().showModal();

  drawLines(selection, lineData);
}
