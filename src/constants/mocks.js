const url = 'http://146fef47abc4.ngrok.io';

const image = {
    image: require("../assets/images/food.png"),
    addIcon: require("../assets/icons/add.png"),
    editIcon: require("../assets/icons/edit.png"),
    deleteIcon: require("../assets/icons/delete.png"),
    staffIcon: require("../assets/icons/staff.png"),
    customerIcon: require("../assets/icons/customer.png"),
    addCustomerIcon: require("../assets/icons/addCustomer.png"),
    editCustomerIcon: require("../assets/icons/editCustomer.png"),
    deleteCustomerIcon: require("../assets/icons/deleteCustomer.png"),
}

const menus = [{
    "id": 1,
    "menu_Name": "Continental",
    "available_Date_From": "2020-04-26T00:00:00",
    "available_Date_To": "2020-04-30T00:00:00",
    "isActive": true,
    "createdBy": "Joshan",
    "createdOn": "2020-04-26T00:00:00",
    "updatedBy": "Joshan",
    "updatedOn": "2020-04-26T00:00:00"
},
    {
        "id": 2,
        "menu_Name": "Local Food",
        "available_Date_From": "2020-04-26T00:00:00",
        "available_Date_To": "2020-04-26T00:00:00",
        "isActive": true,
        "createdBy": "Nabin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "id": 3,
        "menu_Name": "Chinese",
        "available_Date_From": "2020-04-26T00:00:00",
        "available_Date_To": "2020-04-26T00:00:00",
        "isActive": true,
        "createdBy": "Naresh",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "id": 4,
        "menu_Name": "Fast Food",
        "available_Date_From": "2020-04-26T00:00:00",
        "available_Date_To": "2020-04-26T00:00:00",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "id": 5,
        "menu_Name": "Deserts",
        "available_Date_From": "2020-04-26T00:00:00",
        "available_Date_To": "2020-04-26T00:00:00",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "id": 6,
        "menu_Name": "Cafeteria",
        "available_Date_From": "2020-04-26T00:00:00",
        "available_Date_To": "2020-04-26T00:00:00",
        "isActive": false,
        "createdBy": "Prabhu",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "id": 7,
        "menu_Name": "Hard Drinks",
        "available_Date_From": "2020-04-26T00:00:00",
        "available_Date_To": "2020-04-26T00:00:00",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "id": 8,
        "menu_Name": "Soft Drinks",
        "available_Date_From": "2020-04-26T00:00:00",
        "available_Date_To": "2020-04-26T00:00:00",
        "isActive": false,
        "createdBy": "Prabesh",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    }

];


const menuItems = [{
    "menuItemId": 1,
    "menuId": 1,
    "menu_Items_Name": "Yorkshire Lamb Patties",
    "isActive": true,
    "createdBy": "Joshan",
    "createdOn": "2020-04-26T00:00:00",
    "updatedBy": "admin",
    "updatedOn": "2020-04-26T00:00:00"
},
    {
        "menuItemId": 2,
        "menuId": 1,
        "menu_Items_Name": "Chicken And Cheese Salad",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    }, {
        "menuItemId": 3,
        "menuId": 1,
        "menu_Items_Name": "Baked Potato And Aubergines",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 4,
        "menuId": 2,
        "menu_Items_Name": "Sel roti",
        "isActive": true,
        "createdBy": "Naresh",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    }, {
        "menuItemId": 5,
        "menuId": 2,
        "menu_Items_Name": "Juju dhau",
        "isActive": true,
        "createdBy": "Khopdi",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 6,
        "menuId": 2,
        "menu_Items_Name": "Dal bhat",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    }, {
        "menuItemId": 7,
        "menuId": 3,
        "menu_Items_Name": "Hotpot",
        "isActive": true,
        "createdBy": "Rajendra",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 8,
        "menuId": 3,
        "menu_Items_Name": "Sichuan Pork",
        "isActive": true,
        "createdBy": "Suyogya",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 9,
        "menuId": 3,
        "menu_Items_Name": "Braised Pork Balls in Gravy",
        "isActive": true,
        "createdBy": "Anita",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 10,
        "menuId": 4,
        "menu_Items_Name": "Hamburger",
        "isActive": true,
        "createdBy": "Joshan",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 11,
        "menuId": 4,
        "menu_Items_Name": "Cheeseburger",
        "isActive": true,
        "createdBy": "Joshan",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 12,
        "menuId": 4,
        "menu_Items_Name": "Sandwich",
        "isActive": true,
        "createdBy": "Joshan",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 13,
        "menuId": 8,
        "menu_Items_Name": "Coca Cola",
        "isActive": true,
        "createdBy": "Richa",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 14,
        "menuId": 8,
        "menu_Items_Name": "Fanta",
        "isActive": true,
        "createdBy": "Richa",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 15,
        "menuId": 8,
        "menu_Items_Name": "Apple Cider",
        "isActive": true,
        "createdBy": "Richa",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    }, {
        "menuItemId": 16,
        "menuId": 5,
        "menu_Items_Name": " Mixed berry mousse",
        "isActive": true,
        "createdBy": "Adip",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 17,
        "menuId": 5,
        "menu_Items_Name": " Mango and coconut soufflé",
        "isActive": true,
        "createdBy": "Adip",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 18,
        "menuId": 5,
        "menu_Items_Name": "XL lemon meringue pie",
        "isActive": false,
        "createdBy": "Sandesh",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 19,
        "menuId": 6,
        "menu_Items_Name": "Bacon-Turkey Subs",
        "isActive": false,
        "createdBy": "Madan",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 20,
        "menuId": 6,
        "menu_Items_Name": "Frosted Fudge Brownies",
        "isActive": true,
        "createdBy": "Prabesh",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 21,
        "menuId": 6,
        "menu_Items_Name": "Sloppy Joe Dogs",
        "isActive": true,
        "createdBy": "Balika",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 22,
        "menuId": 7,
        "menu_Items_Name": "Tuborg",
        "isActive": true,
        "createdBy": "Sushil",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 23,
        "menuId": 7,
        "menu_Items_Name": "Old Durbar",
        "isActive": true,
        "createdBy": "Shiwani",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "menuItemId": 24,
        "menuId": 7,
        "menu_Items_Name": "Jack Daniels",
        "isActive": true,
        "createdBy": "Richa",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    }
];

