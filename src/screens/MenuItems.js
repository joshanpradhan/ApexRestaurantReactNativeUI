import React, { Component } from "react";
import { Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";

import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";

const {width} = Dimensions.get("window");

class MenuItems extends Component {
    state = {
        menuItems: [],
        image: {}

    };
    createDeleteAlert() {
        Alert.alert(
            "Delete",
            "Are you sure you want to delete it?",
            [{
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
                {
                    text: "Confirm",
                    onPress: () => console.log("Confirm Pressed")
                }
            ], {
                cancelable: false
            }
        );
    }
    componentDidMount() {
        this.setState({
            menuItems: this.props.menuItems,
            image: this.props.image
        });
    }


    render() {
        const {profile, navigation} = this.props;
        const {menuItems, image} = this.state;
        const {menu_id} = this.props.route.params;

        //filtered menu items from menu
        const filteredMenuItems = menuItems.filter(menuItem => {
            return menuItem.menuId === menu_id;
        })


        return (
            <Block>

        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                paddingVertical: theme.sizes.base * 1
            }}
            >
          <Block flex={false} row space="between" style={styles.menuItems}>
            {filteredMenuItems.map(menuItem => (

                <Card center middle shadow style={styles.menuItem}>
                  <Badge
                margin={[0, 0, 10]}
                size={50}
                color="rgba(41,216,143,0.20)"
                >
                <Image source={image.image} style={{
                    width: 35,
                    height: 35
                }}/>
                  </Badge>
                  <Text  bold height={20}>
                    {menuItem.menu_Items_Name}
                  </Text>   

        <Block flex={false} row space="between">
                   <TouchableOpacity
                onPress={() => navigation.navigate("MenuItem Form", {
                    menu_item_form_name: "Create menu item",
                    menuItemId: menuItem.menuItemId,
                    menuId: menuItem.menuId,
                    menu_Items_Name: menuItem.menu_Items_Name,
                    isActive: menuItem.isActive,
                    createdBy: menuItem.createdBy,
                    createdOn: menuItem.createdOn,
                    updatedBy: menuItem.updatedBy,
                    updatedOn: menuItem.updatedOn,
                })}
                activeOpacity={0.6}

                >
            <Image source={image.editIcon} style={{
                    width: 40,
                    height: 40,

                }}/>
              </TouchableOpacity>       
 <TouchableOpacity
                onPress={this.createDeleteAlert}
                activeOpacity={0.6}
                >
            <Image source={image.deleteIcon} style={{
                    width: 40,
                    height: 40,

                }}/>
              </TouchableOpacity> 
                 </Block>
                </Card>
            ))}
          </Block>

        </ScrollView>

      <Block style={{
                flexDirection: 'row-reverse',
                alignItems: 'flex-end',
            }}>
        <TouchableOpacity
            onPress={() => navigation.navigate("MenuItem Form", {
                menu_item_form_name: "Create menu item",
                menu_id: menu_id,
            })}
            activeOpacity={0.6}
            style={{
                position: 'absolute',
                paddingHorizontal: theme.sizes.base * 1,
                paddingVertical: theme.sizes.base * 1,
            }}
            >
            <Image source={image.addIcon} style={{
                width: 60,
                height: 60,

            }}/>
              </TouchableOpacity> 
              </Block>
       
     

      </Block>

        );
    }
}

MenuItems.defaultProps = {
    profile: mocks.profile,
    menuItems: mocks.menuItems,
    image: mocks.image,

};

export default MenuItems;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 2
    },

    menuItems: {
        flexWrap: "wrap",
        paddingHorizontal: theme.sizes.base * 2,
        marginBottom: theme.sizes.base * 1
    },
    menuItem: {
        // this should be dynamic based on screen width
        minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
    }
});