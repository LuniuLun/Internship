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
`
export default GlobalStyle
