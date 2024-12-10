function HTMLattributeInput()
{
	////////////////
	// Attributes //
	////////////////
	
	var html = '<div style="text-align: left;" ><input id="name" type="text" placeholder="Name" /></div>'
				+ '<div><input id="value" type="text" placeholder="Value" /></div>'
				+ '<div id="delete" style="width: 10%; text-align: right;" ></div>';
	
	var listItem = new ListItem(html);
	
	var closeIcon = Loader.getSVG('icons', 'close-icon', 18, 18);
	listItem.getById('delete').appendChild(closeIcon);
	
	/////////////
	// Methods //
	/////////////
	
	this.loadFromJSON = function($json)
	{
		if (utils.isset($json.name))
			listItem.getById('name').value = $json.name;
		
		if (utils.isset($json.value))
			listItem.getById('value').value = $json.value;
	};
	
	this.loadFromHTML = function($html)
	{
		listItem.getById('name').value = $html.name;
		listItem.getById('value').value = $html.value;
	};
	
	/////////////////
	// Init events //
	/////////////////
	
	this.onChange = function() {};
	
	listItem.getById('name').onChangeDelay = 1000;
	listItem.getById('name').onChange = function() { $this.onChange(); };
	
	listItem.getById('value').onChangeDelay = 1000;
	listItem.getById('value').onChange = function() { $this.onChange(); };
	
	closeIcon.onClick = function()
	{
		$this.getParent().removeElement($this);
		$this.onChange();
	};
	
	closeIcon.onMouseDown = function() {};
	closeIcon.onMouseUp = function() {};
	
	///////////////////////
	// Getters & Setters //
	///////////////////////

	// GET
	
	this.getName = function() { return listItem.getById('name').value; };
	this.getValue = function() { return listItem.getById('value').value; };
	
	this.getJSON = function()
	{
		var jsonObject = 
		{
			name: listItem.getById('name').value,
			value: listItem.getById('value').value
		};
		
		return jsonObject;
	};
	
	////////////
	// Extend //
	////////////
	
	var $this = utils.extend(listItem, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("htmlAttributeInput");