import {COLORS} from '../utils/colors';
import {FONTS} from '../utils/fonts';

const StyleGuide = {
  spacing: 8,
  palette: {
    primary: COLORS.BLUE,
    backgroundPrimary: COLORS.BLUE_WHITE,
    background: COLORS.GRAY_WHITE,
    border: COLORS.GRAY_WHITE
  },
  typography: {
    body: {
      fontSize: 17,
      lineHeight: 20,
      fontFamily: FONTS.Regular,
      color: COLORS.BLACK
    },
    callout: {
      fontSize: 16,
      lineHeight: 20,
      fontFamily: FONTS.Regular,
      color: COLORS.BLACK
    },
    calloutbold: {
      fontSize: 16,
      lineHeight: 20,
      fontFamily: FONTS.Bold,
      color: COLORS.BLACK
    },
    caption: {
      fontSize: 11,
      lineHeight: 13,
      fontFamily: FONTS.Regular,
      color: COLORS.BLACK
    },
    price: {
      fontSize: 14,
      lineHeight: 19,
      fontFamily: FONTS.Bold,
      color: COLORS.BLACK
    },
    footnote: {
      fontSize: 13,
      lineHeight: 18,
      fontFamily: FONTS.Regular,
      color: COLORS.GRAY
    },
    headline: {
      fontSize: 17,
      lineHeight: 22,
      fontFamily: FONTS.SemiBold,
      color: COLORS.BLACK
    },
    subhead: {
      fontSize: 15,
      lineHeight: 20,
      fontFamily: FONTS.Bold,
      color: COLORS.BLACK
    },
    title1: {
      fontSize: 34,
      lineHeight: 41,
      fontFamily: FONTS.Bold,
      color: COLORS.BLACK
    },
    title1_5: {
      fontSize: 32,
      lineHeight: 38,
      fontFamily: FONTS.Bold,
      color: COLORS.BLACK
    },
    title2: {
      fontSize: 28,
      lineHeight: 34,
      fontFamily: FONTS.Bold,
      color: COLORS.BLACK
    },
    title3: {
      fontSize: 22,
      lineHeight: 26,
      fontFamily: FONTS.Bold,
      color: COLORS.BLACK
    }
  }
}

export default StyleGuide;
