export default {
    name: "NewUser",
    props: {
        onNewPassword: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            newPassword: "",
            confirmPassword: "",
            name: "",
        };
    },
    methods: {
        setPassword() {
            if (this.newPassword === this.confirmPassword) {
                this.onNewPassword(this.newPassword, this.name);
            }
        }
    }
};