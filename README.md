# remark-figure-caption

[![npm](https://img.shields.io/npm/v/@microflash/remark-figure-caption)](https://www.npmjs.com/package/@microflash/remark-figure-caption)
[![regression](https://github.com/Microflash/remark-figure-caption/actions/workflows/regression.yml/badge.svg)](https://github.com/Microflash/remark-figure-caption/actions/workflows/regression.yml)
[![license](https://img.shields.io/npm/l/@microflash/remark-figure-caption)](./LICENSE.md)

[remark](https://github.com/remarkjs/remark) plugin to transform images with alt text to figures with captions

## Status: legacy

> This package is no longer recommended for use. It’s still covered by semantic-versioning guarantees and not yet deprecated, but use of this package should be avoided. Please use remark-rehype to move from remark (markdown) to rehype (HTML) and then replace remark-figure-caption with [`rehype-figure`](https://github.com/Microflash/rehype-figure).

## Contents

- [What's this?](#whats-this)
- [Install](#install)
- [Use](#use)
- [API](#api)
	- [Options](#options)
- [Credits](#credits)
- [License](#license)

## What's this?

This package is a [unified](https://github.com/unifiedjs/unified) ([remark](https://github.com/remarkjs/remark)) plugin that takes the image nodes with alt text (e.g., `![Alt text](path-to-image.jpg)`) and converts them to [figure](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure) elements with captions.

```html
<figure>
  <img src="path-to-image.jpg" />
  <figcaption>Alt Text</figcaption>
</figure>
```

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

In Node.js (16.0+), install with [npm](https://docs.npmjs.com/cli/install):

```sh
npm install @microflash/remark-figure-caption
```

> For Node.js versions below 16.0, stick to 1.x.x versions of this plugin.

In Deno, with [esm.sh](https://esm.sh/):

```js
import remarkFigureCaption from "https://esm.sh/@microflash/remark-figure-caption";
```

In browsers, with [esm.sh](https://esm.sh/):

```html
<script type="module">
  import remarkFigureCaption from "https://esm.sh/@microflash/remark-figure-caption?bundle";
</script>
```

## Use

Say we have the following module `example.js`:

```js
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkFigureCaption from "@microflash/remark-figure-caption";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

main()

async function main() {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFigureCaption)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process("![Alt text](path-to-image.jpg)");

  console.log(String(file));
}
```

Running that with `node example.js` yields:

```html
<figure>
  <img src="path-to-image.jpg" />
  <figcaption>Alt Text</figcaption>
</figure>
```

## API

The default export is `remarkFigureCaption`.

### Options

The following options are available. All of them are optional.

- `figureClassName`: class for the wrapped `figure` element
- `imageClassName`: class for the wrapped `img` element
- `captionClassName`: class for the wrapped `figcaption` element

By default, no classes are added to the `figure`, `img` and `figcaption` elements.

## Credits

[Quang Trinh](https://github.com/tkhquang) who wrote the original [plugin](https://github.com/tkhquang/gridsome-remark-figure-caption). This is a direct ESM-only port.

## License

[MIT](./LICENSE.md)
