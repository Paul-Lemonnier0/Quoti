const RANGE = 6
const THEME = {
    backgroundColor: 'transparent',
    calendarBackground: 'transparent',
    margin: 0,
    padding: 0,
    'stylesheet.calendar.main': {
      week: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        margin: 0,
        padding: 0,
      },
  
      monthView: {
        margin: 0,
        padding: 0,
        flexDirection: "column",
        gap: 5,
        width: "100%"
      },
  
      container: {
        padding: 0,
        margin: 0,
        gap: 10,
      }
    },
}

export {RANGE, THEME}