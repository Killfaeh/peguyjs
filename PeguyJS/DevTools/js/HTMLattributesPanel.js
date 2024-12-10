function HTMLattributesPanel()
{
	////////////////
	// Attributes //
	////////////////
	
	var html = '<div class="htmlAttributesPanel" >'
					+ '<div class="componentVariable" >'
						+ '<input type="text" id="componentVariableName" class="componentVariableName" placeholder="Variable name" />'
					+ '</div>'
					+ '<div id="attributes" class="list" ></div>'
					+ '<div id="addAttributeBlock" style="text-align: right;" >'
						+ '<input type="button" id="addAttribute" value="Add attribute" />'
					+ '</div>'
					+ '<div class="textNode" >'
						+ '<textarea id="textNodeContent" class="textNodeContent" placeholder="Text node content" ></textarea>'
					+ '</div>'
				+ '</div>';

	var component = new Component(html);
	
	var attributesListBox = new ListBox();
	attributesListBox.setEditMode(true);
	attributesListBox.onChange = function() { onChange(); };
	component.getById('attributes').appendChild(attributesListBox);

	/////////////
	// Methods //
	/////////////

	this.loadFromJSON = function($json)
	{
		for (var i = 0; i < $json.length; i++)
		{
			var attributeInput = new HTMLattributeInput();
			attributeInput.loadFromJSON($json[i]);
			attributeInput.onChange = function() { $this.onChange(); };
			attributesListBox.addElement(attributeInput);
			attributeInput.getById('name').focus();
		}
	};
	
	this.loadFromHTML = function($html)
	{
		if ($html.nodeType !== Node.TEXT_NODE)
		{
			var attributes = $html.attributes;
			
			if (utils.isset(attributes))
			{
				for (var i = 0; i < attributes.length; i++)
				{
					if (attributes[i].name !== 'style')
					{
						var attributeInput = new HTMLattributeInput();
						attributeInput.loadFromHTML(attributes[i]);
						attributeInput.onChange = function() { $this.onChange(); };
						attributesListBox.addElement(attributeInput);
						attributeInput.getById('name').focus();
					}
				}
			}
		}
	};
	
	this.addAttributeInput = function($attributeInput)
	{
		$attributeInput.onChange = function() { $this.onChange(); };
		attributesListBox.addElement($attributeInput);
	};
	
	this.addAttribute = function()
	{
		var attributeInput = new HTMLattributeInput();
		attributeInput.onChange = function() { $this.onChange(); };
		attributesListBox.addElement(attributeInput);
		attributeInput.getById('name').focus();
	};
	
	/////////////////
	// Init events //
	/////////////////
	
	this.onChange = function() {};
	
	component.getById('addAttribute').onClick = function() { $this.addAttribute(); };
	
	component.getById('textNodeContent').onChangeDelay = 1000;
	component.getById('textNodeContent').onChange = function() { $this.onChange(); };

	///////////////////////
	// Getters & Setters //
	///////////////////////

	// GET

	this.getClass = function()
	{
		var className = '';
		var attributes = attributesListBox.getElementsList();
		
		for (var i = 0; i < attributes.length; i++)
		{
			var attribute = attributes[i];
			var name = attribute.getName();
			var value = attribute.getValue();
			
			if (name === 'class')
			{
				className = value;
				i = attributes.length;
			}
		}
		
		return className;
	};

	this.getJSON = function()
	{
		var jsonObject = [];
		
		var attributes = attributesListBox.getElementsList();
		
		for (var i = 0; i < attributes.length; i++)
			jsonObject.push(attributes[i].getJSON());
		
		return jsonObject;
	};
	
	this.getCode = function()
	{
		var code = '';
		
		var attributes = attributesListBox.getElementsList();
		
		for (var i = 0; i < attributes.length; i++)
		{
			var attribute = attributes[i];
			var name = attribute.getName();
			var value = attribute.getValue();
			
			if (utils.isset(name) && name !== '' && utils.isset(value) && value !== '')
				code = code + name + '="' + value + '" ';
		}
		
		if (code === '')
			code = component.getById('textNodeContent').value;
		
		return code;
	};
	
	this.getTextNodeContent = function() { return component.getById('textNodeContent').value; };
	this.getComponentVariableName = function() { return component.getById('componentVariableName').value; };
	
	this.getAttributeValue = function($name)
	{
		var value = null;
		
		var attributes = attributesListBox.getElementsList();
		
		for (var i = 0; i < attributes.length; i++)
		{
			if (attributes[i].getById('name').value === $name)
			{
				value = attributes[i].getById('value').value;
				i = attributes.length;
			}
		}
		
		return value;
	};

	// SET

	////////////
	// Extend //
	////////////

	var $this = utils.extend(component, this);
	return $this;
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("htmlAttributesPanel");
