import React, { Component } from "react";
import { Dimensions, Image, StyleSheet, RefreshControl, ToastAndroid, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import Moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const {width} = Dimensions.get("window");

class Customer extends Component {
    state = {
        customers: [],
        image: {},
        loading: true,
        refreshing: false,
    };


    onRefresh() {

        this.setState({
            refreshing: true
        })
        this.getCustomer();
        this.setState({
            refreshing: false
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

    async deleteCustomer(id) {
        await axios.delete(mocks.url + `/api/customer/${id}`)
            .then(response => {
                //handle success
                this.showToastWithGravityAndOffset();
                this.getCustomer();

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
            "Success, customer deleted! :)",
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
                    onPress: () => this.deleteCustomer(id)
                }
            ], {
                cancelable: false
            }
        );
    }

    componentDidMount() {
        this.getCustomer();
        this.setState({
            customers: this.props.customers,
            image: this.props.image,
        });
    }

    render() {
        const {profile, navigation} = this.props;
        const {customers, image} = this.state;

        return (
            <Block marginTop={35}>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h2 bold>
            Customers
          </Text>
        </Block>

{ this.state.loading ? <ActivityIndicator size="large" color="#0000ff" /> :
                this.state.customers.length > 0 ?
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />
                    }
                    style={{
                        paddingVertical: theme.sizes.base * 0.5
                    }}
                    >

          <Block flex={false} column style={styles.customers}>
            {customers.map(customer => (

                        <Card  shadow style={styles.customer}>
                     <Block flex={false} row space="between">

                  <Badge
                        margin={[0, 0, 10]}
                        size={60}
                        color="rgba(41,216,143,0.20)"
                        >
                    <Image source={image.customerIcon} style={{
                            width: 35,
                            height: 35
                        }}/>
                  </Badge>
                 <Text h2 bold height={55}>
                    {customer.firstName} {customer.lastName}
                  </Text>
          </Block>
           <Block flex={false} row space="between">

                   <Text bold height={20}>
                    Address 
                  </Text>
                  <Text  bold height={20}>
                    Phone no  
                  </Text>
          </Block>
           <Block flex={false} row space="between">

                   <Text gray height={15} >
                   {customer.address}
                  </Text>
                  <Text gray height={15}>
                   {customer.phoneMob}

                  </Text>
          </Block>
          <Block flex={false} row space="between">

                   <Text bold height={20}>
                    Created by
                  </Text>
                  <Text bold height={20}>
                    Created on  
                  </Text>
          </Block>
           <Block flex={false} row space="between">

                   <Text gray height={15} >
                   {customer.createdBy}

                  </Text>
                  <Text gray height={15}>
                   {Moment(customer.createdOn).format('Do MMMM YYYY')}
                  </Text>
          </Block>
        <Block flex={false} row space="between">

                   <TouchableOpacity
                        onPress={() => navigation.navigate("Customer Form", {
                            customer_form_name: "Edit customer",
                            id: customer.id,
                            firstName: customer.firstName,
                            lastName: customer.lastName,
                            address: customer.address,
                            phoneRes: customer.phoneRes,
                            phoneMob: customer.phoneMob,
                            enrollDate: customer.enrollDate,
                            isActive: customer.isActive,
                            createdBy: customer.createdBy,
                            createdOn: customer.createdOn,
                            updatedBy: customer.updatedBy,
                            updatedOn: customer.updatedOn,

                        })}
                        activeOpacity={0.6}

                        >
            <Image source={image.editCustomerIcon} style={{
                            width: 40,
                            height: 40,

                        }}/>
              </TouchableOpacity> 
                 
 <TouchableOpacity
                        onPress={() => this.createDeleteAlert(customer.id)}
                        activeOpacity={0.6}
                        >
            <Image source={image.deleteCustomerIcon} style={{
                            width: 40,
                            height: 40,

                        }}/>
              </TouchableOpacity> 
                           </Block>
                  
                </Card>
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
            No customer 
          </Text>
        </Block>
        </ScrollView>
            }


        <Block style={{
                flexDirection: 'row-reverse',
                alignItems: 'flex-end',
            }}>
        <TouchableOpacity
            onPress={() => navigation.navigate("Customer Form", {
                customer_form_name: "Create customer"
            })}
            activeOpacity={0.6}
            style={{
                position: 'absolute',
                paddingHorizontal: theme.sizes.base * 1,
                paddingVertical: theme.sizes.base * 1,
            }}
            >
            <Image source={image.addCustomerIcon} style={{
                width: 60,
                height: 60,

            }}/>
              </TouchableOpacity> 
              </Block>
    
      </Block>
        );
    }
}

Customer.defaultProps = {
    customers: mocks.customers,
    image: mocks.image,
};

export default Customer;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 1,
        marginBottom: theme.sizes.base * 0.5

    },
    customers: {
        paddingHorizontal: theme.sizes.base * 1,
        marginBottom: theme.sizes.base * 0.5

    },

});