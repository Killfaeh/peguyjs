function CreateGUIComponentPanel()
{
	////////////////
	// Attributes //
	////////////////

	var styleNode = new Component('<style></style>');
	
	var html = '<div class="createGUIComponentPanel" >'
	
					+ '<div id="settingsPanel" class="settingsPanel" >'
						+ '<table>'
							+ '<td colspan="3" >'
								+ '<h4><span id="classLabel" >' + "GUI component" + '</span><span id="docIcon" class="docIcon" ></span></h4>'
							+ '</td>'
							+ '<tr>'
								+ '<th style="padding-top: 10px; width: 120px; " >' + "Class name" + '</th>'
								+ '<td style="text-align: left; " >'
									+ '<input id="classNameInput" type="text" />'
								+ '</td>'
							+ '</tr>'
						+ '</table>'
						+ '<div id="accordion" ></div>'
					+ '</div>'
					
					+ '<div id="rightPanel" class="rightPanel" >'
					
						+ '<div id="previewPanel" class="previewPanel" >'
							+ '<iframe id="htmlFrame" class="htmlFrame" src="htmlFrame.html" ></iframe>'
						+ '</div>'
						
						+ '<div id="buttonsPanel" class="buttonsPanel" >'
							+ '<input type="button" id="saveSettings" value="Save settings" />'
							+ '<input type="button" id="updatePreview" value="Update preview" />'
							+ '<input type="button" id="createCode" value="Create code" />'
							+ '<input type="button" id="createDocCode" value="Create doc code" />'
						+ '</div>'
						
					+ '</div>'
					
				+ '</div>';

	var component = new Component(html);
	
	var docIcon = Loader.getSVG('icons', 'doc-icon', 18, 18);
	component.getById('docIcon').appendChild(docIcon);
	
	//// Panneau des attributs ////
	
	var attributesPanel = new Component('<div class="accordionPanel" >'
											+ '<table>'
												+ '<tr>'
													+ '<td colspan="2" id="attributes" class="attributes" ></td>'
												+ '</tr>'
												+ '<tr>'
													+ '<td colspan="2" style="text-align: right;" >'
														+ '<input type="button" id="addAttribute" value="Add attribute" />'
													+ '</td>'
												+ '</tr>'
											+ '</table>'
										+ '</div>');
	
	var attributesListBox = new ListBox();
	attributesListBox.setEditMode(true);
	attributesPanel.getById('attributes').appendChild(attributesListBox);
	
	//// Panneau des méthodes ////
	
	var methodsPanel = new Component('<div class="accordionPanel" >'
											+ '<table>'
												+ '<tr>'
													+ '<td colspan="2" id="methods" class="methods" ></td>'
												+ '</tr>'
												+ '<tr>'
													+ '<td colspan="2" style="text-align: right;" >'
														+ '<input type="button" id="addMethod" value="Add method" />'
													+ '</td>'
												+ '</tr>'
											+ '</table>'
										+ '</div>');
	
	var methodsListBox = new ListBox();
	methodsListBox.setEditMode(true);
	methodsPanel.getById('methods').appendChild(methodsListBox);
	
	//// Panneau de l'arborescence HTML ////
	
	var treePanel = new Component('<div class="accordionPanel" >'
	
											+ '<div id="treePanel" class="treePanel" >'
												+ '<div id="treeBlock" class="treeBlock" ></div>'
												+ '<div id="nodeTreeButtonsPanel" class="nodeTreeButtonsPanel" >'
													+ '<input type="button" id="addNode" value="Add node" />'
												+ '</div>'
											+ '</div>'
											
											+ '<div id="propertiesPanel" class="propertiesPanel" >'
											
												+ '<div id="attributesPanel" class="attributesPanel" >'
													+ '<h5 id="attributesLabel" >Attributes</h5>'
													+ '<h5 id="textNodeContentLabel" >Text node content</h5>'
													//+ '<h5 id="componentVariableNameLabel" >Component variable name</h5>'
													+ '<div id="attributes" ></div>'
												+ '</div>'
												
												+ '<div id="cssPropertiesPanel" class="cssPropertiesPanel" >'
													+ '<h5 id="cssLabel" >CSS properties</h5>'
													+ '<div id="cssProperties" ></div>'
												+ '</div>'
											
											+ '</div>'
											
										+ '</div>');
	
	var nodesTree = new Tree(false);
	nodesTree.setEditMode(true);
	treePanel.getById('treeBlock').appendChild(nodesTree);
	
	//// Accordéon ////
	
	var accordion = new Accordion(true);
	component.getById('accordion').appendChild(accordion);
	
	var accordionItemAttributes = new AccordionItem('<span>' + "Attributes" + '</span>', attributesPanel);
	accordion.addElement(accordionItemAttributes);
	
	var accordionItemMethods = new AccordionItem('<span>' + "Methods" + '</span>', methodsPanel);
	accordion.addElement(accordionItemMethods);
	
	var accordionItemTree = new AccordionItem('<span>' + "HTML tree" + '</span>', treePanel);
	accordion.addElement(accordionItemTree);
	
	//// Glissières ////
	
	var slide1 = new HorizontalSlide(component.getById('settingsPanel'), component.getById('rightPanel'), 600);
	component.appendChild(slide1);
	
	var doc = "";

	/////////////
	// Methods //
	/////////////
	
	var updatePreview = function()
	{
		setTimeout(function()
		{
			var cssCode = $this.getCSScode();
			var htmlCode = $this.getHTMLcode();
			component.getById('htmlFrame').contentWindow.insertCode(cssCode, htmlCode);
			tabManager.focus();
		}, 1000);
	};

	this.loadFromJSON = function($json)
	{
		if (utils.isset($json.name))
			component.getById('classNameInput').value = $json.name;
		
		if (utils.isset($json.attributes))
		{
			for (var i = 0; i < $json.attributes.length; i++)
			{
				var attributeInput = new AttributeInput();
				attributesListBox.addElement(attributeInput);
				attributeInput.loadFromJSON($json.attributes[i]);
			}
		}
		
		if (utils.isset($json.methods))
		{
			for (var i = 0; i < $json.methods.length; i++)
			{
				var methodInput = new MethodInput();
				methodsListBox.addElement(methodInput);
				methodInput.loadFromJSON($json.methods[i]);
			}
		}
		
		if (utils.isset($json.children) && $json.children.length > 0)
		{
			for (var i = 0; i < $json.children.length; i++)
			{
				var newNode = new HTMLnodeItem($json.children[i].type, nodesTree);
				nodesTree.deselectAll();
				nodesTree.addElement(newNode);
				newNode.loadFromJSON($json.children[i]);
			}
		}
		
		if (utils.isset($json.doc))
			doc = $json.doc;
		
		updatePreview();
	};

	var addAttribute = function($json)
	{
		var attributeInput = new AttributeInput();
        
        if (utils.isset($json))
            attributeInput.loadFromJSON($json);
        
		attributesListBox.addElement(attributeInput);
		attributeInput.getById('name').focus();
	};

	var addMethod = function($json)
	{
		var methodInput = new MethodInput();
        
        if (utils.isset($json))
            methodInput.loadFromJSON($json);
        
		methodsListBox.addElement(methodInput);
		methodInput.getById('name').focus();
	};
	
	var addNode = function($branch)
	{
		var createPopup = new CreateHTMLnodePopup(nodesTree, $branch, true);
		document.getElementById('main').appendChild(createPopup);
	};
	
	var createCode = function()
	{
		var cssCode = $this.getCSScode();
		var htmlCode = $this.getHTMLcodeForJS();
		
		code = '';
		var constructorParams = '';
		var attributesDeclaration = '';
		var componentsAttributesDeclaration = '';
		var methodsDeclaration = '';
		var getters = '';
		var setters = '';
		
		var className = component.getById('classNameInput').value;
		var classNameFirstCharToLowerCase = className.charAt(0).toLowerCase() + className.slice(1);
		
		// Attributes
		
		var attributes = attributesListBox.getElementsList();
		
		for (var i = 0; i < attributes.length; i++)
		{
			var attribute = attributes[i];
			var name = attribute.getName();
			var defaultValue = attribute.getDefaultValue();
			var type = attribute.getType();
			
			if (name !== '')
			{
				var nameFirstCharToUpperCase = name.charAt(0).toUpperCase() + name.slice(1);
				
				if (attribute.isConstructorParam() === true)
				{
					if (constructorParams !== '')
						constructorParams = constructorParams + ', ';
					
					constructorParams = constructorParams + '$' + name;
					attributesDeclaration = attributesDeclaration + '	var ' + name + ' = $' + name + ';\n';
				}
				else
				{
					if (type === 'null')
						attributesDeclaration = attributesDeclaration + '	var ' + name + ' = null;\n';
					else if (type === 'undefined')
						attributesDeclaration = attributesDeclaration + '	var ' + name + ' = undefined;\n';
					else if (type === 'array')
					{
						if (defaultValue === '')
							attributesDeclaration = attributesDeclaration + '	var ' + name + ' = [];\n';
						else
							attributesDeclaration = attributesDeclaration + '	var ' + name + ' = [' + defaultValue + '];\n';
					}
					else if (type === 'list')
					{
						if (defaultValue === '')
							attributesDeclaration = attributesDeclaration + '	var ' + name + 'List = [];\n';
						else
							attributesDeclaration = attributesDeclaration + '	var ' + name + 'List = [' + defaultValue + '];\n';
					}
					else if (type === 'object')
					{
						if (defaultValue === '')
							attributesDeclaration = attributesDeclaration + '	var ' + name + ' = {};\n';
						else
							attributesDeclaration = attributesDeclaration + '	var ' + name + ' = ' + defaultValue + ';\n';
					}
					else if (type === 'boolean')
					{
						if (defaultValue === '')
							attributesDeclaration = attributesDeclaration + '	var ' + name + ' = false;\n';
						else
							attributesDeclaration = attributesDeclaration + '	var ' + name + ' = ' + defaultValue + ';\n';
					}
					else if (type === 'date')
					{
						if (defaultValue === '')
							attributesDeclaration = attributesDeclaration + '	var ' + name + ' = new Date();\n';
						else
							attributesDeclaration = attributesDeclaration + '	var ' + name + ' = ' + defaultValue + ';\n';
					}
					else if (defaultValue === '')
						attributesDeclaration = attributesDeclaration + '	var ' + name + ';\n';
					else if (type === 'string')
						attributesDeclaration = attributesDeclaration + '	var ' + name + ' = "' + defaultValue + '";\n';
					else
						attributesDeclaration = attributesDeclaration + '	var ' + name + ' = ' + defaultValue + ';\n';
				}
				
				if (type === 'list')
				{
					methodsDeclaration = methodsDeclaration + '	this.add' + nameFirstCharToUpperCase + ' = function($' + name + ')\n';
					methodsDeclaration = methodsDeclaration + '	{\n';
					methodsDeclaration = methodsDeclaration + '		var index = ' + name + 'List.indexOf($' + name + ');\n\n';
					methodsDeclaration = methodsDeclaration + '		if (index < 0)\n';
					methodsDeclaration = methodsDeclaration + '		{\n';
					methodsDeclaration = methodsDeclaration + '		 ' + name + 'List.push($' + name + ');\n';
					
					//if (extendComponentInput.isChecked() === true)
						methodsDeclaration = methodsDeclaration + '			component.appendChild($' + name + ');\n';
					
					methodsDeclaration = methodsDeclaration + '			\n';
					methodsDeclaration = methodsDeclaration + '			if (utils.isset($' + name + '.setParent))\n';
					methodsDeclaration = methodsDeclaration + '				$' + name + '.setParent($this);\n';
					methodsDeclaration = methodsDeclaration + '		}\n';
					methodsDeclaration = methodsDeclaration + '	};\n\n';
					
					methodsDeclaration = methodsDeclaration + '	this.insert' + nameFirstCharToUpperCase + 'Into = function($' + name + ', $index)\n';
					methodsDeclaration = methodsDeclaration + '	{\n';
					methodsDeclaration = methodsDeclaration + '		var index = ' + name + 'List.indexOf($' + name + ');\n\n';
					methodsDeclaration = methodsDeclaration + '		if (index < 0)\n';
					methodsDeclaration = methodsDeclaration + '			' + name + 'List.splice(index, 1);\n\n';
					methodsDeclaration = methodsDeclaration + '		' + name + 'List.splice(index, 0, $' + name + ');\n';
					
					//if (extendComponentInput.isChecked() === true)
						methodsDeclaration = methodsDeclaration + '		component.insertAt($' + name + ', $index);\n';
					
					methodsDeclaration = methodsDeclaration + '		\n';
					methodsDeclaration = methodsDeclaration + '		if (utils.isset($' + name + '.setParent))\n';
					methodsDeclaration = methodsDeclaration + '			$' + name + '.setParent($this);\n';
					methodsDeclaration = methodsDeclaration + '	};\n\n';
					
					methodsDeclaration = methodsDeclaration + '	this.remove' + nameFirstCharToUpperCase + ' = function($' + name + ')\n';
					methodsDeclaration = methodsDeclaration + '	{\n';
					methodsDeclaration = methodsDeclaration + '		var index = ' + name + 'List.indexOf($' + name + ');\n\n';
					methodsDeclaration = methodsDeclaration + '		if (index >= 0)\n';
					methodsDeclaration = methodsDeclaration + '		{\n';
					methodsDeclaration = methodsDeclaration + '			' + name + 'List.splice(index, 1);\n\n';
					
					//if (extendComponentInput.isChecked() === true)
					{
						methodsDeclaration = methodsDeclaration + '			if (utils.isset($' + name + '.parentNode))\n';
						methodsDeclaration = methodsDeclaration + '				$' + name + '.parentNode.removeChild($' + name + ');\n';
					}
					
					methodsDeclaration = methodsDeclaration + '			\n';
					methodsDeclaration = methodsDeclaration + '			if (utils.isset($' + name + '.setParent))\n';
					methodsDeclaration = methodsDeclaration + '				$' + name + '.setParent(null);\n';
					methodsDeclaration = methodsDeclaration + '		}\n';
					methodsDeclaration = methodsDeclaration + '	};\n\n';
					
					methodsDeclaration = methodsDeclaration + '	this.removeAll' + nameFirstCharToUpperCase + ' = function()\n';
					methodsDeclaration = methodsDeclaration + '	{\n';
					methodsDeclaration = methodsDeclaration + '		' + name + 'List = [];\n';
					
					//if (extendComponentInput.isChecked() === true)
						methodsDeclaration = methodsDeclaration + '		component.removeAllChildren();\n';
					
					methodsDeclaration = methodsDeclaration + '	};\n\n';
				}
				
				if (type === 'boolean')
					getters = getters + '	this.is' + nameFirstCharToUpperCase + ' = function() { return ' + name + '; };\n';
				else
					getters = getters + '	this.get' + nameFirstCharToUpperCase + ' = function() { return ' + name + '; };\n';
				
				setters = setters + '	this.set' + nameFirstCharToUpperCase + ' = function($' + name + ') { ' + name + ' = $' + name + '; };\n';
			}
		}
		
		var children = nodesTree.getBranches();
		
		for (var i = 0; i < children.length; i++)
			componentsAttributesDeclaration = componentsAttributesDeclaration + children[i].getJScode();
		
		// Méthodes
		
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
		
		// Code final
		
		code = code +	'function ' + className + '(' + constructorParams + ')\n';
		code = code + '{\n';
		
		code = code + '	////////////////\n';
		code = code + '	// Attributes //\n';
		code = code + '	////////////////\n\n';
		
		code = code + attributesDeclaration + '\n';
		
		//if (extendComponentInput.isChecked() === true)
		{
			code = code + "	var html = '<div class=\"" + classNameFirstCharToLowerCase + "\" >'\n";
			
			code = code + htmlCode;
			
			code = code + "				+ '</div>';\n\n";
			
			code = code + '	var component = new Component(html);\n\n';
		}
		
		code = code + componentsAttributesDeclaration;
		
		code = code + '	/////////////\n';
		code = code + '	// Methods //\n';
		code = code + '	/////////////\n\n';
		
		code = code + methodsDeclaration;
		
		//if (extendComponentInput.isChecked() === true)
		{
			code = code + '	/////////////////\n';
			code = code + '	// Init events //\n';
			code = code + '	/////////////////\n\n';
		}
		
		code = code + '	///////////////////////\n';
		code = code + '	// Getters & Setters //\n';
		code = code + '	///////////////////////\n\n';
		
		code = code + '	// GET\n\n';
		
		code = code + getters + '\n';
		
		code = code + '	// SET\n\n';
		
		code = code + setters + '\n';
		
		//if (extendComponentInput.isChecked() === true)
		{
			code = code + '	////////////\n';
			code = code + '	// Extend //\n';
			code = code + '	////////////\n\n';
			
			code = code + '	var $this = utils.extend(component, this);\n';
			code = code + '	return $this;\n';
		}
		
		code = code + '}\n\n';
		
		code = code + 'if (Loader !== null && Loader !== undefined)\n';
		code = code + '	Loader.hasLoaded("' + classNameFirstCharToLowerCase + '");\n';
		
		var popup = new ComponentCodePopup(code, cssCode);
		document.getElementById('main').appendChild(popup);
	};

	var saveSettings = function()
	{
		var jsonObject = $this.getJSON();
		var jsonCode = JSON.stringify(jsonObject, null, "\t");
		
		jsonCode = jsonCode.replace('<', '&lt;').replace('>', '&gt;');
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
	
	var openTreePanel = function($tree)
	{
		if ($tree === nodesTree)
			accordionItemTree.open();
	};
	
	/////////////////
	// Init events //
	/////////////////
	
	docIcon.onClick = function()
	{
		var popupHTML = '<div>'
							+ '<h4 style="margin-top: 0px; font-size: 1.1em;" >' + "Component documentation" + '</h4>'
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
	
	attributesPanel.getById('addAttribute').onClick = function() { addAttribute(); };
	methodsPanel.getById('addMethod').onClick = function() { addMethod(); };
	
	nodesTree.onChange = function() { updatePreview(); };
	
	nodesTree.onSelect = function($nodeItem)
	{
		treePanel.getById('attributes').removeAllChildren();
		treePanel.getById('cssProperties').removeAllChildren();
		treePanel.getById('attributes').appendChild($nodeItem.getHTMLattributesPanel());
		treePanel.getById('cssProperties').appendChild($nodeItem.getCSSpropertiessPanel());
		
		if (componentsList.indexOf($nodeItem.getLabel()) >= 0)
		{
			treePanel.getById('attributesLabel').style.display = 'block';
			treePanel.getById('textNodeContentLabel').style.display = 'none';
			//treePanel.getById('componentVariableNameLabel').style.display = 'block';
			treePanel.getById('cssLabel').style.display = 'none';
			treePanel.getById('cssProperties').style.display = 'none';
		}
		else if ($nodeItem.getLabel() === 'textNode')
		{
			treePanel.getById('attributesLabel').style.display = 'none';
			treePanel.getById('textNodeContentLabel').style.display = 'block';
			//treePanel.getById('componentVariableNameLabel').style.display = 'none';
			treePanel.getById('cssLabel').style.display = 'none';
			treePanel.getById('cssProperties').style.display = 'none';
		}
		else
		{
			treePanel.getById('attributesLabel').style.display = 'block';
			treePanel.getById('textNodeContentLabel').style.display = 'none';
			//treePanel.getById('componentVariableNameLabel').style.display = 'none';
			treePanel.getById('cssLabel').style.display = 'block';
			treePanel.getById('cssProperties').style.display = 'block';
		}
		
		tabManager.focus();
	};
	
	treePanel.getById('addNode').onClick = function() { addNode(null); };
	component.getById('saveSettings').onClick = function() { saveSettings(); };
	component.getById('updatePreview').onClick = function() { updatePreview(); };
	component.getById('createCode').onClick = function() { createCode(); };
	component.getById('createDocCode').onClick = function() { createDocCode(); };
	
	this.onKeyUp = function($event)
	{
		console.log("CreateGUIComponentPanel : " + $event.keyCode);
		
		var shortcutModifier = Events.keyPressTable['alt'];
		
		//if (/mac os x/.test(navigator.userAgent.toLowerCase().replace(" ", "")) || /macosx/.test(navigator.userAgent.toLowerCase().replace(" ", "")))
		//  shortcutModifier = $event.metaKey;
	
		if (shortcutModifier === true)
		{
			// alt + N
			//if ($event.keyCode === 78)
			// alt + A
			if ($event.keyCode === 65)
			{
				var contextMenu = new ContextMenu(Events.mouseX, Events.mouseY);
				
                // Création d'attributs
                
				var newAttributeItem = new MenuItem("Add attribute");
				
				newAttributeItem.onAction = function()
				{
					addAttribute();
					accordionItemAttributes.open();
				};
				
				contextMenu.addElement(newAttributeItem);
				
                // Création d'attributs standard
                
                var newStandardAttributeItem = new MenuItem("Add standard attribute");
                contextMenu.addElement(newStandardAttributeItem);
                
                var newDraggingAttributesItem = new MenuItem("dragging attributes");
                
                newDraggingAttributesItem.onAction = function()
                {
                    addAttribute({ "name": "clicked", "default": "false", "type": "boolean", "isConstructorParam": false, "doc": ""});
                    addAttribute({ "name": "moved", "default": "false", "type": "boolean", "isConstructorParam": false, "doc": ""});
                    addAttribute({ "name": "dragging", "default": "false", "type": "boolean", "isConstructorParam": false, "doc": ""});
                    addAttribute({ "name": "startX", "default": "0", "type": "number", "isConstructorParam": false, "doc": ""});
                    addAttribute({ "name": "startY", "default": "0", "type": "number", "isConstructorParam": false, "doc": ""});
                    addAttribute({ "name": "offsetX", "default": "0", "type": "number", "isConstructorParam": false, "doc": ""});
                    addAttribute({ "name": "offsetY", "default": "0", "type": "number", "isConstructorParam": false, "doc": ""});
                    addAttribute({ "name": "ghost", "default": "", "type": "null", "isConstructorParam": false, "doc": ""});
                    addAttribute({ "name": "virtualItem", "default": "", "type": "null", "isConstructorParam": false, "doc": ""});
                    addAttribute({ "name": "parentNode", "default": "", "type": "null", "isConstructorParam": false, "doc": ""});
                    addAttribute({ "name": "offsetIndex", "default": "0", "type": "number", "isConstructorParam": false, "doc": ""});
                    addAttribute({ "name": "currentIndex", "default": "0", "type": "number", "isConstructorParam": false, "doc": ""});
                    accordionItemAttributes.open();
                };
                
                newStandardAttributeItem.addElement(newDraggingAttributesItem);
                
                var newDraggingAttributeItem = new MenuItem("dragging (boolean)");
                
                newDraggingAttributeItem.onAction = function()
                {
                    addAttribute({ "name": "dragging", "default": "false", "type": "boolean", "isConstructorParam": false, "doc": ""});
                    accordionItemAttributes.open();
                };
                
                newStandardAttributeItem.addElement(newDraggingAttributeItem);
                
                // Création de méthodes
                
				var newMethodItem = new MenuItem("Add method");
				
				newMethodItem.onAction = function()
				{
					addMethod();
					accordionItemMethods.open();
				};
				
				contextMenu.addElement(newMethodItem);
                
                // Création de méthodes standard
                
                var newStandardMethodItem = new MenuItem("Add standard method");
                contextMenu.addElement(newStandardMethodItem);
                
                var newOnChangeMethod = new MenuItem("onChange (public)");
                
                newOnChangeMethod.onAction = function()
                {
                    addMethod({ "name": "onChange", "isPrivate": false, "param": ["data"], "doc": ""});
                    accordionItemMethods.open();
                };
                
                newStandardMethodItem.addElement(newOnChangeMethod);
                
                var newOnChangePrivateMethod = new MenuItem("onChange (private)");
                
                newOnChangePrivateMethod.onAction = function()
                {
                    addMethod({ "name": "onChange", "isPrivate": true, "param": ["data"], "doc": ""});
                    accordionItemMethods.open();
                };
                
                newStandardMethodItem.addElement(newOnChangePrivateMethod);
                
                var newOnMouseDownMethod = new MenuItem("onMouseDown (private)");
                
                newOnMouseDownMethod.onAction = function()
                {
                    addMethod({ "name": "onMouseDown", "isPrivate": true, "param": ["event"], "doc": ""});
                    accordionItemMethods.open();
                };
                
                newStandardMethodItem.addElement(newOnMouseDownMethod);
                
                var newOnMouseMoveMethod = new MenuItem("onMouseMove (private)");
                
                newOnMouseMoveMethod.onAction = function()
                {
                    addMethod({ "name": "onMouseMove", "isPrivate": true, "param": ["event"], "doc": ""});
                    accordionItemMethods.open();
                };
                
                newStandardMethodItem.addElement(newOnMouseMoveMethod);
                
                var newOnMouseUpMethod = new MenuItem("onMouseUp (private)");
                
                newOnMouseUpMethod.onAction = function()
                {
                    addMethod({ "name": "onMouseUp", "isPrivate": true, "param": ["event"], "doc": ""});
                    accordionItemMethods.open();
                };
                
                newStandardMethodItem.addElement(newOnMouseUpMethod);
                
                var newOnKeyUpMethod = new MenuItem("onKeyUp (public)");
                
                newOnKeyUpMethod.onAction = function()
                {
                    addMethod({ "name": "onKeyUp", "isPrivate": false, "param": ["event"], "doc": ""});
                    accordionItemMethods.open();
                };
                
                newStandardMethodItem.addElement(newOnKeyUpMethod);
                
                var newOnDragMethod = new MenuItem("onDrag (private)");
                
                newOnDragMethod.onAction = function()
                {
                    addMethod({ "name": "onDrag", "isPrivate": true, "param": ["x", "y", "element"], "doc": ""});
                    accordionItemMethods.open();
                };
                
                newStandardMethodItem.addElement(newOnDragMethod);
                
                var newOnReleaseMethod = new MenuItem("onRelease (private)");
                
                newOnReleaseMethod.onAction = function()
                {
                    addMethod({ "name": "onRelease", "isPrivate": true, "param": ["tab", "index"], "doc": ""});
                    accordionItemMethods.open();
                };
                
                newStandardMethodItem.addElement(newOnReleaseMethod);
                
                var newGetOverLayerMethod = new MenuItem("getOverLayer (public)");
                
                newGetOverLayerMethod.onAction = function()
                {
                    addMethod({ "name": "getOverLayer", "isPrivate": false, "param": ["x", "y", "movingElement"], "doc": ""});
                    accordionItemMethods.open();
                };
                
                newStandardMethodItem.addElement(newGetOverLayerMethod);
                
                var newIndexMethod = new MenuItem("index (public)");
                
                newIndexMethod.onAction = function()
                {
                    addMethod({ "name": "index", "isPrivate": false, "param": [], "doc": ""});
                    accordionItemMethods.open();
                };
                
                newStandardMethodItem.addElement(newIndexMethod);
                
                var newIsLastMethod = new MenuItem("isLast (public)");
                
                newIsLastMethod.onAction = function()
                {
                    addMethod({ "name": "isLast", "isPrivate": false, "param": [], "doc": ""});
                    accordionItemMethods.open();
                };
                
                newStandardMethodItem.addElement(newIsLastMethod);
				
                // Création de paramètres de méthodes
                
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
				
                // Création de noeuds
                
				var newRootNodeItem = new MenuItem("Add node to root");
				newRootNodeItem.onAction = function() { addNode(null); };
				contextMenu.addElement(newRootNodeItem);
				
				var selectedElement = nodesTree.getSelectedElement();
				
				if (utils.isset(selectedElement))
				{
					var newNodeItem = new MenuItem("Add node to selectedElement");
					newNodeItem.onAction = function() { addNode(selectedElement); };
					contextMenu.addElement(newNodeItem);
					
					if (selectedElement.getLabel() !== 'textNode')
					{
						var newAttributeItem = new MenuItem("Add HTML attribute");
						
						newAttributeItem.onAction = function()
						{
							selectedElement.getHTMLattributesPanel().addAttribute();
							accordionItemTree.open();
						};
						
						contextMenu.addElement(newAttributeItem);
						
						var newCSSpropertyItem = new MenuItem("Add CSS property");
						
						newCSSpropertyItem.onAction = function()
						{
							selectedElement.getCSSpropertiessPanel().addProperty();
							accordionItemTree.open();
						};
						
						contextMenu.addElement(newCSSpropertyItem);
					}
				}
			}
			else if ($event.keyCode === 67)
				createCode();
			else if ($event.keyCode === 82)
				updatePreview();
			else if ($event.keyCode === 83)
			{
				saveSettings();
			}
		}
	};
	
	component.connect('onOpenTreePanel', openTreePanel);

	///////////////////////
	// Getters & Setters //
	///////////////////////

	// GET

	this.getJSON = function()
	{
		var jsonObject = 
		{
			type: 'guiComponent',
			name: component.getById('classNameInput').value,
			attributes: [],
			methods: [],
			children: [],
			doc: doc
		};
		
		// A compléter
		
		var attributes = attributesListBox.getElementsList();
		var methods = methodsListBox.getElementsList();
		var children = nodesTree.getBranches();
		
		for (var i = 0; i < attributes.length; i++)
			jsonObject.attributes.push(attributes[i].getJSON());
		
		for (var i = 0; i < methods.length; i++)
			jsonObject.methods.push(methods[i].getJSON());
		
		for (var i = 0; i < children.length; i++)
			jsonObject.children.push(children[i].getJSON());
		
		return jsonObject;
	};
	
	this.getHTMLcode = function()
	{
		var htmlCode = '';
		
		var children = nodesTree.getBranches();
		
		for (var i = 0; i < children.length; i++)
		{
			var childrenHTML = children[i].getHTMLcode();
			htmlCode = htmlCode + childrenHTML;
		}
		
		return htmlCode;
	};
	
	this.getHTMLcodeForJS = function()
	{
		var htmlCode = $this.getHTMLcode();
		
		var jsCode = '';
		
		var tagsList = htmlCode.split('\n');
		
		for (var i = 0; i < tagsList.length; i++)
		{
			var indent = tagsList[i].replace(/^(	*).*/, '$1');
			var tag = tagsList[i].replace(/^	*/, '');
			
			if (tag !== '')
			{
				var codeRow = '					' + indent + "+ '" + tag + "'\n";
				jsCode = jsCode + codeRow;
			}
		}
		
		return jsCode;
	};
	
	this.getCSScode = function()
	{
		var cssBlocks = [];
		
		var children = nodesTree.getBranches();
		
		for (var i = 0; i < children.length; i++)
		{
			var childCssBlocks = children[i].getCSSblocks();
			
			for (var j = 0; j < childCssBlocks.length; j++)
				cssBlocks.push(childCssBlocks[j]);
		}
		
		var cssCode = '';
		
		for (var i = 0; i < cssBlocks.length; i++)
			cssCode = cssCode + cssBlocks[i];
		
		return cssCode;
	};
	
	this.getHTMLdoc = function()
	{
		var htmlCode = $this.getHTMLcode();
		var constructorParams = '';
		var constructorParamsDescription = '';
		var listMethodsDoc = '';
		var gettersDoc = '';
		var settersDoc = '';
		
		var attributes = attributesListBox.getElementsList();
		var methods = methodsListBox.getElementsList();
		var children = nodesTree.getBranches();
		
		//// Paramètres du constructeur ////
		
		for (var i = 0; i < attributes.length; i++)
		{
			var attribute = attributes[i];
			var name = attribute.getName();
			var defaultValue = attribute.getDefaultValue();
			var type = attribute.getType();
			
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
						constructorParamsDescription = constructorParamsDescription + ' Le paramètre <em>$' + name + 'List</em> ...<br />\n';
					}
					else
					{
						constructorParams = constructorParams + '$' + name;
						constructorParamsDescription = constructorParamsDescription + ' Le paramètre <em>$' + name + '</em> ...<br />\n';
					}
				}
				
				gettersDoc = gettersDoc + '	 <tr>\n';
				gettersDoc = gettersDoc + '		 <td>\n';
				gettersDoc = gettersDoc + '			 <pre><code class="javascript" >';
				
				settersDoc = settersDoc + '	 <tr>\n';
				settersDoc = settersDoc + '		 <td>\n';
				settersDoc = settersDoc + '			 <pre><code class="javascript" >';
				
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
				gettersDoc = gettersDoc + '		 </td>\n';
				gettersDoc = gettersDoc + '		 <td>Accès public</td>\n';
				gettersDoc = gettersDoc + '		 <td>\n';
				
				if (type === 'list')
					gettersDoc = gettersDoc + '			 Retourne la valeur de <em class="inline-code" >' + name + 'List</em>.\n';
				else
					gettersDoc = gettersDoc + '			 Retourne la valeur de <em class="inline-code" >' + name + '</em>.\n';
				
				gettersDoc = gettersDoc + '		 </td>\n';
				gettersDoc = gettersDoc + '	 </tr>\n';
				
				settersDoc = settersDoc + '</code></pre>\n';
				settersDoc = settersDoc + '		 </td>\n';
				settersDoc = settersDoc + '		 <td>Accès public</td>\n';
				settersDoc = settersDoc + '		 <td>\n';
				
				if (type === 'list')
					settersDoc = settersDoc + '			 Affecte la valeur <em class="inline-code" >$' + name + '</em> à <em class="inline-code" >' + name + 'List</em>.\n';
				else
					settersDoc = settersDoc + '			 Affecte la valeur <em class="inline-code" >$' + name + '</em> à <em class="inline-code" >' + name + '</em>.\n';
					
				settersDoc = settersDoc + '		 </td>\n';
				settersDoc = settersDoc + '	 </tr>\n';
				
				if (type === 'list')
				{
					listMethodsDoc = listMethodsDoc + '	 <tr>\n';
					listMethodsDoc = listMethodsDoc + '		 <td>\n';
					listMethodsDoc = listMethodsDoc + '			 <pre><code class="javascript" >this.add' + nameFirstCharToUpperCase + ' = function($' + name + ')</code></pre>\n';
					listMethodsDoc = listMethodsDoc + '		 </td>\n';
					listMethodsDoc = listMethodsDoc + '		 <td>Accès public</td>\n';
					listMethodsDoc = listMethodsDoc + '		 <td>\n';
					listMethodsDoc = listMethodsDoc + '			 Ajoute un élément <em class="inline-code" >$' + name + '</em> à la liste ' + name + 'List.\n';
					listMethodsDoc = listMethodsDoc + '		 </td>\n';
					listMethodsDoc = listMethodsDoc + '	 </tr>\n';
					
					listMethodsDoc = listMethodsDoc + '	 <tr>\n';
					listMethodsDoc = listMethodsDoc + '		 <td>\n';
					listMethodsDoc = listMethodsDoc + '			 <pre><code class="javascript" >this.insert' + nameFirstCharToUpperCase + 'Into = function($' + name + ', $index)</code></pre>\n';
					listMethodsDoc = listMethodsDoc + '		 </td>\n';
					listMethodsDoc = listMethodsDoc + '		 <td>Accès public</td>\n';
					listMethodsDoc = listMethodsDoc + '		 <td>\n';
					listMethodsDoc = listMethodsDoc + '			 Insère l\'élément <em class="inline-code" >$' + name + '</em> à la position <em class="inline-code" >$index</em> dans la liste ' + name + 'List.\n';
					listMethodsDoc = listMethodsDoc + '		 </td>\n';
					listMethodsDoc = listMethodsDoc + '	 </tr>\n';
					
					listMethodsDoc = listMethodsDoc + '	 <tr>\n';
					listMethodsDoc = listMethodsDoc + '		 <td>\n';
					listMethodsDoc = listMethodsDoc + '			 <pre><code class="javascript" >this.remove' + nameFirstCharToUpperCase + ' = function($' + name + ')</code></pre>\n';
					listMethodsDoc = listMethodsDoc + '		 </td>\n';
					listMethodsDoc = listMethodsDoc + '		 <td>Accès public</td>\n';
					listMethodsDoc = listMethodsDoc + '		 <td>\n';
					listMethodsDoc = listMethodsDoc + '			 Supprime l\'élément <em class="inline-code" >$' + name + '</em> de la liste ' + name + 'List.\n';
					listMethodsDoc = listMethodsDoc + '		 </td>\n';
					listMethodsDoc = listMethodsDoc + '	 </tr>\n';
					
					listMethodsDoc = listMethodsDoc + '	 <tr>\n';
					listMethodsDoc = listMethodsDoc + '		 <td>\n';
					listMethodsDoc = listMethodsDoc + '			 <pre><code class="javascript" >this.removeAll' + nameFirstCharToUpperCase + ' = function()</code></pre>\n';
					listMethodsDoc = listMethodsDoc + '		 </td>\n';
					listMethodsDoc = listMethodsDoc + '		 <td>Accès public</td>\n';
					listMethodsDoc = listMethodsDoc + '		 <td>\n';
					listMethodsDoc = listMethodsDoc + '			 Supprime tous les éléments de la liste ' + name + 'List.\n';
					listMethodsDoc = listMethodsDoc + '		 </td>\n';
					listMethodsDoc = listMethodsDoc + '	 </tr>\n';
				}
			}
		}
		
		//// Code final ////
		
		var docCode = '<h2>' + component.getById('classNameInput').value + '.js</h2>\n\n';
		
		docCode = docCode + '<p>\n  ' + doc + '\n</p>\n\n';
		
		docCode = docCode + '<h5>Constructeur</h5>\n\n';
		
		docCode = docCode + '<pre><code class="javascript" >\n';
		docCode = docCode + component.getById('classNameInput').value + '(' + constructorParams + ')\n';
		docCode = docCode + '</code></pre>\n\n';
		
		docCode = docCode + '<p>\n';
		docCode = docCode + constructorParamsDescription;
		docCode = docCode + '</p>\n\n';
		
		docCode = docCode + '<h5>Structure HTML du composant</h5>\n\n';
		
		docCode = docCode + '<pre><code class="html" >\n';
		docCode = docCode + htmlCode.replace(/</gi, '&lt;').replace(/>/gi, '&gt;');
		docCode = docCode + '</code></pre>\n\n';
		
		docCode = docCode + '<h5>Attributs</h5>\n\n';
		
		docCode = docCode + '<div class="border-table" >\n';
		docCode = docCode + '	<table>\n';
		
		for (var i = 0; i < attributes.length; i++)
			docCode = docCode + attributes[i].getHTMLdoc();
		
		docCode = docCode + '		<tr>\n';
		docCode = docCode + '			<td>\n';
		docCode = docCode + '				<pre><code class="javascript" >var component</code></pre>\n';
		docCode = docCode + '			</td>\n';
		docCode = docCode + '			<td>Objet Component</td>\n';
		docCode = docCode + '			<td>\n';
		docCode = docCode + '				Objet <em class="inline-code" >Component</em> dont hérite le composant.\n';
		docCode = docCode + '			</td>\n';
		docCode = docCode + '		</tr>\n';
		
		for (var i = 0; i < children.length; i++)
			docCode = docCode + children[i].getHTMLdoc();
		
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
		docCode = docCode + '</code></pre>\n\n';
		
		return docCode;
	};

	////////////
	// Extend //
	////////////

	var $this = utils.extend(component, this);
	return $this;
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("createGUIComponentPanel");
