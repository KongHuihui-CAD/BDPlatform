<template>
    <div>这是示例图谱{{graphname}}页面</div>
</template>

<script>
export default {
  data() {
    return {
      graphname: this.$route.params.name
    };
  }
};
</script>

<style>
</style>
