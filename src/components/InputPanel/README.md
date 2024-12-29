
````js
InputPanel: () => import(/* webpackChunkName: "components/InputPanel" */ './InputPanel/InputPanel.vue'),
````

````html
<InputPanel 
  ref="InputPanel"
  :db="db">
</InputPanel>
````