/**
 * Basic jQuery calendar plugin
 * 
 * @description Using custom stylesheet from blog http://css-tricks.com/elastic-calendar-styling-with-pure-css/
 * @thank Chris Coyier
 * @type {[type]}
 */
;(function($){
	
	/**
	 * Get first date of month
	 * @type {[type]}
	 */
	Date.prototype.getFirstDateOfMonth = function() {
		return new Date(this.getFullYear(), this.getMonth(), 1);
	}

	/**
	 * Get last date of month
	 * @type {[type]}
	 */
	Date.prototype.getLastDateOfMonth = function(first_argument) {
		return new Date(this.getFullYear(), this.getMonth() + 1, 0);
	};

	/**
	 * Base calendar define
	 * @param $ {jQuery dom wrapper object}
	 * @param {Object} options Calendar options
	 */
	var Calendar = function(object, options) {
		// Default options
		var _options = {
			date: new Date()
		};

		this.options = $.extend({}, _options, options);
		this.object = object;
	};

	// Calendar config
	Calendar.config = {
		ns: 'cld',
		weeks: 6
	};

	// Calendar template
	Calendar.tmpl = {
		layout: '<ol class="calendar"></ol>',
		lastMonth: '<li id="lastmonth" class="lastMonth"><ul></ul></li>',
		thisMonth: '<li id="thismonth" class="thisMonth"><ul></ul></li>',
		nextMonth: '<li id="nextmonth" class="nextMonth"><ul></ul></li>'
	}

	/**
	 * Get month as string
	 * @type {[type]}
	 */
	Calendar.prototype.getDateAsString = function(format) {
		return this.options.date.toDateString();
	}

	/**
	 * Get current year
	 * @type {[type]}
	 */
	Calendar.prototype.getYear = function() {
		return this.options.date.getFullYear();
	}

	/**
	 * Get current month
	 * @type {[type]}
	 */
	Calendar.prototype.getMonth = function() {
		return this.options.date.getMonth();
	}

	/**
	 * Get current day
	 * @type {[type]}
	 */
	Calendar.prototype.getDay = function() {
		return this.options.date.getDay();
	}

	/**
	 * Get current date
	 * @type {[type]}
	 */
	Calendar.prototype.getDate = function() {
		return this.options.date.getDate();
	}

	/**
	 * Get last date of month
	 * @type {[type]}
	 */
	Calendar.prototype.getLastDateOfMonth = function() {
		return this.options.date.getLastDateOfMonth();
	}

	/**
	 * Get first date of month
	 * @type {[type]}
	 */
	Calendar.prototype.getFirstDateOfMonth = function() {
		return this.options.date.getFirstDateOfMonth();
	}

	/**
	 * Initialized calendar object
	 * @type {[type]}
	 */
	Calendar.prototype.initialize = function() {
		this.calendarView = $(Calendar.tmpl.layout);
		this.lastMonthView = $(Calendar.tmpl.lastMonth);
		this.thisMonthView = $(Calendar.tmpl.thisMonth);
		this.nextMonthView = $(Calendar.tmpl.nextMonth);
	};

	/**
	 * [render description]
	 * @type {[type]}
	 */
	Calendar.prototype.render = function() {
		// Prepare calendar layout
		this._prepareLayout();
		// Render calendar
		this._renderLastMonth();
		this._renderThisMonth();
		this._renderNextMonth();
	}

	Calendar.prototype.changeMonth = function(date) {
		this.options.date = date;
		this.initialize();
		this.render();
	}

	Calendar.prototype.showNextMonth = function() {
		var nextMonth = new Date(this.getYear(), this.getMonth() + 1, 1);
		this.changeMonth(nextMonth);
	}

	Calendar.prototype.showPrevMonth = function() {
		var prevMonth = new Date(this.getYear(), this.getMonth() - 1, 1);
		this.changeMonth(prevMonth);
	}

	/**
	 * Prepare calendar layout
	 * @type {[type]}
	 */
	Calendar.prototype._prepareLayout = function() {
		this.object.html(this.calendarView);
		this.calendarView.append(this.lastMonthView);
		this.calendarView.append(this.thisMonthView);
		this.calendarView.append(this.nextMonthView);
	}

	/**
	 * Render the days of last month
	 * @type {[type]}
	 */
	Calendar.prototype._renderLastMonth = function() {
		var firstDate = this.getFirstDateOfMonth(),
			date = Date.now(),
			day = firstDate.getDay();

		for(var i = day*(-1) + 1; i <= 0; i++) {
			date = new Date(this.getYear(), this.getMonth(), i);
			this._renderADay(this.lastMonthView, date, {});
		}
	}

	/**
	 * Render the days of current month
	 * @type {[type]}
	 */
	Calendar.prototype._renderThisMonth = function() {
		var lastDate = this.getLastDateOfMonth(),
			date = Date.now();

		for(var i = 1; i <= lastDate.getDate(); i++) {
			date = new Date(this.getYear(), this.getMonth(), i);
			this._renderADay(this.thisMonthView, date, {});
		}
	}

	/**
	 * Render the days of next month
	 * @type {[type]}
	 */
	Calendar.prototype._renderNextMonth = function() {
		var firstDate = this.getFirstDateOfMonth(),
			lastDate =  this.getLastDateOfMonth();
		// Get next days of next month
		var days = (Calendar.config.weeks * 7) - (firstDate.getDay() + lastDate.getDate()),
			date = Date.now();

		for(var i = 1; i <= days; i++) {
			date = new Date(this.getYear(), this.getMonth() + 1, i);
			this._renderADay(this.nextMonthView, date, {});
		}
	}

	/**
	 * Render a day
	 * @type {[type]}
	 */
	Calendar.prototype._renderADay = function(monthView, date, data) {
		monthView.find('ul').append('<li>'+date.getDate()+'</li>');
	}

	// Jquery plugin define
	$.fn.Calendar = function(options) {
		var calendar = $(this).data(Calendar.config.ns);

		if(typeof calendar === 'undefined') {
			calendar = new Calendar(this, options);

			calendar.initialize();
			calendar.render();

			$(this).data(Calendar.config.ns, calendar);
		}

		return calendar;
	};

})(jQuery);