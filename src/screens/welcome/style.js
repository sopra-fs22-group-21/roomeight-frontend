import { StyleSheet } from "react-native";


const styles = StyleSheet.create({

    container: {
        flex: 1, 
        backgroundColor:"#fff",
        padding: 40,
        marginTop: 40,
        height: "100%"
      },
      inner: {
        flex: 1,
      },
      providerButton: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
    });
export default styles;