import React, { Component } from "react";
import { Dimensions, Image, StyleSheet, RefreshControl, ToastAndroid, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import Moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const {width} = Dimensions.get("window");

class Staff extends Component {
    state = {
        staffs: [],
        image: {},
        loading: true,
        refreshing: false,
    };


    onRefresh() {

        this.setState({
            refreshing: true
        })
        this.getStaff();
        this.setState({
            refreshing: false
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

    async deleteStaff(id) {
        await axios.delete(mocks.url + `/api/staff/${id}`)
            .then(response => {
                //handle success
                this.showToastWithGravityAndOffset();
                this.getStaff();

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
            "Success, staff deleted! :)",
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
                    onPress: () => this.deleteStaff(id)
                }
            ], {
                cancelable: false
            }
        );
    }

    componentDidMount() {
        this.getStaff();
        this.setState({
            staffs: this.props.staffs,
            image: this.props.image,
        });
    }

    render() {
        const {profile, navigation} = this.props;
        const {staffs, image} = this.state;
        const {staffRole_id} = this.props.route.params;


        //filtered menu items from menu
        const filteredStaffs = staffs.filter(staff => {
            return staff.staff_Role_Id === staffRole_id;
        })

        return (
            <Block>
      
       { this.state.loading ? <ActivityIndicator size="large" color="#0000ff" /> :
                filteredStaffs.length > 0 ?
                    <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />
                    }
                    style={{
                        paddingVertical: theme.sizes.base * 0.5
                    }}
                    >

          <Block flex={false} column style={styles.staffs}>
            {filteredStaffs.map(staff => (

                        <Card  shadow style={styles.staff}>
                     <Block flex={false} row space="between">

                  <Badge
                        margin={[0, 0, 10]}
                        size={60}
                        color="rgba(41,216,143,0.20)"
                        >
                    <Image source={image.image} style={{
                            width: 35,
                            height: 35
                        }}/>
                  </Badge>
                 <Text h2 bold height={55}>
                    {staff.firstName} {staff.lastName}
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
                   {staff.address}
                  </Text>
                  <Text gray height={15}>
                   {staff.phoneMob}

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
                   {staff.createdBy}

                  </Text>
                  <Text gray height={15}>
                   {Moment(staff.createdOn).format('Do MMMM YYYY')}
                  </Text>
          </Block>
        <Block flex={false} row space="between">

                   <TouchableOpacity
                        onPress={() => navigation.navigate("Staff Form", {
                            staff_form_name: "Edit staff",
                            id: staff.id,
                            staff_Role_Id: staff.staff_Role_Id,
                            firstName: staff.firstName,
                            lastName: staff.lastName,
                            address: staff.address,
                            phoneRes: staff.phoneRes,
                            phoneMob: staff.phoneMob,
                            enrollDate: staff.enrollDate,
                            isActive: staff.isActive,
                            createdBy: staff.createdBy,
                            createdOn: staff.createdOn,
                            updatedBy: staff.updatedBy,
                            updatedOn: staff.updatedOn,

                        })}
                        activeOpacity={0.6}

                        >
            <Image source={image.editIcon} style={{
                            width: 40,
                            height: 40,

                        }}/>
              </TouchableOpacity> 
                 
 <TouchableOpacity
                        onPress={() => this.createDeleteAlert(staff.id)}
                        activeOpacity={0.6}
                        >
            <Image source={image.deleteIcon} style={{
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
            No staffs 
          </Text>
        </Block>
        </ScrollView>
            }
        <Block style={{
                flexDirection: 'row-reverse',
                alignItems: 'flex-end',
            }}>
        <TouchableOpacity
            onPress={() => navigation.navigate("Staff Form", {
                staff_form_name: "Create staff"
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

Staff.defaultProps = {
    staffs: mocks.staffs,
    image: mocks.image,
};

export default Staff;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 1,
        marginBottom: theme.sizes.base * 0.5

    },
    staffs: {
        paddingHorizontal: theme.sizes.base * 1,
        marginBottom: theme.sizes.base * 0.5

    },

});