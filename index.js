// ESM port of https://github.com/tkhquang/gridsome-remark-figure-caption
import { visit } from 'unist-util-visit'
import { whitespace } from 'hast-util-whitespace'
import { remove } from 'unist-util-remove'
import { unified } from 'unified'
import remarkParse from 'remark-parse'

const processor = unified().use(remarkParse)

/** @type {import('unified').Plugin<[], import('mdast').Root>} */
export default function remarkFigureCaption(options = {}) {
	return (tree) => {
		// Unwrap the images inside Paragraphs
		visit(tree, 'paragraph', (node, index, parent) => {
			if (!hasOnlyImages(node)) {
				return
			}

			remove(node, 'text')

			parent.children.splice(index, 1, ...node.children)

			return index
		})

		// Wrap image nodes in figure
		visit(
			tree,
			(node) => isImageWithAlt(node),
			(node, index, parent) => {
				if (isImageWithCaption(parent)) {
					return
				}

				const figure = createNodes(node, options)

				node.type = figure.type
				node.children = figure.children
				node.data = figure.data
			}
		)
	}
}

const createNodes = (imageNode, { figureClassName, imageClassName, captionClassName }) => {
	let figchildren = null
	try {
		var captionContent = processor.parse(imageNode.alt)
		figchildren = captionContent.children[0].children // children of first paragraph
	} catch (e) {
		console.log(
			'figure-caption-plugin: Failed to parse markdown for image - using plain txt as fallback: ' +
				imageNode.alt
		)
		figchildren = [
			{
				type: 'text',
				value: imageNode.alt,
			},
		]
	}

	const figcaption = {
		type: 'figcaption',
		children: figchildren,
		data: {
			hName: 'figcaption',
			...getClassProp(captionClassName),
		},
	}

	const figure = {
		type: 'figure',
		children: [getImageNodeWithClasses(imageNode, imageClassName), figcaption],
		data: {
			hName: 'figure',
			...getClassProp(figureClassName),
		},
	}

	return figure
}

const hasOnlyImages = (node) => {
	return node.children.every((child) => {
		return child.type === 'image' || whitespace(child)
	})
}

const isImageNodeWithAlt = (node) => {
	return node.type === 'image' && Boolean(node.alt) && Boolean(node.url)
}

const isHTMLImageNode = (node) => {
	return node.type === 'html' && Boolean(node.alt) && /^<img\s/.test(node.value)
}

const isImageWithAlt = (node) => {
	return isImageNodeWithAlt(node) || isHTMLImageNode(node)
}

const isImageWithCaption = (parent) => {
	return (
		parent.type === 'figure' &&
		parent.children.some((child) => child.type === 'figcaption')
	)
}

const getClassProp = (className) => {
	return {
		...(className && {
			hProperties: {
				class: [className],
			},
		}),
	}
}

const classRegex = /\sclass="(.*?)"\s/gi

const getImageNodeWithClasses = (node, classes) => {
	// Is Image type node
	if (!isHTMLImageNode(node)) {
		return {
			...node,
			data: {
				...getClassProp(classes),
			},
		}
	}

	// is HTML Image node
	if (!classes) {
		return {
			...node,
		}
	}

	// Bruteforce adding classes for now
	const hasClass = classRegex.exec(node.value)

	if (!hasClass) {
		return {
			...node,
			value: node.value.replace(/<img\s/, `<img class="${classes}" `),
		}
	}

	return {
		...node,
		value: node.value.replace(classRegex, ` class="$1 ${classes}" `),
	}
}
