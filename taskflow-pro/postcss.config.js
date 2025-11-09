// ESM PostCSS config for projects using "type": "module" in package.json.
// Uses top-level await to dynamically import CommonJS packages and call their factories.
// Ensure dev dependencies are installed: @tailwindcss/postcss and autoprefixer

// Use the official tailwindcss package so core utilities are available.
const tailwind = (await import('tailwindcss')).default;
const autoprefixer = (await import('autoprefixer')).default;

export default {
  plugins: [
    tailwind(),
    autoprefixer(),
  ],
};
