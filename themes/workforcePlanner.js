export const WorkforcePlanner = {
  name: 'Workforce Planner',
  brand: '#DC3522',
  color: {
    // Primary //
    primary: '#DC3522',
    primaryLight: '#FF8071',
    primaryHover: '#DC3522',
    primaryDown: '#DC3522',
    primaryBg: '#DC3522',
    primaryText: '#DC3522',

    // Secondary1 //
    secondary1: '#12ABDB', //just added
    secondary1Light: '#12ABDB', //just added
    secondary1Hover: '#27b3e6',
    secondary1Down: '#8D8D8D', // related to my code
    secondary1Bg: '#27b3e6',
    secondary1Text: '#374140',

    // Secondary2 //
    secondary2: '#FF8071',
    secondary2Light: '#374140',
    secondary2Hover: '#374140',
    secondary2Down: '#374140',
    secondary2Bg: '#374140',
    secondary2Text: '#374140',

    // Success //
    success: '#31833E',
    successLight: '#52D669',
    successHover: '#3DA74E',
    successDown: '#379947',
    successBg: '#31833E',
    successText: '#31833E',

    // Information //
    info: '#2A2C2B',
    infoLight: '#2A2C2B',
    infoHover: '#2A2C2B',
    infoDown: '#2A2C2B',
    infoBg: '#2A2C2B',
    infoText: '#2A2C2B',

    // Alert/Warning //
    alert: '#E68619',
    alertLight: '#FC9A25',
    alertHover: '#DA7B11',
    alertDown: '#CB6F10',
    alertBg: '#E68619',
    alertText: '#E68619',

    // Error/Danger //
    error: '#D7373F',
    errorLight: '#FA6A71',
    errorHover: '#D7373F',
    errorDown: '#C7333B',
    errorBg: '#D7373F',
    errorText: '#D7373F',

    // Background //
    //bgWhite: '#FFFFFF', //related to my code
    bgLight: '#bcecf7',
    bgDark: '#707070',
    bgBlack: '#000000',

    // Text //
    //i have to comment this because in the input component the placeholder has the same
    //variable for the color and the headings as well but i want my placeholder to be lighter then my heading and
    //the only solution is to comment it out or change the placeholder color in cap shared component which
    //i believe isn't recommended

    //textBlack: '#000000',
    textPrimary: '#000000',
    textSecondary: '#FFFFFF',
    textTertiary: '#000000',
    textMuted: '#747474',
    textBody: '#505050',
    textLink: '#72cae8',
    textLinkHover: '#DC3522',
    textLinkDown: '#72cae8',
    textFocus: '#DC3522',

    // Focus //
    focusLight: '#FFFFFF',
    focusDark: '#2680EB',

    // CTA //
    cta: '#12ABDB',
    ctaLight: '#DC3522',
    ctaHover: '#12ABDB',
    ctaDown: '#12ABDB',
    ctaBg: '#378EF0',
    textCta: '#FFFFFF',

    // Border-Only Buttons //
    bob: '#1473E6',
    bobLight: '#459CFF',
    bobHover: '#0D66D0',
    bobDown: '#095ABA',
    bobBg: '#00000000',
    textBob: '#000000',

    // Disabled //
    disabled: '#FFFFFF', // related to my code
    textDisabled: '#C6C6C6',
    disabledDark: '#FFF', // 30% opacity
    textDisabledDark: '#EFEFEF',
  },
  box: {
    borderRadius: '10px',
  },

  boxShadow: '0px 0px 0px 1px #12ABDB, 0px 0px 0px 3px #12ABDB',
  fontFamily: {
    default:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
  fontSize: {
    default: '1rem',
  },
  navigation: {
    borderBottom: 'solid',
  },
  socialIcons: {
    border: 'solid',
  },
  button: {
    borderRadius: '8px',
    fontWeight: '750',
    fontSize: '16px',
    paddingTop: '6px',
    paddingBottom: '6px',
    paddingLeft: '24px',
    paddingRight: '24px',
    fontFamily: 'Segoe UI',
  },

  chip: {
    borderRadius: '4px',
  },
  tag: {
    borderRadius: '4px',
  },
  input: {
    default: {
      borderRadius: '8px;',
      fontWeight: '300',
      lineHeight: '1.25',
    },
  },
  typeAhead: {
    input: {
      borderRadius: '4px',
    },

    list: {
      borderRadius: '4px',
      // here
    },
    listItem: {
      borderRadius: '20px',
    },
  },
  typography: {
    heading: {
      fontSize: '22pt',
    },
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    width: '100%',
    fontSize: '28pt',
    fontWeight: '200',
    lineHeight: '1.25',
  },
  homeIcon: {
    color: 'black',
  },
  icons: {
    color: 'black',
  },
  error: {
    color: 'red',
  },
}
