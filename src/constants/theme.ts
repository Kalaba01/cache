export const Colors = {
  light: {
    text: "#16202B",
    muted: "#5B6675",
    background: "#FFFFFF",
    card: "#F3F6F8",
    border: "#DDE3E8",
    primary: "#0F766E",
    onPrimary: "#FFFFFF",
    danger: "#C62828",
  },
  dark: {
    text: "#EEF2F5",
    muted: "#9AA6B2",
    background: "#0E141B",
    card: "#18212B",
    border: "#2A3540",
    primary: "#5EC4B6",
    onPrimary: "#0E141B",
    danger: "#FF8A80",
  },
} as const;

export type Theme = (typeof Colors)["light"];

export const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } as const;
export const FontSize = { small: 13, body: 16, title: 20, hero: 28 } as const;
export const Radius = { sm: 8, md: 12, pill: 999 } as const;
