export default {
  props: {
    formBus: { type: Object, default: null },
    beginFormData: {
      type: Object,
      required: true,
    },
    sendRequest: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      valid: false,
      formData: JSON.parse(JSON.stringify(this.beginFormData)),
      rules: {
        required: (value) => !!value || "This field is required",
      },
    };
  },

  created() {
    if (this.formBus) {
      this.formBus.$on("submit", this.submit);
    }
  },

  destroyed() {
    if (this.formBus) {
      this.formBus.$off("submit", this.submit);
    }
  },

  methods: {
    submit() {
      this.$refs.form.validate();
      if (this.valid) {
        this.sendRequest(this.formData);
      }
    },
  },
};
