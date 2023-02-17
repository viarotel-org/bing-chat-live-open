let state = false;
let timer = null;
export default {
  set({ callback = () => {}, delay = 30 * 1000, autoState = true } = {}) {
    if (autoState) state = true;

    timer = setTimeout(() => {
      state = false;
      callback();
    }, delay);
  },
  get() {
    return state;
  },
  remove({ autoState = true } = {}) {
    if (autoState) state = false;

    if (timer) clearTimeout(timer);
  },
};
