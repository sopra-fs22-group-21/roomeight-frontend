import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    container: {
        flex: 1, 
        backgroundColor:"#fff",
        paddingTop: 60,
        marginTop: 60,
        height: "100%",
        alignItems: "center",
      },
      options: {
        flex: 1,
        alignItems: "center",
        paddingTop: 150,
        
      },
      or:{
        display: "flex",
        flexWrap: "nowrap",
        flexDirection: "row",
        width: "100%",
      },
      line: {
        width: "30%",
        height: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: "auto",
        marginBottom: "auto",
        borderBottomColor: "black",
        borderBottomWidth: 1,
      },
    });
export default styles;