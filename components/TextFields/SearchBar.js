import { View, StyleSheet, TextInput } from "react-native"
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { useThemeColor } from "../Themed";

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {

    const fontGray = useThemeColor({}, "FontGray")
    const font = useThemeColor({}, "Font")
    const primary = useThemeColor({}, "Primary")
    const secondary = useThemeColor({}, "Secondary")

    return (
      <View style={styles.container}>
        <View
          style={ clicked ? [styles.searchBar__clicked, {backgroundColor: secondary}] : [styles.searchBar__unclicked, {backgroundColor: secondary}] }>

          <Feather
            name="search"
            size={20}
            color={fontGray}
            style={{ marginLeft: 1 }}
          />

          <TextInput
            style={[styles.input, {color: font}]}
            placeholder="Search"
            value={searchPhrase}
            onChangeText={setSearchPhrase}
            onFocus={() => {
              setClicked(true);
            }}
          />
          {/* cross Icon, depending on whether the search bar is clicked or not */}
          
            <AntDesign name="close" size={20} color={fontGray} style={{ padding: 1 }} onPress={() => {
                setSearchPhrase("")
            }}/>
        </View>
        
      </View>
    );
  };
  export default SearchBar;
  
  // styles
  const styles = StyleSheet.create({
    container: {
      margin: 15,
      alignItems: "center",
      flexDirection: "row",
      display: "flex",
      fontFamily: "poppinsLight"
    },

    searchBar__unclicked: {
      padding: 10,
      flexDirection: "row",
      width: "100%",
      borderRadius: 15,
      alignItems: "center",
      fontFamily: "poppinsLight"
    },

    searchBar__clicked: {
      padding: 10,
      flexDirection: "row",
      width: "100%",
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "space-between",
      fontFamily: "poppinsLight"
    },

    input: {
      fontSize: 16,
      marginLeft: 10,
      marginRight: 10,
      flex: 1,
      fontFamily: "poppinsLight"
    },
  });