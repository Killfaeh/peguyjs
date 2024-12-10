function CreateHTMLPanel()
{
	////////////////
	// Attributes //
	////////////////
	
	var styleNode = new Component('<style></style>');
	
	var html = '<div class="createHTMLPanel" >'
	
					+ '<div id="nodeTreePanel" class="nodeTreePanel" >'
						+ '<h4>HTML page</h4>'
						+ '<h5>Nodes tree</h5>'
						+ '<div id="nodesTree" class="nodesTree" ></div>'
						+ '<div id="nodeTreeButtonsPanel" class="nodeTreeButtonsPanel" >'
							+ '<input type="button" id="addNode" value="Add node" />'
						+ '</div>'
					+ '</div>'
					
					+ '<div id="rightPanel" class="rightPanel" >'
					
						+ '<div id="previewPanel" class="previewPanel" >'
							+ '<iframe id="htmlFrame" class="htmlFrame" src="htmlFrame.html" ></iframe>'
						+ '</div>'
						
						+ '<div id="rightRightPanel" class="rightRightPanel" >'
						
							+ '<div id="settingsPanel" class="settingsPanel" >'
							
								+ '<div id="attributesPanel" class="attributesPanel" >'
									+ '<h5 id="attributesLabel" >Attributes</h5>'
									+ '<h5 id="textNodeContentLabel" >Text node content</h5>'
									+ '<div id="attributes" ></div>'
								+ '</div>'
								
								+ '<div id="cssPropertiesPanel" class="cssPropertiesPanel" >'
									+ '<h5 id="cssLabel" >CSS properties</h5>'
									+ '<div id="cssProperties" ></div>'
								+ '</div>'
							
							+ '</div>'
						
							+ '<div id="buttonsPanel" class="buttonsPanel" >'
								+ '<input type="button" id="saveSettings" value="Save settings" />'
								+ '<input type="button" id="updatePreview" value="Update preview" />'
								+ '<input type="button" id="createCode" value="Create code" />'
							+ '</div>'
						+ '</div>'
					+ '</div>'
				+ '</div>';

	var component = new Component(html);
	
	var slide1 = new HorizontalSlide(component.getById('nodeTreePanel'), component.getById('rightPanel'), 300);
	component.appendChild(slide1);
	
	var slide2 = new HorizontalSlide(component.getById('previewPanel'), component.getById('rightRightPanel'), 400);
	component.getById('rightPanel').appendChild(slide2);
	
	var slide3 = new VerticalSlide(component.getById('attributesPanel'), component.getById('cssPropertiesPanel'), 300);
	component.getById('settingsPanel').appendChild(slide3);
	
	var nodesTree = new Tree(false);
	nodesTree.setEditMode(true);
	component.getById('nodesTree').appendChild(nodesTree);

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
		
		updatePreview();
	};
	
	this.loadFromHTML = function($html)
	{
		$html = $html.replace('<!DOCTYPE html>', '');
		var xmlNode = dataManager.StringToXML('<?xml version="1.0" encoding="UTF-8"?>' + $html).firstChild;
		var newNode = new HTMLnodeItem(xmlNode.tagName, nodesTree);
		nodesTree.deselectAll();
		nodesTree.addElement(newNode);
		newNode.loadFromHTML(xmlNode);
	};
	
	/*
	var onChange = function()
	{
		//code = '';
		updatePreview();
	};
	//*/
	
	var saveSettings = function()
	{
		var jsonObject = $this.getJSON();
		var jsonCode = JSON.stringify(jsonObject, null, "\t");
		
		jsonCode = jsonCode.replace('<', '&lt;').replace('>', '&gt;');
		jsonCode = jsonCode.replace('\n', '<br />');
		
		var popup = new CodePopup("Export JSON", jsonCode);
		document.getElementById('main').appendChild(popup);
	};
	
	var addNode = function($branch)
	{
		var createPopup = new CreateHTMLnodePopup(nodesTree, $branch);
		document.getElementById('main').appendChild(createPopup);
	};
	
	var createCode = function()
	{
		var cssCode = $this.getCSScode();
		var htmlCode = $this.getHTMLcode();
		var popup = new HTMLcodePopup(htmlCode, cssCode);
		document.getElementById('main').appendChild(popup);
	};

	/////////////////
	// Init events //
	/////////////////
	
	nodesTree.onChange = function() { updatePreview(); };
	
	nodesTree.onSelect = function($nodeItem)
	{
		component.getById('attributes').removeAllChildren();
		component.getById('cssProperties').removeAllChildren();
		component.getById('attributes').appendChild($nodeItem.getHTMLattributesPanel());
		component.getById('cssProperties').appendChild($nodeItem.getCSSpropertiessPanel());
		
		if ($nodeItem.getLabel() === 'textNode')
		{
			component.getById('attributesLabel').style.display = 'none';
			component.getById('textNodeContentLabel').style.display = 'block';
			component.getById('cssLabel').style.display = 'none';
			component.getById('cssProperties').style.display = 'none';
		}
		else
		{
			component.getById('attributesLabel').style.display = 'block';
			component.getById('textNodeContentLabel').style.display = 'none';
			component.getById('cssLabel').style.display = 'block';
			component.getById('cssProperties').style.display = 'block';
		}
		
		tabManager.focus();
	};
	
	component.getById('addNode').onClick = function() { addNode(null); };
	component.getById('saveSettings').onClick = function() { saveSettings(); };
	component.getById('updatePreview').onClick = function() { updatePreview(); };
	component.getById('createCode').onClick = function() { createCode(); };
	
	this.onKeyUp = function($event)
	{
		console.log("CreateHTMLPanel : " + $event.keyCode);
		
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
						var newAttributeItem = new MenuItem("Add attribute");
						newAttributeItem.onAction = function() { selectedElement.getHTMLattributesPanel().addAttribute(); };
						contextMenu.addElement(newAttributeItem);
						
						var newCSSpropertyItem = new MenuItem("Add CSS property");
						newCSSpropertyItem.onAction = function() { selectedElement.getCSSpropertiessPanel().addProperty(); };
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

	///////////////////////
	// Getters & Setters //
	///////////////////////

	// GET
	
	this.getJSON = function()
	{
		var jsonObject = 
		{
			type: 'htmlPage',
			children: []
		};
		
		var children = nodesTree.getBranches();
		
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

	// SET

	////////////
	// Extend //
	////////////

	var $this = utils.extend(component, this);
	return $this;
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("createHTMLPanel");
