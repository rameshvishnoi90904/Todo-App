import React from "react";
import {
	Button,
	StyleSheet,
	Text,
	View,
	TextInput,
	AsyncStorage
} from "react-native";
import { NavigationActions } from "react-navigation";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		// alignItems: "center",
		backgroundColor: "#F5FCFF"
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10
	}
});

export default class LoadingScreen extends React.Component {
	static navigationOptions = {
		header: null
	};
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const userName = AsyncStorage.multiGet(
			["userName", "toDoCollection"],
			(e, values) => {
				let userData = {};
				values.map((result, i, store) => {
					let key = store[i][0];
					let value = store[i][1];
					if (key === "toDoCollection") {
						value = value !== null ? JSON.parse(value) : [];
					}
					userData[key] = value;
				});
				if (userData.userName === null) {
					this._navigateTo("Home");
				} else {
					this._navigateTo("Todo", userData);
				}
			}
		);
	}

	_navigateTo = (routeName: string, userData: object) => {
		const actionToDispatch = NavigationActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({
					routeName: routeName,
					params: userData
				})
			]
		});
		this.props.navigation.dispatch(actionToDispatch);
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>LoadingScreen</Text>
			</View>
		);
	}
}
