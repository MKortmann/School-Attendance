/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
  /**If there is nothing in the memory, it initializes it with an randomly
  values*/
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
          /**it returns true or false randomly*/

            return (Math.random() >= 0.5);
        }

        /**Slappy the Frog, Lilly the Lizard, Paulrus the Walrus,
        Gregory the Goat, Adam the Anaconda*/
        var nameColumns = $('tbody .name-col'),
        /**Declaring an empty object literal:*/
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            /**Adding properties using square brackets*/
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
                console.log(attendance[name]);
            }
        });
        /**A common use of JSON is to exchange data to/from a web server.
        When sending data to a web server, the data has to be a string.
        Convert a JavaScript object into a string with JSON.stringify().*/
        localStorage.attendance = JSON.stringify(attendance);
        console.log(localStorage.attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {
  /**extract the values of the local storage*/
    var attendance = JSON.parse(localStorage.attendance),
    /**Extract the values of the missed column*/
        $allMissed = $('tbody .missed-col'),
    /**Extract the values of all the check input boxes from 0 until 59*/
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function() {
          /**The parent() is an inbuilt method in jQuery which is used to find
          the parent element related to the selected element.*/
          /**The select element is the missedColumn. The parent "tr" inspect
          is <tr class="student">*/
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendace records
    /**$.each is A generic iterator function, which can be used to seamlessly
    iterate over both objects and arrays.
    jQuery.each( array, callback )
    array: The array or array-like object to iterate over.
    callback: The function that will be executed on every value.*/
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
        /**.prop()
Categories: Attributes | Manipulation > General Attributes
Get the value of a property for the first element in the set of matched elements or
set one or more properties for every matched element.*/
/**if days[i] is true, it will check the checkbox*/
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
          /**get the first name of this line, ex.: Slappy the Frog*/
            var name = $(this).children('.name-col').text(),
              /**get the checkboxes of this line*/
                $allCheckboxes = $(this).children('td').children('input');
            /**add new array with the line name*/
            newAttendance[name] = [];

            $allCheckboxes.each(function() {
              /**here $(this) is exactly the checkbox*/
              /**$(this).prop("checked"): it returns true if it is checked and
              false if is not checked*/
              /**So, this newAttendance object, with be filled with many arrays.
              Each array willl have the name of the line and the values if it
              is checked or not.*/
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        /**Update the count*/
        countMissing();
        /**update the local storage*/
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
}());
