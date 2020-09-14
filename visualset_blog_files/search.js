function paramSelect(span)
{
    var span = $(span);
    
    // deselect group if group is not gender
    var group = span.parents('.group');
    if (!group.find('#male').length) {
        deselectGroup(group);
    }
    
    var selected = span.prev();
    if (span.is('.checked')) {
        selected = span;
        span = span.next();
    }
    var input = span.next();
    input.attr('value', '1');
    selected.removeClass('hidden');
    span.addClass('hidden');
    
    // submit form after param selecting
    doSearch();
}

function deselectGroup(group)
{
    group.find('input').attr('value', '');
    group.find('.image').removeClass('hidden');
    group.find('.checked').addClass('hidden');
}

function paramDeselect(span)
{
    var span = $(span);

    // cannot deselect if only one item in group selected
    var group = span.parents('.group');
    var count = group.find('.checked').size() - group.find('.checked.hidden').size();
    if (count == 1) {
        return;
    }

    // deselect item
    var notSelected = span.next();
    var input = notSelected.next();
    span.addClass('hidden');
    notSelected.removeClass('hidden');
    input.attr('value', '');
    
    // submit form after param deselecting
    doSearch();
}

function enableSection(objectType)
{
    var input = $('#' + objectType);

        var searchPanel = $('.contentpane_search');
        searchPanel.find('input:radio').attr('checked', false);
        searchPanel.find('.text').addClass('not_active');
        searchPanel.find('.image').addClass('image_hidden');
        searchPanel.find('.image_activate').removeClass('hidden');
        searchPanel.find('select').attr('disabled', true);
        
        for (var i = 1; i < 4; i++) {
            block = $('#' + objectType + '_block' + i);
	        if (block.attr('class') == null) {
	            break;
	        }
	        block.find('input').attr('checked', true);
	        block.find('.image').removeClass('image_hidden');
	        block.find('.image_activate').addClass('hidden');
	        block.find('.text').removeClass('not_active');
	        block.find('select').attr('disabled', false);
        }
        
        $('#cam_block').find('.image').removeClass('image_hidden');
        $('#cam_block').find('.image_activate').addClass('hidden');
        
    // submit form
    doSearch();
}

function selectColor(color)
{
    var div = $('#color' + color);
    var group = div.parents('.colors').find('div').removeClass('active');
    div.addClass('active');
    $('#settings_color').attr('value', color);
    $('#settingsForm').submit();
}

function selectSetting(param, value)
{
    $('#settings_' + param).find('.checked').addClass('hidden').next().removeClass('hidden');
    span = $('#settings_' + param + '_' + value);
    span.addClass('hidden').prev().removeClass('hidden');
    var input = span.parent().find('input');
    input.attr('value', value);
    $('#settingsForm').submit();
}

function setImageType(radio, inputId)
{
    var valueInput = $('#' + inputId);
    
    if (valueInput.length == 1) {
        var value = valueInput.attr('value') == '1' ? '' : '1';
        
        // cannot deselect both
        if (value == '' && ($('#photo').attr('value') == '' || $('#outline').attr('value') == '')) {
            return;
	    }
	    
	    valueInput.attr('value', value);
        radio.checked = value ? true : false;
        
        // submit form
        doSearch();
    }
}

function doSearch()
{
	
    $.post('/index.php?option=com_catalog&ajax=1&',
        $('#search').serialize(),
        function(data) {
		    $('#catalogBody').html(data);
        }
    );
}