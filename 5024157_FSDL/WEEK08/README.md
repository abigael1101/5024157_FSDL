# Student Records Management System - AngularJS

A comprehensive web application built with AngularJS for managing student records with advanced form validation, event handling, and real-time data manipulation.

## 🎯 Features Implemented

### 1. **Form Validation Using AngularJS**

#### HTML Validators Used:

- **required**: Ensures field is not empty
- **minlength/maxlength**: Controls string length
- **min/max**: Controls numeric range
- **pattern**: Validates format (e.g., 10-digit phone number)
- **type="email"**: Validates email format
- **type="number"**: Ensures numeric input
- **type="date"**: Validates date input

#### AngularJS $valid Property:

- The form's `$valid` property tracks overall validity
- Individual fields have `$valid` and `$invalid` properties
- Form submission button is disabled until form is completely valid
- Real-time validation feedback is displayed to users

```html
<!-- Example: Button disabled until form is valid -->
<button type="submit" class="btn btn-primary" ng-disabled="!studentForm.$valid">
  Add Student
</button>
```

### 2. **Event Handling**

#### Events Implemented:

- **ng-submit**: Handles form submission
- **ng-click**: Handles button clicks (Add, Edit, Delete)
- **ng-focus/ng-blur**: Marks field as touched for validation display
- **ng-change**: Detects dynamic changes in form fields

#### Event Functions:

```javascript
$scope.addStudent(); // Add new student to list
$scope.editStudent(); // Load student data for editing
$scope.deleteStudent(); // Remove student from list
$scope.resetForm(); // Clear form fields
$scope.onSubmit(); // Handle form submission
```

### 3. **Dynamic HTML & Styling**

#### ng-class & ng-show/ng-hide:

- Error styling based on validation state
- Conditional display of error messages
- Success/invalid form status messages
- Dynamic GPA coloring (High/Medium/Low)

```html
<!-- Example: Conditional error styling -->
<div
  class="form-group"
  ng-class="{'error': studentForm.rollNo.$invalid && studentForm.rollNo.$touched}"
>
  <input type="number" name="rollNo" ng-model="newStudent.rollNo" required />
  <span
    class="error-message"
    ng-show="studentForm.rollNo.$error.required && studentForm.rollNo.$touched"
  >
    Roll number is required
  </span>
</div>
```

### 4. **Form Fields with Validation**

1. **Roll Number**
   - Required field
   - Minimum value: 1
   - Must be unique
   - Data type: Number

2. **Full Name**
   - Required field
   - Min length: 3 characters
   - Max length: 50 characters
   - Data type: Text

3. **Email**
   - Required field
   - Must be valid email format
   - Pattern validation

4. **Phone Number**
   - Required field
   - Exactly 10 digits
   - Pattern: `^\d{10}$`

5. **Class Selection**
   - Required field
   - Dropdown with 3 options (10th, 11th, 12th)

6. **GPA**
   - Required field
   - Range: 0 to 4.0
   - Step: 0.1 for precision
   - Displayed with color coding

7. **Date of Birth**
   - Required field
   - Date picker input
   - ISO format: YYYY-MM-DD

8. **Address**
   - Required field
   - Min length: 5 characters
   - Max length: 200 characters
   - Textarea for multi-line input

### 5. **Filter & Search Functionality**

- **Search by name/email**: Real-time filtering with ng-filter
- **Filter by class**: Dropdown filter for class selection
- **Live result count**: Shows number of students matching filters

### 6. **Data Display & Tables**

- **Responsive table**: Displays all student information
- **ng-repeat**: Dynamically lists all students
- **Date formatting**: Uses `| date:'dd-MMM-yyyy'` filter
- **Number formatting**: Uses `| number:'1.2-2'` filter for GPA
- **Conditional styling**: Color-coded GPA display

### 7. **Statistics Section**

- **Total Students**: Count of all students
- **Average GPA**: Calculated from all students
- **Highest GPA**: Maximum GPA value
- **Lowest GPA**: Minimum GPA value

#### Statistics Functions:

```javascript
$scope.getAverageGPA(); // Calculate mean GPA
$scope.getHighestGPA(); // Get maximum GPA
$scope.getLowestGPA(); // Get minimum GPA
```

### 8. **Notifications System**

- Success notifications when student is added/deleted
- Error notifications for invalid operations
- Auto-hide after 3 seconds
- Positioned at bottom-right corner
- Animations for smooth appearance

### 9. **Custom AngularJS Filters**

1. **phoneFormat Filter**
   - Formats phone numbers: `(123) 456-7890`

2. **gpaStatus Filter**
   - Converts GPA to status: `Excellent`, `Very Good`, etc.

