export default {
  props: {
    tag: {
      type: String,
      default: "a",
    },
    to: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.$router.push(this.to);
    },
  },
  render(h) {
    return h(
      this.tag,
      {
        on: {
          click: this.handleClick,
        },
      },
      this.$slots.default
    );
  },
};
