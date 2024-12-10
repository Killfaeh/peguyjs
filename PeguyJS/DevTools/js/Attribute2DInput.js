function Attribute2DInput()
{
	////////////////
	// Attributes //
	////////////////
	
	var html = '<div><input id="name" type="text" placeholder="Attribute name" /></div>'
				+ '<div>'
					+ '<select id="type" >'
						+ '<optgroup label="" >'
							+ '<option value="null" >null</option>'
							+ '<option value="number" >Number</option>'
							+ '<option value="string" >String</option>'
							+ '<option value="boolean" >Boolean</option>'
							+ '<option value="date" >Date</option>'
							+ '<option value="array" >Array</option>'
							+ '<option value="list" >List</option>'
							+ '<option value="object" >Object</option>'
							+ '<option value="undefined" >undefined</option>'
						+ '</optgroup>'
						+ '<optgroup label="Objects 2D" >'
							+ '<option value="Object2D" >Object2D</option>'
							+ '<option value="Group2D" >Group2D</option>'
							+ '<option value="LinearGradient2D" >LinearGradient2D</option>'
							+ '<option value="RadialGradient2D" >RadialGradient2D</option>'
							+ '<option value="ConicGradient2D" >ConicGradient2D</option>'
							+ '<option value="Image2D" >Image2D</option>'
							+ '<option value="Sprite2D" >Sprite2D</option>'
							+ '<option value="Rect2D" >Rect2D</option>'
						+ '</optgroup>'
					+ '</select>'
				+ '</div>'
				+ '<div><input id="default" type="text" placeholder="Default value" /></div>'
				+ '<div id="constructorParam" style="width: 9%; text-align: center;" ></div>'
				+ '<div id="doc" style="width: 3.3%; text-align: right;" ></div>'
				+ '<div id="delete" style="width: 3.3%; text-align: right;" ></div>';
	
	// '<optgroup label="Characters" >'
	
	var listItem = new ListItem(html);
	
	var isConstructorParamInput = new CheckBox(false, 18);
	listItem.getById('constructorParam').appendChild(isConstructorParamInput);
	
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
		
		if (utils.isset($json.default))
			listItem.getById('default').value = $json.default;
		
		if (utils.isset($json.type))
			listItem.getById('type').value = $json.type;
		
		if (utils.isset($json.isConstructorParam) && $json.isConstructorParam === true)
			isConstructorParamInput.setChecked(true);
		
		if (utils.isset($json.doc))
			doc = $json.doc;
	};
	
	/////////////////
	// Init events //
	/////////////////
	
	this.onChange = function() {};
	
	listItem.getById('name').onChangeDelay = 1000;
	listItem.getById('name').onChange = function() { $this.onChange(); };
	
	listItem.getById('type').onMouseDown = function() {};
	listItem.getById('type').onMouseUp = function() {};
	
	listItem.getById('type').onChange = function() { $this.onChange(); };
	listItem.getById('type').onchange = function() { $this.onChange(); };
	
	listItem.getById('default').onChangeDelay = 1000;
	listItem.getById('default').onChange = function() { $this.onChange(); };
	
	isConstructorParamInput.onChange = function() { $this.onChange(); };
	
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
	this.getDefaultValue = function() { return listItem.getById('default').value; };
	this.getType = function() { return listItem.getById('type').value; };
	this.isConstructorParam = function() { return isConstructorParamInput.isChecked(); };
	
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
	Loader.hasLoaded("attribute2DInput");