### 10. **Form State Management**

- **$pristine/$dirty**: Tracks if form has been modified
- **$touched/$untouched**: Tracks field interaction
- **$pending**: Tracks async validation status
- **$error**: Contains specific validation errors

```javascript
// Check field validation state
$scope.hasError(fieldName); // Has validation errors
$scope.isEmailValid(); // Email is valid format
$scope.getFieldError(fieldName); // Get specific error
```

## 📁 File Structure

```
WEEK08/
├── student-records.html    # Main HTML file with AngularJS templates
├── app.js                  # AngularJS controller and services
├── styles.css              # Responsive CSS styling
└── README.md               # This file
```

## 🚀 How to Use

1. **Open the application**:
   - Open `student-records.html` in a web browser

2. **Add a Student**:
   - Fill in all required fields with valid data
   - Submit button enables only when form is valid
   - Click "Add Student" button
   - See success notification

3. **View Students**:
   - Students appear in the table below the form
   - Statistics update in real-time

4. **Search & Filter**:
   - Type in search box to filter by name/email
   - Use class dropdown to filter by class
   - Result count updates automatically

5. **Edit Student**:
   - Click "Edit" button in the Actions column
   - Form populates with student data
   - Modify fields and add again

6. **Delete Student**:
   - Click "Delete" button in the Actions column
   - Confirm deletion in popup dialog
   - Student removed from list

7. **Clear Form**:
   - Click "Clear Form" button to reset all fields
   - Form returns to pristine state

## 🎨 Key AngularJS Concepts Used

### Directives:

- `ng-app`: Initialize AngularJS module
- `ng-controller`: Attach controller to scope
- `ng-model`: Two-way data binding
- `ng-submit`: Form submission handler
- `ng-click`: Click event handler
- `ng-repeat`: Loop through arrays
- `ng-show/ng-hide`: Conditional display
- `ng-class`: Dynamic CSS classes
- `ng-disabled`: Disable elements based on conditions
- `ng-if`: Remove/add elements from DOM

### Filters:

- `filter`: Search and filter arrays
- `date`: Format date values
- `number`: Format numeric values
- Custom filters: `phoneFormat`, `gpaStatus`

### Services:

- `$scope`: Application data and methods
- `$timeout`: Delayed notifications

### Form Validation:

- `$valid/$invalid`: Overall form validity
- `$pristine/$dirty`: Form modification tracking
- `$touched/$untouched`: Field interaction tracking
- `$error`: Validation error details

## 🔧 Validation Rules

| Field   | Rules                   | Example                |
| ------- | ----------------------- | ---------------------- |
| Roll No | Required, Min=1, Unique | 1, 2, 3...             |
| Name    | Required, 3-50 chars    | "Raj Kumar"            |
| Email   | Required, Valid format  | "raj@example.com"      |
| Phone   | Required, 10 digits     | "9876543210"           |
| Class   | Required, Dropdown      | "10th", "11th", "12th" |
| GPA     | Required, 0-4.0         | 3.5, 3.8, 4.0          |
| DOB     | Required, Date          | 2008-05-15             |
| Address | Required, 5-200 chars   | "123 Main St..."       |

## 💡 Advanced Features

1. **Duplicate Prevention**: Checks if roll number already exists
2. **Confirmation Dialog**: Asks before deleting a student
3. **Real-time Statistics**: Updates automatically with each operation
4. **Responsive Design**: Works on desktop, tablet, and mobile
5. **Accessibility**: Proper labels and ARIA attributes
6. **Data Persistence**: Can be extended with LocalStorage or Backend API

## 🎯 Learning Outcomes

This project demonstrates:

- ✅ AngularJS form validation techniques
- ✅ Event handling in AngularJS
- ✅ Two-way data binding
- ✅ Dynamic HTML rendering
- ✅ ng-repeat for list rendering
- ✅ Conditional styling and display
- ✅ Custom filters and services
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Responsive web design
- ✅ User experience best practices

## 📝 Sample Data

To load sample data automatically, uncomment this line in `app.js`:

```javascript
$scope.loadSampleData();
```

## 🌐 Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Internet Explorer 11+ (with polyfills)

## 📦 Dependencies

- AngularJS 1.8.2 (CDN)

## ✨ Future Enhancements

- Add backend API integration
- Implement LocalStorage for data persistence
- Add PDF export functionality
- Implement user authentication
- Add file upload for student photos
- Create dashboard with charts
- Implement pagination
- Add sorting by column headers

---

**Created for**: Full Stack Development Learning (FSDL) - WEEK08
**Technology**: AngularJS 1.8.2, HTML5, CSS3
**Date**: April 2026
