function QuickCodeCSSPanel()
{
	////////////////
	// Attributes //
	////////////////


	var html = '<div class="quickCodePanel" >'
				+ '<table>'
				
					+ '<tr>'
						+ '<td>' + "Absolute position (0, 0, 0, 0)" + '</td>'
						+ '<td><input id="absolutePosition0" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'position: absolute;<br />'
								+ 'left: 0px;<br />'
								+ 'right: 0px;<br />'
								+ 'top: 0px;<br />'
								+ 'bottom: 0px;'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Absolute position (10, 10, 10, 10)" + '</td>'
						+ '<td><input id="absolutePosition10" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'position: absolute;<br />'
								+ 'left: 10px;<br />'
								+ 'right: 10px;<br />'
								+ 'top: 10px;<br />'
								+ 'bottom: 10px;'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
                    
                    + '<tr>'
                        + '<td>' + "Vertical align" + '</td>'
                        + '<td><input id="verticalAlign" type="button" value="Copy" /></td>'
                        + '<td>'
                            + '<pre>'
                                + 'display: inline-block;<br />'
                                + 'vertical-align: middle;'
                            + '</pre>'
                        + '</td>'
                    + '</tr>'
                    
                    + '<tr>'
                        + '<td>' + "List with no style type" + '</td>'
                        + '<td><input id="listWithNoStyleType" type="button" value="Copy" /></td>'
                        + '<td>'
                            + '<pre>'
                                + 'ul<br />'
                                + '{<br />'
                                + '    margin: 0px;<br />'
                                + '    padding: 0px;<br />'
                                + '}<br /><br />'
                                + 'li<br />'
                                + '{<br />'
                                + '    list-style-type: none;<br />'
                                + '    text-align: left;<br />'
                                + '    margin: 0px;<br />'
                                + '}<br /><br />'
                            + '</pre>'
                        + '</td>'
                    + '</tr>'
                    
                    + '<tr>'
                        + '<td>' + "Inline list" + '</td>'
                        + '<td><input id="inlineList" type="button" value="Copy" /></td>'
                        + '<td>'
                            + '<pre>'
                                + 'ul<br />'
                                + '{<br />'
                                + '    margin: 0px;<br />'
                                + '    padding: 0px;<br />'
                                 + '    text-align: left;<br />'
                                + '    white-space: nowrap;<br />'
                                + '}<br /><br />'
                                + 'li<br />'
                                + '{<br />'
                                + '    list-style-type: none;<br />'
                                + '    margin: 0px;<br />'
                                + '    display: inline-block;<br />'
                                + '    vertical-align: middle;<br />'
                                + '    white-space: nowrap;<br />'
                                + '}<br /><br />'
                            + '</pre>'
                        + '</td>'
                    + '</tr>'
                    
                    + '<tr>'
                        + '<td>' + "Table" + '</td>'
                        + '<td><input id="table" type="button" value="Copy" /></td>'
                        + '<td>'
                            + '<pre>'
                                + 'table<br />'
                                + '{<br />'
                                + '    border-collapse: collapse;<br />'
                                + '}<br /><br />'
                                + 'table th,<br />'
                                + 'table td<br />'
                                + '{<br />'
                                + '    padding: 10px<br />'
                                + '    border: 1px solid rgb(0, 0, 0);<br />'
                                + '}<br /><br />'
                            + '</pre>'
                        + '</td>'
                    + '</tr>'
					
				+ '</table>'
				+ '</div>';

	var component = new Component(html);

	/////////////
	// Methods //
	/////////////

	this.toClipboard = function($code)
	{
		console.log("Execute toClipboard...");
		
		dataManager.toClipboard($code.replace(/<br ?\/?>/gi, '\n').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>'), 
									function()
									{
										console.log("Le code a bien été copiée dans le presse papier.");
										
										var message = '<p style="text-align: left;" >'
													+ "Le code a bien été copiée dans le presse papier." 
												+ '</p>';
										
										notifCenter.push(message, false);
									}, 
									function() { console.log("La copie a échoué."); });
	};

	/////////////////
	// Init events //
	/////////////////
	
	component.getById('absolutePosition0').onClick = function()
	{
		var code = '	position: absolute;\n'
					+ '	left: 0px;\n'
					+ '	right: 0px;\n'
					+ '	top: 0px;\n'
					+ '	bottom: 0px;';
		
		$this.toClipboard(code);
	};
	
	component.getById('absolutePosition10').onClick = function()
	{
		var code = '	position: absolute;\n'
					+ '	left: 10px;\n'
					+ '	right: 10px;\n'
					+ '	top: 10px;\n'
					+ '	bottom: 10px;';
		
		$this.toClipboard(code);
	};
    
    component.getById('verticalAlign').onClick = function()
    {
        var code = '    display: inline-block;\n'
                    + '    vertical-align: middle;';
        
        $this.toClipboard(code);
    };
    
    component.getById('listWithNoStyleType').onClick = function()
    {
        var code = 'ul\n'
                    + '{\n'
                    + '    margin: 0px;\n'
                    + '    padding: 0px;\n'
                    + '}\n\n'
                    + 'li\n'
                    + '{\n'
                    + '    list-style-type: none;\n'
                    + '    text-align: left;\n'
                    + '    margin: 0px;\n'
                    + '}\n\n';
        
        $this.toClipboard(code);
    };
    
    component.getById('inlineList').onClick = function()
    {
        var code = 'ul\n'
                    + '{\n'
                    + '    margin: 0px;\n'
                    + '    padding: 0px;\n'
                     + '    text-align: left;\n'
                    + '    white-space: nowrap;\n'
                    + '}\n\n'
                    + 'li\n'
                    + '{\n'
                    + '    list-style-type: none;\n'
                    + '    margin: 0px;\n'
                    + '    display: inline-block;\n'
                    + '    vertical-align: middle;\n'
                    + '    white-space: nowrap;\n'
                    + '}\n\n';
        
        $this.toClipboard(code);
    };
    
    component.getById('table').onClick = function()
    {
        var code = 'table\n'
                    + '{\n'
                    + '    border-collapse: collapse;\n'
                    + '}\n\n'
                    + 'table th,\n'
                    + 'table td\n'
                    + '{\n'
                    + '    padding: 10px\n'
                    + '    border: 1px solid rgb(0, 0, 0);\n'
                    + '}\n\n';
        
        $this.toClipboard(code);
    };

	///////////////////////
	// Getters & Setters //
	///////////////////////

	// GET


	// SET


	////////////
	// Extend //
	////////////

	var $this = utils.extend(component, this);
	return $this;
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("quickCodeCSSPanel");