const meals = [{
    "mealId": 1,
    "staffId": 1,
    "customerId": 1,
    "date_of_Meal": "2020-04-20T00:00:00",
    "cost_of_Meal": "1500",
    "isActive": true,
    "createdBy": "admin",
    "createdOn": "2020-04-26T00:00:00",
    "updatedBy": "admin",
    "updatedOn": "2020-04-26T00:00:00"
},
    {
        "mealId": 2,
        "staffId": 2,
        "customerId": 3,
        "date_of_Meal": "2020-04-20T00:00:00",
        "cost_of_Meal": "300",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "mealId": 3,
        "staffId": 3,
        "customerId": 2,
        "date_of_Meal": "2020-04-20T00:00:00",
        "cost_of_Meal": "1550",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "mealId": 4,
        "staffId": 2,
        "customerId": 2,
        "date_of_Meal": "2020-04-20T00:00:00",
        "cost_of_Meal": "500",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "mealId": 5,
        "staffId": 5,
        "customerId": 1,
        "date_of_Meal": "2020-04-20T00:00:00",
        "cost_of_Meal": "15000",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    }
];

const mealDishes = [{
    "mealDishesId": 1,
    "mealId": 1,
    "menuItemId": 1,
    "quantity": "1",
    "isActive": true,
    "createdBy": "admin",
    "createdOn": "2020-04-26T00:00:00",
    "updatedBy": "admin",
    "updatedOn": "2020-04-26T00:00:00"
},
    {
        "mealDishesId": 2,
        "mealId": 1,
        "menuItemId": 4,
        "quantity": "5",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "mealDishesId": 3,
        "mealId": 2,
        "menuItemId": 7,
        "quantity": "8",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "mealDishesId": 4,
        "mealId": 2,
        "menuItemId": 10,
        "quantity": "9",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "mealDishesId": 5,
        "mealId": 3,
        "menuItemId": 13,
        "quantity": "4",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "mealDishesId": 6,
        "mealId": 4,
        "menuItemId": 16,
        "quantity": "2",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "mealDishesId": 7,
        "mealId": 5,
        "menuItemId": 19,
        "quantity": "3",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
];

const customers = [{
    "id": 1,
    "firstName": "Bishwoee",
    "lastName": "Adhi",
    "address": "Kathmandu",
    "phoneRes": "0101010101",
    "phoneMob": "99999999",
    "enrollDate": "2020-01-01T00:00:00",
    "isActive": true,
    "createdBy": "admin",
    "createdOn": "2020-01-01T00:00:00",
    "updatedBy": "admin",
    "updatedOn": "2020-01-01T00:00:00"
},
    {
        "id": 2,
        "firstName": "Test",
        "lastName": "User",
        "address": "Addr",
        "phoneRes": "01",
        "phoneMob": "99",
        "enrollDate": "2020-01-01T00:00:00",
        "isActive": true,
        "createdBy": "a",
        "createdOn": "2020-04-18T00:00:00",
        "updatedBy": "a",
        "updatedOn": "2020-04-18T00:00:00"
    },
    {
        "id": 3,
        "firstName": "first_name",
        "lastName": "last_name",
        "address": "address",
        "phoneRes": "00000001",
        "phoneMob": "99999999",
        "enrollDate": "2020-04-18T16:51:30.127",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-18T16:51:30.127",
        "updatedBy": "admin",
        "updatedOn": "2020-04-18T16:51:30.127"
    },
    {
        "id": 4,
        "firstName": "apex",
        "lastName": "lab",
        "address": "old baneshwor",
        "phoneRes": "0123456789",
        "phoneMob": "987654321",
        "enrollDate": "2020-04-19T11:50:42.427",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-19T11:50:42.427",
        "updatedBy": "admin",
        "updatedOn": "2020-04-19T11:50:42.427"
    },
    {
        "id": 5,
        "firstName": "Joshan",
        "lastName": "Pradhan",
        "address": "Ilam",
        "phoneRes": "0123456789",
        "phoneMob": "987654321",
        "enrollDate": "2020-04-19T11:50:42.427",
        "isActive": true,
        "createdBy": "Pradhan",
        "createdOn": "2020-04-19T11:50:42.427",
        "updatedBy": "admin",
        "updatedOn": "2020-04-19T11:50:42.427"
    },,
    {
        "id": 6,
        "firstName": "Sushil",
        "lastName": "Aryal",
        "address": "Butwal",
        "phoneRes": "0123456789",
        "phoneMob": "987654321",
        "enrollDate": "2020-04-19T11:50:42.427",
        "isActive": false,
        "createdBy": "Joshan",
        "createdOn": "2020-04-19T11:50:42.427",
        "updatedBy": "admin",
        "updatedOn": "2020-04-19T11:50:42.427"
    },,
    {
        "id": 7,
        "firstName": "Nabin",
        "lastName": "Kattel",
        "address": "old baneshwor",
        "phoneRes": "0123456789",
        "phoneMob": "987654321",
        "enrollDate": "2020-04-19T11:50:42.427",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-19T11:50:42.427",
        "updatedBy": "admin",
        "updatedOn": "2020-04-19T11:50:42.427"
    },,
    {
        "id": 8,
        "firstName": "Masu",
        "lastName": "man",
        "address": "Chitwan",
        "phoneRes": "0123456789",
        "phoneMob": "987654321",
        "enrollDate": "2020-04-19T11:50:42.427",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-19T11:50:42.427",
        "updatedBy": "admin",
        "updatedOn": "2020-04-19T11:50:42.427"
    }
];

const staffRoles = [{
    "staff_Roles_Id": 1,
    "staff_Roles_Description": "Waiter",
    "isActive": true,
    "createdBy": "admin",
    "createdOn": "2020-04-26T00:00:00",
    "updatedBy": "admin",
    "updatedOn": "2020-04-26T00:00:00"
},
    {
        "staff_Roles_Id": 2,
        "staff_Roles_Description": "Receptionist",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "staff_Roles_Id": 3,
        "staff_Roles_Description": "Accountant",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "staff_Roles_Id": 4,
        "staff_Roles_Description": "Chef",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },

    {
        "staff_Roles_Id": 5,
        "staff_Roles_Description": "Manager",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },

    {
        "staff_Roles_Id": 6,
        "staff_Roles_Description": "Founder",
        "isActive": false,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
]



const staffs = [{
    "id": 1,
    "staff_Role_Id": 1,
    "firstName": "Rajat",
    "lastName": "Pradhan ",
    "address": "Old baneshwor",
    "phoneRes": "11111",
    "phoneMob": "999999",
    "enrollDate": "2020-04-20T00:00:00",
    "isActive": true,
    "createdBy": "admin",
    "createdOn": "2020-04-26T00:00:00",
    "updatedBy": "admin",
    "updatedOn": "2020-04-26T00:00:00"
},
    {
        "id": 2,
        "staff_Role_Id": 2,
        "firstName": "Nabin",
        "lastName": "Kattel",
        "address": "Chiwan",
        "phoneRes": "11111",
        "phoneMob": "999999",
        "enrollDate": "2020-04-20T00:00:00",
        "isActive": false,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "id": 3,
        "staff_Role_Id": 3,
        "firstName": "Sushil",
        "lastName": "Aryal",
        "address": "Butwal",
        "phoneRes": "11111",
        "phoneMob": "999999",
        "enrollDate": "2020-04-20T00:00:00",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "id": 4,
        "staff_Role_Id": 4,
        "firstName": "Richa",
        "lastName": "Acharya",
        "address": "Kathmandu",
        "phoneRes": "11111",
        "phoneMob": "999999",
        "enrollDate": "2020-04-20T00:00:00",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "id": 5,
        "staff_Role_Id": 5,
        "firstName": "Shiwani",
        "lastName": "Upadhay",
        "address": "Kathmandu",
        "phoneRes": "11111",
        "phoneMob": "999999",
        "enrollDate": "2020-04-20T00:00:00",
        "isActive": true,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    },
    {
        "id": 6,
        "staff_Role_Id": 6,
        "firstName": "Rohan",
        "lastName": "Archarya",
        "address": "Dhangadi",
        "phoneRes": "11111",
        "phoneMob": "999999",
        "enrollDate": "2020-04-20T00:00:00",
        "isActive": false,
        "createdBy": "admin",
        "createdOn": "2020-04-26T00:00:00",
        "updatedBy": "admin",
        "updatedOn": "2020-04-26T00:00:00"
    }
];


export { url, image, menus, menuItems, customers, staffs, meals, mealDishes, staffRoles };