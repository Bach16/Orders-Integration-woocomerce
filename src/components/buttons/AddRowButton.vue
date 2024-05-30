<template>
    <div @click="addRow(index)" class="delete-button">
      <v-icon class="del-button text-primary" icon="mdi-plus-circle" start></v-icon>
    </div>
  </template>
  
  <script>
  export default {
    props: ["index","save"],
    methods: {
        addRow(index){
            this.save(false,index);
        }
    }
  };


  </script>
  
  

  <style>
  .delete-button {
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .del-button{
      font-size: 22px;
      padding: 18px;
      border-radius: 3px;
      background-color: rgb(255, 255, 255);
  }
  </style>
  