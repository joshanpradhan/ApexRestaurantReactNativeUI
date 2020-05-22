import React, { Component } from "react";
import { Dimensions, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

import { Card, Badge, Button, Block, Text } from "../components";
import { theme, mocks } from "../constants";

const {width} = Dimensions.get("window");

class MealDishes extends Component {
    state = {
        mealDishes: [],
        menuItems: [],
        image: {}

    };

    componentDidMount() {
        this.setState({
            mealDishes: this.props.mealDishes,
            menuItems: this.props.menuItems,
            image: this.props.image
        });
    }
    filteredMenuItem(menuItemId) {
        const {menuItems} = this.state;
        const filteredMenuItems = menuItems.filter(menuItem => {
            return menuItem.menuItemId === menuItemId;
        })
        return filteredMenuItems.map(filteredMenuItem => (
            <Text  black bold height={20}>
             {filteredMenuItem.menu_Items_Name}
              </Text>
        ))


    }
    render() {
        const {profile, navigation} = this.props;
        const {mealDishes, menuItems, image} = this.state;
        const {mealId} = this.props.route.params;

        //filtered menu items from menu
        const filteredMealDishes = mealDishes.filter(mealDish => {
            return mealDish.mealId === mealId;
        })

        return (
            <Block>

        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                paddingVertical: theme.sizes.base * 1
            }}
            >       
          <Block flex={false} row space="between" style={styles.mealDishes}>
            {filteredMealDishes.map(mealDish => (
                <Card center middle shadow style={styles.mealDish}>
                  <Badge
                margin={[0, 0, 10]}
                size={50}
                color="rgba(41,216,143,0.20)"
                >
                <Image source={image.image} style={{
                    width: 35,
                    height: 35
                }}/>
                  </Badge>
           
                  {this.filteredMenuItem(mealDish.menuItemId)}
                  <Text  gray bold height={20}>
                    Quantity {mealDish.quantity}
                  </Text>                
                  </Card>
            ))}
          </Block>

        </ScrollView>

      <Block style={{
                flexDirection: 'row-reverse',
                alignItems: 'flex-end',
            }}>
        <TouchableOpacity
            onPress={() => navigation.navigate("MealDish Form", {
                meal_dish_form_name: "Create meal dish"
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

MealDishes.defaultProps = {
    mealDishes: mocks.mealDishes,
    menuItems: mocks.menuItems,
    image: mocks.image,

};

export default MealDishes;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.sizes.base * 2
    },

    mealDishes: {
        flexWrap: "wrap",
        paddingHorizontal: theme.sizes.base * 2,
        marginBottom: theme.sizes.base * 1
    },
    mealDish: {
        // this should be dynamic based on screen width
        minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
        maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2
    }
});