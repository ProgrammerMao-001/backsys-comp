import ytForm from "./src/main.vue";

ytForm.install = (Vue) => {
    Vue.component(ytForm.name, ytForm);
};

export default ytForm;
