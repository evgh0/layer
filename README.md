# MUSTER - Pattern Visualization

MUSTER is a web application designed for the visualization and generation of complex nested patterns and recursive geometric structures. Users can explore different "Verschachtelungslagen" (nesting levels) and export the resulting designs as high-quality images.

## Features

- **Recursive Pattern Generation**: Generate complex geometric structures based on mathematical nesting levels.
- **Dynamic Level Selection**: Adjust the nesting depth via an interactive sidebar (optimized for both desktop and mobile).
- **Interactive Gallery**: Browse through unique generated patterns.
- **Full-Screen View**: Inspect patterns in detail with a dedicated inspection mode.
- **Image Export**: Export patterns as PNG files directly from the browser.
- **Responsive Design**: Fully functional on mobile and desktop devices.
- **Dark Mode Support**: Seamlessly switch between light and dark themes.

## Technologies Used

- [Next.js 15](https://nextjs.org/docs/getting-started)
- [HeroUI v2](https://heroui.com/)
- [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) for high-performance pattern rendering.
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [framer-motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

## How it Works

The patterns are generated using recursive algorithms found in `utils/nested-lists.ts`. The `CanvasCard` component handles the rendering of these structures onto an HTML5 Canvas, ensuring smooth performance even at high nesting levels.

## License

Licensed under the [MIT license](LICENSE).
