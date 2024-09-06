# Food management

This is the first practice of Typescript with concept is convert JavaScript practice to TypeScript. This site supports product management.

## Overview

- Design: [Food management](https://www.figma.com/design/jxChNg9bwxv11ihSG9h28C/Foods-Mangement-(Copy)?node-id=512-5279&t=rCCA3PgjHdeiqfVL-0)
- Timeline: 16 hours (2024/08/30 - 2024/09/06)

## Team size

- One developer

## Requirements

- Apply knowledge of HTML/CSS/JS (with ES6+ syntax)
- Apply TypeScript
- Apply ESLint with suggestions
  - Prettier Extension
  - Airbnb style

## Targets

- Get familiar with TypeScript language and understand the power of typed language and best practices.
- Apply the TypeScript configurations, config compiler options, and more.
- Apply ESLint
  - The trainees are required to solve all errors/warnings from ESLint.
  - The trainees should understand ESLint rules and don’t turn them off to resolve current issues.

## Technical stack

- HTML5/CSS3/JS
- TypeScript
- Development tools: Parcel
- ESLint - Airbnb JS styles
- BEM
- SASS

## Installation and Running the Project

### Environment Configuration

- Node version: `20.15.1`

- To configure environment variables for your project, follow these steps

  1. In the root directory of your project, create a file named `.env.development.local`.
  2. Add configuration variables:

    ```bash
    PARCEL_APP_BASE_URL=https://669e22209a1bda368005842c.mockapi.io/api/v1/
    PARCEL_APP_PRODUCTS_ENDPOINT=products
    ```

### Install package

```bash
npm i
```

### Run project

```bash
npm start
```

### Build project

```bash
npm run build
```