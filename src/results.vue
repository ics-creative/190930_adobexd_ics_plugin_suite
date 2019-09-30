<template>
  <form>
    <h1>結果</h1>
    <div v-if="results.length !== 0">
      <ul>
        <li v-for="message in results">{{message}}</li>
      </ul>
      {{results.length}}個のオブジェクトの配置が調整されました。
    </div>
    <p v-else>
      小数点以下に配置されているオブジェクトはありませんでした。
    </p>
    <footer>
      <button type="submit" @click="close">完了</button>
    </footer>
  </form>
</template>

<script lang="ts">
  export default {
    props:{
      dialog:{
        type:Object
      },

      results:{
        type:Array
      }
    },
    methods:{
      close() {
        this.dialog.close();
      }
    },
    data() {
      return {
      };
    }
  };
</script>

<style>
  form {
    width: 300px;
  }
</style>
