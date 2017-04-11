/**
 * Created by admin on 2017/4/11.
 */
function countdown() {
    var endDate = new Date("2017", "03", "29", "17", "58", "00");
    var nowDate = new Date();
    var leftTime = (endDate.getTime() - nowDate.getTime()) / 1000;
    var leftDay = parseInt(leftTime / (24 * 60 * 60));
    var leftHour = parseInt((leftTime - leftDay * (24 * 60 * 60)) / (60 * 60));
    var leftMinute = parseInt((leftTime - leftDay * (24 * 60 * 60) - leftHour * (60 * 60)) / (60));
    var leftSecond = parseInt((leftTime - leftDay * (24 * 60 * 60) - leftHour * (60 * 60) - leftMinute * 60));
    var day1 = $("#left-day1 > div")[0];
    var day2 = $("#left-day2 > div")[0];
    var hour1 = $("#left-hour1 > div")[0];
    var hour2 = $("#left-hour2 > div")[0];
    var minute1 = $("#left-minute1 > div")[0];
    var minute2 = $("#left-minute2 > div")[0];
    var second1 = $("#left-second1 > div")[0];
    var second2 = $("#left-second2 > div")[0];
    day1.innerHTML = (parseInt(leftDay / 10));
    day2.innerHTML = (parseInt((leftDay % 10)));
    hour1.innerHTML = (parseInt(leftHour / 10));
    hour2.innerHTML = (parseInt((leftHour % 10)));
    minute1.innerHTML = (parseInt(leftMinute / 10));
    minute2.innerHTML = (parseInt((leftMinute % 10)));
    second1.innerHTML = (parseInt(leftSecond / 10));
    second2.innerHTML = (parseInt((leftSecond % 10)));
}

$(function(){
    var endDate = new Date("2017", "03", "29", "17", "58", "00");
    var nowDate = new Date();
    if (nowDate.getTime() < endDate.getTime()) {
        window.setInterval("countdown()", 1000)
    } else {
        window.clearInterval(int)
    }
})