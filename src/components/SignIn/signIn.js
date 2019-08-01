export default {
    name: "SignIn",
    props: {
        onSignIn: {
            type: Function,
            required: true,
        },
    },
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        login() {
            this.onSignIn(this.email, this.password);
        }
    }
};