import { colors } from "./colors";

export const gradients = {
  screen: [
    colors.backgroundTop,
    colors.backgroundBottom,
  ] as const,

  balanceCard: [
     "#31245F",
    "#204C79",
  ] as const,

  primaryButton: [
    colors.primary,
    colors.electric,
  ] as const,
};