/**
 * Custom Filters for AngularJS Application
 */

/**
 * Phone Format Filter
 * Formats phone numbers to (XXX) XXX-XXXX format
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
 * GPA Status Filter
 * Converts GPA score to descriptive status
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

/**
 * Class Name Filter
 * Formats class names (10th -> 10th Class)
 */
app.filter('className', function() {
    return function(input) {
        if (!input) return input;
        return input + ' Class';
    };
});

/**
 * Age Calculator Filter
 * Calculates age from date of birth
 */
app.filter('calculateAge', function() {
    return function(dob) {
        if (!dob) return 'N/A';
        var birthDate = new Date(dob);
        var today = new Date();
        var age = today.getFullYear() - birthDate.getFullYear();
        var monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age + ' years';
    };
});
