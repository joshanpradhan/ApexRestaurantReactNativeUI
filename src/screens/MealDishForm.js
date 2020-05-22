import React, { Component } from "react";
import { Image, StyleSheet, Keyboard, ScrollView, TextInput, Picker } from "react-native";
import Slider from "react-native-slider";

import { Divider, Button, Block, Text, Switch, Input } from "../components";
import { theme, mocks } from "../constants";
import DatePicker from 'react-native-datepicker'

const VALID_DEMO = "demo";



class MealDishForm extends Component {
    state = {
        loading: false,
        errors: [],
        meals: [],
        menuItems: [],
        mealId: "",
        menuItemId: "",
        quantity: " ",
        isActive: true,
        createdBy: "",
        createdOn: null,
        updatedBy: "",
        updatedOn: null,

    };
    componentDidMount() {
        const {mealId, menuItemId, quantity, isActive, createdBy, createdOn, updatedBy, updatedOn} = this.props.route.params;
        this.setState({
            meals: this.props.meals,
            menuItems: this.props.menuItems,
            mealId: mealId,
            menuItemId: menuItemId,
            quantity: quantity,
            isActive: isActive,
            createdBy: createdBy,
            createdOn: createdOn,
            updatedBy: updatedBy,
            updatedOn: updatedOn,
        });
    }

    renderMeals() {
        const {meals} = this.state;
        return (
            <Picker
            selectedValue={this.state.mealId}
            style={{
                width: 300,
            }}
            onValueChange={(mealId, itemIndex) => this.setState({
                mealId: mealId
            })}
            mode="dialog"
            prompt="Select customer's meal"
            >   
        {meals.map(meal => (
                <Picker.Item label={String(meal.mealId)} value={meal.mealId} />
            ))
            }      
             </Picker>
        );
    }
    renderMenuItems() {
        const {menuItems} = this.state;

        return (
            <Picker
            selectedValue={this.state.menuItemId}
            style={{
                width: 300,
            }}
            onValueChange={(menuItemId, itemIndex) => this.setState({
                menuItemId: menuItemId
            })}
            mode="dialog"
            prompt="Select menu item"
            >   
        {menuItems.map(menuItem => (

                <Picker.Item label={menuItem.menu_Items_Name} value={menuItem.menuItemId} />
            ))
            }      
             </Picker>
        );
    }


    handleSubmit() {
        console.log("Inside meal dish form Submit");
        const {navigation} = this.props;
        const {mealId, menuItemId, date_of_Meal, cost_of_Meal, isActive, createdBy, createdOn, updatedBy, updatedOn} = this.state;
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
              <Text gray bold>
              Select meal's id
              </Text>   
              {this.renderMeals()}
               <Text gray bold>
              Menu Items
              </Text>   
              {this.renderMenuItems()}
              
           <Input
            number
            label="Quantity"
            error={hasErrors("quantity")}
            style={[styles.input, hasErrors("quantity")]}
            defaultValue={this.state.quantity}
            onChangeText={text => this.setState({
                quantity: text
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

MealDishForm.defaultProps = {
    meals: mocks.meals,
    menuItems: mocks.menuItems,

};

export default MealDishForm;

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