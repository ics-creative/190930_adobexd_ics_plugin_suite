//  temporary stubs required for Vue.
//  These will not be required as soon as the XD environment provides setTimeout/clearTimeout
import { RepeatGrid, SceneNode } from "scenegraph";

global.setTimeout = fn => fn();
global.clearTimeout = () => {};

// ES Modules 方式で読み込みたいが、
// 上述の setTimeout の互換性のため
// CommonJS 方式で読み込むしかない
const Vue = (require("vue") as any).default;
const Results = (require("./results.vue") as any).default;

/**
 * ダイアログを呼び出す
 */
function createDialog(results: string[]): HTMLDialogElement {
  document.body.innerHTML = `<dialog><div class="container"></div></dialog>`;
  const dialog = document.querySelector("dialog");
  const container = document.querySelector(".container");
  new Vue({
    el: container,
    components: { Results },
    render(h) {
      return h(Results, { props: { dialog, results } });
    }
  });
  return dialog;
}

function roundItem(item: SceneNode, results: string[]) {
  const current = {
    x: item.translation.x,
    y: item.translation.y
  };

  console.log(
    item.constructor.name,
    `{x:${item.translation.x}, y:${item.translation.y}}`
  );

  if (item.translation.x % 1 !== 0 || item.translation.y % 1 !== 0) {
    console.log(item.constructor.name, `{x:${current.x}, y:${current.y}}`);

    const result = {
      x: Math.round(current.x),
      y: Math.round(current.y)
    };
    if (!item.selected) {
      console.log(
        `${item.name} : {x:${current.x}, y:${current.y}}の編集権がありません`
      );
      return;
    }
    results.push(
      `${item.name} : {x:${current.x}, y:${current.y}}→ {x:${result.x}, y:${result.y}}`
    );
    item.translation = result;
  }
}

// メニューとして出力する
module.exports = {
  commands: {
    roundItemsRecursionMenu: (selection: Selection) => {
      let results = [];
      const roundItems = function(item: SceneNode, results: string[]) {
        roundItem(item, results);
        // リピートグリッドの中は調べない
        if (item.isContainer && !(item instanceof RepeatGrid)) {
          item.children.forEach(function(childNode: SceneNode, i) {
            roundItems(childNode, results);
          });
        }
      };
      for (let i = 0; i < selection.items.length; i++) {
        roundItems(selection.items[i], results);
      }

      createDialog(results).showModal();
    },
    roundItemsMenu: (selection: Selection) => {
      let results = [];
      for (let i = 0; i < selection.items.length; i++) {
        roundItem(selection.items[i], results);
      }
      console.log(results.length);
      createDialog(results).showModal();
    }
  }
};
