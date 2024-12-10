
var componentsList = ['Accordion', 'Canvas2D'];
var componentsWithChildren = [];

var componentsParams =
{
    'Accordion': ['openOneCloseAll'],
	'Canvas2D': ['width', 'height']
};

function CreateHTMLnodePopup($tree, $parentNode, $componentsMode)
{
	////////////////
	// Attributes //
	////////////////
	
	var tree = $tree;
	var parentNode = $parentNode;
	var componentsMode = $componentsMode;
	
	var htmlOptions = '<optgroup label="HTML" >'
							+ '<option value="div" >div</option>'
							+ '<option value="span" >span</option>'
							+ '<option value="header" >header</option>'
							+ '<option value="section" >section</option>'
							+ '<option value="footer" >footer</option>'
							+ '<option value="p" >p</option>'
							+ '<option value="h1" >h1</option>'
							+ '<option value="h2" >h2</option>'
							+ '<option value="h3" >h3</option>'
							+ '<option value="h4" >h4</option>'
							+ '<option value="h5" >h5</option>'
							+ '<option value="h6" >h6</option>'
							+ '<option value="ul" >ul</option>'
							+ '<option value="ol" >ol</option>'
							+ '<option value="li" >li</option>'
							+ '<option value="table" >table</option>'
							+ '<option value="thead" >thead</option>'
							+ '<option value="tbody" >tbody</option>'
							+ '<option value="tfoot" >tfoot</option>'
							+ '<option value="tr" >tr</option>'
							+ '<option value="th" >th</option>'
							+ '<option value="td" >td</option>'
							+ '<option value="input" >input</option>'
							+ '<option value="textarea" >textarea</option>'
							+ '<option value="button" >button</option>'
							+ '<option value="a" >a</option>'
							+ '<option value="img" >img</option>'
							+ '<option value="object" >object</option>'
							+ '<option value="embed" >embed</option>'
							+ '<option value="label" >label</option>'
							+ '<option value="form" >form</option>'
							+ '<option value="select" >select</option>'
							+ '<option value="option" >option</option>'
							+ '<option value="textNode" >Text node</option>'
						+ '</optgroup>'
						+ '<optgroup label="SVG" >'
							+ '<option value="svg" >svg</option>'
							+ '<option value="defs" >defs</option>'
							+ '<option value="marker" >marker</option>'
							+ '<option value="g" >g</option>'
							+ '<option value="rect" >rect</option>'
							+ '<option value="polyline" >polyline</option>'
							+ '<option value="path" >path</option>'
							+ '<option value="linearGradient" >linearGradient</option>'
							+ '<option value="radialGradient" >radialGradient</option>'
							+ '<option value="foreignObject" >foreignObject</option>'
						+ '</optgroup>';
	
	if (componentsMode === true)
	{
		htmlOptions = htmlOptions + '<optgroup label="Components" >';
		
		for (var i = 0; i < componentsList.length; i++)
			htmlOptions = htmlOptions + '<option value="' + componentsList[i] + '" >' + componentsList[i] + '</option>';
		
		htmlOptions = htmlOptions + '</optgroup>';
	}
	
	var html = '<div>'
						+ '<select id="nodeType" >'
							+ htmlOptions
						+ '</select>'
					+ '</div>';
	
	var confirmPopup = new ConfirmPopup(html, false);
	
	/////////////
	// Methods //
	/////////////
	
	var addDefaultAttribute = function($node, $name)
	{
		var idAttributeInput = new HTMLattributeInput();
		idAttributeInput.getById('name').value = $name;
		$node.getHTMLattributesPanel().addAttributeInput(idAttributeInput);
	};
	
	/////////////////
	// Init events //
	/////////////////
	
	confirmPopup.onOk = function()
	{
		var nodeType = confirmPopup.getById('nodeType').value;
		var newNode = new HTMLnodeItem(nodeType, tree, componentsMode);
		
		//// Attributs par défaut ////
		
		// Cas des composants graphiques
		
		if (componentsList.indexOf(nodeType) >= 0)
		{
			var paramList = componentsParams[nodeType];
			
			for (var i = 0; i < paramList.length; i++)
				addDefaultAttribute(newNode, paramList[i]);
		}
		
		// Balises normales
		
		else
		{
			addDefaultAttribute(newNode, 'id');
			addDefaultAttribute(newNode, 'class');
            
            if (nodeType === 'a')
            {
                addDefaultAttribute(newNode, 'href');
                addDefaultAttribute(newNode, 'title');
            }
            else if (nodeType === 'input')
            {
                addDefaultAttribute(newNode, 'type');
                addDefaultAttribute(newNode, 'name');
                addDefaultAttribute(newNode, 'value');
                addDefaultAttribute(newNode, 'placeholder');
            }
            else if (nodeType === 'textarea')
            {
                addDefaultAttribute(newNode, 'name');
                addDefaultAttribute(newNode, 'placeholder');
            }
            else if (nodeType === 'object')
            {
                addDefaultAttribute(newNode, 'data');
                addDefaultAttribute(newNode, 'type');
                addDefaultAttribute(newNode, 'width');
                addDefaultAttribute(newNode, 'height');
            }
            else if (nodeType === 'embed')
            {
                addDefaultAttribute(newNode, 'src');
                addDefaultAttribute(newNode, 'type');
            }
            else if (nodeType === 'img')
            {
                addDefaultAttribute(newNode, 'src');
                addDefaultAttribute(newNode, 'title');
                addDefaultAttribute(newNode, 'alt');
            }
            else if (nodeType === 'label')
            {
                addDefaultAttribute(newNode, 'for');
            }
            else if (nodeType === 'form')
            {
                addDefaultAttribute(newNode, 'target');
                addDefaultAttribute(newNode, 'method');
                addDefaultAttribute(newNode, 'enctype');
            }
            else if (nodeType === 'select')
            {
                addDefaultAttribute(newNode, 'name');
            }
            else if (nodeType === 'option')
            {
                addDefaultAttribute(newNode, 'value');
                addDefaultAttribute(newNode, 'selected');
            }
            
            // SVG
            
            else if (nodeType === 'svg')
            {
                addDefaultAttribute(newNode, 'xmlns');
                addDefaultAttribute(newNode, 'viewBox');
            }
            else if (nodeType === 'marker')
            {
                addDefaultAttribute(newNode, 'markerWidth');
                addDefaultAttribute(newNode, 'markerHeight');
                addDefaultAttribute(newNode, 'refX');
                addDefaultAttribute(newNode, 'refY');
                addDefaultAttribute(newNode, 'orient');
            }
            else if (nodeType === 'polyline')
            {
                addDefaultAttribute(newNode, 'points');
            }
            else if (nodeType === 'path')
            {
                addDefaultAttribute(newNode, 'd');
            }
            else if (nodeType === 'linearGradient')
            {
                addDefaultAttribute(newNode, 'x1');
                addDefaultAttribute(newNode, 'y1');
                addDefaultAttribute(newNode, 'x2');
                addDefaultAttribute(newNode, 'y2');
            }
            else if (nodeType === 'radialGradient')
            {
                addDefaultAttribute(newNode, 'gradientUnits');
            }
            else if (nodeType === 'foreignObject')
            {
                addDefaultAttribute(newNode, 'x');
                addDefaultAttribute(newNode, 'y');
            }
		}
		
		//// Accrocher à l'arbre ////
		
		if (!utils.isset(parentNode))
			tree.deselectAll();
		else
			parentNode.select();
		
		tree.addElement(newNode);
		//tree.deselectAll();
		
		Events.emit('onOpenTreePanel', [tree]);
		
		tabManager.focus();
		
		return true;
	};
	
	confirmPopup.onCancel = function() { tabManager.focus(); };

	////////////
	// Extend //
	////////////

	var $this = utils.extend(confirmPopup, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("createHTMLnodePopup");