// THIS FILE IS GENERATED. DO NOT EDIT.

type ColorConstructor = {
  (): Color;
  (from_: Color): Color;
  (from_: Color, alpha_: number): Color;
  (r_: number, g_: number, b_: number): Color;
  (r_: number, g_: number, b_: number, a_: number): Color;
  (code_: string): Color;
  (code_: string, alpha_: number): Color;

};

declare global {
  var Color: ColorConstructor;
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;

  toArgb32(): number;
  toAbgr32(): number;
  toRgba32(): number;
  toArgb64(): number;
  toAbgr64(): number;
  toRgba64(): number;
  toHtml(withAlpha_: boolean): string;
  clamp(min_: Color, max_: Color): Color;
  inverted(): Color;
  lerp(to_: Color, weight_: number): Color;
  lightened(amount_: number): Color;
  darkened(amount_: number): Color;
  blend(over_: Color): Color;
  getLuminance(): number;
  srgbToLinear(): Color;
  linearToSrgb(): Color;
  isEqualApprox(to_: Color): boolean;
  hex(hex_: number): Color;
  hex64(hex_: number): Color;
  html(rgba_: string): Color;
  fromString(str_: string, default_: Color): Color;
  fromHsv(h_: number, s_: number, v_: number, alpha_: number): Color;
  fromRgbe9995(rgbe_: number): Color;

}

export {};  // Ensure this file is treated as a module
