# LaTeX MET Resume Formatter

[try it out](https://latex-resume-formatter.vercel.app/)

This is a WIP project for formatting resumes according to the MET standard template from a flexible form input to PDF files. It is a Next.js app running on Vercel that uses [pdfTeX](https://en.wikipedia.org/wiki/PdfTeX) compiled down to WebAssembly via [SwiftLaTeX](https://github.com/SwiftLaTeX/SwiftLaTeX).

## Development

Dependencies:

- Yarn (run `npm i -g yarn` to install)
- Node version 16.14+ (run `node -v` to verify)

Ensure you have yarn installed, which you can do with `npm i -g yarn`. Then run

```bash
git clone https://github.com/skrider/latex-resume-formatter
cd latex-resume-formatter
yarn
yarn sdks <YOUR TEXT EDITOR HERE>
yarn dev
```

We commit node modules found in .yarn/cache, this is not a mistake.

## Roadmap

- Write the form for converting user input to the JSONResume schema using Redux and React-Final-Form
- Transform said user input into .tex files
- Add firebase authentication to save user resume data between sessions
- (optional) serve user resumes so that they can be sent around, analytics can be embedded, and they can be updated on the fly
