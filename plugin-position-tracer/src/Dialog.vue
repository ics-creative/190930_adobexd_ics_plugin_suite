<template>
  <form>
    <h1>座標を吐き出す君</h1>
    <div v-if="results.length !== 0">
      <textarea readonly v-bind:value="json" type="text" />
    </div>
    <label
      ><input type="checkbox" v-model="isPretty" /> インデントを付ける</label
    >
    <footer>
      <button uxp-variant="cta" @click="copy">コピー</button>
      <button type="submit" @click="close">閉じる</button>
    </footer>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import { PositionType } from "./PositionType";
import {copyText} from "clipboard";
import {editDocument} from "application";

export default Vue.extend({
  data() {
    return {
      isPretty: false
    };
  },
  computed: {
    json():string {
      return JSON.stringify(this.results, null, this.$data.isPretty ? 2 : 0);
    }
  },
  props: {
    dialog: {
      type: Object
    },

    results: {
      type: Array as () => PositionType[]
    }
  },
  methods: {
    copy(event) {
      try{
        editDocument(async () => {
          copyText(this.json)
        });
      }catch(ex){
        console.log("Failed", ex)
      }
    },
    close(event) {
      this.dialog.close();
    }
  }
});
</script>

<style scoped>
textarea {
  height: 400px;
  width: 640px;
  user-select: text;
}
</style>
