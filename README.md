# rollup-plugin-file-import

This plugin allows you to emit files to rollup bundle.

## Install

```bash
yarn add rollup-plugin-file-import --dev
```

or

```bash
npm install rollup-plugin-file-import -D
```

## Usage

```javascript
// rollup.config.js

import fileImport from 'rollup-plugin-file-import'

export default {
  // ...
  plugins: [
    fileImport([
      {
        // absolute path to output directory
        outputDir: `/user/project/public/images`,
        extensions: ['.png', '.jpg', '.jpeg'],
      },
    ])
  ]
}
```

## Options

```typescript
{
  outputDir: string,
  extensions: string[],
}[]
```

### outputDir

Absolute path to output directory

Required

### extensions

File extension (.png, .jpg)

Required
