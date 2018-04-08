import React from "react";
import {
	Button,
	StyleSheet,
	Text,
	View,
	TextInput,
	FlatList,
	Image,
	TouchableOpacity,
	AsyncStorage,
	Keyboard
} from "react-native";
import {
	TabNavigator,
	TabBarBottom,
	NavigationActions
} from "react-navigation";

import CheckBox from "react-native-check-box";

import moment from "moment";
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "#F5FCFF",
		paddingHorizontal: 10
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10
	}
});

class ListScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: (
				<View style={{ paddingHorizontal: 15 }}>
					<Text>{navigation.state.params.userName}s ToDo</Text>
				</View>
			),
			headerRight: (
				<TouchableOpacity
					onPress={() => {
						AsyncStorage.clear();
						const routeName = "Home";
						const actionToDispatch = NavigationActions.reset({
							index: 0,
							actions: [
								NavigationActions.navigate({
									routeName: routeName
								})
							]
						});
						navigation.dispatch(actionToDispatch);
					}}>
					<Image
						style={{ width: 25, height: 25, marginHorizontal: 15 }}
						source={require("../../assets/logout.png")}
					/>
				</TouchableOpacity>
			)
		};
	};
	constructor(props) {
		super(props);
		this.state = {
			toDoCollection: [].concat(
				props.navigation.state.params.toDoCollection
			)
		};
	}
	componentWillReceiveProps(nextProps) {
		if (
			this.state.toDoCollection.length !==
			nextProps.navigation.state.params.toDoCollection.length
		) {
			this.setState({
				toDoCollection: nextProps.navigation.state.params.toDoCollection
			});
		}
	}
	_keyExtractor = (item, index) => index;

	render() {
		return (
			<View style={styles.container}>
				<View />
				<FlatList
					style={{ paddingLeft: 10, paddingVertical: 5 }}
					data={this.state.toDoCollection}
					keyExtractor={this._keyExtractor}
					renderItem={({ item }) => this.renderToDoItem(item)}
				/>
			</View>
		);
	}
	renderToDoItem(item) {
		return (
			<View style={{ borderBottomWidth: 1, borderColor: "grey" }}>
				<CheckBox
					style={{ flex: 1, padding: 10 }}
					isChecked={item.isCompleted}
					rightText={item.name}
					rightTextStyle={{ fontSize: 20 }}
					onClick={isChecked => {
						item.isCompleted = !item.isCompleted;
						this.updateTodoValues();
					}}
				/>
			</View>
		);
	}
	_navigateTo = (routeName: string) => {
		const actionToDispatch = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName })]
		});
		this.props.navigation.dispatch(actionToDispatch);
	};
	updateTodoValues() {
		AsyncStorage.setItem(
			"toDoCollection",
			JSON.stringify(this.state.toDoCollection),
			e => {
				console.log("", e);
			}
		);
	}
}

class AddItemScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: (
				<View style={{ paddingHorizontal: 15 }}>
					<Text>{navigation.state.params.userName}s ToDo</Text>
				</View>
			),
			headerRight: (
				<TouchableOpacity
					onPress={() => {
						AsyncStorage.clear();
						const routeName = "Home";
						const actionToDispatch = NavigationActions.reset({
							index: 0,
							actions: [NavigationActions.navigate({ routeName })]
						});
						navigation.dispatch(actionToDispatch);
					}}>
					<Image
						style={{ width: 25, height: 25, marginHorizontal: 15 }}
						source={require("../../assets/logout.png")}
					/>
				</TouchableOpacity>
			)
		};
	};

	constructor(props) {
		super(props);
		this.state = { text: "" };
	}
	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={{
						height: 40,
						borderWidth: 0
					}}
					placeholder="Your Name"
					onChangeText={text => this.setState({ text })}
					value={this.state.text}
				/>
				<Button onPress={() => this.addNewItem()} title="Add Item" />
			</View>
		);
	}
	addNewItem() {
		let toDoCollection = this.props.navigation.state.params.toDoCollection;
		toDoCollection.push({
			name: this.state.text,
			isCompleted: false,
			timestamp: moment()
		});
		AsyncStorage.setItem(
			"toDoCollection",
			JSON.stringify(toDoCollection),
			e => {
				console.log("Add todo operation failed", e);
				this.setState({ text: "" });
				Keyboard.dismiss();
				this.props.navigation.navigate("List", {
					toDoCollection: toDoCollection
				});
			}
		);
	}

	_navigateTo = (routeName: string) => {
		const actionToDispatch = NavigationActions.reset({
			index: 0,
			actions: [NavigationActions.navigate({ routeName })]
		});
		this.props.navigation.dispatch(actionToDispatch);
	};
}

export default TabNavigator(
	{
		List: { screen: ListScreen },
		Add: { screen: AddItemScreen }
	},
	{
		tabBarOptions: {
			activeTintColor: "tomato",
			inactiveTintColor: "gray",
			labelStyle: {
				fontSize: 18,
				paddingVertical: 5
			},
			tabStyle: {
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			},
			style: {
				display: "flex",
				alignItems: "center",
				justifyContent: "center"
			}
		},
		tabBarComponent: TabBarBottom,
		tabBarPosition: "bottom",
		animationEnabled: false,
		swipeEnabled: false
	}
);
