document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialDate: '2023-04-01',
      editable: true,
      selectable: true,
      businessHours: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: getEventsFromLocalStorage(), // Get events from local storage
      eventColor: '#2A284E',
      eventClick: function(info) {
        info.jsEvent.preventDefault(); // don't let the browser navigate
        if (info.event.url) {
          alert(info.event.url);
          //window.open(info.event.url);
        }
      }
    });
    
    calendar.render();
  
    // Add Event button functionality
    var addEventBtn = document.getElementById('add-event-btn');
    var addEventModal = new bootstrap.Modal(document.getElementById('add-event-modal'));
    var saveEventBtn = document.getElementById('save-event-btn');
    var addEventForm = document.getElementById('add-event-form');
    
    addEventBtn.addEventListener('click', function() {
      addEventModal.show();
    });
  
    saveEventBtn.addEventListener('click', function() {
      var eventData = {};
      var formElements = addEventForm.elements;
      for (var i = 0; i < formElements.length; i++) {
        var element = formElements[i];
        if (element.type !== 'submit') {
          eventData[element.name] = element.value;
        }
      }
      calendar.addEvent({
        title: eventData.title,
        start: eventData.start + 'T' + eventData['start-time'],
        end: eventData.end ? eventData.end + 'T' + eventData['end-time'] : null,
        allDay: false
      });
      addEventModal.hide();
      addEventForm.reset();
  
      // Add the new event to local storage
      var events = getEventsFromLocalStorage();
      var newEvent = {
        title: eventData.title,
        start: eventData.start + 'T' + eventData['start-time'],
        end: eventData.end ? eventData.end + 'T' + eventData['end-time'] : null
      };
      events.push(newEvent);
      localStorage.setItem('events', JSON.stringify(events));
    });
  
    function getEventsFromLocalStorage() {
      var events = JSON.parse(localStorage.getItem('events')) || [];
      return events.map(function(event) {
        return {
          title: event.title,
          start: event.start,
          end: event.end
        };
      });
    }
  });
  