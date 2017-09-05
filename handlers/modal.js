module.exports = modalHandlers;

function modalHandlers (state, emitter) {
  emitter.on("navigate", page => {
    state.page = page;
    emitter.emit("render");
  });

  emitter.on("close", () => {
    state.open = false;
    emitter.emit("render");
  });

  emitter.on("clear-error", () => {
    state.error = null;
  });

  emitter.on("clear-success", () => {
    state.success = null;
  });
}
