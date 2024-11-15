# Food management

This is the first practice of React with concept is convert JavaScript practice to React components. This site supports product management.

## Overview

- Design: [Food management](https://www.figma.com/design/jxChNg9bwxv11ihSG9h28C/Foods-Mangement-(Copy)?node-id=512-5279&t=rCCA3PgjHdeiqfVL-0)
- Timeline: 40 hours (2024/10/9 - 2024/10/18)

## Team size

- One developer

## Requirements

- Apply what you have read to rewrite your previous JS practice into React components.
- Apply Storybook to your practice.

## Targets

- Convert to React: Break down your previous JS practice into reusable React components, ensuring clear separation of logic and UI.
- Integrate Storybook: Use Storybook to document and test your components in isolation, covering various states (e.g., success, error).
- Apply ESLint
  - The trainees are required to solve all errors/warnings from ESLint.
  - The trainees should understand ESLint rules and don’t turn them off to resolve current issues.

## Technical stack

- React(18.3.1) + Vite + TypeScript
- SASS

## Installation and Running the Project

### Environment Configuration

- Node version: `20.15.1`

- To configure environment variables for your project, follow these steps

  1. In the root directory of your project, create a file named `.env.development.local`.
  2. Add configuration variables:

    ```bash
    REACT_APP_BASE_URL=https://669e22209a1bda368005842c.mockapi.io/api/v1/
    REACT_APP_PRODUCTS_ENDPOINT=products
    ```

### Install package

```bash
pnpm i
```

### Run project

```bash
pnpm dev
```

### Build project

```bash
pnpm build
```
