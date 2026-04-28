// Create AngularJS Module
var app = angular.module('studentApp', []);

// Create Controller
app.controller('StudentController', ['$scope', '$timeout', function($scope, $timeout) {

    // Initialize scope variables
    $scope.students = [];
    $scope.newStudent = {};
    $scope.searchStudent = '';
    $scope.filterClass = '';
    $scope.notification = {
        show: false,
        message: '',
        type: 'success'
    };

    // ======================
    // FORM EVENTS & FUNCTIONS
    // ======================

    /**
     * Add a new student to the list
     * Triggered by form submission
     */
    $scope.addStudent = function() {
        if ($scope.studentForm.$valid) {
            // Create new student object
            var student = angular.copy($scope.newStudent);

            // Check for duplicate roll number
            var isDuplicate = $scope.students.some(function(s) {
                return s.rollNo === student.rollNo;
            });

            if (isDuplicate) {
                $scope.showNotification('Roll number already exists!', 'error');
                return;
            }

            // Add to students array
            $scope.students.push(student);

            // Show success message
            $scope.showNotification('Student "' + student.name + '" added successfully!', 'success');

            // Reset form
            $scope.resetForm();
        }
    };

    /**
     * Edit an existing student
     * @param {Object} student - The student object to edit
     */
    $scope.editStudent = function(student) {
        // For this implementation, we'll populate the form with the student data
        $scope.newStudent = angular.copy(student);
        $scope.isEditing = true;

        // Scroll to form (optional)
        window.scrollTo(0, 0);
    };

    /**
     * Delete a student from the list
     * @param {Number} rollNo - Roll number of student to delete
     */
    $scope.deleteStudent = function(rollNo) {
        var confirm = window.confirm('Are you sure you want to delete this student?');

        if (confirm) {
            $scope.students = $scope.students.filter(function(student) {
                return student.rollNo !== rollNo;
            });

            $scope.showNotification('Student deleted successfully!', 'success');
        }
    };

    /**
     * Reset the form
     */
    $scope.resetForm = function() {
        $scope.newStudent = {};
        $scope.studentForm.$setPristine();
        $scope.studentForm.$setUntouched();
        $scope.isEditing = false;
    };

    /**
     * Handle form submission
     */
    $scope.onSubmit = function() {
        // The $valid check is already handled by ng-disabled on the button
        if ($scope.studentForm.$valid) {
            $scope.addStudent();
        }
    };

    /**
     * Filter students by selected class
     * @param {Object} student - Student object
     * @returns {Boolean} - True if student matches filter
     */
    $scope.filterByClass = function(student) {
        if (!$scope.filterClass) {
            return true;
        }
        return student.class === $scope.filterClass;
    };

    // ======================
    // VALIDATION FUNCTIONS
    // ======================

    /**
     * Check if email format is valid
     * Using AngularJS built-in email validator
     */
    $scope.isEmailValid = function() {
        return !$scope.studentForm.email.$error.email;
    };

    /**
     * Check if form field has validation errors
     * @param {String} fieldName - Name of the field
     * @returns {Boolean} - True if field has errors
     */
    $scope.hasError = function(fieldName) {
        var field = $scope.studentForm[fieldName];
        return field && field.$invalid && field.$touched;
    };

    /**
     * Get specific error for a field
     * @param {String} fieldName - Name of the field
     * @returns {Object} - Error object
     */
    $scope.getFieldError = function(fieldName) {
        return $scope.studentForm[fieldName].$error;
    };

    // ======================
    // STATISTICS FUNCTIONS
    // ======================

    /**
     * Calculate average GPA of all students
     * @returns {Number} - Average GPA
     */
    $scope.getAverageGPA = function() {
        if ($scope.students.length === 0) return 0;

        var total = $scope.students.reduce(function(sum, student) {
            return sum + parseFloat(student.gpa || 0);
        }, 0);

        return total / $scope.students.length;
    };

    /**
     * Get the highest GPA
     * @returns {Number} - Highest GPA
     */
    $scope.getHighestGPA = function() {
        if ($scope.students.length === 0) return 0;

        var highest = Math.max.apply(null, $scope.students.map(function(s) {
            return parseFloat(s.gpa || 0);
        }));

        return highest;
    };

    /**
     * Get the lowest GPA
     * @returns {Number} - Lowest GPA
     */
    $scope.getLowestGPA = function() {
        if ($scope.students.length === 0) return 0;

        var lowest = Math.min.apply(null, $scope.students.map(function(s) {
            return parseFloat(s.gpa || 0);
        }));

        return lowest;
    };

    // ======================
    // NOTIFICATION FUNCTIONS
    // ======================

    /**
     * Show notification message
     * @param {String} message - Message to display
     * @param {String} type - Type of notification (success, error, warning)
     */
    $scope.showNotification = function(message, type) {
        $scope.notification = {
            show: true,
            message: message,
            type: type || 'success'
        };

        // Auto-hide notification after 3 seconds
        $timeout(function() {
            $scope.notification.show = false;
        }, 3000);
    };

    // ======================
    // SAMPLE DATA (OPTIONAL)
    // ======================

    /**
     * Load sample data for demonstration
     */
    $scope.loadSampleData = function() {
        $scope.students = [
            {
                rollNo: 1,
                name: 'Raj Kumar',
                email: 'raj.kumar@example.com',
                phone: '9876543210',
                class: '10th',
                gpa: 3.8,
                dob: '2008-05-15',
                address: '123 Main Street, New Delhi, India'
            },
            {
                rollNo: 2,
                name: 'Priya Singh',
                email: 'priya.singh@example.com',
                phone: '9123456789',
                class: '11th',
                gpa: 3.9,
                dob: '2007-08-22',
                address: '456 Oak Avenue, Mumbai, India'
            },
            {
                rollNo: 3,
                name: 'Amit Patel',
                email: 'amit.patel@example.com',
                phone: '8765432109',
                class: '12th',
                gpa: 3.5,
                dob: '2006-03-10',
                address: '789 Pine Road, Bangalore, India'
            },
            {
                rollNo: 4,
                name: 'Neha Sharma',
                email: 'neha.sharma@example.com',
                phone: '9234567890',
                class: '10th',
                gpa: 3.7,
                dob: '2008-12-05',
                address: '321 Elm Street, Pune, India'
            }
        ];
        $scope.showNotification('Sample data loaded successfully!', 'success');
    };

    // Uncomment the line below to load sample data on page load
    // $scope.loadSampleData();

}]);

// ======================
// CUSTOM FILTERS (OPTIONAL)
// ======================

/**
 * Custom filter for formatting phone numbers
 */
app.filter('phoneFormat', function() {
    return function(input) {
        if (!input) return input;
        var phone = input.toString().replace(/\D/g, '');
        if (phone.length !== 10) return input;
        return '(' + phone.substring(0, 3) + ') ' + phone.substring(3, 6) + '-' + phone.substring(6);
    };
});

/**
 * Custom filter for GPA status
 */
app.filter('gpaStatus', function() {
    return function(gpa) {
        if (gpa >= 3.7) return 'Excellent';
        if (gpa >= 3.3) return 'Very Good';
        if (gpa >= 3.0) return 'Good';
        if (gpa >= 2.5) return 'Satisfactory';
        return 'Needs Improvement';
    };
});
