const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

export default {
  data() {
    return {};
  },
  methods: {
    validate(toValidate) {
      let valid = true;
      if (toValidate.length > 0) {
        for (let i = 0; i < toValidate.length; i++) {
          toValidate[i].rules.forEach((rule) => {
            valid =
              this.check(toValidate[i].field, toValidate[i].value, rule) &&
              valid;
          });
        }
      }

      return valid;
    },
    check(field, value, rule) {
      if (rule == 'required') {
        if (value == '') {
          this.$store.commit('setMessage', {
            class: 'danger',
            message: 'The ' + field + ' field is required'
          });
          return false;
        }
      } else if (rule == 'email') {
        if (!EMAIL_REGEX.test(String(value).toLowerCase())) {
          this.$store.commit('setMessage', {
            class: 'danger',
            message: 'Invalid Email'
          });
          return false;
        }
      } else if (rule == 'url') {
        if (!URL_REGEX.test(String(value))) {
          this.$store.commit('setMessage', {
            class: 'danger',
            message: 'Invalid url at ' + field + ' field'
          });
          return false;
        }
      }
      return true;
    }
  }
};
