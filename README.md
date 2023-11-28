# Frontend Home Assignment with Vue-3.

# Deployed link :https://ben-aizenstein-assignment.000webhostapp.com/

## Overview
This project is a frontend home assignment showcasing Vue.js best practices. It includes functionalities to fetch and display a list of people from an API, view detailed information of selected individuals, and edit their names.

## Features
- Fetching and displaying a list of people from the 'Random User' API.
- Detailed view of a person's information including their image, gender, age, contact details, and address.
- Editing a person's name and saving changes.

## Technologies Used
- Vue.js
- Vuex (State Management)
- Vue Router (Navigation)
- Vuetify (UI Component Library)
- Axios (HTTP client)

## Project Structure
The project is organized as follows:
- `components/`: Contains Vue components like `PersonList.vue` and `PersonDetails.vue`.
- `store/`: Includes Vuex store setup (`index.js`) managing fetched people and selected person state.
- `router/`: Contains Vue Router setup for navigation between views.
- `App.vue`: Main Vue application component.
- `main.js`: Initialization of Vue app with router, store, and Vuetify setup.

## Code Structure and Best Practices
- **Component Structure**: Components are logically split for listing people, displaying details, and editing information.
- **State Management**: Vuex is used to manage fetched people and selected person states.
- **Routing**: Vue Router is employed for navigating between the list view and detailed view.
- **Data Handling and Computed Properties**: Efficient data handling with computed properties for derived data.

## Setup Instructions
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Run the project: `npm run serve`.

## Usage
- Upon running the project, click the "Fetch" button to retrieve people from the API.
- Click on a person's row in the table to view detailed information.
- Edit the person's name in the detailed view and click "Save" to apply changes.

## Acknowledgments
- The project utilizes the 'Random User' API for fetching data.


