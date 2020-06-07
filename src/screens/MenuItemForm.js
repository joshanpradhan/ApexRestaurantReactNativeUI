import React, { Component } from "react";
import { Image, StyleSheet, Keyboard, ScrollView, ToastAndroid, TextInput, ActivityIndicator, Picker } from "react-native";
import Slider from "react-native-slider";

import { Divider, Button, Block, Text, Switch, Input } from "../components";
import { theme, mocks } from "../constants";
import DatePicker from 'react-native-datepicker';
import axios from 'axios';


const VALID_DEMO = "demo";

class MenuItemForm extends Component {
    state = {
        loading: false,
        errors: [],
        menus: [],
        menuItemId: "",
        menuId: "",
        menu_Items_Name: "",
        isActive: true,
        createdBy: "",
        createdOn: null,
        updatedBy: "",
        updatedOn: null,
        menu_item_form_name: "",
    };


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


    async postItem() {

        this.setState({
            loading: true
        });
        await axios.post(mocks.url + '/api/menuItem/', {
            menuId: this.state.menuId,
            menu_Items_Name: this.state.menu_Items_Name,
            isActive: this.state.isActive,
            createdBy: this.state.createdBy,
            createdOn: this.state.createdOn,
            updatedBy: this.state.updatedBy,
            updatedOn: this.state.updatedOn,
        })
            .then(response => {
                this.showToastWithGravityAndOffset();
                this.setState({
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

    async putItem() {

        this.setState({
            loading: true
        });
        await axios.put(mocks.url + '/api/menuItem/', {
            menuItemId: this.state.menuItemId,
            menuId: this.state.menuId,
            menu_Items_Name: this.state.menu_Items_Name,
            isActive: this.state.isActive,
            createdBy: this.state.createdBy,
            createdOn: this.state.createdOn,
            updatedBy: this.state.updatedBy,
            updatedOn: this.state.updatedOn,
        })
            .then(response => {
                this.showToastWithGravityAndOffsetUpdate();
                this.setState({
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



    showToastWithGravityAndOffset() {
        ToastAndroid.showWithGravityAndOffset(
            "Success, menu items created!",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
        );
    }


    showToastWithGravityAndOffsetUpdate() {
        ToastAndroid.showWithGravityAndOffset(
            "Success, menu items updated!",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
        );
    }


    componentDidMount() {
        this.getMenu();
        const {menuItemId, menuId, menu_Items_Name, isActive, createdBy, createdOn, updatedBy, updatedOn, menu_item_form_name} = this.props.route.params;
        this.setState({
            menuItemId: menuItemId,
            menuId: menuId,
            menu_Items_Name: menu_Items_Name,
            isActive: isActive,
            createdBy: createdBy,
            createdOn: createdOn,
            updatedBy: updatedBy,
            updatedOn: updatedOn,
            menu_item_form_name: menu_item_form_name,

        });
    }

    renderMenus() {

        const {menus} = this.state;
        return (
            <Picker
            selectedValue={this.state.menuId}
            style={{
                width: 300,
            }}
            onValueChange = { (menuId, itemIndex) => this.setState({
                menuId: menuId
            })}
            mode = "dialog"
            prompt = "Select menu" > 
            { menus.map(menu => (
                <Picker.Item label={menu.menu_Name} value={menu.id} />
            ))} 
            </Picker>
        );
    }


    handleSubmit() {
        console.log("Inside Submit");
        const {navigation} = this.props;
        const {menuId, menu_Items_Name, isActive, createdBy, createdOn, updatedBy, updatedOn, menu_item_form_name} = this.state;
        const errors = [];

        Keyboard.dismiss();
        this.setState({
            loading: true
        });


        this.setState({
            errors,
            loading: false
        });

        if (!errors.length) {
            menu_item_form_name == "Create menu item" ? this.postItem() : this.putItem()
            navigation.navigate("MenuItems");
        }
    }

    render() {
        const {loading, errors} = this.state;

        const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
          <Block style={styles.inputs}>
            <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
              <Block> 
             
               <Text gray bold>
              Menu 
              </Text>   
              {this.renderMenus()}
              
            <Input
            label="Menu item name "
            error={hasErrors("menu_Items_Name")}
            style={[styles.input, hasErrors("menu_Items_Name")]}
            defaultValue={this.state.menu_Items_Name}
            onChangeText={text => this.setState({
                menu_Items_Name: text
            })}
            />

            <Input
            label="Created by"
            error={hasErrors("createdBy")}
            style={[styles.input, hasErrors("createdBy")]}
            defaultValue={this.state.createdBy}
            onChangeText={text => this.setState({
                createdBy: text
            })}
            />

            <Text bold gray>
            Created on
            </Text>
               <DatePicker
            style={{
                width: 300,
                marginTop: 10,
                marginBottom: 10,


            }}
            date={this.state.createdOn}
            mode="date"
            placeholder="Date of meal"
            format="YYYY-MM-DD"
            minDate="2020-05-01"
            maxDate="2022-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 50,

                }
            // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
                this.setState({
                    createdOn: date
                })
            }}
            />
            <Input
            label="Updated by"
            error={hasErrors("updatedBy")}
            style={[styles.input, hasErrors("updatedBy")]}
            defaultValue={this.state.updatedBy}
            onChangeText={text => this.setState({
                updatedBy: text
            })}
            />

            <Text bold gray>
           Updated on
            </Text>
               <DatePicker
            style={{
                width: 300,
                marginTop: 10,
                marginBottom: 10,
            }}
            date={this.state.updatedOn}
            mode="date"
            placeholder="Date of meal"
            format="YYYY-MM-DD"
            minDate="2020-05-01"
            maxDate="2022-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 50,

                }
            // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
                this.setState({
                    updatedOn: date
                })
            }}
            />
             <Block
            row
            center
            space="between"
            style={{
                marginBottom: theme.sizes.base * 2
            }}
            >
              <Text gray bold>Active</Text>
              <Switch
            value={this.state.isActive}
            onValueChange={value => this.setState({
                isActive: value
            })}
            />
           
            </Block>
             <Button gradient onPress={() => this.handleSubmit()}>
              {this.state.loading ? (
                <ActivityIndicator size="small" color="white" />
                ) : (
                <Text bold white center>
                 {this.state.menu_item_form_name == "Create menu item" ? 'create' : 'edit'}
                </Text>
                )}
            </Button>
              </Block>
            </Block>
          </Block>        
        </ScrollView>

        );
    }
}

MenuItemForm.defaultProps = {
    staffs: mocks.staffs,
    menus: mocks.menus,
};

export default MenuItemForm;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 2
    },
    avatar: {
        height: theme.sizes.base * 2.2,
        width: theme.sizes.base * 2.2
    },
    inputs: {
        marginTop: theme.sizes.base * 0.7,
        paddingHorizontal: theme.sizes.base * 2
    },
    inputRow: {
        alignItems: "flex-end"
    },
    sliders: {
        marginTop: theme.sizes.base * 0.7,
        paddingHorizontal: theme.sizes.base * 2
    },
    thumb: {
        width: theme.sizes.base,
        height: theme.sizes.base,
        borderRadius: theme.sizes.base,
        borderColor: "white",
        borderWidth: 3,
        backgroundColor: theme.colors.secondary
    },
    toggles: {
        paddingHorizontal: theme.sizes.base * 2
    },
    input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    hasErrors: {
        borderBottomColor: theme.colors.accent
    }
});