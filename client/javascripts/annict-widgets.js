import Vue    from 'vue';
import Widget from './widget.vue';

document.getElementById('annict-widgets').innerHTML = '<Widget></Widget>';

var widget = new Vue({
  el: '#annict-widgets',
  components: { Widget }
});
