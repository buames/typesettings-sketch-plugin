import { css } from '@emotion/core'

const globals = css`
  * {
    box-sizing: border-box;
  }

  html {
    line-height: 1.15; 
    font-size: 100%; 
  }

  body {
    background: #FFFFFF;
    color: #000000;
    font-family: '-apple-system';
    font-size: 12px;
    font-weight: 400;
  }

  html, body,
  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
  }

  legend {
    width: 100%;
  }

  label {
    display: block;
    width: 100%;
  }
`

export default globals
