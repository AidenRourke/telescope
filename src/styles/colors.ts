import { ColorTypes } from 'types/types';

// Modu World Color Scheme

export const black = '#000000';
export const white = '#FFFFFF';

export const green = '#00F74A';
export const red = '#FF2b00';
export const blue = '#00FFEC';

export const getTextColor = (color: ColorTypes) => {
  if (color === 'black' || color === 'green' || color === 'red') {
    return white;
  }
  return black;
};
