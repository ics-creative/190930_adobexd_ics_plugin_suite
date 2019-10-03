import Vue from "vue";
import Dialog from "./Dialog.vue";
import { PositionType } from "./PositionType";

/**
 * ダイアログを呼び出す
 */
function createDialog(results: PositionType[]): HTMLDialogElement {
  document.body.innerHTML = `<dialog><div class="container"></div></dialog>`;
  const dialog = document.querySelector("dialog");
  const container = document.querySelector(".container");
  new Vue({
    el: container,
    components: { Dialog },
    render(h) {
      return h(Dialog, { props: { dialog, results } });
    }
  });
  return dialog;
}

// メニューとして出力する
module.exports = {
  commands: {
    traceLayers: (selection: Selection) => {
      const results = selection.items.map(item => ({
        name: item.name,
        x: item.translation.x,
        y: item.translation.y
      }));
      createDialog(results).showModal();
    }
  }
};
