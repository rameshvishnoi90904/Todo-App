import React from "react";
import {
	Button,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image,
	Dimensions,
	AsyncStorage
} from "react-native";
import { NavigationActions } from "react-navigation";
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5FCFF",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 20
	},
	welcome: {
		fontSize: 24,
		textAlign: "center",
		marginTop: 50,
		flex: 1,
		color: "tomato",
		fontWeight: "bold"
	}
});
const { height, width } = Dimensions.get("window");
export default class TodoLoginScreen extends React.Component {
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
		this.state = { text: "" };
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>TODO</Text>
				<TextInput
					style={{
						height: 40,
						width: width - 20,
						borderWidth: 0,
						marginHorizontal: 10
					}}
					placeholder="Your Name"
					onChangeText={text => this.setState({ text })}
					value={this.state.text}
				/>

				<TouchableOpacity
					onPress={() => {
						this.saveUserName();
					}}
					style={{ flex: 2 }}>
					<Image
						style={{ width: 35, height: 35, marginHorizontal: 10 }}
						source={require("../../assets/navigation.png")}
					/>
				</TouchableOpacity>
			</View>
		);
	}
	saveUserName() {
		if (this.state.text !== "") {
			AsyncStorage.setItem("userName", this.state.text, () => {
				const routeName = "Todo";
				const actionToDispatch = NavigationActions.reset({
					index: 0,
					actions: [
						NavigationActions.navigate({
							routeName: routeName,
							params: {
								userName: this.state.text,
								toDoCollection: []
							}
						})
					]
				});
				this.props.navigation.dispatch(actionToDispatch);
			});
		}
	}
}
