import React, { Component } from "react";
import { Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";

import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";
import Moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const {width} = Dimensions.get("window");

class StaffRole extends Component {
    state = {
        staffRoles: [],
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
            staffRoles: this.props.staffRoles,
            image: this.props.image,
        });
    }

    render() {
        const {profile, navigation} = this.props;
        const {staffRoles, image} = this.state;

        return (
            <Block marginTop={35}>
        <Block flex={false} row center space="between" style={styles.header}>
          <Text h2 bold>
            Staffs
          </Text>
        </Block>
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                paddingVertical: theme.sizes.base * 0.5
            }}
            >

          <Block flex={false} column style={styles.staffRoles}>
          
            {staffRoles.map(staffRole => (
                <TouchableOpacity
                key={staffRole.staff_Roles_Id}
                onPress={() => navigation.navigate("Staff", {
                    staffRole_id: staffRole.staff_Roles_Id,
                    staffRole_name: staffRole.staff_Roles_Description
                })}
                activeOpacity={0.6}
                >

                <Card  shadow style={styles.staffRole}>
                     <Block flex={false} row space="between">

                  <Badge
                margin={[0, 0, 10]}
                size={60}
                color="rgba(41,216,143,0.20)"
                >
                    <Image source={image.staffIcon} style={{
                    width: 35,
                    height: 35
                }}/>
                  </Badge>
                 <Text h2 bold height={55}>
                    {staffRole.staff_Roles_Description}
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
                   {staffRole.createdBy}

                  </Text>
                  <Text gray height={15}>
                   {Moment(staffRole.createdOn).format('Do MMMM YYYY')}
                  </Text>
          </Block>
        <Block flex={false} row space="between">
                   <TouchableOpacity
                onPress={() => navigation.navigate("StaffRole Form", {
                    staffRole_form_name: "Edit staff role",
                    staff_Roles_Id: staffRole.staff_Roles_Id,
                    staff_Roles_Description: staffRole.staff_Roles_Description,
                    isActive: staffRole.isActive,
                    createdBy: staffRole.createdBy,
                    createdOn: staffRole.createdOn,
                    updatedBy: staffRole.updatedBy,
                    updatedOn: staffRole.updatedOn,

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
                </TouchableOpacity>
            ))}
          </Block>
        </ScrollView>
        <Block style={{
                flexDirection: 'row-reverse',
                alignItems: 'flex-end',
            }}>
        <TouchableOpacity
            onPress={() => navigation.navigate("StaffRole Form", {
                staffRole_form_name: "Create staff role"
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

StaffRole.defaultProps = {
    staffRoles: mocks.staffRoles,
    image: mocks.image,
};

export default StaffRole;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 1,
        marginBottom: theme.sizes.base * 0.5

    },
    staffRoles: {
        paddingHorizontal: theme.sizes.base * 1,
        marginBottom: theme.sizes.base * 0.5

    },

});