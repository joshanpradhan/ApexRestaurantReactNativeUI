import React, { Component } from "react";
import { Image, StyleSheet, Keyboard, ScrollView, TextInput, ActivityIndicator } from "react-native";
import Slider from "react-native-slider";

import { Divider, Button, Block, Text, Switch, Input } from "../components";
import { theme, mocks } from "../constants";
import DatePicker from 'react-native-datepicker'



class StaffRoleForm extends Component {
    state = {
        loading: false,
        errors: [],
        staff_Roles_Description: "",
        isActive: true,
        createdBy: "",
        createdOn: null,
        updatedBy: "",
        updatedOn: null,
    };
    componentDidMount() {

        const {staff_Roles_Id, staff_Roles_Description, isActive, createdBy, createdOn, updatedBy, updatedOn} = this.props.route.params;
        this.setState({
            staff_Roles_Description: staff_Roles_Description,
            isActive: isActive,
            createdBy: createdBy,
            createdOn: createdOn,
            updatedBy: updatedBy,
            updatedOn: updatedOn,
        });
    }
    handleSubmit() {
        console.log("Inside Submit");
        const {navigation} = this.props;
        const {staff_Roles_Description, isActive, createdBy, createdOn, updatedBy, updatedOn} = this.state;

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
            console.log("Inside staff role form submit");
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
            label="Staff role"
            error={hasErrors("staff_Roles_Description")}
            style={[styles.input, hasErrors("staff_Roles_Description")]}
            defaultValue={this.state.staff_Roles_Description}
            onChangeText={text => this.setState({
                staff_Roles_Description: text
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
            }}
            date={this.state.createdOn}
            mode="date"
            placeholder="Created on"
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
                marginBottom: 20,

            }}
            date={this.state.updatedOn}
            mode="date"
            placeholder="Updated on"
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
StaffRoleForm.defaultProps = {
    profile: mocks.profile
};

export default StaffRoleForm;

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