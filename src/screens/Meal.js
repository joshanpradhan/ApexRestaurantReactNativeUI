import React, { Component } from "react";
import { Dimensions, Image, StyleSheet, RefreshControl, ToastAndroid, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import Moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';



const {width} = Dimensions.get("window");

class Meal extends Component {
    state = {
        meals: [],
        staffs: [],
        customers: [],
        image: {},
        loading: true,
        refreshing: false,
    };

    onRefresh() {

        this.setState({
            refreshing: true
        })
        this.getMeal();
        this.getCustomer();
        this.getStaff();
        this.setState({
            refreshing: false
        })

    }

    async getMeal() {
        this.setState({
            loading: true
        });
        await axios.get(mocks.url + '/api/meal/')
            .then(response => {
                //handle success
                this.setState({
                    meals: response.data,
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

    async deleteMeal(id) {
        await axios.delete(mocks.url + `/api/meal/${id}`)
            .then(response => {
                //handle success
                this.showToastWithGravityAndOffset();
                this.getMeal();

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
                    onPress: () => this.deleteMeal(id)
                }
            ], {
                cancelable: false
            }
        );
    }

    componentDidMount() {
        this.getMeal();
        this.getCustomer();
        this.getStaff();

        this.setState({
            meals: this.props.meals,
            staffs: this.props.staffs,
            customers: this.props.customers,
            image: this.props.image,
        });
    }
    filteredStaffItem(staffId) {
        const {staffs} = this.state;
        const filteredStaffItems = staffs.filter(staffItem => {
            return staffItem.id === staffId;
        })
        return filteredStaffItems.map(filteredStaffItem => (
            <Text  black bold height={20}>
             Staff:{filteredStaffItem.firstName} {filteredStaffItem.lastName} 
              </Text>
        ))
    }

    filteredCustomerItem(customerId) {
        const {customers} = this.state;
        const filteredCustomerItems = customers.filter(customerItem => {
            return customerItem.id === customerId;
        })
        return filteredCustomerItems.map(filteredCustomerItem => (
            <Text  black bold height={20}>
             Customer:{filteredCustomerItem.firstName} {filteredCustomerItem.lastName} 
              </Text>
        ))
    }

    render() {
        const {profile, navigation} = this.props;
        const {meals, image} = this.state;

        return (
            <Block marginTop={35}>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h2 bold>
           Food Meal
          </Text>
        </Block>
         { this.state.loading ? <ActivityIndicator size="large" color="#0000ff" /> :
                this.state.meals.length > 0 ?
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />
                    }
                    style={{
                        paddingVertical: theme.sizes.base * 0.5
                    }}
                    >
          <Block flex={false} column style={styles.meals}>
            {meals.map(meal => (
                        <TouchableOpacity
                        key={meal.menu_Name}
                        onPress={() => navigation.navigate("Meal Dishes", {
                            mealId: meal.mealId,
                            staffId: meal.staffId,
                            customerId: meal.customerId,
                            mealDishes_form_name: "Meal Dishes"

                        })}
                        activeOpacity={0.6}
                        >
                <Card  shadow style={styles.meal}>
                 <Block flex={false} row space="between">
                              <Badge
                        margin={[0, 0, 10]}
                        size={50}
                        color="rgba(41,216,143,0.20)"
                        >
                <Image source={image.customerIcon} style={{
                            width: 35,
                            height: 35
                        }}/>
                  </Badge>
                  <Badge
                        margin={[0, 0, 10]}
                        size={50}
                        color="rgba(41,216,143,0.20)"
                        >
                <Image source={image.staffIcon} style={{
                            width: 35,
                            height: 35
                        }}/>
                  </Badge>
                    </Block>
                     <Block flex={false} row space="between">

                              <Block>
                                {this.filteredCustomerItem(meal.customerId)}
                              </Block>
                            <Block>
                                {this.filteredStaffItem(meal.staffId)}
                              </Block>
                    </Block>
          <Block flex={false} row space="between">
                   <Text  height={20}>
                    Time:-{Moment(meal.date_of_Meal).format('Do MMMM YYYY')}
                  </Text>
                  <Text  height={20}>
                    Cost: Rs {meal.cost_of_Meal}
                  </Text>
          </Block>
           
        <Block flex={false} row space="between">
   
                   <TouchableOpacity
                        onPress={() => navigation.navigate("Meal Form", {
                            meal_form_name: "Edit meal",
                            mealId: meal.mealId,
                            staffId: meal.staffId,
                            customerId: meal.customerId,
                            date_of_Meal: meal.date_of_Meal,
                            cost_of_Meal: meal.cost_of_Meal,
                            isActive: meal.isActive,
                            createdBy: meal.createdBy,
                            createdOn: meal.createdOn,
                            updatedBy: meal.updatedBy,
                            updatedOn: meal.updatedOn,
                        })}
                        activeOpacity={0.6}
                        >
            <Image source={image.editIcon} style={{
                            width: 40,
                            height: 40,

                        }}/>
              </TouchableOpacity> 
                 
 <TouchableOpacity
                        onPress={() => this.createDeleteAlert(meal.mealId)}
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
            No meals 
          </Text>
        </Block>
        </ScrollView>
            }
        <Block style={{
                flexDirection: 'row-reverse',
                alignItems: 'flex-end',
            }}>
        <TouchableOpacity
            onPress={() => navigation.navigate("Meal Form", {
                meal_form_name: "Create meal"
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

Meal.defaultProps = {
    meals: mocks.meals,
    staffs: mocks.staffs,
    customers: mocks.customers,
    image: mocks.image,
};

export default Meal;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 1,
        marginBottom: theme.sizes.base * 0.5

    },
    meals: {
        paddingHorizontal: theme.sizes.base * 1,
        marginBottom: theme.sizes.base * 0.5

    },

});