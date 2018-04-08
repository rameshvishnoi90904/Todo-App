import React from "react";
import { Button, StyleSheet, Text, View, TextInput } from "react-native";
import TodoListing from "./src/components/TodoListing";
import TodoLoginScreen from "./src/components/TodoLoginScreen";
import LoadingScreen from "./src/components/LoadingScreen";
import { StackNavigator } from "react-navigation";

export default StackNavigator(
	{
		LoadingScreen: { screen: LoadingScreen },
		Home: { screen: TodoLoginScreen },
		Todo: { screen: TodoListing }
	},
	{ headerMode: "screen" }
);
