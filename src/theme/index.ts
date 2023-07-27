import { extendTheme } from "native-base";

export const Theme = extendTheme(
  {
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