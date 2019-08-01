<template>
  <div class="main">
    <qr-code v-bind:text="code"></qr-code>
    <input type="password" v-model="verificationCode" placeholder="Code" />
    <button v-on:click="_onVerifyCode">Verify Code</button>
  </div>
</template>

<script src="./totpSetup.js"></script>

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