﻿var cntrlIsPressed = false;

$(document).keydown(function (event) {
    if (event.key === 'Control') {
        cntrlIsPressed = true;
    }
});

$(document).keyup(function () {
    cntrlIsPressed = false;
});

// delete code
$('body').on('contextmenu', 'td', function () {
    if (this.id === '0')
        return;

    $(this).css('background-color', '#32383e');
    $.ajax({
        url: "/Codes/Delete",
        type: "POST",
        data: {
            id: this.id
        },
        done: function (status) {
            document.getElementById("Logs").value = status.statusText;
        }
    });
    window.event.preventDefault();
});

{// add code
    //$('body').on('click', 'td', function () {
    //    $(this).css('background-color', document.getElementById("HexSaver").value);
    //    $.ajax({
    //        url: "/Codes/Create",
    //        type: "POST",
    //        data: {
    //            CountryId: $("#ddlCountries").val(),
    //            NetworkId: document.getElementById("NetworkIdSaver").value,
    //            Zone: document.getElementById("RValue").value,
    //            Value: $(this).text()
    //        }
    //    }).fail(function (status) {
    //        alert(status.statusText);
    //    });
    //});

    //function SendCodesOnBack(codes) {
    //    $.ajax({
    //        url: "/Codes/CreateMulti",
    //        type: "POST",
    //        data: {
    //            CountryId: $("#ddlCountries").val(),
    //            NetworkId: document.getElementById("NetworkIdSaver").value,
    //            Zone: document.getElementById("RValue").value,
    //            Value: codes
    //        },
    //        success: function () {
    //            document.getElementById("Logs").value = "200 OK";
    //        },
    //        error: function (status) {
    //            document.getElementById("Logs").value = status.statusText;
    //        }
    //    });
    //}

    //$(this).css('background-color', document.getElementById("HexSaver").value);
    //$.ajax({
    //    url: "/Codes/CreateMulti",
    //    type: "POST",
    //    data: {
    //        CountryId: $("#ddlCountries").val(),
    //        NetworkId: document.getElementById("NetworkIdSaver").value,
    //        Zone: document.getElementById("RValue").value,
    //        Value: $(this).text()
    //    },
    //    success: function () {
    //        document.getElementById("Logs").value = "200 OK";
    //    },
    //    error: function (status) {
    //        document.getElementById("Logs").value = status.statusText;
    //    }
    //});

    //$('body').on('click', 'td', function () {
    //    var isMouseDown = false;
    //    var codes = [];

    //    $('body td')
    //        .mousedown(function () {
    //            isMouseDown = true;
    //            $(this).css('background-color', document.getElementById("HexSaver").value);
    //            codes.push(this.textContent);
    //            return false;
    //        })
    //        .mouseover(function () {
    //            if (isMouseDown) {
    //                $(this).css('background-color', document.getElementById("HexSaver").value);
    //                codes.push(this.textContent);
    //            }
    //        })
    //        .bind("selectstart", function () {
    //            return false;
    //        })
    //        .mouseup(function () {
    //            isMouseDown = false;
    //            SendCodesOnBack(codes);
    //            codes.length = 0;
    //        });
    //});
}

// select and add column 
$('body').on('click', 'thead th', function () {
    var codes = [];
    var tds = [];
    var flag = false;

    var tbl = this.closest('table');
    var n = parseInt(this.textContent, 10) + 2;
    for (var i = 1; i < tbl.rows.length; ++i) {
        codes.push(tbl.rows[i].cells[n].textContent);
        tds.push(tbl.rows[i].cells[n]);
    }
    SendCodesOnServer(codes, tds, flag);
});

// select and add cell or all cells byctrl pressed
$('body').on('click', 'tbody td', function () {
    var flag;
    var codes = [];
    var tds = [];
    if (cntrlIsPressed === true) {
        flag = true;
        tds = $(this.closest('tbody')).children();
        for (var i = 0; i < tds.length; ++i) {
            for (var j = 2; j < 12; ++j) {
                codes.push(tds[i].cells[j].textContent);
            }
        }
        SendCodesOnServer(codes, tds, flag);
    }
    else {
        flag = false;
        tds.push(this);
        codes.push(this.textContent);
        SendCodesOnServer(codes, tds, flag);
    }
});

// select and add row
$('body').on('click', 'tbody th', function () {
    var codes = [];
    var tds = [];
    var flag = false;
    codes.push(this.textContent);
    tds = $(this).parent().children('td');
    for (var i = 0; i < tds.length; ++i) {
        codes.push(tds[i].textContent);
    }

    SendCodesOnServer(codes, tds, flag);
});

function SendCodesOnServer(codes, tds, isTwoDemenArr) {
    $.ajax({
        url: "/Codes/CreateMulti",
        type: "POST",
        data: {
            CountryId: $("#ddlCountries").val(),
            NetworkId: document.getElementById("NetworkIdSaver").value,
            Zone: document.getElementById("RValue").value,
            Value: codes
        },
        success: function () {
            if (isTwoDemenArr) {
                OnSuccessTwoDimenArray(tds);
            } else {
                OnSuccessArray(tds);
            }
            document.getElementById("Logs").value = "200 OK";
        },
        error: function (status) {
            document.getElementById("Logs").value = status.statusText;
        }
    });
}

function OnSuccessTwoDimenArray(tds) {
    if (tds.length > 0) {
        for (var i = 0; i < tds.length; ++i) {
            for (var j = 2; j < 12; ++j) {
                $(tds[i].cells[j]).css('background-color', document.getElementById("HexSaver").value);
            }
        }
    }
}

function OnSuccessArray(tds) {
    if (tds.length > 0) {
        for (var i = 0; i <= tds.length; ++i) {
            $(tds).css('background-color', document.getElementById("HexSaver").value);
        }
    }
}