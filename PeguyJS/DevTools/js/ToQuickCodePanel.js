function ToQuickCodePanel()
{
	////////////////
	// Attributes //
	////////////////
	
	var codeToDisplay = '';
	var codeToCopy = '';
	
	var html = '<div class="toQuickCodePanel" >'
					+ '<div id="leftPanel" class="leftPanel" >'
						+ '<div class="panel" >'
							+ '<table>'
								+ '<tr>'
									+ '<th colspan="2" ><h4>' + "Original code" + '</h4></th>'
								+ '</tr>'
								+ '<tr>'
									+ '<th style="text-align: left; " >Row title</th>'
									+ '<td><input id="rowTitle" type="text" /></td>'
								+ '</tr>'
								+ '<tr>'
									+ '<th style="text-align: left; " >Button name</th>'
									+ '<td><input id="buttonName" type="text" /></td>'
								+ '</tr>'
							+ '</table>'
							+ '<div id="original-code-block" class="code-block original-code-block" >'
								+ '<textarea id="original-code-content" ></textarea>'
							+ '</div>'
						+ '</div>'
					+ '</div>'
					+ '<div id="rightPanel" class="rightPanel" >'
						+ '<div class="panel topPanel" >'
							+ '<h4>' + "Code to display" + '</h4>'
							+ '<div class="code-block" >'
								+ '<pre id="code-to-display-content" ></pre>'
							+ '</div>'
							+ '<div id="copyIcon1" class="copyIcon" ></div>'
						+ '</div>'
						+ '<div class="panel bottomPanel" >'
							+ '<h4>' + "Code to copy" + '</h4>'
							+ '<div class="code-block" >'
								+ '<pre id="code-to-copy-content" ></pre>'
							+ '</div>'
							+ '<div id="copyIcon2" class="copyIcon" ></div>'
						+ '</div>'
					+ '</div>'
				+ '</div>';
	
	var component = new Component(html);
	
	var copyIcon1 = Loader.getSVG('icons', 'copy-paste-icon', 30, 30);
	component.getById('copyIcon1').appendChild(copyIcon1);
	
	var copyIcon2 = Loader.getSVG('icons', 'copy-paste-icon', 30, 30);
	component.getById('copyIcon2').appendChild(copyIcon2);
	
	/////////////
	// Methods //
	/////////////
	
	var update = function()
	{
		console.log("Update ! ");

		var rowTitle = component.getById('rowTitle').value;
		var buttonName = component.getById('buttonName').value;
		var originalCode = component.getById('original-code-content').value;

		codeToDisplay = '';
		codeToCopy = '';

		if (buttonName !== '')
		{
			var codeRows = originalCode.split('\n');

			for (var i = 0; i < codeRows.length; i++)
			{
				var codeRow = codeRows[i];

				codeToDisplay = codeToDisplay + '								+ "' + codeRow.replace(/&/gi, '&amp;').replace(/"/gi, '\\"').replace(/</gi, '&lt;').replace(/>/gi, '&gt;') + '<br />"\n';

				if (i === 0)
					codeToCopy = codeToCopy + '"';
				else
					codeToCopy = codeToCopy + '					+ "';
				
				codeToCopy = codeToCopy + codeRow.replace(/"/gi, '\\"') + '[br]"\n';
			}

			codeToDisplay = "+ '<tr>'\n"
							+ "						+ '<td>' + \"" + rowTitle + "\" + '</td>'\n"
							+ "						+ '<td><input id=\"" + buttonName + "\" type=\"button\" value=\"Copy\" /></td>'\n"
							+ "						+ '<td>'\n"
							+ "							+ '<pre>'\n"
							+ codeToDisplay
							+ "							+ '</pre>'\n"
							+ "						+ '</td>'\n"
							+ "					+ '</tr>'";
			
			codeToCopy = "component.getById('" + buttonName + "').onClick = function()\n"
							+ "	{\n"
							+ "		var code = "
							+ codeToCopy
							+ ";\n"
							+ "		$this.toClipboard(code);\n"
							+ "	};\n";
		}

		component.getById('code-to-display-content').innerHTML = codeToDisplay.replace(/</gi, '&lt;').replace(/>/gi, '&gt;').replace(/\n/gi, '<br />');
		component.getById('code-to-copy-content').innerHTML = codeToCopy.replace(/</gi, '&lt;').replace(/>/gi, '&gt;').replace(/\n/gi, '<br />').replace(/\[br\]/gi, '\\n');
	};

	var toClipboard = function($code)
	{
		dataManager.toClipboard($code, function()
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
	
	component.getById('original-code-content').onChange = function() { update(); };
	component.getById('original-code-content').onpaste = function() { update(); };

	component.getById('original-code-content').onKeyUp = function($event)
	{
		update();
	};

	copyIcon1.onClick = function() { toClipboard(codeToDisplay); };
	copyIcon2.onClick = function() { toClipboard(codeToCopy.replace(/\[br\]/gi, '\\n')); };
	
	////////////
	// Extend //
	////////////

	var $this = utils.extend(component, this);
	return $this;
}

if (Loader !== undefined && Loader !== null)
	Loader.hasLoaded("toQuickCodePanel");