# Quiz Application

## Overview

This application is designed to facilitate test-taking. It allows users to take a test consisting of multiple choice questions, provides a countdown timer, and offers navigation between questions. The application is built using React.js and utilizes several components to manage the test-taking process.

## Components

### 1. `Welcome` Component
- User enters the email and starts the test.

### 2. `Test` Component

- Manages the main test interface.
- Handles question navigation, user answers, and the countdown timer.
- Utilizes the `Timer` and `Sidebar` components.

### 3. `Timer` Component

- Displays and manages the countdown timer.
- Once countdown reaches zero test auto submits.

### 4. `Sidebar` Component

- Provides a sidebar for easy navigation between questions.
- Displays question statuses (current, attempted, viewed).
- Allows users to close/open the sidebar.

### 5. `QuestionContext`

- A context provider to manage state related to questions, user answers, and the timer.

### 6. `Report Page`

- Displays total number of correct answers
- Compares correct_answers with selected answers by users 

## Setup and Installation

Assuming you have Node.js and npm (Node Package Manager) installed:

1. Clone the repository to your local machine.
2. Navigate to the project directory using the terminal.
3. Run `npm install` to install the project dependencies.
4. Run `npm start` to start the development server.
5. Open your web browser and visit `http://localhost:3000` to view the application.

## Assumptions


- It assumes that the user interface should display questions one at a time and allow navigation between them.
- The test is assumed to consist of a fixed number of 15 questions.
- Users are assumed not to refresh the page during the test.

## Challenges Faced and Solutions

1. **Managing State:** Managing state related to questions, user answers, and the timer across multiple components required careful use of React's state management and context.

2. **Styling:** Achieving the desired UI layout and styling, especially for the sidebar, required extensive use of Tailwind CSS classes.

3. **UI Updates:** Ensuring that the UI updates correctly when a user selects an option and that only one option is selectable at a time was a challenge. This was addressed by carefully updating the state and applying appropriate CSS classes.


By carefully structuring the components, utilizing React's state management, and applying CSS styling techniques, these challenges were overcome to create a functional Quiz App application.