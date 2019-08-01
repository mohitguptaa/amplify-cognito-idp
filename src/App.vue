<template>
  <div id="app">
    <SignIn v-if="currentChallenge == 'SignIn'" v-bind:onSignIn="onSignIn" />
    <NewUser v-if="currentChallenge == 'NewUser'" v-bind:onNewPassword="onNewPassword" />
    <TOTPSetup
      v-if="currentChallenge == 'TOTPSetup'"
      v-bind:code="totpCode"
      v-bind:onVerifyCode="onVerifyCodeAndSetMFA"
    />
    <TOTPVerification
      v-if="currentChallenge == 'TOTPVerification'"
      v-bind:onVerifyCode="onVerifyCode"
    />
  </div>
</template>

<script>
import SignIn from "./components/SignIn";
import NewUser from "./components/NewUser";
import TOTPSetup from "./components/TOTPSetup";
import TOTPVerification from "./components/TOTPVerification";
import { Auth } from "aws-amplify";

export default {
  name: "app",
  components: {
    SignIn,
    NewUser,
    TOTPSetup,
    TOTPVerification
  },
  data() {
    return {
      currentChallenge: "SignIn",
      totpCode: ""
    };
  },
  methods: {
    async getTotpCode() {
      const secret = await Auth.setupTOTP(this.user);
      return (
        "otpauth://totp/AWSCognito:" +
        this.user.getUsername() +
        "?secret=" +
        secret +
        "&issuer=CognitoIDP"
      );
    },
    async onSignIn(username, password) {
      try {
        this.user = await Auth.signIn(username, password);

        if (this.user.challengeName === "NEW_PASSWORD_REQUIRED") {
          this.currentChallenge = "NewUser";
        } else if (this.user.challengeName === "SOFTWARE_TOKEN_MFA") {
          this.currentChallenge = "TOTPVerification";
        } else if (mfaType !== "TOTPMFA") {
          this.totpCode = await this.getTotpCode();
          this.currentChallenge = "TOTPSetup";
        }
      } catch (err) {
        alert(err.message);
      }
    },
    async onNewPassword(newPassword, name) {
      try {
        await Auth.completeNewPassword(
          this.user, // the Cognito User Object
          newPassword, // the new password
          // OPTIONAL, the required attributes
          {
            name
          }
        );
        this.totpCode = await this.getTotpCode();
        this.currentChallenge = "TOTPSetup";
      } catch (err) {
        alert(err.message);
      }
    },
    async onVerifyCode(verificationCode) {
      try {
        await Auth.confirmSignIn(this.user, verificationCode, "SOFTWARE_TOKEN_MFA");
        window.location.href = "http://www.google.com";
      } catch (err) {
        alert(err.message);
      }
    },
    async onVerifyCodeAndSetMFA(verificationCode) {
      try {
        await Auth.verifyTotpToken(this.user, verificationCode);
        await Auth.setPreferredMFA(this.user, "TOTP");
        window.location.href = "some url";
      } catch (err) {
        alert(err.message);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
