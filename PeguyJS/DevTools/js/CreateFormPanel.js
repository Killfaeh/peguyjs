function CreateFormPanel()
{
	////////////////
	// Attributes //
	////////////////
	
	var code = '';

	var html = '<div class="createFormPanel" >'
	
					+ '<div id="settingsPanel" class="settingsPanel" >'
						+ '<table>'
							+ '<td colspan="3" >'
								+ '<h4><span id="classLabel" >' + "Form panel" + '</span><span id="docIcon" class="docIcon" ></span></h4>'
							+ '</td>'
							+ '<tr>'
								+ '<th style="padding-top: 10px; width: 120px; " >' + "Class name" + '</th>'
								+ '<td style="text-align: left; " >'
									+ '<input id="classNameInput" type="text" />'
								+ '</td>'
								+ '<td id="horizontal" ></td>'
							+ '</tr>'
							+ '<tr>'
								+ '<th colspan="3" >' + "Fields" + '</th>'
							+ '</tr>'
							+ '<tr>'
								+ '<td colspan="3" id="fields" class="fields" ></td>'
							+ '</tr>'
							+ '<tr>'
								+ '<td colspan="3" style="text-align: right;" >'
									+ '<input type="button" id="addField" value="Add field" />'
								+ '</td>'
							+ '</tr>'
							+ '<tr>'
								+ '<th colspan="3" >' + "Methods" + '</th>'
							+ '</tr>'
							+ '<tr>'
								+ '<td colspan="3" id="methods" class="methods" ></td>'
							+ '</tr>'
							+ '<tr>'
								+ '<td colspan="3" style="text-align: right;" >'
									+ '<input type="button" id="addMethod" value="Add method" />'
								+ '</td>'
							+ '</tr>'
						+ '</table>'
					+ '</div>'
					
					+ '<div id="codePanel" class="codePanel" >'
						+ '<div id="css-block" class="code-block css-block" >'
							+ '<pre id="css-content" ></pre>'
						+ '</div>'
						+ '<div id="copyCssIcon" class="copyIcon copyCssIcon" ></div>'
						+ '<div id="js-block" class="code-block js-block" >'
							+ '<pre id="js-content" ></pre>'
						+ '</div>'
						+ '<div id="buttons" class="buttons" >'
							+ '<input type="button" id="saveSettings" value="Save settings" />'
							+ '<input type="button" id="updateCode" value="Update code" />'
							+ '<input type="button" id="createDocCode" value="Create doc code" />'
						+ '</div>'
						+ '<div id="copyJsIcon" class="copyIcon copyJsIcon" ></div>'
					+ '</div>'
				+ '</div>';
				
	var component = new Component(html);
	
	var slide1 = new HorizontalSlide(component.getById('settingsPanel'), component.getById('codePanel'), 500);
	component.appendChild(slide1);
	
	var extendComponentInput = new InputCheckBox("horizontal", "Horizontal", false, false);
	component.getById('horizontal').appendChild(extendComponentInput);
	
	var fieldsListBox = new ListBox();
	fieldsListBox.setEditMode(true);
	fieldsListBox.onChange = function() { onChange(); };
	component.getById('fields').appendChild(fieldsListBox);
	
	var methodsListBox = new ListBox();
	methodsListBox.setEditMode(true);
	methodsListBox.onChange = function() { onChange(); };
	component.getById('methods').appendChild(methodsListBox);
	
	var copyCssIcon = Loader.getSVG('icons', 'copy-paste-icon', 30, 30);
	component.getById('copyCssIcon').appendChild(copyCssIcon);

	var copyJsIcon = Loader.getSVG('icons', 'copy-paste-icon', 30, 30);
	component.getById('copyJsIcon').appendChild(copyJsIcon);
	
	var docIcon = Loader.getSVG('icons', 'doc-icon', 18, 18);
	component.getById('docIcon').appendChild(docIcon);
	
	var doc = "";
	
	/////////////
	// Methods //
	/////////////
	
	this.loadFromJSON = function($json)
	{
		if (utils.isset($json.name))
			component.getById('classNameInput').value = $json.name;
		
		if (utils.isset($json.extendComponent) && $json.extendComponent === true)
			extendComponentInput.setChecked(true);
		
		if (utils.isset($json.fields))
		{
			for (var i = 0; i < $json.fields.length; i++)
			{
				var fieldInput = new FieldInput();
				fieldInput.onChange = function() { onChange(); };
				fieldsListBox.addElement(fieldInput);
				fieldInput.loadFromJSON($json.fields[i]);
			}
		}
		
		if (utils.isset($json.methods))
		{
			for (var i = 0; i < $json.methods.length; i++)
			{
				var methodInput = new MethodInput();
				methodInput.onChange = function() { onChange(); };
				methodsListBox.addElement(methodInput);
				methodInput.loadFromJSON($json.methods[i]);
			}
		}
		
		if (utils.isset($json.doc))
			doc = $json.doc;
		
		onChange();
	};
	
	var onChange = function()
	{
		code = '';
		var constructorParams = '';
		//var attributesDeclaration = '';
		var fieldsHTML = '';
		var methodsDeclaration = '';
		var getters = '';
		var setters = '';
		
		var className = component.getById('classNameInput').value;
		var classNameFirstCharToLowerCase = className.charAt(0).toLowerCase() + className.slice(1);
		
		// Fields
		
		var fields = fieldsListBox.getElementsList();
		
		for (var i = 0; i < fields.length; i++)
		{
			var field = fields[i];
			var name = field.getName();
			var defaultValue = field.getDefaultValue();
			var type = field.getType();
			
			if (name !== '')
			{
				var nameFirstCharToUpperCase = name.charAt(0).toUpperCase() + name.slice(1);

				var htmlField = field.getHTML();

				if (utils.isset(htmlField) && htmlField !== '')
					fieldsHTML = fieldsHTML + htmlField;
				
				if (type === 'boolean')
					getters = getters + '	this.is' + nameFirstCharToUpperCase + ' = function() { return ' + name + '; };\n';
				else
					getters = getters + '	this.get' + nameFirstCharToUpperCase + ' = function() { return ' + name + '; };\n';
				
				setters = setters + '	this.set' + nameFirstCharToUpperCase + ' = function($' + name + ') { ' + name + ' = $' + name + '; };\n';
			}
		}
		
		// Methods
		
		var methods = methodsListBox.getElementsList();
		
		for (var i = 0; i < methods.length; i++)
		{
			var method = methods[i];
			var name = method.getName();
			var isPrivate = method.isPrivate();
			var paramList = method.getParams();
			
			if (name !== '')
			{
				var methodParams = '';
				
				for (var j = 0; j < paramList.length; j++)
				{
					if (j > 0)
						methodParams = methodParams + ', ';
					
					methodParams = methodParams + '$' + paramList[j];
				}
				
				if (isPrivate === true)
					methodsDeclaration = methodsDeclaration + '	var ' + name + ' = function(' + methodParams + ')\n';
				else
					methodsDeclaration = methodsDeclaration + '	this.' + name + ' = function(' + methodParams + ')\n';
				
				methodsDeclaration = methodsDeclaration + '	{\n';
				methodsDeclaration = methodsDeclaration + '		console.log("Execute ' + name + '...");\n';
				methodsDeclaration = methodsDeclaration + '	};\n\n';
			}
		}
		
		// Final code
		
		code = code + 'function ' + className + '(' + constructorParams + ')\n';
		code = code + '{\n';
		
		code = code + '	////////////////\n';
		code = code + '	// Attributes //\n';
		code = code + '	////////////////\n\n';
		
		//code = code + attributesDeclaration + '\n';
		
		code = code + "	var html = '<div>'\n";
		code = code + "					+ '<table>'\n";
		code = code + fieldsHTML;
		code = code + "					+ '</table>'\n";
		code = code + "				+ '</div>';\n\n";

		code = code + '	var component = new Component(html);\n\n';
		
		code = code + '	/////////////\n';
		code = code + '	// Methods //\n';
		code = code + '	/////////////\n\n';
		
		code = code + methodsDeclaration;
		
		code = code + '	/////////////////\n';
		code = code + '	// Init events //\n';
		code = code + '	/////////////////\n\n';
		
		code = code + '	///////////////////////\n';
		code = code + '	// Getters & Setters //\n';
		code = code + '	///////////////////////\n\n';
		
		code = code + '	// GET\n\n';
		
		code = code + getters + '\n';
		
		code = code + '	// SET\n\n';
		
		code = code + setters + '\n';
		
		if (extendComponentInput.isChecked() === true)
		{
			code = code + '	////////////\n';
			code = code + '	// Extend //\n';
			code = code + '	////////////\n\n';
			
			code = code + '	var $this = utils.extend(component, this);\n';
			code = code + '	return $this;\n';
		}
		else
			code = code + '	var $this = this;\n';
		
		code = code + '}\n\n';
		
		code = code + 'if (Loader !== null && Loader !== undefined)\n';
		code = code + '	Loader.hasLoaded("' + classNameFirstCharToLowerCase + '");\n';
		
		component.getById('code-content').innerHTML = code.replace('\n', '<br />');
		tabManager.focus();
	};
	
	var addField = function()
	{
		var fieldInput = new FieldInput();
		fieldInput.onChange = function() { onChange(); };
		fieldsListBox.addElement(fieldInput);
		fieldInput.getById('name').focus();
		onChange();
	};
	
	var addMethod = function()
	{
		var methodInput = new MethodInput();
		methodInput.onChange = function() { onChange(); };
		methodsListBox.addElement(methodInput);
		methodInput.getById('name').focus();
		onChange();
	};
	
	var saveSettings = function()
	{
		var jsonObject = $this.getJSON();
		var jsonCode = JSON.stringify(jsonObject, null, "\t");
		
		jsonCode = jsonCode.replace(/&/gi, '&amp;').replace(/</gi, '&lt;').replace(/>/gi, '&gt;');
		jsonCode = jsonCode.replace('\n', '<br />');
		
		var popup = new CodePopup("Export JSON", jsonCode);
		document.getElementById('main').appendChild(popup);
	};
	
	var createDocCode = function()
	{
		var docCode = $this.getHTMLdoc();
		
		docCode = docCode.replace(/&/gi, '&amp;').replace(/</gi, '&lt;').replace(/>/gi, '&gt;');
		docCode = docCode.replace('\n', '<br />');
		
		var popup = new CodePopup("Doc code (HTML)", docCode);
		document.getElementById('main').appendChild(popup);
	};
	
	var toClipboard = function()
	{
		dataManager.toClipboard(code.replace(/<br ?\/?>/gi, '\n').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>'), 
									function()
									{
										console.log("Le code a bien été copiée dans le presse papier.");
										
										message = '<p style="text-align: left;" >'
													+ "Le code a bien été copiée dans le presse papier." 
												+ '</p>';
										
										notifCenter.push(message, false);
									}, 
									function() { console.log("La copie a échoué."); });
	};
	
	/////////////////
	// Init events //
	/////////////////
	
	docIcon.onClick = function()
	{
		var popupHTML = '<div>'
							+ '<h4 style="margin-top: 0px; font-size: 1.1em;" >' + "Class documentation" + '</h4>'
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
	
	component.getById('classNameInput').onChangeDelay = 1000;
	component.getById('classNameInput').onChange = function() { onChange(); };
	
	extendComponentInput.onChange = function() { onChange(); };
	fieldsListBox.onChange = function() { onChange(); };
	component.getById('addField').onClick = function() { addField(); };
	methodsListBox.onChange = function() { onChange(); };
	component.getById('addMethod').onClick = function() { addMethod(); };
	component.getById('updateCode').onClick = function() { onChange(); };
	component.getById('saveSettings').onClick = function() { saveSettings(); };
	component.getById('createDocCode').onClick = function() { createDocCode(); };
	copyCssIcon.onClick = function() { toClipboard('css'); };
	copyJsIcon.onClick = function() { toClipboard('js'); };
	
	this.onKeyUp = function($event)
	{
		console.log("CreateFormPanel : " + $event.keyCode);
		
		var shortcutModifier = Events.keyPressTable['alt'];
		
		//if (/mac os x/.test(navigator.userAgent.toLowerCase().replace(" ", "")) || /macosx/.test(navigator.userAgent.toLowerCase().replace(" ", "")))
		//	shortcutModifier = $event.metaKey;
	
		if (shortcutModifier === true)
		{
			// alt + N
			//if ($event.keyCode === 78)
			// alt + A
			if ($event.keyCode === 65)
			{
				var contextMenu = new ContextMenu(Events.mouseX, Events.mouseY);
				
				var newFieldItem = new MenuItem("Add field");
				newFieldItem.onAction = function() { addField(); };
				contextMenu.addElement(newFieldItem);
				
				var newMethodItem = new MenuItem("Add method");
				newMethodItem.onAction = function() { addMethod(); };
				contextMenu.addElement(newMethodItem);
				
				var overMethod = null;
				var methods = methodsListBox.getElementsList();
				
				for (var i = 0; i < methods.length; i++)
				{
					if (methods[i].isMouseOver())
					{
						overMethod = methods[i];
						i = methods.length;
					}
				}
				
				if (utils.isset(overMethod))
				{
					var newParamItem = new MenuItem("Add parameter");
					
					newParamItem.onAction = function()
					{
						overMethod.addParam();
					};
					
					contextMenu.addElement(newParamItem);
				}
			}
			else if ($event.keyCode === 67)
				toClipboard();
			else if ($event.keyCode === 82)
				onChange();
			else if ($event.keyCode === 83)
			{
				saveSettings();
			}
		}
	};
	
	///////////////////////
	// Getters & Setters //
	///////////////////////

	// GET
	
	this.getJSON = function()
	{
		var jsonObject = 
		{
			type: 'formPanel',
			name: component.getById('classNameInput').value,
			extendComponent: extendComponentInput.isChecked(),
			fields: [],
			methods: [],
			doc: doc
		};
		
		var fields = fieldsListBox.getElementsList();
		var methods = methodsListBox.getElementsList();
		
		for (var i = 0; i < fields.length; i++)
			jsonObject.fields.push(fields[i].getJSON());
		
		for (var i = 0; i < methods.length; i++)
			jsonObject.methods.push(methods[i].getJSON());
		
		return jsonObject;
	};
	
	this.getHTMLdoc = function()
	{
		var constructorParams = '';
		var constructorParamsDescription = '';
		var listMethodsDoc = '';
		var gettersDoc = '';
		var settersDoc = '';
		
		var fields = fieldsListBox.getElementsList();
		var methods = methodsListBox.getElementsList();
		
		//// Paramètres du constructeur ////
		
		for (var i = 0; i < fields.length; i++)
		{
			var field = fields[i];
			var name = field.getName();
			var defaultValue = field.getDefaultValue();
			var type = field.getType();
			
			if (name !== '')
			{
				var nameFirstCharToUpperCase = name.charAt(0).toUpperCase() + name.slice(1);
				
				if (attribute.isConstructorParam() === true)
				{
					if (constructorParams !== '')
						constructorParams = constructorParams + ', ';
					
					if (type === 'list')
					{
						constructorParams = constructorParams + '$' + name  +'List';
						constructorParamsDescription = constructorParamsDescription + '	Le paramètre <em>$' + name + 'List</em> ...<br />\n';
					}
					else
					{
						constructorParams = constructorParams + '$' + name;
						constructorParamsDescription = constructorParamsDescription + '	Le paramètre <em>$' + name + '</em> ...<br />\n';
					}
				}
				
				gettersDoc = gettersDoc + '		<tr>\n';
				gettersDoc = gettersDoc + '			<td>\n';
				gettersDoc = gettersDoc + '				<pre><code class="javascript" >';
				
				settersDoc = settersDoc + '		<tr>\n';
				settersDoc = settersDoc + '			<td>\n';
				settersDoc = settersDoc + '				<pre><code class="javascript" >';
				
				if (type === 'boolean')
					gettersDoc = gettersDoc + 'this.is' + nameFirstCharToUpperCase + ' = function()';
				else if (type === 'list')
					gettersDoc = gettersDoc + 'this.get' + nameFirstCharToUpperCase + 'List = function()';
				else
					gettersDoc = gettersDoc + 'this.get' + nameFirstCharToUpperCase + ' = function()';
				
				if (type === 'list')
					settersDoc = settersDoc + 'this.set' + nameFirstCharToUpperCase + 'List = function($' + name + 'List)';
				else
					settersDoc = settersDoc + 'this.set' + nameFirstCharToUpperCase + ' = function($' + name + ')';
				
				gettersDoc = gettersDoc + '</code></pre>\n';
				gettersDoc = gettersDoc + '			</td>\n';
				gettersDoc = gettersDoc + '			<td>Accès public</td>\n';
				gettersDoc = gettersDoc + '			<td>\n';
				
				if (type === 'list')
					gettersDoc = gettersDoc + '				Retourne la valeur de <em class="inline-code" >' + name + 'List</em>.\n';
				else
					gettersDoc = gettersDoc + '				Retourne la valeur de <em class="inline-code" >' + name + '</em>.\n';
				
				gettersDoc = gettersDoc + '			</td>\n';
				gettersDoc = gettersDoc + '		</tr>\n';
				
				settersDoc = settersDoc + '</code></pre>\n';
				settersDoc = settersDoc + '			</td>\n';
				settersDoc = settersDoc + '			<td>Accès public</td>\n';
				settersDoc = settersDoc + '			<td>\n';
				
				if (type === 'list')
					settersDoc = settersDoc + '				Affecte la valeur <em class="inline-code" >$' + name + '</em> à <em class="inline-code" >' + name + 'List</em>.\n';
				else
					settersDoc = settersDoc + '				Affecte la valeur <em class="inline-code" >$' + name + '</em> à <em class="inline-code" >' + name + '</em>.\n';
					
				settersDoc = settersDoc + '			</td>\n';
				settersDoc = settersDoc + '		</tr>\n';
				
				if (type === 'list')
				{
					listMethodsDoc = listMethodsDoc + '		<tr>\n';
					listMethodsDoc = listMethodsDoc + '			<td>\n';
					listMethodsDoc = listMethodsDoc + '				<pre><code class="javascript" >this.add' + nameFirstCharToUpperCase + ' = function($' + name + ')</code></pre>\n';
					listMethodsDoc = listMethodsDoc + '			</td>\n';
					listMethodsDoc = listMethodsDoc + '			<td>Accès public</td>\n';
					listMethodsDoc = listMethodsDoc + '			<td>\n';
					listMethodsDoc = listMethodsDoc + '				Ajoute un élément <em class="inline-code" >$' + name + '</em> à la liste ' + name + 'List.\n';
					listMethodsDoc = listMethodsDoc + '			</td>\n';
					listMethodsDoc = listMethodsDoc + '		</tr>\n';
					
					listMethodsDoc = listMethodsDoc + '		<tr>\n';
					listMethodsDoc = listMethodsDoc + '			<td>\n';
					listMethodsDoc = listMethodsDoc + '				<pre><code class="javascript" >this.insert' + nameFirstCharToUpperCase + 'Into = function($' + name + ', $index)</code></pre>\n';
					listMethodsDoc = listMethodsDoc + '			</td>\n';
					listMethodsDoc = listMethodsDoc + '			<td>Accès public</td>\n';
					listMethodsDoc = listMethodsDoc + '			<td>\n';
					listMethodsDoc = listMethodsDoc + '				Insère l\'élément <em class="inline-code" >$' + name + '</em> à la position <em class="inline-code" >$index</em> dans la liste ' + name + 'List.\n';
					listMethodsDoc = listMethodsDoc + '			</td>\n';
					listMethodsDoc = listMethodsDoc + '		</tr>\n';
					
					listMethodsDoc = listMethodsDoc + '		<tr>\n';
					listMethodsDoc = listMethodsDoc + '			<td>\n';
					listMethodsDoc = listMethodsDoc + '				<pre><code class="javascript" >this.remove' + nameFirstCharToUpperCase + ' = function($' + name + ')</code></pre>\n';
					listMethodsDoc = listMethodsDoc + '			</td>\n';
					listMethodsDoc = listMethodsDoc + '			<td>Accès public</td>\n';
					listMethodsDoc = listMethodsDoc + '			<td>\n';
					listMethodsDoc = listMethodsDoc + '				Supprime l\'élément <em class="inline-code" >$' + name + '</em> de la liste ' + name + 'List.\n';
					listMethodsDoc = listMethodsDoc + '			</td>\n';
					listMethodsDoc = listMethodsDoc + '		</tr>\n';
					
					listMethodsDoc = listMethodsDoc + '		<tr>\n';
					listMethodsDoc = listMethodsDoc + '			<td>\n';
					listMethodsDoc = listMethodsDoc + '				<pre><code class="javascript" >this.removeAll' + nameFirstCharToUpperCase + ' = function()</code></pre>\n';
					listMethodsDoc = listMethodsDoc + '			</td>\n';
					listMethodsDoc = listMethodsDoc + '			<td>Accès public</td>\n';
					listMethodsDoc = listMethodsDoc + '			<td>\n';
					listMethodsDoc = listMethodsDoc + '				Supprime tous les éléments de la liste ' + name + 'List.\n';
					listMethodsDoc = listMethodsDoc + '			</td>\n';
					listMethodsDoc = listMethodsDoc + '		</tr>\n';
				}
			}
		}
		
		//// Final code ////
		
		var docCode = '<h2>' + component.getById('classNameInput').value + '.js</h2>\n\n';
		
		docCode = docCode + '<p>\n	' + doc + '\n</p>\n\n';
		
		docCode = docCode + '<h5>Constructeur</h5>\n\n';
		
		docCode = docCode + '<pre><code class="javascript" >\n';
		docCode = docCode + component.getById('classNameInput').value + '(' + constructorParams + ')\n';
		docCode = docCode + '</code></pre>\n\n';
		
		docCode = docCode + '<p>\n';
		docCode = docCode + constructorParamsDescription;
		docCode = docCode + '</p>\n\n';
		
		docCode = docCode + '<h5>Attributs</h5>\n\n';
		
		docCode = docCode + '<div class="border-table" >\n';
		docCode = docCode + '	<table>\n';
		
		for (var i = 0; i < attributes.length; i++)
			docCode = docCode + attributes[i].getHTMLdoc();
		
		if (extendComponentInput.isChecked() === true)
		{
			docCode = docCode + '		<tr>\n';
			docCode = docCode + '			<td>\n';
			docCode = docCode + '				<pre><code class="javascript" >var component</code></pre>\n';
			docCode = docCode + '			</td>\n';
			docCode = docCode + '			<td>Objet Component</td>\n';
			docCode = docCode + '			<td>\n';
			docCode = docCode + '				Objet <em class="inline-code" >Component</em> dont hérite le composant.\n';
			docCode = docCode + '			</td>\n';
			docCode = docCode + '		</tr>\n';
		}
		
		docCode = docCode + '	</table>\n';
		docCode = docCode + '</div>\n\n';
		
		docCode = docCode + '<h5>Méthodes</h5>\n\n';
		
		docCode = docCode + '<div class="border-table" >\n';
		docCode = docCode + '	<table>\n';
		
		docCode = docCode + listMethodsDoc;
		
		for (var i = 0; i < methods.length; i++)
			docCode = docCode + methods[i].getHTMLdoc();
		
		docCode = docCode + gettersDoc;
		docCode = docCode + settersDoc;
		
		docCode = docCode + '	</table>\n';
		docCode = docCode + '</div>\n\n';
		
		docCode = docCode + '<h3>Exemples d\'utilisation</h3>\n\n';
		
		docCode = docCode + '<pre><code class="javascript" >\n';
		docCode = docCode + '</code></pre>\n';
		
		return docCode;
	};
	
	////////////
	// Extend //
	////////////
	
	var $this = utils.extend(component, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("createFormPanel");