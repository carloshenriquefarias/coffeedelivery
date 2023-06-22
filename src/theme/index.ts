import { extendTheme } from "native-base";

export const Theme = extendTheme(
  {
    // colors: {
    //   "base-white": "#FFFFFF",

    //   "base-background": "#FAFAFA",
    //   "base-card": "#F3F2F2",
    //   "base-input": "#EDEDED",
    //   "base-button": "#E6E5E5",
    //   "base-hover": "#D7D5D5",
    //   "base-label": "#8D8686",
    //   "base-text": "#574F4D",
    //   "base-subtitle": "#403937",
    //   "base-title": "#272221",
    //   "base-error": "#f84747",

    //   "brand-purple-dark": "#4B2995",
    //   "brand-purple": "#8047F8",
    //   "brand-purple-light": "#EBE5F9",

    //   "brand-yellow-dark": "#C47F17",
    //   "brand-yellow": "#DBAC2C",
    //   "brand-yellow-light": "#F1E9C9",
    // },
    colors: {
      purple: {
        300: '#4B2995',
        200: '#8047F8',
        100: '#EBE5F9',
      },
      gray: {
        800: '#272221',
        700: '#403937',
        600: '#574F4D',
        500: '#8D8686',
        400: '#D7D5D5',
        300: '#E6E5E5',
        200: '#EDEDED',
        100: '#F3F2F2',
        50: '#FAFAFA',
      },
      white: '#FFFFFF',
      red: {
        300: '#C44117',
        200: '#E8BAAB',        
        100: '#F2DFD8'
      }, 
      yellow: {
        300: '#C47F17',
        200: '#DBAC2C',
        100: '#F1E9C9',
      }
    },
    fonts: {
      heading: 'Baloo 2',
      body: 'Roboto_400Regular',
    },
    fontSizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 26,
    },
    sizes: {
      14: 56,
      33: 148
    }
  }
)

// export const defaultTheme = 
// {
//   colors: {
//     "base-white": "#FFFFFF",
//     "base-background": "#FAFAFA",
//     "base-card": "#F3F2F2",
//     "base-input": "#EDEDED",
//     "base-button": "#E6E5E5",
//     "base-hover": "#D7D5D5",
//     "base-label": "#8D8686",
//     "base-text": "#574F4D",
//     "base-subtitle": "#403937",
//     "base-title": "#272221",
//     "base-error": "#f84747",
//     "brand-purple-dark": "#4B2995",
//     "brand-purple": "#8047F8",
//     "brand-purple-light": "#EBE5F9",
//     "brand-yellow-dark": "#C47F17",
//     "brand-yellow": "#DBAC2C",
//     "brand-yellow-light": "#F1E9C9",
//   },
//   textSizes: {
//     "title-title-xl": "3rem",
//     "title-title-l": "2rem",
//     "title-title-m": "1.5rem",
//     "title-title-s": "1.2rem",
//     "title-title-xs": "1.125rem",
//     "text-regular-l": "1.25rem",
//     "text-bold-l": "1.25rem",
//     "text-regular-m": "1rem",
//     "text-bold-m": "1rem",
//     "text-regular-s": "0.875rem",
//     "text-bold-s": "0.75rem",
//     "components-tag": "0.625rem",
//     "components-button-g": "0.875rem",
//     "components-button-s": "0.75rem",
//   },
//   fonts: {
//     regular: "'Roboto'",
//     title: "'Baloo 2'",
//   },
// };