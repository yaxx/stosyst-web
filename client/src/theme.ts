import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  light: {
    colors: {
      backgrounds: {
        base: {
          pri: '#FFFFFF',
          sec: '',
          tar: ''
        },
        elavations: {
          pri: '',
          sec: '',
          tar: ''
        }
      },
      labels: {
        pri: '#000000',
        sec: 'grey',
        // sec: 'rgba(60, 60, 67, 0.6)',
        tar: 'rgba(235, 235, 245, 0.3)'
      },
      fills: {
        pri: 'rgba(120, 120, 128, 0.2)',
        sec: 'rgba(120, 120, 128, 0.16)',
        tar: 'rgba(118, 118, 128, 0.12)'
      },
      separators: {
        // pri: '#f8f7f7',
        pri: 'rgba(0,0,0,0.05)',
        sec: 'rgba(84, 84, 88, 0.65)',
        tar: ''
      },
      brand: '#00A3FE',
      btn_hovered: '#0491e0',
      error: '#fc2929bf',
      error_btn_hovered:'#fc2929d1'
    }
  },
  dark: {
    colors: {
      backgrounds: {
        base: {
          pri: '#000000',
          sec: '',
          tar: ' rgba(29, 29, 29, 0.94)'
        },
        elavations: {
          pri: ' #1C1C1C',
          sec: 'rgb(21, 24, 28)',
          tar: '#3A3A3C'
        }
      },
      labels: {
        pri: '#FFFFFF',
        sec: 'rgb(110, 118, 125)',
        tar: 'rgba(235, 235, 245, 0.3)'
      },
      fills: {
        pri: 'rgba(120, 120, 128, 0.36)',
        sec: 'rgba(120, 120, 128, 0.32)',
        tar: 'rgba(120, 120, 128, 0.24)',
        qtr: 'rgba(120, 120, 128, 0.18)'
      },
      separators: {
        pri: 'rgb(47, 51, 54)',
        sec: 'rgb(47, 51, 54)',
        tar: 'rgba(29, 29, 29, 0.94)'
      },
      brand: '#00A3FE',
      btn_hovered: '#0491e0',
      error: '#fc2929bf',
      error_btn_hovered: '#fc2929d1'
    },
    
  },
  typography: {
    h1: '26px',
    H4: '16px',
    body: '14px',
    body1: '13px',
    body2: '12px',
    body3: '11px',
    caption: '11px',
    tagline: '11px',
    label: '9px'
  },
  mode: 'light',
};

export { theme };