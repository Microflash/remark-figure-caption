export default [
	{
		title: "image with alt text as plaintext",
		input: `![Image](http://example.com/test.png)`,
		output: `<figure><img src="http://example.com/test.png" alt="Image"><figcaption>Image</figcaption></figure>`
	},
	{
		title: "image with alt text and custom classes",
		input: `![Image](http://example.com/test.png)`,
		output: `<figure class="figure"><img src="http://example.com/test.png" alt="Image" class="image"><figcaption class="figcaption">Image</figcaption></figure>`,
		options: {
			figureClassName: "figure",
			imageClassName: "image",
			captionClassName: "figcaption"
		}
	},
	{
		title: "image with alt text containing markdown",
		input: `![Image with **strong** _emphasis_](http://example.com/test.png)`,
		output: `<figure><img src="http://example.com/test.png" alt="Image with strong emphasis"><figcaption>Image with strong emphasis</figcaption></figure>`
	},
	{
		title: "raw image markup with caption",
		input: `<figure><img src="http://example.com/captioned.png" alt="Captioned image"><figcaption><em>Captioned image</em></figcaption></figure>`,
		output: `<figure><img src="http://example.com/captioned.png" alt="Captioned image"><figcaption><em>Captioned image</em></figcaption></figure>`
	},
	{
		title: "image with no alt text",
		input: `![](http://example.com/test.png)`,
		output: `<img src="http://example.com/test.png" alt="">`
	},
	{
		title: "paragraph with no images",
		input: `A paragraph bereft of images`,
		output: `<p>A paragraph bereft of images</p>`
	},
];
