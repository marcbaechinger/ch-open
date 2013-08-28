'use strict';

var input = $("<input type='text' id='input'/>");
var addBtn = $('<a id="addBtn" class="btn btn-primary btn-large" >Add &raquo;</a>');
var todoList = $('<p id="do"> </p>');
$(document.body).append(input);
$(document.body).append(addBtn);
$(document.body).append(todoList);

describe('ToDo List', function(){

    beforeEach(function() {
        // Hack: Firefox does not properly register event handlers when loaded in Jasmine
        if (navigator.userAgent.indexOf("Firefox") != -1 && !$._data($('#addBtn').get(0),'events') ){
            registerButtonHandler();
        }
    });

    afterEach(function() {
        $('#do').empty();
    })

    it('should extend list when adding item ', function() {
        var input = $('input');
        input.val('First ToDo');

        addText();

        var todoList = $('#do h3');
        expect(todoList.length).toBe(1);
        expect(todoList.eq(0).text()).toBe('First ToDo')
    });

    it('should add item when clicking button', function() {

        var input = $('input');
        input.val('First ToDo');

        var addBtn = $('#addBtn');
        addBtn.trigger('click');

        var itemCount = $('#do h3').length;
        expect(itemCount).toBe(1);
    });
});