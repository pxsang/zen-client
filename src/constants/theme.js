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
    rowMiddle: {
      flexDirection: 'row',
      alignItems: 'center',
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
