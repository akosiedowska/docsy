// import { createTheme } from '@mui/material/styles'
import { createTheme, Button } from '@mantine/core'
import '@fontsource-variable/inter/wght.css'
import '@fontsource/pacifico'
import '@fontsource/poppins'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'

import { palette } from './colors'

export const theme = createTheme({
  fontFamily: 'Poppins, sans-serif',
  primaryColor: 'violet',
  black: palette.ink,
  colors: {
    violet: [
      '#F5F1FD',
      palette.violetLight,
      '#D9CFFC',
      '#C0AEFA',
      '#A688F5',
      '#8D64E8',
      palette.violet,
      palette.violetHover,
      '#552C94',
      '#442277',
    ],
    lime: [
      '#F6FBEC',
      palette.limeLight,
      '#C7E89C',
      '#B3DE79',
      '#ABD45B',
      palette.lime,
      '#8EBD27',
      '#7AA321',
      '#4F6B16',
      palette.limeText,
    ],
  },
  other: {
    background: palette.background,
    black: palette.black,
    limeText: palette.limeText,
    grayText: palette.grayText,
  },
  components: {
    Button: Button.extend({
      styles: {
        root: {
          transitionDuration: '300ms',
        },
      },
    }),
  },
})

// export const theme = createTheme({
//   cssVariables: true,
//   colorSchemes: {
//     light: {
//       palette: {
//         primary: { main: brand.turquoise },
//         secondary: { main: brand.lime },
//         error: { main: brand.alert },
//         background: { default: brand.surface, paper: '#ffffff' },
//         text: { primary: brand.ink },
//       },
//     },
//   },
//   typography: {
//     fontFamily: 'Inter, sans-serif',
//   },
//   components: {
//     MuiAppBar: {
//       defaultProps: { color: 'default' },
//       styleOverrides: {
//         colorDefault: {
//           backgroundColor: brand.surface,
//           color: brand.ink,
//         },
//       },
//     },
//   },
// })

export const logoFontFamily = 'Pacifico, cursive'
