import { SceneNode } from "scenegraph";
import Vue from "vue";
import Hello from "./Hello.vue";

/**
 * ダイアログを呼び出す
 */
function createDialog(): HTMLDialogElement {
  document.body.innerHTML = `<dialog><div class="container"></div></dialog>`;
  const dialog = document.querySelector("dialog");
  const container = document.querySelector(".container");
  new Vue({
    el: container,
    components: { Hello },
    render(h) {
      return h(Hello, { props: { dialog } });
    }
  });
  return dialog;
}

/**
 * 日本語から英語に変更する
 * @param {string} n
 * @returns {string}
 */
function convertJpToEn(jp: string) {
  let name = jp;
  name = name.split("アセット").join("asset");
  name = name.split("シェイプ").join("shape");
  name = name.split("シンボル").join("symbol");
  name = name.split("レイヤー").join("layer");
  name = name.split("グループ化").join("group");
  name = name.split("グループ").join("group");
  name = name.split("フォント").join("font");
  name = name.split("グラフィック").join("graphic");
  name = name.split("ビデオ").join("video");
  name = name.split("フォルダー").join("folder");
  name = name.split("トゥイーン").join("tween");
  name = name.split("名称未設定").join("unknown");
  name = name.split("長方形").join("rectangle");
  name = name.split("楕円形").join("ellipse");
  name = name.split("線").join("line");
  name = name.split("リピートグリッド").join("repeat_grid");
  name = name.split("アートボード").join("artboard");
  name = name.split("パス").join("path");
  name = name.split("画像").join("image");

  name = name
    .split("　")
    .join(" ")
    .split(" ")
    .join("_");
  return name;
}

/**
 * ノードの子の名前を変更する。
 * @param {SceneNode} node
 */
function renameChildren(node: SceneNode) {
  // console.log("node.children:" + node.children);
  node.children.forEach((childNode, i) => {
    // 孫の名前の変更は出来ないので、再帰はしない
    // renameChildren(childNode);

    // 名前を変更する
    const name = convertJpToEn(childNode.name);
    childNode.name = name;
  });
}

/**
 * 選択されているファイルをリネームする。
 */
function renameSelection(selection) {
  selection.items.forEach((childNode, i) => {
    // console.log("node :" + i, name);
    // 現状、ルート以外で、以下の関数を実行するとエラーが表示される
    // 「Plugin Error: Plugin made a change outside the current edit context
    // https://adobexdplatform.com/plugin-docs/reference/core/edit-context.html
    renameChildren(childNode);

    // 選択しているノードの名前を変更する
    const name = convertJpToEn(childNode.name);
    childNode.name = name;
  });
}

// メニューとして出力する
module.exports = {
  commands: {
    // コマンドが押されたらこの関数を呼び出す
    menuCommand: selection => {
      renameSelection(selection);
    }
  }
};
