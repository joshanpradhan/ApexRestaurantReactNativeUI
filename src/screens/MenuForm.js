import React, { Component } from "react";
import { Image, StyleSheet, Keyboard, ScrollView, ToastAndroid, TextInput, ActivityIndicator } from "react-native";

import Slider from "react-native-slider";

import { Divider, Button, Block, Text, Switch, Input } from "../components";
import { theme, mocks } from "../constants";
import DatePicker from 'react-native-datepicker'
import axios from 'axios';



const VALID_DEMO = "demo";

class MenuForm extends Component {
    state = {
        loading: false,
        errors: [],
        id: "",
        menu_Name: " ",
        available_Date_From: null,
        available_Date_To: null,
        isActive: true,
        createdBy: " ",
        createdOn: null,
        updatedBy: " ",
        createdOn: null,
        menu_form_name: "",

    };


    async postItem() {
        this.setState({
            loading: true
        });
        await axios.post(mocks.url + '/api/menu/', {
            menu_Name: this.state.menu_Name,
            available_Date_From: this.state.available_Date_From,
            available_Date_To: this.state.available_Date_To,
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
        await axios.put(mocks.url + '/api/menu/', {
            id: this.state.id,
            menu_Name: this.state.menu_Name,
            available_Date_From: this.state.available_Date_From,
            available_Date_To: this.state.available_Date_To,
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
            "Success, menu created!",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
        );
    }

    showToastWithGravityAndOffsetUpdate() {
        ToastAndroid.showWithGravityAndOffset(
            "Success, menu updated!",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
        );
    }



    componentDidMount() {
        const {id, menu_Name, available_Date_From, available_Date_To, createdBy, createdOn, updatedBy, updatedOn, isActive, menu_form_name} = this.props.route.params;
        this.setState({
            id: id,
            menu_Name: menu_Name,
            available_Date_From: available_Date_From,
            available_Date_To: available_Date_To,
            isActive: isActive,
            createdBy: createdBy,
            createdOn: createdOn,
            updatedBy: updatedBy,
            updatedOn: updatedOn,
            menu_form_name: menu_form_name,

        });
    }
    handleSubmit() {
        console.log("Inside Submit");
        const {navigation} = this.props;
        const {menu_Name, available_Date_From, available_Date_To, isActive, createdBy, updatedBy, menu_form_name} = this.state;
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
            menu_form_name == "Create menu" ? this.postItem() : this.putItem()
            navigation.navigate("Menu");
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
               <Input
            label="Name"
            error={hasErrors("menu_Name")}
            style={[styles.input, hasErrors("menu_Name")]}
            defaultValue={this.state.menu_Name}
            onChangeText={text => this.setState({
                menu_Name: text
            })}
            />
                      
            <Text bold gray>
            Available date from
            </Text>
               <DatePicker
            style={{
                width: 300,
                marginTop: 10,
                marginBottom: 10,


            }}
            date={this.state.available_Date_From}
            mode="date"
            placeholder="Available date from"
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
                    available_Date_From: date
                })
            }}
            />
            <Text bold gray>
            Available date to
            </Text>
             <DatePicker
            style={{
                width: 300,
                marginTop: 10,
            }}
            date={this.state.available_Date_To}
            mode="date"
            placeholder="Available date To"
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
                    marginLeft: 50
                }
            // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {
                this.setState({
                    available_Date_To: date
                })
            }}
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
            placeholder="Date of created on"
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
            placeholder="Date of updated on"
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
                 {this.state.menu_form_name == "Create menu" ? 'Create' : 'Edit'}
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

MenuForm.defaultProps = {
    profile: mocks.profile
};

export default MenuForm;

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