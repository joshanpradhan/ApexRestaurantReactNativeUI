import React, { Component } from "react";
import { Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";

import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import Moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const {width} = Dimensions.get("window");

class Menu extends Component {
    state = {
        menus: [],
        image: {},
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
            menus: this.props.menus,
            image: this.props.image,
        });
    }

    render() {
        const {profile, navigation} = this.props;
        const {menus, image} = this.state;

        return (
            <Block marginTop={35}>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h2 bold>
           Food Menu
          </Text>
        </Block>
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                paddingVertical: theme.sizes.base * 0.5
            }}
            >
          <Block flex={false} column style={styles.menus}>
            {menus.map(menu => (
                <TouchableOpacity
                key={menu.menu_Name}
                onPress={() => navigation.navigate("MenuItems", {
                    menu_id: menu.id,
                    menu_name: menu.menu_Name
                })}
                activeOpacity={0.6}
                >
                <Card  shadow style={styles.menu}>
                     <Block flex={false} row space="between">

                  <Badge
                margin={[0, 0, 10]}
                size={60}
                color="rgba(41,216,143,0.20)"
                >
                    <Image source={image.image} style={{
                    width: 35,
                    height: 35
                }}/>
                  </Badge>
                  <Text h2 bold height={55}>
                    {menu.menu_Name}
                  </Text>
          </Block>
          <Block flex={false} row space="between">

                   <Text bold height={20}>
                    Available from
                  </Text>
                  <Text bold height={20}>
                    Available to
                  </Text>
          </Block>
           <Block flex={false} row space="between">

                   <Text gray height={15} >
                   {Moment(menu.available_Date_From).format('Do MMMM YYYY')}
                  </Text>
                  <Text gray height={15}>
                   {Moment(menu.available_Date_To).format('Do MMMM YYYY')}
                  </Text>
          </Block>
        <Block flex={false} row space="between">

                   <TouchableOpacity
                onPress={() => navigation.navigate("Menu Form", {
                    menu_form_name: "Edit menu",
                    menu_id: menu.id,
                    menu_name: menu.menu_Name,
                    available_date_from: menu.available_Date_To,
                    available_date_to: menu.available_Date_To,
                    created_by: menu.createdBy,
                    createdOn: menu.createdOn,
                    updated_by: menu.updatedBy,
                    updatedOn: menu.updatedOn,
                    is_active: menu.isActive,
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
              </TouchableOpacity>
            ))}
          </Block>
        </ScrollView>
        <Block style={{
                flexDirection: 'row-reverse',
                alignItems: 'flex-end',
            }}>
        <TouchableOpacity
            onPress={() => navigation.navigate("Menu Form", {
                menu_form_name: "Create menu"
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

Menu.defaultProps = {
    menus: mocks.menus,
    image: mocks.image,
};

export default Menu;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 1,
        marginBottom: theme.sizes.base * 0.5

    },
    menus: {
        paddingHorizontal: theme.sizes.base * 1,
        marginBottom: theme.sizes.base * 0.5

    },

});