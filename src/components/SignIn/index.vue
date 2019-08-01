<template>
  <div class="main">
    <div class="header">Login to xxx</div>
    <div class="email">
      <input type="text" placeholder="Enter your email.." v-model.trim="email" />
    </div>
    <div class="password">
      <input v-model="password" type="password" />
    </div>
    <button v-on:click="login">Login</button>
  </div>
</template>

<script src="./signIn.js"></script>

<style scoped>
.email,
.password {
  padding-bottom: 10pt;
  display: inherit;
  text-align: center;
}
.header {
  text-align: center;
  font-size: 18pt;
  padding-bottom: 10pt;
  display: inherit;
}
input {
  height: 20px;
  height: 30px;
  width: 25%;
}
</style>