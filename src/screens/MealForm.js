import React, { Component } from "react";
import { Image, StyleSheet, Keyboard, ScrollView, ToastAndroid, TextInput, ActivityIndicator, Picker } from "react-native";
import Slider from "react-native-slider";
import { Divider, Button, Block, Text, Switch, Input } from "../components";
import { theme, mocks } from "../constants";
import DatePicker from 'react-native-datepicker'
import axios from 'axios';

const VALID_DEMO = "demo";

class MealForm extends Component {
    state = {
        loading: false,
        errors: [],
        staffs: [],
        customers: [],
        mealId: "",
        staffId: "",
        customerId: "",
        date_of_Meal: null,
        cost_of_Meal: "",
        isActive: true,
        createdBy: "",
        createdOn: null,
        updatedBy: "",
        updatedOn: null,
        meal_form_name: "",

    };
    async getStaff() {
        this.setState({
            loading: true
        });
        await axios.get(mocks.url + '/api/staff/')
            .then(response => {
                //handle success
                this.setState({
                    staffs: response.data,
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

    async getCustomer() {
        this.setState({
            loading: true
        });
        await axios.get(mocks.url + '/api/customer/')
            .then(response => {
                //handle success
                this.setState({
                    customers: response.data,
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
        console.log(this.state.staffId);
        console.log(this.state.customerId);

        this.setState({
            loading: true
        });
        await axios.post(mocks.url + '/api/meal/', {
            staffId: this.state.staffId,
            customerId: this.state.customerId,
            date_of_Meal: this.state.date_of_Meal,
            cost_of_Meal: this.state.cost_of_Meal,
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
        console.log(this.state.staffId);
        console.log(this.state.customerId);

        this.setState({
            loading: true
        });
        await axios.put(mocks.url + '/api/meal/', {
            mealId: this.state.mealId,
            staffId: this.state.staffId,
            customerId: this.state.customerId,
            date_of_Meal: this.state.date_of_Meal,
            cost_of_Meal: this.state.cost_of_Meal,
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
            "Success, meal created!",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
        );
    }

    showToastWithGravityAndOffsetUpdate() {
        ToastAndroid.showWithGravityAndOffset(
            "Success, meal updated!",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
        );
    }

    componentDidMount() {
        this.getStaff();
        this.getCustomer();

        const {mealId, staffId, customerId, date_of_Meal, cost_of_Meal, isActive, createdBy, createdOn, updatedBy, updatedOn, meal_form_name} = this.props.route.params;
        this.setState({
            staffs: this.props.staffs,
            customers: this.props.customers,
            mealId: mealId,
            staffId: staffId,
            customerId: customerId,
            date_of_Meal: date_of_Meal,
            cost_of_Meal: cost_of_Meal,
            isActive: isActive,
            createdBy: createdBy,
            createdOn: createdOn,
            updatedBy: updatedBy,
            updatedOn: updatedOn,
            meal_form_name: meal_form_name,
        });
    }

    renderStaffs() {
        const {staffs} = this.state;

        return (
            <Picker
            selectedValue={this.state.staffId}
            style={{
                width: 300,
            }}
            onValueChange={(staffId, itemIndex) => this.setState({
                staffId: staffId
            })}
            mode="dialog"
            prompt="Select staff"
            >   
        {staffs.map(staff => (

                <Picker.Item label={staff.firstName} value={staff.id} />
            ))
            }      
             </Picker>
        );
    }
    renderCustomers() {
        const {customers} = this.state;

        return (
            <Picker
            selectedValue={this.state.customerId}
            style={{
                width: 300,
            }}
            onValueChange={(customerId, itemIndex) => this.setState({
                customerId: customerId
            })}
            mode="dialog"
            prompt="Select customer"
            >   
        {customers.map(customer => (

                <Picker.Item label={customer.firstName} value={customer.id} />
            ))
            }      
             </Picker>
        );
    }


    handleSubmit() {
        const {navigation} = this.props;
        const {staffId, customerId, date_of_Meal, cost_of_Meal, isActive, createdBy, createdOn, updatedBy, updatedOn, meal_form_name} = this.state;
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
            meal_form_name == "Create meal" ? this.postItem() : this.putItem()
            navigation.navigate("Meal");
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
              Staff
              </Text>   
              {this.renderStaffs()}
               <Text gray bold>
              Customer
              </Text>   
              {this.renderCustomers()}
              
            <Text bold gray>
            Date of meal
            </Text>
               <DatePicker
            style={{
                width: 300,
                marginTop: 10,
                marginBottom: 10,
            }}
            date={this.state.date_of_Meal}
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
                    date_of_Meal: date
                })
            }}
            />
           <Input
            number
            label="Cost of meal"
            error={hasErrors("cost_of_Meal")}
            style={[styles.input, hasErrors("cost_of_Meal")]}
            defaultValue={this.state.cost_of_Meal}
            onChangeText={text => this.setState({
                cost_of_Meal: text
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
                 {this.state.meal_form_name == "Create meal" ? 'Create' : 'Edit'}
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

MealForm.defaultProps = {
    staffs: mocks.staffs,
    customers: mocks.customers,

};

export default MealForm;

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