import { ThemeConfig } from "antd";

const theme: ThemeConfig = {
  token: { colorPrimary: '#3aa39f' },
  components: {
    Menu: {
      itemMarginInline: 0,
      itemMarginBlock: 0,
      itemBorderRadius: 0,
    },
    Input: {
      controlHeight: 36,
    },
    InputNumber: {
      controlHeight: 36,
    },
    Select: {
      controlHeight: 36,
    },
    Button: {
      controlHeight: 36,
      primaryShadow: 'none',
      defaultShadow: 'none',
      dangerShadow: 'none',
    },
    Typography: {
      colorTextSecondary: '#667085',
      colorSuccess: '#0bcb6b',
      fontWeightStrong: 500,
      colorTextDescription: '#667085',
      titleMarginBottom: 0,
      titleMarginTop: 0,
      fontSizeHeading1: 24,
      fontSizeHeading2: 20,
      fontSizeHeading3: 18,
      fontSizeHeading4: 18,
      fontSizeHeading5: 16,
    },
    Table: {
      fontWeightStrong: 500,
    },
    Upload: {
      paddingXS: 0,
      borderRadiusLG: 8,
    }
  },
};

export default theme;
