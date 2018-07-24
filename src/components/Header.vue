<template>
  <div class="header-parent">
    <div class="header mina">
      <img class="logo" src="../assets/our-logo.png"/>
      <span class="product-name">{{ appName }}</span>
      <span class="path"> / {{ path }}</span>

      <div class="user-ctrl">
        <a href="">
          <span class="username">gwuah</span>
          <img class="user-avatar" :src="userImg">
        </a>
      </div>

      <!-- <div class="logout-nav">
        <ul class="mina">
          <a 
            href="#" 
            @click="logout()">
            <li><i data-feather="power"></i> Logout </li>
          </a>
        </ul>
    </div> -->
    </div>
  </div>
</template>

<script>
  import Hub from '@/utils/hub';

export default {
  name: 'Header',
  data() {
    return {
      path: "inbox",
      appName: "FEEDBACKHUNT",
      userImg: "https://gravatar.com/avatar/a951d30e6cac264f9bc6588386fc7e15?s=200"
    }
  },
  created() {
    Hub.$on("route", (path)=>{
      this.path = path;
    })
  }
}
</script>

<style scoped>
.path {
  font-family: Ubuntu;
  position: relative;
  bottom: 7px;
  left: 10px;
  color: red;
  font-weight: bold;
}
.header {
  position: relative;
}

/* .logout-nav {
  padding: 10px 30px;
  background-color: black;
  position: absolute;
  opacity: 0.;
  right: 40px;
  top: 55px;
  border-radius: 5px;
}
.logout-nav a{
  text-decoration: none;
  color: white;
  font-weight: bolder;
  font-family: Ubuntu;

} */
</style>
