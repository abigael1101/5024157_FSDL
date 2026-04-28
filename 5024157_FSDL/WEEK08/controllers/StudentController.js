/**
 * Student Controller
 * Manages all student-related operations and form interactions
 */
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
            var student = angular.copy($scope.newStudent);

            // Check for duplicate roll number
            var isDuplicate = $scope.students.some(function(s) {
                return s.rollNo === student.rollNo;
            });

            if (isDuplicate) {
                $scope.showNotification('Roll number already exists!', 'error');
                return;
            }

            $scope.students.push(student);
            $scope.showNotification('Student "' + student.name + '" added successfully!', 'success');
            $scope.resetForm();
        }
    };

    /**
     * Edit an existing student
     */
    $scope.editStudent = function(student) {
        $scope.newStudent = angular.copy(student);
        $scope.isEditing = true;
        window.scrollTo(0, 0);
    };

    /**
     * Delete a student from the list
     */
    $scope.deleteStudent = function(rollNo) {
        if (window.confirm('Are you sure you want to delete this student?')) {
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
        if ($scope.studentForm.$valid) {
            $scope.addStudent();
        }
    };

    /**
     * Filter students by selected class
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

    $scope.isEmailValid = function() {
        return !$scope.studentForm.email.$error.email;
    };

    $scope.hasError = function(fieldName) {
        var field = $scope.studentForm[fieldName];
        return field && field.$invalid && field.$touched;
    };

    $scope.getFieldError = function(fieldName) {
        return $scope.studentForm[fieldName].$error;
    };

    // ======================
    // STATISTICS FUNCTIONS
    // ======================

    $scope.getAverageGPA = function() {
        if ($scope.students.length === 0) return 0;
        var total = $scope.students.reduce(function(sum, student) {
            return sum + parseFloat(student.gpa || 0);
        }, 0);
        return total / $scope.students.length;
    };

    $scope.getHighestGPA = function() {
        if ($scope.students.length === 0) return 0;
        return Math.max.apply(null, $scope.students.map(function(s) {
            return parseFloat(s.gpa || 0);
        }));
    };

    $scope.getLowestGPA = function() {
        if ($scope.students.length === 0) return 0;
        return Math.min.apply(null, $scope.students.map(function(s) {
            return parseFloat(s.gpa || 0);
        }));
    };

    // ======================
    // NOTIFICATION FUNCTIONS
    // ======================

    $scope.showNotification = function(message, type) {
        $scope.notification = {
            show: true,
            message: message,
            type: type || 'success'
        };

        $timeout(function() {
            $scope.notification.show = false;
        }, 3000);
    };

    // ======================
    // SAMPLE DATA
    // ======================

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

}]);
