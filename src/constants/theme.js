const theme = {
  color: {
    primary: '#F18C8E',
    secondary: '#797979',
    info: '#5AA6C8',
    title: '#303030',
    white: '#FFFFFF',
    text: '#505050',
    gray: '#BDBDBD',
    border: '#E3E9F2',
    link: '#439FEF',
    error: '#DF2F45',
  },
  spacing: {
    s: 10,
    m: 20,
    l: 40,
    xl: 80,
  },
  textVariants: {
    title: {
      fontSize: 24,
    },
  },
  header: {
    height: 200,
  },
  block: {
    row: {
      flexDirection: 'row',
    },
    center: {
      alignItems: 'center',
    },
    rowMiddle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    rowMiddleCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    blockMiddleBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    middleCenter: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    paddingHorizontal: num => ({
      paddingHorizontal: num,
    }),
    paddingVertical: num => ({
      paddingVertical: num,
    }),
    paddingBottom: num => ({
      paddingBottom: num,
    }),
    paddingTop: num => ({
      paddingTop: num,
    }),
    marginBottom: num => ({
      marginBottom: num,
    }),
    marginTop: num => ({
      marginTop: num,
    }),
    marginLeft: num => ({
      marginLeft: num,
    }),
    marginRight: num => ({
      marginRight: num,
    }),
  },
};

export default theme;
