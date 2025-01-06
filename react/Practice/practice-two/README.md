# Food management

This design is an admin dashboard for user management.

## Overview

- Design: [Food management](https://www.figma.com/design/1YZIcBdB3irhLktTCSkgwq/User-management?node-id=0-1&t=S8GKEx5DgZG9qkPh-1)
- Timeline: 80 hours (2024/11/29 - 2024/01/03)

## Team size

- One developer

## Targets

- Continue to improve component writing to be as common and clean as possible, plus it handles logic streams very efficiently.
- Become better understood and create your own custom hook to reduce redundant code.
- Applying Chakra UI simplifies component styling and ensures consistency across the application.
- Be aware of catching common and specific errors (errors from API, from logic,...) for one React application to prevent crashing issues dramatically.
- Keep moving with Storybook which will assist in managing components in the development environment.
- Practice should consist of additional libraries namely React Query, React Hook Form, and Zustand.
- Have an understanding at the basic level to set up, write unit tests and acquire coverage greater than 80%.

## Technical stack

- React(18.3.1) + Vite + TypeScript

## Installation and Running the Project

### Environment Configuration

- Node version: `22.11.0`

- To configure environment variables for your project, follow these steps

  1. In the root directory of your project, create a file named `.env.development.local`.
  2. Add configuration variables:

    ```bash
    VITE_APP_BASE_URL=https://669e22209a1bda368005842c.mockapi.io/api/v1/
    VITE_APP_USER_ENDPOINT=users
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
