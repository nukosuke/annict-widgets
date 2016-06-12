<template lang='pug'>
.annict_widgets
  .annict_widgets_header
    .heading
      img(src='/static/images/annict_logo.png' alt='')
      p Now Watching
  .annict_widgets_body
    ul
      li(v-for='work in works')
        a(href='{{work.official_site_url}}' title='{{work.title}}') {{work.title}}
  .annict_widgets_footer.cf
    p annict widgets by nukosuke
</template>

<script>
import 'whatwg-fetch';
import WorkList from './components/work-list.vue';

export default {
  data() {
    return {
      works: []
    }
  },
  created() {
    console.log('aaaa');
    var id = document.getElementById('annict-widgets').getAttribute('data-id');
    console.log(id);

    fetch(`/watching/${id}`)
    .then(res => res.json())
    .then(works => {
      console.log(works.works);
      this.works = works.works;
    });
  },
  components: {
    WorkList
  }
}
</script>

<style lang='css'>
.annict_widgets {
  max-width: 512px;
  max-height: 600px;
}
.annict_widgets p {
  margin: 0;
}
.annict_widgets_header {
  color: white;
  background-color: #f85b73;
  padding: 4px 8px;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
}
.annict_widgets_header .heading {
  display: table;
}
.annict_widgets_header img {
  display: table-cell;
  width: 35px;
}
.annict_widgets_header p {
  display: table-cell;
  vertical-align: middle;
  font-size: 10pt;
  padding-left: 4px;
}
.annict_widgets_header a {
  color: white;
  font-size: 11pt;
  text-decoration: none;
}
.annict_widgets_body {
  background-color: white;
  border: solid 1px #ddd;
}
.annict_widgets_body ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
.annict_widgets_body li {
  padding: 4px;
  border-bottom: dotted 1px #ccc;
}
.annict_widgets_body li:last-child {
  border-bottom: none;
}
.annict_widgets_body li > a {
  color: #f85b73;
}
.annict_widgets_body li > a:hover {
  text-decoration: underline;
}
.annict_widgets_footer {
  background-color: #444;
  padding: 2px 16px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
}
.annict_widgets_footer p {
  color: #eee;
  font-size: 8pt;
  float: right;
}

.cf:before, .cf:after { content: " "; display: table; }
.cf:after { clear: both; }
.cf { *zoom: 1; }
</style>
