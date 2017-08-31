const css = require("csjs");
const baseColor = "rgb(14, 30, 37);";

module.exports = css`

  .modalBackground {
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${baseColor};
    opacity: .87;
  }

  .modalWindow {
    background-color: white;
    width: 90%;
    max-width: 424px;
    padding: 32px;
    box-shadow: 0 4px 12px 0 rgba(0,0,0,0.07), 0 12px 32px 0 rgba(14,30,37,0.10);
    border-radius: 8px;
  }

  .form {
    display: flex;
    flex-direction: column;
  }

  .header {
  }

  .active {
  }
`;
