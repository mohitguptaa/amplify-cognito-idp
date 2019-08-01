export default {
    name: "TOTPVerification",
    props: {
        onVerifyCode: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            verificationCode: '',
        };
    },
    methods: {
        _onVerifyCode() {
            this.onVerifyCode(this.verificationCode);
        }
    }
};