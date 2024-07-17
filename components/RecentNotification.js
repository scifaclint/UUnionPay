import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import { View, FlatList, Text, StyleSheet, ScrollView } from "react-native";

const renderItem = ({ item }) => (
  <View
    style={[
      styles.item,
      item.type === "received" ? styles.receivedItem : styles.paidItem,
    ]}
  >
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons
        name={
          item.type === "received" ? "arrow-down-circle" : "arrow-up-circle"
        }
        size={20}
        color={item.type === "received" ? "#4CAF50" : "#F44336"}
      />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.type}>{item.type}</Text>
      <Text style={styles.amount}>
        {item.type === "received" ? "+" : "-"}₵{item.amount}
      </Text>
    </View>
    <Text style={styles.date}>{item.date}</Text>
  </View>
);
const noItem = () => {
  <View style={styles.emptyContainer}>
    <MaterialCommunityIcons name="cash-remove" size={30} color="#CCCCCC" />
    <Text style={styles.emptyText}>No transactions yet</Text>
    <Text style={styles.emptySubText}>Your financial journey starts here!</Text>
  </View>;
};
function RecentNotification({ transactions }) {
  return (
    <View
      style={{
        height: "30%",
        width: "90%",
        flex: 1,
      }}
    >
      {transactions ? (
        <FlatList
          style={styles.list}
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        noItem()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 5,
    backgroundColor: "white",
  },
  item: {
    paddingTop: 10,
    borderRadius: 5,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    height: 52,
  },
  receivedItem: {
    backgroundColor: "white",
    width: "95%",
    left: "17%",
    top: 5,
  },
  paidItem: {
    backgroundColor: "white",
    width: "95%",
    left: "17%",
    top: 3,
  },
  iconContainer: {
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  type: {
    top: 0,
    fontSize: 12,
    fontWeight: "bold",
    color: Color.colorDarkslateblue_300,
  },
  amount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#007AFF",
  },
  date: {
    fontSize: 12,
    color: Color.colorDarkslateblue_200,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  emptyText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  emptySubText: {
    fontSize: 13,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },
});
export default RecentNotification;
