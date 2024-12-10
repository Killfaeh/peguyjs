function HTMLnodeItem($label, $tree, $componentsMode)
{
	////////////////
	// Attributes //
	////////////////
	
	var label = $label;
	var tree = $tree;
	var monoTagList = ['img'];
	var componentsMode = $componentsMode;
	
	var html = '<span class="label-block" >'
					+ '<span id="label" class="label" >' + label + '</span>'
					+ '<div class="mask" ></div>'
					+ '<span id="buttons" class="buttons" ></span>'
				+ '</span>';
	
	var branch = new TreeBranch(html, false);
	
	branch.onToolTip = label;
	
	var editIcon = Loader.getSVG('icons', 'edit-icon', 17, 17);
	branch.getById('buttons').appendChild(editIcon);
	
	var deleteIcon = Loader.getSVG('icons', 'trash-icon', 17, 17);
	branch.getById('buttons').appendChild(deleteIcon);
	
	var addIcon = Loader.getSVG('icons', 'plus-icon', 17, 17);
	branch.getById('buttons').appendChild(addIcon);
	
	var htmlAttributesPanel = HTMLattributesPanel();
	var cssPropertiesPanel = CSSpropertiesPanel();
	
	if (componentsList.indexOf(label) >= 0)
	{
		//htmlAttributesPanel.getById('attributes').style.display = 'none';
		htmlAttributesPanel.getById('textNodeContent').style.display = 'none';
		//htmlAttributesPanel.getById('componentVariableName').style.display = 'inline-block';
		//htmlAttributesPanel.getById('addAttributeBlock').style.display = 'none';
		
		if (componentsWithChildren.indexOf(label) < 0)
			addIcon.style.display = 'none';
	}
	else if (label === 'textNode')
	{
		htmlAttributesPanel.getById('attributes').style.display = 'none';
		htmlAttributesPanel.getById('componentVariableName').style.display = 'none';
		htmlAttributesPanel.getById('addAttributeBlock').style.display = 'none';
		addIcon.style.display = 'none';
	}
	else
	{
		htmlAttributesPanel.getById('textNodeContent').style.display = 'none';
		htmlAttributesPanel.getById('componentVariableName').style.display = 'none';
	}
	
	/////////////
	// Methods //
	/////////////
	
	this.loadFromJSON = function($json)
	{
		if (utils.isset($json.type))
			label = $json.type;
			
		if (utils.isset($json.textNodeContent))
			htmlAttributesPanel.getById('textNodeContent').value = $json.textNodeContent;
        
        if (utils.isset($json.componentVariableName))
            htmlAttributesPanel.getById('componentVariableName').value = $json.componentVariableName;
		
		if (utils.isset($json.attributes))
			htmlAttributesPanel.loadFromJSON($json.attributes);
		
		if (utils.isset($json.properties))
			cssPropertiesPanel.loadFromJSON($json.properties);
		
		if (utils.isset($json.children) && $json.children.length > 0)
		{
			for (var i = 0; i < $json.children.length; i++)
			{
				var newNode = new HTMLnodeItem($json.children[i].type, tree);
				$this.select();
				tree.addElement(newNode);
				newNode.loadFromJSON($json.children[i]);
			}
		}
	};
	
	this.loadFromHTML = function($html)
	{
		if ($html.nodeType !== Node.TEXT_NODE)
		{
			htmlAttributesPanel.loadFromHTML($html);
			cssPropertiesPanel.loadFromHTML($html);
			
			if ($html.tagName !== 'script')
			{
				var children = $html.childNodes;
				
				for (var i = 0; i < children.length; i++)
				{
					var newNode = null; 
					
					if (children[i].nodeType !== Node.TEXT_NODE)
					{
						if (children[i].tagName !== 'style')
							var newNode = new HTMLnodeItem(children[i].tagName, tree);
						else
						{
							// Cas de la balise style
						}
					}
					else
						var newNode = new HTMLnodeItem('textNode', tree);
					
					if (utils.isset(newNode))
					{
						$this.select();
						tree.addElement(newNode);
						newNode.loadFromHTML(children[i]);
					}
				}
			}
			else
			{
				// Cas de la balise script
			}
		}
		else
			htmlAttributesPanel.getById('textNodeContent').value = $html.textContent;
	};
	
	/////////////////
	// Init events //
	/////////////////
	
	htmlAttributesPanel.onChange = function() { $this.onChange($this); };
	cssPropertiesPanel.onChange = function() { $this.onChange($this); };
	
	addIcon.onClick = function()
	{
		var createPopup = new CreateHTMLnodePopup(tree, $this, componentsMode);
		document.getElementById('main').appendChild(createPopup);
	};
	
	///////////////////////
	// Getters & Setters //
	///////////////////////

	// GET
	
	this.getLabel = function() { return label; };
	this.getHTMLattributesPanel = function() { return htmlAttributesPanel; };
	this.getCSSpropertiessPanel = function() { return cssPropertiesPanel; };
	
	this.getIdAttribute = function()
	{
		var idValue = htmlAttributesPanel.getAttributeValue('id');
		return idValue;
	};
	
	this.getJSON = function()
	{
		var jsonObject = 
		{
			type: label,
			attributes: htmlAttributesPanel.getJSON(),
			textNodeContent: htmlAttributesPanel.getTextNodeContent(),
			componentVariableName: htmlAttributesPanel.getComponentVariableName(),
			properties: cssPropertiesPanel.getJSON(),
			children: []
		};
		
		var children = branch.getBranches();
		
		for (var i = 0; i < children.length; i++)
			jsonObject.children.push(children[i].getJSON());
		
		return jsonObject;
	};
	
	this.getHTMLcode = function()
	{
		var htmlCode = '';
		
		if (componentsList.indexOf(label) < 0)
		{
			if (label === 'textNode')
				htmlCode = htmlAttributesPanel.getTextNodeContent() + '\n';
			else
			{
				if (monoTagList.indexOf(label) < 0)
				{
					htmlCode = '<' + label + ' ' + htmlAttributesPanel.getCode() + '>\n';
					
					var children = branch.getBranches();
					
					for (var i = 0; i < children.length; i++)
					{
						var childrenHTML = children[i].getHTMLcode();
						htmlCode = htmlCode + childrenHTML;
					}
					
					htmlCode = htmlCode.replace(/\n/gi, '\n\t').replace(/\t+$/, '') + '</' + label + '>\n';
				}
				else
					htmlCode = '<' + label + ' ' + htmlAttributesPanel.getCode() + '/>\n';
			}
		}
		
		return htmlCode;
	};
	
	this.getJScode = function()
	{
		var code = '';
		
		if (componentsList.indexOf(label) >= 0)
		{
			var parentBranch = $this.getParentBranch();
			var params = '';
			
			var paramList = componentsParams[label];
			
			for (var i = 0; i < paramList.length; i++)
			{
				if (i > 0)
					params = params + ', ';
				
				params = params + htmlAttributesPanel.getAttributeValue(paramList[i]);
			}
			
			code = '	var ' + htmlAttributesPanel.getComponentVariableName() + ' = new ' + label + '(' + params + ');\n';
			
			if (utils.isset(parentBranch))
				code = code + "	component.getById('" + parentBranch.getIdAttribute() + "').appendChild(" + htmlAttributesPanel.getComponentVariableName() + ");\n\n";
			else
				code = code + "	component.appendChild(" + htmlAttributesPanel.getComponentVariableName() + ");\n\n";
		}
		else if (label !== 'textNode')
		{
			var children = branch.getBranches();
			
			for (var i = 0; i < children.length; i++)
				code = code + children[i].getJScode();
		}
		
		return code;
	};
	
	this.getCSSblocks = function()
	{
		var nodeLabel = label;
		var className = htmlAttributesPanel.getClass();
		
		if (className !== '')
			nodeLabel = '.' + className;
		
		var cssBlocks = [];
		
		var cssCode = cssPropertiesPanel.getCode();
		
		if (cssCode !== '')
		{
			cssCode = nodeLabel + '\n' + cssCode;
			cssBlocks.push(cssCode);
		}
		
		var children = branch.getBranches();
		
		for (var i = 0; i < children.length; i++)
		{
			var childCssBlocks = children[i].getCSSblocks();
			
			for (var j = 0; j < childCssBlocks.length; j++)
				cssBlocks.push(nodeLabel + ' ' + childCssBlocks[j]);
		}
		
		return cssBlocks;
	};
	
	this.getHTMLdoc = function()
	{
		var docCode = '';
		
		if (componentsList.indexOf(label) >= 0)
		{
			docCode = docCode + '		<tr>\n';
			docCode = docCode + '			<td>\n';
			docCode = docCode + '				<pre><code class="javascript" >var ' + htmlAttributesPanel.getComponentVariableName() + '</code></pre>\n';
			docCode = docCode + '			</td>\n';
			docCode = docCode + '			<td>' + label + '</td>\n';
			docCode = docCode + '			<td>\n';
			docCode = docCode + '				...\n';
			docCode = docCode + '			</td>\n';
			docCode = docCode + '		</tr>\n';
		}
		else if (label !== 'textNode')
		{
			var children = branch.getBranches();
			
			for (var i = 0; i < children.length; i++)
				docCode = docCode + children[i].getHTMLdoc();
		}
		
		return docCode;
	};
	
	////////////
	// Extend //
	////////////

	var $this = utils.extend(branch, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("htmlNodeItem");