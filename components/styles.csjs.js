const css = require("csjs");
const baseColor = "rgb(14, 30, 37)";
const highlightColor = "#f6bc00";
const fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";

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
    box-sizing: border-box;
    width: 100%;
    max-width: 424px;
    padding: 32px;
    background-color: white;
    box-shadow: 0 4px 12px 0 rgba(0,0,0,0.07), 0 12px 32px 0 rgba(14,30,37,0.10);
    border-radius: 8px;
    font-family: ${fontFamily};
  }

  .btn {
    position: relative;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    margin-top: 38px;
    padding: 6px 14px;
    font-family: ${fontFamily};
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    border: 2px solid ${baseColor};
    border-radius: 4px;
    background-color: #2d3b41;
    color: white;
    transition: background-color 0.2s ease;
    outline: 0;
  }

  .btn:hover,
  .btn:focus {
    cursor: pointer;
    background-color: ${baseColor};
    text-decoration: none;
  }

  .form {
    display: flex;
    flex-direction: column;
  }

  .formGroup {
    position: relative;
    margin-top: 38px;
  }

  .form input {
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 40px;
    margin: 0;
    padding: 6px 14px;
    border: 2px solid #e9ebeb;
    border-radius: 4px;
    background-color: white;
    color: ${baseColor};
    box-shadow: none;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    transition: box-shadow ease-in-out 0.15s;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .form input:focus {
    outline: none;
    border-color: ${highlightColor};
    box-shadow: 0 0 1px 0 ${highlightColor};
  }

  .formGroup label {
    position: absolute;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: #a3a9ac;
    transform: translate3d(14px, -32px, 0);
    transition: 0.2s ease;
    pointer-events: none;
  }

  .formGroup input:focus ~ label, .formGroup input:valid ~ label {
    transform: scale(0.80) translate3d(0%, -326%, 0);
  }

  .modeSwitcher {
    display: flex;
  }

  .header button {
    display: block;
    flex-grow: 1;
    font-family: ${fontFamily};
    font-size: 18px;
    font-weight: 500;
    color: #a3a9ac;
    line-height: 24px;
    padding: 8px 8px 6px 8px;
    border: none;
    border-bottom: 2px solid #e9ebeb;
    border-radius: 4px 4px 0 0;
    background-color: white;
    transition: all 0.2s ease;
    outline: 0;
  }

  .header button.active {
    font-weight: 700;
    color: ${baseColor};
    border-color: ${baseColor};
  }

  .header button:hover {
    background-color: #e9ebeb;
    color: ${baseColor};
    cursor: pointer;
  }
`;
