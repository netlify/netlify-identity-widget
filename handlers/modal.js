module.exports = modalHandlers;

function modalHandlers (state, emitter) {
  emitter.on("navigate", ({ page, title = "" }) => {
    state.page = page;
    state.title = title;
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
