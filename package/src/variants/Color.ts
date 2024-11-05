// THIS FILE IS GENERATED. DO NOT EDIT.

type ColorConstructor = {
  (): Color;
  (from: Color): Color;
  (from: Color, alpha: number): Color;
  (r: number, g: number, b: number): Color;
  (r: number, g: number, b: number, a: number): Color;
  (code: string): Color;
  (code: string, alpha: number): Color;

};

declare global {
  var Color: ColorConstructor;
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;

  to_argb32(): number;
  to_abgr32(): number;
  to_rgba32(): number;
  to_argb64(): number;
  to_abgr64(): number;
  to_rgba64(): number;
  to_html(with_alpha_: boolean): string;
  clamp(min_: Color, max_: Color): Color;
  inverted(): Color;
  lerp(to_: Color, weight_: number): Color;
  lightened(amount_: number): Color;
  darkened(amount_: number): Color;
  blend(over_: Color): Color;
  get_luminance(): number;
  srgb_to_linear(): Color;
  linear_to_srgb(): Color;
  is_equal_approx(to_: Color): boolean;
  hex(hex_: number): Color;
  hex64(hex_: number): Color;
  html(rgba_: string): Color;
  from_string(str_: string, default_: Color): Color;
  from_hsv(h_: number, s_: number, v_: number, alpha_: number): Color;
  from_rgbe9995(rgbe_: number): Color;

}

export {};  // Ensure this file is treated as a module
