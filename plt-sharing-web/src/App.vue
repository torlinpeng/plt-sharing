<template>
  <div id="app">
    <router-view></router-view>
    <Spin fix v-if="loadingshow" style="opacity: 0.65;">
                <!--<Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>-->
                <img src="../static/loadings.gif" />
                <div>有时候，等待也是一种美！</div>
            </Spin>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'app',
  data(){
  	return {
  	}
  },
  computed: {
    ...mapState([
      'loadingshow'
    ]),
  },
}
</script>
