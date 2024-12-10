function MethodInput()
{
	////////////////
	// Attributes //
	////////////////
	
	var html = '<div><input id="name" type="text" placeholder="Name" /></div>'
				+ '<div id="isPrivate" ></div>'
				+ '<div id="doc" style="width: 5%; text-align: right;" ></div>'
				+ '<div id="delete" style="width: 3.3%; text-align: right;" ></div>'
				+ '<br />'
				+ '<div id="paramList" class="paramList" ></div>'
				+ '<br />'
				+ '<div class="addParam" id="addParamBlock" ><span><span id="addParam" ></span> Add parameter</span></div>';
				
	var listItem = new ListItem(html);
	
	var isPrivateInput = new InputCheckBox("isPrivate", "Is private", false, false);
	listItem.getById('isPrivate').appendChild(isPrivateInput);
	
	var docIcon = Loader.getSVG('icons', 'doc-icon', 18, 18);
	listItem.getById('doc').appendChild(docIcon);
	
	var closeIcon = Loader.getSVG('icons', 'close-icon', 18, 18);
	listItem.getById('delete').appendChild(closeIcon);
	
	var paramList = new LabelList();
	listItem.getById('paramList').appendChild(paramList);
	
	var addParamIcon = Loader.getSVG('icons', 'plus-icon', 20, 20);
	listItem.getById('addParam').appendChild(addParamIcon);
	
	var doc = "";
	
	/////////////
	// Methods //
	/////////////

	this.loadFromJSON = function($json)
	{
		if (utils.isset($json.name))
			listItem.getById('name').value = $json.name;
		
		if (utils.isset($json.isPrivate) && $json.isPrivate === true)
			isPrivateInput.setChecked(true);
		
		if (utils.isset($json.param))
		{
			for (var i = 0; i < $json.param.length; i++)
				 paramList.addLabel(Label($json.param[i]));
		}
		
		if (utils.isset($json.doc))
			doc = $json.doc;
	};
	
	this.addParam = function()
	{
		var addParamPopup = new ConfirmPopup('<input id="label" type="text" placeholder="Parameter name" />', false);
		
		addParamPopup.onOk = function()
		{
			var labelValue = addParamPopup.getById('label').value;
			
			if (utils.isset(labelValue) && labelValue !== '')
			{
				var label = new Label(addParamPopup.getById('label').value);
				paramList.addLabel(label);
			}
			
			$this.onChange();
			tabManager.focus();
			
			return true;
		};
		
		document.getElementById('main').appendChild(addParamPopup);
		addParamPopup.getById('label').focus();
	};

	/////////////////
	// Init events //
	/////////////////
	
	this.onChange = function() {};
	
	listItem.getById('name').onChangeDelay = 1000;
	listItem.getById('name').onChange = function() { $this.onChange(); };
	
	isPrivateInput.onChange = function() { $this.onChange(); };
	
	docIcon.onClick = function()
	{
		var popupHTML = '<div>'
							+ '<h4 style="margin-top: 0px; font-size: 1.1em;" >' + "Method documentation" + '</h4>'
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
	
	paramList.onChange = function() { $this.onChange(); };
	
	listItem.getById('addParamBlock').onClick = function() { $this.addParam(); };
	listItem.getById('addParamBlock').onMouseDown = function() {};
	listItem.getById('addParamBlock').onMouseUp = function() {};
	
	///////////////////////
	// Getters & Setters //
	///////////////////////

	// GET
	
	this.getName = function() { return listItem.getById('name').value; };
	this.isPrivate = function() { return isPrivateInput.isChecked(); };
	
	this.getParams = function()
	{
		var paramLabelList = paramList.getLabelList();
		var paramStrList = [];
		
		for (var i = 0; i < paramLabelList.length; i++)
			paramStrList.push(paramLabelList[i].getLabel());
		
		return paramStrList;
	};
	
	this.getJSON = function()
	{
		var jsonObject = 
		{
			name: listItem.getById('name').value,
			isPrivate: isPrivateInput.isChecked(),
			param: [],
			doc: doc
		};
		
		var paramLabelList = paramList.getLabelList();
		
		for (var i = 0; i < paramLabelList.length; i++)
			jsonObject.param.push(paramLabelList[i].getLabel());
		
		return jsonObject;
	};
	
	this.getHTMLdoc = function()
	{
		var paramLabelList = paramList.getLabelList();
		
		var docCode = '';
		
		docCode = docCode + '		<tr>\n';
		docCode = docCode + '			<td>\n';
		docCode = docCode + '				<pre><code class="javascript" >'
		
		if (isPrivateInput.isChecked() === true)
			docCode = docCode + 'var ';
		else
			docCode = docCode + 'this.';
		
		docCode = docCode + listItem.getById('name').value + ' = function(';
		
		for (var i = 0; i < paramLabelList.length; i++)
		{
			if (i > 0)
				docCode = docCode + ', ';
			
			docCode = docCode + '$' + paramLabelList[i].getLabel();
		}
		
		docCode = docCode + ')';
		
		docCode = docCode  + '</code></pre>\n';
		docCode = docCode + '			</td>\n';
		
		if (isPrivateInput.isChecked() === true)
			docCode = docCode + '			<td>Accès privé</td>\n';
		else
			docCode = docCode + '			<td>Accès public</td>\n';
		
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
	Loader.hasLoaded("methodInput");