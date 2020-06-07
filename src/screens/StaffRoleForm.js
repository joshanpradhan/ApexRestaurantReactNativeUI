import React, { Component } from "react";
import { Image, StyleSheet, Keyboard, ScrollView, ToastAndroid, TextInput, ActivityIndicator } from "react-native";
import Slider from "react-native-slider";

import { Divider, Button, Block, Text, Switch, Input } from "../components";
import { theme, mocks } from "../constants";
import DatePicker from 'react-native-datepicker';
import axios from 'axios';




class StaffRoleForm extends Component {
    state = {
        loading: false,
        errors: [],
        staff_Roles_Id: "",
        staff_Roles_Description: "",
        isActive: true,
        createdBy: "",
        createdOn: null,
        updatedBy: "",
        updatedOn: null,
        staffRole_form_name: "",
    };

    async postItem() {

        this.setState({
            loading: true
        });
        await axios.post(mocks.url + '/api/staffrole/', {
            staff_Roles_Description: this.state.staff_Roles_Description,
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
        await axios.put(mocks.url + '/api/staffrole/', {
            staff_Roles_Id: this.state.staff_Roles_Id,
            staff_Roles_Description: this.state.staff_Roles_Description,
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
            "Success, staff role created!",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
        );
    }


    showToastWithGravityAndOffsetUpdate() {
        ToastAndroid.showWithGravityAndOffset(
            "Success, staff role updated!",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
        );
    }

    componentDidMount() {

        const {staff_Roles_Id, staff_Roles_Description, isActive, createdBy, createdOn, updatedBy, updatedOn, staffRole_form_name} = this.props.route.params;
        this.setState({
            staff_Roles_Id: staff_Roles_Id,
            staff_Roles_Description: staff_Roles_Description,
            isActive: isActive,
            createdBy: createdBy,
            createdOn: createdOn,
            updatedBy: updatedBy,
            updatedOn: updatedOn,
            staffRole_form_name: staffRole_form_name,
        });
    }
    handleSubmit() {
        console.log("Inside Submit");
        const {navigation} = this.props;
        const {staff_Roles_Description, isActive, createdBy, createdOn, updatedBy, updatedOn, staffRole_form_name} = this.state;

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
            staffRole_form_name == "Create staff role" ? this.postItem() : this.putItem()
            navigation.navigate("Staff Role");
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
              {this.state.loading ? (
                <ActivityIndicator size="small" color="white" />
                ) : (
                <Text bold white center>
                 {this.state.staffRole_form_name == "Create staff role" ? 'create' : 'edit'}
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