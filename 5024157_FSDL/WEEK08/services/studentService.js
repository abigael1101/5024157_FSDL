/**
 * Student Service
 * Handles all business logic for student management
 */
app.factory('StudentService', ['$timeout', function($timeout) {
    return {
        /**
         * Validate duplicate roll number
         */
        isDuplicateRollNo: function(students, rollNo) {
            return students.some(function(s) {
                return s.rollNo === rollNo;
            });
        },

        /**
         * Calculate average GPA
         */
        calculateAverageGPA: function(students) {
            if (students.length === 0) return 0;

            var total = students.reduce(function(sum, student) {
                return sum + parseFloat(student.gpa || 0);
            }, 0);

            return total / students.length;
        },

        /**
         * Get highest GPA
         */
        getHighestGPA: function(students) {
            if (students.length === 0) return 0;

            return Math.max.apply(null, students.map(function(s) {
                return parseFloat(s.gpa || 0);
            }));
        },

        /**
         * Get lowest GPA
         */
        getLowestGPA: function(students) {
            if (students.length === 0) return 0;

            return Math.min.apply(null, students.map(function(s) {
                return parseFloat(s.gpa || 0);
            }));
        },

        /**
         * Filter students by class
         */
        filterByClass: function(students, classFilter) {
            if (!classFilter) return students;
            return students.filter(function(s) {
                return s.class === classFilter;
            });
        },

        /**
         * Search students by name or email
         */
        searchStudents: function(students, searchTerm) {
            if (!searchTerm) return students;
            var term = searchTerm.toLowerCase();
            return students.filter(function(s) {
                return s.name.toLowerCase().indexOf(term) !== -1 ||
                       s.email.toLowerCase().indexOf(term) !== -1;
            });
        }
    };
}]);
