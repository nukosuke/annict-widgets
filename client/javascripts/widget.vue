<template lang='pug'>
.annict_widgets
  .annict_widgets_header
    .heading
      a(href='https://annict.com')
        img(:src='WIDGET_SERVER_URI+"/static/images/annict_logo.png"' alt='')
      p Now Watching
  .annict_widgets_body
    ul
      li(v-for='work in works')
        a(:href='work.official_site_url' v-bind:title='work.title') {{work.title}}
  .annict_widgets_footer.cf
    p annict widgets by nukosuke
</template>

<script>
import 'whatwg-fetch';
import WorkList from './components/work-list.vue';

export default {
  data() {
    return {
      WIDGET_SERVER_URI,
      works: [{title: '読み込み中...'}]
    }
  },
  created() {
    var id = document.getElementById('annict-widgets').getAttribute('data-id');

    fetch(`${WIDGET_SERVER_URI}/watching/${id}`)
    .then(res => res.json())
    .then(body => { this.works = body.works; });
  },
  components: {
    WorkList
  }
}
</script>

<style lang='scss'>
$annict-color: #f85b73;

.annict_widgets {
  all: initial;
  max-width: 512px;
  max-height: 600px;

  p {
    margin: 0;
  }
}
.annict_widgets_header {
  color: white;
  background-color: $annict-color;
  padding: 4px 8px;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;

  .heading {
    display: table;
  }
  img {
    display: table-cell;
    width: 35px;
  }
  p {
    display: table-cell;
    vertical-align: middle;
    font-size: 10pt;
    padding-left: 4px;
  }
  a {
    color: white;
    font-size: 11pt;
    text-decoration: none;
  }
}
.annict_widgets_body {
  background-color: white;
  border: solid 1px #ddd;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li {
    font-size: 10pt;
    padding: 4px 8px;
    border-bottom: dotted 1px #ccc;
  }
  li:last-child {
    border-bottom: none;
  }
  li > a {
    text-decoration: none;
    color: $annict-color;
  }
  li > a:hover {
    text-decoration: underline;
  }
}
.annict_widgets_footer {
  background-color: #444;
  padding: 2px 16px;
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;

  p {
    color: #eee;
    font-size: 8pt;
    float: right;
  }
}

.cf:before, .cf:after { content: " "; display: table; }
.cf:after { clear: both; }
.cf { *zoom: 1; }
</style>
