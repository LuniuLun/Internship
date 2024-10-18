import { createGlobalStyle } from 'styled-components'
import './normalize.css'
import './variables.css'
import './typography.css'
import './textStyles.css'
import './animations/fadeInOut.css'
import './animations/ripple.css'
import './animations/slideDown.css'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
    line-height: 1.15;

    @media (min-width: 1440px) {
      font-size: 18px;
    }

    @media (min-width: 768px){
      font-size: 20px;
    }
  }

  body {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
    font-family: 'Barlow', sans-serif;
    font-size: 1rem;
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
  }

  #root {
    width: 100%;
  }

  .center-title {
    h1 {
      text-align: center;
    }
  }
    
  .container {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  .container-fluid {
    width: 100%;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }

  @media (max-width: 575px) {
    .container {
      width: 100%;
    }
  }

  @media (min-width: 576px) {
    .container {
      width: 540px;
    }
  }

  @media (min-width: 768px) {
    .container {
      width: 720px;
    }
  }

  @media (min-width: 992px) {
    .container {
      width: 960px;
    }
  }

  @media (min-width: 1300px) {
    .container {
      width: 1190px;
    }
  }

  ::-webkit-scrollbar {
  width: 14px;
  height: 14px;
  background-color: var(--dark-bg-1);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--dark-bg-2);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #000;
  }

  ::-webkit-scrollbar-track {
    background-color: #828282;
    border-radius: 10px;
  }
`
export default GlobalStyle
