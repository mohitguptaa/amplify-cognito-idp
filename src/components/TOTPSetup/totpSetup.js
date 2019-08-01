export default {
    name: "TOTPSetup",
    props: {
        code: {
            type: String,
            required: true,
        },
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