import { createTheme } from '@mui/material/styles'
import '@fontsource-variable/inter/wght.css'
import '@fontsource/pacifico'

import { brand } from './colors'

export const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        primary: { main: brand.turquoise },
        secondary: { main: brand.lime },
        error: { main: brand.alert },
        background: { default: brand.surface, paper: '#ffffff' },
        text: { primary: brand.ink },
      },
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    MuiAppBar: {
      defaultProps: { color: 'default' },
      styleOverrides: {
        colorDefault: {
          backgroundColor: brand.surface,
          color: brand.ink,
        },
      },
    },
  },
})

export const logoFontFamily = 'Pacifico, cursive'
