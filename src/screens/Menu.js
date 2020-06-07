import React, { Component } from "react";
import { Dimensions, Image, StyleSheet, RefreshControl, ToastAndroid, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";

import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import Moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';



const {width} = Dimensions.get("window");

class Menu extends Component {
    state = {
        menus: [],
        image: {},
        loading: true,
        refreshing: false,
    };


    onRefresh() {

        this.setState({
            refreshing: true
        })
        this.getMenu();
        this.setState({
            refreshing: false
        })

    }

    async getMenu() {
        this.setState({
            loading: true
        });
        await axios.get(mocks.url + '/api/menu/')
            .then(response => {
                //handle success
                this.setState({
                    menus: response.data,
                    loading: false
                });
            })
            .catch(error => {
                // handle error
                this.setState({
                    loading: false
                });
                console.log(error);
            })
    }

    async deleteMenu(id) {
        await axios.delete(mocks.url + `/api/menu/${id}`)
            .then(response => {
                //handle success
                this.showToastWithGravityAndOffset();
                this.getMenu();

            })
            .catch(error => {
                // handle error
                this.setState({
                    loading: false
                });
                console.log(error);
            })
    }


    showToastWithGravityAndOffset() {
        ToastAndroid.showWithGravityAndOffset(
            "Success, menu deleted! :)",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    }

    createDeleteAlert(id) {
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
                    onPress: () => this.deleteMenu(id)
                }
            ], {
                cancelable: false
            }
        );
    }

    componentDidMount() {
        this.getMenu();
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
       
       { this.state.loading ? <ActivityIndicator size="large" color="#0000ff" /> :
                this.state.menus.length > 0 ?
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />
                    }
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
                            id: menu.id,
                            menu_Name: menu.menu_Name,
                            available_Date_From: menu.available_Date_From,
                            available_Date_To: menu.available_Date_To,
                            createdBy: menu.createdBy,
                            createdOn: menu.createdOn,
                            updatedBy: menu.updatedBy,
                            updatedOn: menu.updatedOn,
                            isActive: menu.isActive,
                        })}
                        activeOpacity={0.6}

                        >
            <Image source={image.editIcon} style={{
                            width: 40,
                            height: 40,

                        }}/>
              </TouchableOpacity> 
                 
 <TouchableOpacity
                        onPress={() => this.createDeleteAlert(menu.id)}
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
                    :
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />
                    }
                    style={{
                        paddingVertical: theme.sizes.base * 0.5
                    }}
                    >
                    <Block flex={1} center middle style={styles.header}>
          <Text h2 bold>
            No food menu 
          </Text>
        </Block>
        </ScrollView>
            }
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