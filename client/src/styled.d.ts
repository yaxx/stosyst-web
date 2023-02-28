import 'styled-components';
// and extend them!
declare module 'faker';
declare module 'styled-components' {
  export interface DefaultTheme {
    light: {
      colors: {
        backgrounds: {
          base: {
            pri: string,
            sec: string,
            tar: string
          },
          elavations: {
            pri: string,
            sec: string,
            tar: string
          }
        },
        labels: {
          pri: string,
          sec: string,
          tar: string
        },
        fills: {
          pri: string,
          sec: string,
          tar: string
        },
        separators: {
          pri: string,
          sec: string,
          tar: string
        },
        brand: string,
        btn_hovered: string,
        error: string,
        error_btn_hovered: string
      };
    },
    dark: {
      colors: {
        backgrounds: {
          base: {
            pri: string,
            sec: string,
            tar: string
          },
          elavations: {
            pri: string,
            sec: string,
            tar: string
          }
        },
        labels: {
          pri: string,
          sec: string,
          tar: string
        },
        fills: {
          pri: string,
          sec: string,
          tar: string
          qtr: string
        },
        separators: {
          pri: string,
          sec: string,
          tar: string
        },
        brand: string,
        btn_hovered: string,
        error: string,
        error_btn_hovered: string,
      };
    },
    
    mode: string,
    typography:any
  }
  

}