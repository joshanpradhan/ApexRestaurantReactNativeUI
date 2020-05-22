import React, { Component } from "react";
import { Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";

import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import Moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const {width} = Dimensions.get("window");

class Staff extends Component {
    state = {
        staffs: [],
        image: {},
    };
    createDeleteAlert() {
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
                    onPress: () => console.log("Confirm Pressed")
                }
            ], {
                cancelable: false
            }
        );
    }
    componentDidMount() {
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
      
        <ScrollView
            showsVerticalScrollIndicator={false}
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
                onPress={this.createDeleteAlert}
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
        <Block style={{
                flexDirection: 'row-reverse',
                alignItems: 'flex-end',
            }}>
        <TouchableOpacity
            onPress={() => navigation.navigate("Staff Form", {
                customer_form_name: "Create staff"
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