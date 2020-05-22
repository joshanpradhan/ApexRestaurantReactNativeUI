import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from "../constants";


import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Forgot from "../screens/Forgot";
import Meal from "../screens/Meal";
import MealForm from "../screens/MealForm";
import MealDishes from "../screens/MealDishes";
import MealDishForm from "../screens/MealDishForm";
import Menu from "../screens/Menu";
import MenuForm from "../screens/MenuForm";
import Customer from "../screens/Customer";
import CustomerForm from "../screens/CustomerForm";
import Staff from "../screens/Staff";
import StaffForm from "../screens/StaffForm";
import StaffRole from "../screens/StaffRole";
import StaffRoleForm from "../screens/StaffRoleForm";
import MenuItems from "../screens/MenuItems";
import MenuItemForm from "../screens/MenuItemForm";



const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();


const screenOptions = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'Menu') {
            iconName = 'food';
        } else if (route.name === 'Meal') {
            iconName = 'food-variant';
        } else if (route.name === 'Customer') {
            iconName = 'account-group';
        } else if (route.name === 'Staff Role') {
            iconName = 'chef-hat';
        }

        // You can return any component that you like here!
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
    },
});

function Home() {
    return (
        <Tab.Navigator
        initialRouteName="Menu"
        screenOptions={screenOptions}
        tabBarOptions={{
            activeTintColor: theme.colors.secondary,
            inactiveTintColor: theme.colors.black,
            style: {
                paddingBottom: 5,
                height: 50,
            }

        }}>
        
        <Tab.Screen name="Menu" component={Menu}

        />
        <Tab.Screen name="Meal" component={Meal}

        />
        <Tab.Screen name="Customer" component={Customer}

        />
        <Tab.Screen name="Staff Role" component={StaffRole}

        />  
      </Tab.Navigator>
    );
}


function App() {
    return (
        <NavigationContainer>
         <Stack.Navigator
        screenOptions={{
            headerShown: false

        }}
        >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
         <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MenuItems" component={MenuItems}
        options={({route}) => ({
            headerShown: true,
            title: route.params.menu_name,
        })}
        />
        <Stack.Screen name="Menu Form" component={MenuForm}
        options={({route}) => ({
            headerShown: true,
            title: route.params.menu_form_name,

        })}
        />
        <Stack.Screen name="Customer Form" component={CustomerForm}
        options={({route}) => ({
            headerShown: true,
            title: route.params.customer_form_name,
        })}
        />
        <Stack.Screen name="StaffRole Form" component={StaffRoleForm}
        options={({route}) => ({
            headerShown: true,
            title: route.params.staffRole_form_name,
        })}
        />
        <Stack.Screen name="Staff" component={Staff}
        options={({route}) => ({
            headerShown: true,
            title: route.params.staffRole_name,
        })}
        />
          <Stack.Screen name="Staff Form" component={StaffForm}
        options={({route}) => ({
            headerShown: true,
            title: route.params.staff_form_name,
        })}
        />
          <Stack.Screen name="Meal Form" component={MealForm}
        options={({route}) => ({
            headerShown: true,
            title: route.params.mealId,
        })}
        />
        <Stack.Screen name="Meal Dishes" component={MealDishes}
        options={({route}) => ({
            headerShown: true,
            title: route.params.mealDishes_form_name,
        })}
        />
         <Stack.Screen name="MenuItem Form" component={MenuItemForm}
        options={({route}) => ({
            headerShown: true,
            title: route.params.menu_item_form_name,
        })}
        />
         <Stack.Screen name="MealDish Form" component={MealDishForm}
        options={({route}) => ({
            headerShown: true,
            title: route.params.meal_dish_form_name,
        })}
        />

      </Stack.Navigator>
    </NavigationContainer>
    );
}

export default App;