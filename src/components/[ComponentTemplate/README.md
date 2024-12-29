

````js
ComponentTemplate: () => import(/* webpackChunkName: "components/ComponentTemplate" */ './ComponentTemplate/ComponentTemplate.vue'),
````

````html
<ComponentTemplate 
  ref="ComponentTemplate"
  :db="db">
</ComponentTemplate>
````