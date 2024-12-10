function FieldInput()
{
	////////////////
	// Attributes //
	////////////////
	
	var html = '<div><input id="name" type="text" placeholder="Name" /></div>'
				+ '<div><input id="label" type="text" placeholder="Label" /></div>'
				+ '<div>'
					+ '<select id="type" >'
						+ '<option value="text" >Text</option>'
						+ '<option value="textarea" >Textarea</option>'
						+ '<option value="number" >Number</option>'
						+ '<option value="date" >Date</option>'
						+ '<option value="file" >File</option>'
						+ '<option value="checkbox" >Check box</option>'
						//+ '<option value="radio" >Radio</option>'
						+ '<option value="slider" >Slider</option>'
						+ '<option value="switch" >Switch</option>'
						+ '<option value="combobox" >Combo box</option>'
						+ '<option value="autocomplete" >Auto complete</option>'
						+ '<option value="autocompletekeyvalue" >Auto complete, key =&gt; value</option>'
						+ '<option value="labelslist" >Labels list</option>'
					+ '</select>'
				+ '</div>'
				+ '<div><input id="default" type="text" placeholder="Default value" /></div>'
				//+ '<div id="constructorParam" style="width: 9%; text-align: center;" ></div>'
				+ '<div id="doc" style="width: 3.3%; text-align: right;" ></div>'
				+ '<div id="delete" style="width: 3.3%; text-align: right;" ></div>';
	
	// '<optgroup label="Characters" >'
	
	var listItem = new ListItem(html);
	
	//var isConstructorParamInput = new CheckBox(false, 18);
	//listItem.getById('constructorParam').appendChild(isConstructorParamInput);
	
	var docIcon = Loader.getSVG('icons', 'doc-icon', 18, 18);
	listItem.getById('doc').appendChild(docIcon);
	
	var closeIcon = Loader.getSVG('icons', 'close-icon', 18, 18);
	listItem.getById('delete').appendChild(closeIcon);
	
	var doc = "";
	
	/////////////
	// Methods //
	/////////////
	
	this.loadFromJSON = function($json)
	{
		if (utils.isset($json.name))
			listItem.getById('name').value = $json.name;

		if (utils.isset($json.label))
			listItem.getById('label').value = $json.label;
		
		if (utils.isset($json.default))
			listItem.getById('default').value = $json.default;
		
		if (utils.isset($json.type))
			listItem.getById('type').value = $json.type;
		
		//if (utils.isset($json.isConstructorParam) && $json.isConstructorParam === true)
		//	isConstructorParamInput.setChecked(true);
		
		if (utils.isset($json.doc))
			doc = $json.doc;
	};
	
	/////////////////
	// Init events //
	/////////////////
	
	this.onChange = function() {};
	
	listItem.getById('name').onChangeDelay = 1000;
	listItem.getById('name').onChange = function() { $this.onChange(); };

	listItem.getById('label').onChangeDelay = 1000;
	listItem.getById('label').onChange = function() { $this.onChange(); };
	
	listItem.getById('type').onMouseDown = function() {};
	listItem.getById('type').onMouseUp = function() {};
	
	listItem.getById('type').onChange = function() { $this.onChange(); };
	listItem.getById('type').onchange = function() { $this.onChange(); };
	
	listItem.getById('default').onChangeDelay = 1000;
	listItem.getById('default').onChange = function() { $this.onChange(); };
	
	//isConstructorParamInput.onChange = function() { $this.onChange(); };
	
	docIcon.onClick = function()
	{
		var popupHTML = '<div>'
							+ '<h4 style="margin-top: 0px; font-size: 1.1em;" >' + "Attribute documentation" + '</h4>'
							+ '<div>'
								+ '<textarea id="contenu" style="width: 400px; height: 200px; resize: none; font-family: Arial;" >' + doc + '</textarea>'
							+ '</div>'
						+ '</div>';
		
		var popupModifier = new ConfirmPopup(popupHTML, false);
		
		popupModifier.onOk = function()
		{
			doc = popupModifier.getById('contenu').value;
			return true;
		};
		
		document.getElementById('main').appendChild(popupModifier);
	};
	
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
	this.getLabel = function() { return listItem.getById('label').value; };
	this.getDefaultValue = function() { return listItem.getById('default').value; };
	this.getType = function() { return listItem.getById('type').value; };
	//this.isConstructorParam = function() { return isConstructorParamInput.isChecked(); };

	this.getHTML = function()
	{
		var htmlCode = '';

		var name = listItem.getById('name').value;
		var label = listItem.getById('label').value;
		var type = listItem.getById('type').value;
		var defaultValue = listItem.getById('default').value;

		if (utils.isset(name) && name !== '')
		{
			htmlCode = "						+ '<tr>'\n"
							+ "							+ '<td class=\"label\" >" + listItem.getById('label').value + "</td>'\n";

			if (type === 'text')
				htmlCode = htmlCode + "							+ '<td id=\"" + name + "Cell\" ><input id=\"" + name + "\" type=\"text\" placeholder=\"" + label + "\" value=\"" + defaultValue + "\" /></td>'\n";
			else if (type === 'number')
				htmlCode = htmlCode + "							+ '<td id=\"" + name + "Cell\" ><input id=\"" + name + "\" type=\"number\" value=\"" + defaultValue + "\" /></td>'\n";
			// Faudra faire une distinction mobile/classic
			else if (type === 'date')
				htmlCode = htmlCode + "							+ '<td id=\"" + name + "Cell\" ><input id=\"" + name + "\" type=\"date\" value=\"" + defaultValue + "\" /></td>'\n";
			else if (type === 'file')
				htmlCode = htmlCode + "							+ '<td id=\"" + name + "Cell\" ><input id=\"" + name + "\" type=\"file\" /></td>'\n";
			else
				htmlCode = htmlCode + "							+ '<td id=\"" + name + "Cell\" ></td>'\n";

			htmlCode = htmlCode + "						+ '</tr>'\n";
		}

		return htmlCode;
	};
	
	this.getJSON = function()
	{
		var jsonObject = 
		{
			name: listItem.getById('name').value,
			default: listItem.getById('default').value,
			type: listItem.getById('type').value,
			isConstructorParam: isConstructorParamInput.isChecked(),
			doc: doc
		};
		
		return jsonObject;
	};
	
	this.getHTMLdoc = function()
	{
		var docCode = '';
		
		docCode = docCode + '		<tr>\n';
		docCode = docCode + '			<td>\n';
		
		if (listItem.getById('type').value === 'List')
			docCode = docCode + '				<pre><code class="javascript" >var ' + listItem.getById('name').value + 'List</code></pre>\n';
		else
			docCode = docCode + '				<pre><code class="javascript" >var ' + listItem.getById('name').value + '</code></pre>\n';
		
		docCode = docCode + '			</td>\n';
		docCode = docCode + '			<td>' + listItem.getById('type').value + '</td>\n';
		docCode = docCode + '			<td>\n';
		docCode = docCode + '				' + doc + '\n';
		docCode = docCode + '			</td>\n';
		docCode = docCode + '		</tr>\n';
		
		return docCode;
	};
	
	////////////
	// Extend //
	////////////
	
	var $this = utils.extend(listItem, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("fieldInput");