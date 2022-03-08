$(document).ready(function(){

// function add Input  information
var stt = 0;
    function addScore() {
        stt++;
        let name = $("#name").val();
        let mathScore = $("#mathScore").val();
        let phyScore = $("#phyScore").val();
        let cheScore = $("#cheScore").val();
        //Return Value to ""
        $("#name").val("");
        $("#mathScore").val("");
        $("#phyScore").val("");
        $("#cheScore").val("");
        // Append th td
        $("#table-body").append(`
    <tr>
	    <td>${stt}</td>
        <td>${name}</td>
	    <td>${mathScore}</td>
	    <td>${phyScore}</td>
	    <td>${cheScore}</td>
        <td>?</td>
    </tr>`);
    }


// function delete student 
function deleteStudent() {
    let sttDelete = $("#sttDelete").val();
    $("#sttDelete").val("");
    let tr = $("#table-body tr");
    tr.eq(sttDelete- 1).remove();
    stt--;

    tr.$("#table-body tr");
    tr.each(function(i){
        $(this).find("td:first").text(i+1);
    });

}
// function calculate Score
function calculateScore() {
    let tr = $("#table-body tr");
    tr.each(function(){
        let td = $(this).find("td");
        let score = (parseFloat(td.eq(2).text()) + parseFloat(td.eq(3).text()) + parseFloat(td.eq(4).text())) / 3;
        td.eq(5).text(score.toFixed(1));
    })
}
// function check good student
function checkGoodStudent() {
    calculateScore();
    let tr = $("#table-body tr");
    tr.each(function () {
        let score = parseFloat($(this).find("td:last").text());
        if (score >= 8.0) {
            $(this).addClass("redColor");
        }
    })
}

// Validate name
function validateName() {
    let check =true;
    let regex = /[\~\!\@\#\$\%\^\&\*\(\)\_\+\=\-\*\<\>\,\;\:\'\"\/0-9]+/
    let nameValue = document.getElementById("name").value.trim();
    if (nameValue=="" || regex.test(nameValue)==true) {
        check = false;
    }
    return check;
}

// Validate score 
function validateScore(object) {
    let check = true;
    let value = $(object).val();
    if (value == "" || isNaN(value) || parseFloat(value) > 10 || parseFloat(value) < 0) {
        check = false;
    }
    return check;
}

// Validate serial 
function validateSerial() {
    let testScore = $("#table-body tr")
    let check = true;
    let value = $("#sttDelete").val();
    if (value == "" || isNaN(value) || parseInt(value) > testScore.length || value <= 0) {
        check = false;
    }
    return check;
}


// OnClick button input
var btn = $("#myButton");
    btn.on({
        click: function () {
            let check = true;
            // Check name
            if (validateName() == false) {
                $("#fail0").css("display", "block");
                check = false;
            };
            // Check score
            let selectScore = $('input[id*="Score"]');
            selectScore.each(function (i, element) {
                if (validateScore(element) == false) {
                    let fail = "#fail" + (i + 1);
                    $(fail).css("display", "block");
                    check = false;
                }
            })
            // After check
            if (check == true) {
                addScore();
            }

        }
    });
// Onclick calculator score button
$("#myButton1").click(calculateScore);

// Onclick button check good student
$("#myButton2").click(checkGoodStudent);

// Onclick delete button
$("#buttonDelete").click(function(){
    if(validateSerial()== false){
        $("#fail0").css("display","block");
    } else{
        deleteStudent();
    }
})

// OnBLur and Onfocus
// OnBLur and Onfocus name 
$("#name").on({
    focus: function() {
        $("#fail0").css("display","none");
    },
    blur: function() {
        if (validateName()== false ){
            $("#fail0").css("display","block");
        }
    }
});

// OnBLur and Onfocus score 
var selectScore = $('input[id*="Score"');
selectScore.each(function(i, element){
    let fail= "#fail"+ (i+1);
    $(element).on({
        focus: function() {
            $(fail).css("display", "none");
        },
        blur: function() {
            if (validateScore(element) == false){
                $(fail).css("display", "block");
            }
        }
    })
});
// OnBLur and Onfocus STT delete 
$("#sttDelete").on({
    focus: function(){
        $("#fail4").css("display", "none");

    },
    blur: function() {
        if(validateSerial() == false){
            $("#fail4").css("display", "block");
        }
    }
})
})