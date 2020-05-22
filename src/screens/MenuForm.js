import React, { Component } from "react";
import { Image, StyleSheet, Keyboard, ScrollView, TextInput } from "react-native";
import Slider from "react-native-slider";

import { Divider, Button, Block, Text, Switch, Input } from "../components";
import { theme, mocks } from "../constants";
import DatePicker from 'react-native-datepicker'


const VALID_DEMO = "demo";

class MenuForm extends Component {
    state = {
        loading: false,
        errors: [],
        menu_Name: " ",
        available_Date_From: null,
        available_Date_To: null,
        isActive: true,
        createdBy: " ",
        createdOn: null,
        updatedBy: " ",
        createdOn: null,

    };
    componentDidMount() {
        const {menu_id, menu_name, available_date_from, available_date_to, created_by, createdOn, updated_by, updatedOn, is_active} = this.props.route.params;
        this.setState({
            menu_Name: menu_name,
            available_Date_From: available_date_from,
            available_Date_To: available_date_to,
            isActive: is_active,
            createdBy: created_by,
            createdOn: null,
            updatedBy: updated_by,
            updatedOn: null,

        });
    }
    handleSubmit() {
        console.log("Inside Submit");
        const {navigation} = this.props;
        const {menu_Name, available_Date_From, available_Date_To, isActive, createdBy, updatedBy} = this.state;
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
            console.log("Inside menu form submit");
            console.log(this.state);
            navigation.navigate("Home");
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
              {loading ? (
                <ActivityIndicator size="small" color="white" />
                ) : (
                <Text bold white center>
                  Create
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