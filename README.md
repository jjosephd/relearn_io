# Project: AI-Powered Education Coach

## Overview

The AI-Powered Education Coach assists students, particularly parents returning to school, by providing personalized education recommendations via an AI-driven chatbot. It integrates educational APIs such as College Scorecard, IPEDS, and Coursera to offer insights on schools, programs, and costs, while leveraging OpenAI to generate natural responses for students.

## Sprint 1: **User Input Expansion, Data Selection, and Presentation Polish**

### Objective

To build a more personalized experience for users by expanding the input form, refining the data fetched from the College Scorecard API, and improving the presentation of search results.

---

### **Part 1: Expanded User Input (Form Fields)**

The goal is to capture key user preferences that will refine the recommendations. Here’s the expanded form structure:

- **Intended Major or Field of Study** (string or dropdown): Allows users to specify their field of interest.
- **Education Goal** (dropdown options: certificate, associate, bachelor’s, grad): Helps recommend schools offering relevant programs.
- **Preferred Location Type** (dropdown options: in-state, out-of-state, remote/online): Filters schools based on location preferences.
- **Max Tuition Budget** (numeric range): Allows users to set a maximum tuition budget.
- **School Type Preference** (dropdown options: public/private, 2-year/4-year): Filters by school type.
- **Admission Difficulty Preference** (dropdown options: open, selective, competitive): Helps narrow down schools based on admission competitiveness.

#### Tasks:

- [ ] **Expand the input form** to include these new fields and ensure data is captured correctly.
- [ ] **Add form validation** to ensure user inputs are accurate (e.g., numeric range for budget, valid field of study).

---

### **Part 2: Relevant Data to Return (from College Scorecard API)**

To provide helpful context for comparisons, the app will pull additional details from the College Scorecard API:

- **School Name**
- **Location (City, State)**
- **In-State / Out-of-State Tuition**
- **Admission Rate**
- **Graduation Rate**
- **Median Earnings After Graduation**
- **Student Size (total enrollment)**
- **Online Programs Available?**
- **Field of Study Match % or presence**

#### Tasks:

- [ ] **Update the API call logic** to include the new data fields.
- [ ] **Filter and sort results** based on user input. For example:
  - Match the field of study.
  - Sort schools by tuition or admission rate.
  - Filter by preferred location (in-state, out-of-state, online).
- [ ] **Test the API integration** to ensure it returns relevant and accurate data.

---

### **Part 3: Presentation Polish**

The goal is to present the results in a modern and user-friendly way. We’ll use Flask with Jinja templates and simple frontend libraries like Bootstrap or Tailwind.

#### Tasks:

- [ ] **Create a clean card-based layout** for each school result.
  - Display key information like tuition, admission rate, and location on a card.
  - Use subtle icons for each piece of information (e.g., a location icon for city/state, graduation cap for graduation rate).
- [ ] **Add tags or chips** to highlight specific attributes (e.g., “Online Available,” “Private,” “4-Year,” etc.).
- [ ] **Add sort options**: Allow users to sort the results by tuition, admissions rate, or graduation rate.
- [ ] **Implement a responsive design** using Bootstrap grid or Tailwind to ensure the site works well on both desktop and mobile devices.
- [ ] **Refine the UI**: Polish the look and feel to ensure it’s modern and intuitive.

---

## To-Do List

### Expanded User Input

- [ ] **Update the form** with the new fields (major, goal, location, budget, school type, admission difficulty).
- [ ] **Add validation and error handling** for the new fields.
- [ ] **Store user input** and send it to the backend when making requests.

### Data Fetching and Logic

- [ ] **Update College Scorecard API integration** to fetch the relevant data.
- [ ] **Filter results** based on user preferences (e.g., field of study, tuition, location).
- [ ] **Sort results** according to the user's preferences (e.g., tuition, admission rate).
- [ ] **Test the data handling** and ensure all fields are correctly populated.

### Presentation and UI

- [ ] **Design the results card** using Bootstrap or Tailwind (responsive layout).
- [ ] **Add icons** and labels for the data (tuition, graduation rate, etc.).
- [ ] **Implement sort dropdown** for users to filter results.
- [ ] **Ensure the app is mobile-friendly** by testing on various devices.
- [ ] **Polish the frontend** to create a user-friendly and aesthetically pleasing interface.

---

## Future Steps

Once Sprint 1 is complete, we’ll move towards refining the AI component, integrating additional data sources like Coursera for course suggestions, and improving user feedback mechanisms.

---

## Contributing

To contribute, fork the repository, create a new branch, and submit a pull request. Please ensure all form fields, API logic, and presentation tasks are completed and tested before submission.
