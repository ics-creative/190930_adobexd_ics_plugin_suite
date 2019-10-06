import { SceneNode } from "scenegraph";

const nameConvertRule = [
  { target: "アセット", expected: "asset" },
  { target: "シェイプ", expected: "shape" },
  { target: "シンボル", expected: "symbol" },
  { target: "レイヤー", expected: "layer" },
  { target: "グループ化", expected: "group" },
  { target: "グループ", expected: "group" },
  { target: "フォント", expected: "font" },
  { target: "グラフィック", expected: "graphic" },
  { target: "ビデオ", expected: "video" },
  { target: "フォルダー", expected: "folder" },
  { target: "トゥイーン", expected: "tween" },
  { target: "名称未設定", expected: "untitled" },
  { target: "長方形", expected: "rectangle" },
  { target: "楕円形", expected: "ellipse" },
  { target: "線", expected: "line" },
  { target: "リピートグリッド", expected: "RepeatGrid" },
  { target: "アートボード", expected: "ArtBoard" },
  { target: "パス", expected: "path" },
  { target: "画像", expected: "image" }
];

/**
 * 日本語から英語に変更します。
 */
function convertJpToEn(jp: string) {
  let name = jp;
  nameConvertRule.forEach(item => {
    name = name.split(item.target).join(item.expected);
  });
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
