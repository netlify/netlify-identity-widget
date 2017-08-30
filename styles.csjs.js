const css = require("csjs");

module.exports = css`
  .modalBackground {
    background-color: hsla(260, 100%, 0%, 0.5);
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modalWindow {
    background-color: white;
    min-height: 500px;
    min-width: 250px;
  }

  .form {
    display: flex;
    flex-direction: column;
  }
`;
