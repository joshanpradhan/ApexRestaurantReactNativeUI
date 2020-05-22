import React, { Component } from "react";
import { Image, StyleSheet, Keyboard, ScrollView, TextInput, ActivityIndicator } from "react-native";
import Slider from "react-native-slider";

import { Divider, Button, Block, Text, Switch, Input } from "../components";
import { theme, mocks } from "../constants";
import DatePicker from 'react-native-datepicker'
import axios from 'axios';

const VALID_DEMO = "demo";

class CustomerForm extends Component {
    state = {
        loading: false,
        errors: [],
        firstName: "",
        lastName: "",
        address: "",
        phoneRes: "",
        phoneMob: "",
        enrollDate: null,
        isActive: true,
        createdBy: "",
        createdOn: null,
        updatedBy: "",
        updatedOn: null,
    };

    async postItem() {
        console.log("create");
        this.setState({
            loading: true
        });
        axios.post(`https://jsonplaceholder.typicode.com/users`, {})
            .then(res => {
                this.setState({
                    customers: res.data
                });
            })
        this.setState({
            loading: false
        });
    }

    componentDidMount() {
        const {id, firstName, lastName, address, phoneRes, phoneMob, enrollDate, isActive, createdBy, createdOn, updatedBy, updatedOn} = this.props.route.params;
        this.setState({
            firstName: firstName,
            lastName: lastName,
            address: address,
            phoneRes: phoneRes,
            phoneMob: phoneMob,
            enrollDate: enrollDate,
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
        const {firstName, lastName, address, phoneRes, phoneMob, enrollDate, isActive, createdBy, createdOn, updatedBy, updatedOn} = this.state;

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
            console.log("Inside customer form  ");
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
            label="First name"
            error={hasErrors("firstName")}
            style={[styles.input, hasErrors("firstName")]}
            defaultValue={this.state.firstName}
            onChangeText={text => this.setState({
                firstName: text
            })}
            />
            <Input
            label="Last name"
            error={hasErrors("lastName")}
            style={[styles.input, hasErrors("lastName")]}
            defaultValue={this.state.lastName}
            onChangeText={text => this.setState({
                lastName: text
            })}
            />
            <Input
            label="Address"
            error={hasErrors("address")}
            style={[styles.input, hasErrors("address")]}
            defaultValue={this.state.address}
            onChangeText={text => this.setState({
                address: text
            })}
            />
            <Input
            phone
            label="Phone res"
            error={hasErrors("phoneRes")}
            style={[styles.input, hasErrors("phoneRes")]}
            defaultValue={this.state.phoneRes}
            onChangeText={text => this.setState({
                phoneRes: text
            })}
            />

            <Input
            phone
            label="Phone no"
            error={hasErrors("phoneMob")}
            style={[styles.input, hasErrors("phoneMob")]}
            defaultValue={this.state.phoneMob}
            onChangeText={text => this.setState({
                phoneMob: text
            })}
            />
                      
            <Text bold gray>
            Enroll date 
            </Text>
               <DatePicker
            style={{
                width: 300,
                marginTop: 10,
                marginBottom: 10,


            }}
            date={this.state.enrollDate}
            mode="date"
            placeholder="Enroll date"
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

            }}
            onDateChange={(date) => {
                this.setState({
                    enrollDate: date
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

CustomerForm.defaultProps = {
    profile: mocks.profile
};

export default CustomerForm;

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