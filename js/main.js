$(document).ready(function() {

  // Variables
  var $nav = $('nav'),
      $body = $('body'),
      $window = $(window),
      navOffsetTop = $nav.offset().top,
      $document = $(document),
      entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
      }

  function init() {
    $window.on('scroll', onScroll);
    $window.on('resize', resize);
    $('a[href^="#"]').on('click', smoothScroll);
    $(".nav-container ul li a").on('click', toggleResponsiveMenu);
    createSchedule();
  }

  function smoothScroll(e) {
    e.preventDefault();
    $document.off("scroll");

    var target = this.hash,
        menu = target,
        width = window.innerWidth,
        offset = $(target).offset().top;
    
    if (width < 576) {
      offset -= 15;
    } else if (width < 768) {
      offset -= 40;
    } else if (width < 992) {
      offset -= 60;
    } else {
      offset -= 125;
    }

    $target = $(target);
    $('html, body').animate({ 'scrollTop': offset }, 1000, 'swing', function () {
        $document.on("scroll", onScroll);
    });
  }

  function resize() {
    $body.removeClass('has-docked-nav');
    navOffsetTop = $nav.offset().top;
    onScroll();
  }

  function onScroll() {
    if(navOffsetTop < $window.scrollTop() && !$body.hasClass('has-docked-nav')) {
      $body.addClass('has-docked-nav')
    };
    if(navOffsetTop > $window.scrollTop() && $body.hasClass('has-docked-nav')) {
      $body.removeClass('has-docked-nav')
    };
  }

  function toggleResponsiveMenu() {
    var nav = document.getElementById("nav");
    if (nav.checked == true) {
      nav.checked = false
    }; 
  }

  function createSchedule() {
    const scheduleDiv = document.getElementById("schedule-container");
    if (!scheduleDiv) return;

    const h2 = document.createElement('h2');
    h2.classList.add('body-header');
    h2.id = "upcoming-schedule";
    h2.innerText = "Upcoming schedule";

    scheduleDiv.appendChild(h2);

    const STATUS = {
      MEETING: 'Meeting',
      CANCELLED: 'Cancelled',
      SPECIAL: 'Special'
    }

    const dates = [
      createScheduleDate('2024-12-31'),
      createScheduleDate('2025-01-07'),
      createScheduleDate('2025-01-14'),
      createScheduleDate('2025-01-21'),
      createScheduleDate('2025-01-28'),
      createScheduleDate('2025-02-04'),
      createScheduleDate('2025-02-11'),
      createScheduleDate('2025-02-18'),
      createScheduleDate('2025-02-25'),
      createScheduleDate('2025-03-04'),
      createScheduleDate('2025-03-11'),
      createScheduleDate('2025-03-18'),
      createScheduleDate('2025-03-25'),
      createScheduleDate('2025-04-01'),
      createScheduleDate('2025-04-08'),
      createScheduleDate('2025-04-15'),
      createScheduleDate('2025-04-22', STATUS.CANCELLED, 'University is closed'),
      createScheduleDate('2025-04-29', STATUS.SPECIAL, 'Annual General Meeting<br>Playing as usual afterwards'),
      createScheduleDate('2025-05-06'),
      createScheduleDate('2025-05-13'),
      createScheduleDate('2025-05-20'),
      createScheduleDate('2025-05-27'),
      createScheduleDate('2025-06-03'),
      createScheduleDate('2025-06-10'),
      createScheduleDate('2025-06-17'),
      createScheduleDate('2025-06-24'),
      createScheduleDate('2025-07-01'),
      createScheduleDate('2025-07-08'),
      createScheduleDate('2025-07-15'),
      createScheduleDate('2025-07-22'),
      createScheduleDate('2025-07-29'),
      createScheduleDate('2025-08-05'),
      createScheduleDate('2025-08-12'),
      createScheduleDate('2025-08-19'),
      createScheduleDate('2025-08-26'),
      createScheduleDate('2025-09-02'),
      createScheduleDate('2025-09-09'),
      createScheduleDate('2025-09-16'),
      createScheduleDate('2025-09-23'),
      createScheduleDate('2025-09-30'),
      createScheduleDate('2025-10-07'),
      createScheduleDate('2025-10-14'),
      createScheduleDate('2025-10-21'),
      createScheduleDate('2025-10-28'),
      createScheduleDate('2025-11-04'),
      createScheduleDate('2025-11-11'),
      createScheduleDate('2025-11-18'),
      createScheduleDate('2025-11-25'),
      createScheduleDate('2025-12-02'),
      createScheduleDate('2025-12-09'),
      createScheduleDate('2025-12-16'),
      createScheduleDate('2025-12-23'),
      createScheduleDate('2025-12-30'),
    ]

    const dateList = document.createElement('ol');
    dateList.classList.add('schedule-list');
    scheduleDiv.appendChild(dateList);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    for (const date of dates) {
      if (date.date < yesterday)
        continue;

      if (dateList.childElementCount >= 4)
        break;

      const li = document.createElement('li');

      if (date.status === STATUS.CANCELLED) {
        li.classList.add('schedule-list--cancelled');
      } else if (date.status === STATUS.SPECIAL) {
        li.classList.add('schedule-list--special');
      }

      const dateDiv = document.createElement('div');
      dateDiv.classList.add('schedule-list__date');
      dateDiv.innerHTML = date.date.toDateString();

      const statusDiv = document.createElement('div');
      statusDiv.classList.add('schedule-list__status');
      statusDiv.innerHTML = date.status + '<br>' + date.message;

      li.appendChild(dateDiv);
      li.appendChild(statusDiv);
      dateList.appendChild(li);
    }

    if (dateList.childElementCount > 0) {
      // Don't show schedule if there aren't any sessions scheduled
      scheduleDiv.removeAttribute('hidden');
    }
    
    function createScheduleDate(dateString, status = STATUS.MEETING, message = '') {
      return {
        date: new Date(dateString),
        status: status,
        message: message,
      }
    }
  }

  init();

});
