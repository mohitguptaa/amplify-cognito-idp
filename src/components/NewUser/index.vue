<template>
  <div class="main">
    <div class="header">Login to xxx</div>
    <div class="password">
      <input v-model="newPassword" type="password" placeholder="Enter new password"/>
    </div>
    <div class="password">
      <input v-model="confirmPassword" type="password" placeholder="Confirm new password"/>
    </div>
    <div class="name">
      <input v-model="name" type="text" placeholder="Your name"/>
    </div>
    <button v-on:click="setPassword">Set Password</button>
  </div>
</template>

<script src="./newUser.js"></script>

<style scoped>
.name,
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