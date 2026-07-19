const index = {
  async fetch(request, env) {
    return env.ASSETS.fetch(request);
  }
};
const workerEntry = index ?? {};
export {
  workerEntry as default
};
