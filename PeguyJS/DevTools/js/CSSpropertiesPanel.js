function CSSpropertiesPanel()
{
	////////////////
	// Attributes //
	////////////////
	
	var html = '<div class="cssPropertiesPanel" >'
					+ '<div id="cssProperties" class="list" ></div>'
					+ '<div style="text-align: right;" >'
						+ '<input type="button" id="addCssProperty" value="Add CSS property" />'
					+ '</div>'
				+ '</div>';

	var component = new Component(html);
	
	var cssPropertiesListBox =  new ListBox();
	cssPropertiesListBox.setEditMode(true);
	cssPropertiesListBox.onChange = function() { onChange(); };
	component.getById('cssProperties').appendChild(cssPropertiesListBox);

	/////////////
	// Methods //
	/////////////

	this.loadFromJSON = function($json)
	{
		for (var i = 0; i < $json.length; i++)
		{
			var propertyInput = new HTMLattributeInput();
			propertyInput.loadFromJSON($json[i]);
			propertyInput.onChange = function() { $this.onChange(); };
			cssPropertiesListBox.addElement(propertyInput);
			propertyInput.getById('name').focus();
		}
	};
	
	this.loadFromHTML = function($html)
	{
		var attributes = $html.attributes;
		
		if (utils.isset(attributes))
		{
			for (var i = 0; i < attributes.length; i++)
			{
				if (attributes[i].name === 'style')
				{
					/*
					var attributeInput = new HTMLattributeInput();
					attributeInput.loadFromHTML(attributes[i]);
					attributeInput.onChange = function() { $this.onChange(); };
					attributesListBox.addElement(attributeInput);
					attributeInput.getById('name').focus();
					//*/
				}
			}
		}
	};
	
	this.addProperty = function()
	{
		var propertyInput = new HTMLattributeInput();
		propertyInput.onChange = function() { $this.onChange(); };
		cssPropertiesListBox.addElement(propertyInput);
		propertyInput.getById('name').focus();
	};
	
	/////////////////
	// Init events //
	/////////////////
	
	this.onChange = function() {};
	
	component.getById('addCssProperty').onClick = function() { $this.addProperty(); };

	///////////////////////
	// Getters & Setters //
	///////////////////////

	// GET

	this.getJSON = function()
	{
		var jsonObject = [];
		
		var properties = cssPropertiesListBox.getElementsList();
		
		for (var i = 0; i < properties.length; i++)
			jsonObject.push(properties[i].getJSON());
		
		return jsonObject;
	};
	
	this.getCode = function()
	{
		var properties = cssPropertiesListBox.getElementsList();
		
		var code = '';
		
		if (properties.length > 0)
		{
			code = '{\n';
			
			for (var i = 0; i < properties.length; i++)
			{
				var property = properties[i];
				var name = property.getName();
				var value = property.getValue();
				
				if (utils.isset(name) && name !== '' && utils.isset(value) && value !== '')
					code = code + '	' + name + ': ' + value + ';\n';
			}
			
			code = code + '}\n\n';
		}
		
		return code;
	};

	// SET

	////////////
	// Extend //
	////////////

	var $this = utils.extend(component, this);
	return $this;
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("cssPropertiesPanel");
