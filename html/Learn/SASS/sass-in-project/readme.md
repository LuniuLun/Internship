# Sass in Project

Welcome to the Sass in Project! This guide will help you set up and use SCSS in your web project. Follow the steps below to get started.

## Prerequisites

Before you begin, make sure you have Node.js and npm installed on your machine.

## Installation and Setup

### Step 1: Initialize the Project

Start by initializing your project with npm. This will create a `package.json` file for you.

```sh
npm init
```

### Step 2: Install Node-Sass

Node-Sass is a library that provides binding for Node.js to LibSass, the C version of the popular stylesheet preprocessor, Sass. Install it as a development dependency to compile SCSS to CSS.

```sh
npm install node-sass --save-dev
```

### Step 3: Install BrowserSync

BrowserSync is a tool that helps you test your local development server. It will automatically refresh your browser whenever files change.

```sh
npm install browser-sync --save-dev
```

### Step 5: Install Npm-Run-All

Npm-Run-All is a CLI tool to run multiple npm-scripts in parallel or sequential. We'll use it to run the SCSS compiler and the server at the same time.

```sh
npm install npm-run-all --save-dev
```

### Step 6: Config scripts

```sh
  "scripts": {
    "scss": "node-sass --output-style compressed -o public/css src/scss",
    "serve": "browser-sync start --server --files 'public/css/*.css, src/index.html'",
    "watch": "node-sass --watch src/scss/ --output public/css/",
    "start": "npm-run-all -p serve watch"
  },
```
