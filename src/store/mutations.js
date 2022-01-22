export default {
  setMessage(state, data) {
    state.messages.push({
      message: data.message,
      class: data.class,
      type: data.type || 'toast'
    });

    setTimeout(() => {
      state.messages.shift();
    }, 4000);
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  }
};
