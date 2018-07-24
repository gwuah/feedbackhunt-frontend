<template>
  <div id="app">
    <Header/>
    <Body/>
  </div>
</template>

<script>
  
  import Header from '@/components/Header'
  import Body from '@/components/Body'

  export default {
    name: "App",
    components: {
      Header,
      Body
    }
  }
</script>


<style>
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
