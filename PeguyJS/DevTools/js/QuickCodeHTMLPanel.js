function QuickCodeHTMLPanel()
{
	////////////////
	// Attributes //
	////////////////


	var html = '<div class="quickCodePanel" >'
				+ '<table>'
				+ '<tr>'
					+ '<td>' + "Create empty page" + '</td>'
					+ '<td><input id="copyEmptyPage" type="button" value="Copy" /></td>'
					+ '<td>'
						+ '<pre>'
							+ "&lt;!DOCTYPE html&gt;<br />"
							+ "&lt;html&gt;<br />"
							+ "	&lt;head id=\"head\" &gt;<br />"
							+ "		&lt;meta charset=\"utf-8\" /&gt;<br />"
							+ "<br />"
							+ "		&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" /&gt;<br />"
							+ "		&lt;meta name=\"viewport\" content=\"width=device-width, minimum-scale=1\" /&gt;<br />"
							+ "		&lt;meta name=\"viewport\" content=\"width=device-width, maximum-scale=1\" /&gt;<br />"
							+ "		&lt;meta name=\"apple-mobile-web-app-capable\" content=\"yes\" /&gt;<br />"
							+ "		&lt;meta name=“viewport” content=”initial-scale=1, viewport-fit=cover”&gt;<br />"
							+ "<br />"
							+ "		&lt;title&gt;&lt;/title&gt;<br />"
							+ "	&lt;/head&gt;<br />"
							+ "<br />"
							+ "	&lt;body id=\"main\" &gt;<br />"
							+ "	&lt;/body&gt;<br />"
							+ "&lt;/html&gt;<br />"
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
	
	component.getById('copyEmptyPage').onClick = function()
	{
		var code = '<!DOCTYPE html>\n'
					+ '<html>\n'
					+ '	<head id="head" >\n'
					+ '		<meta charset="utf-8" />\n'
					+ '\n'
					+ '		<meta name="viewport" content="width=device-width, initial-scale=1" />\n'
					+ '		<meta name="viewport" content="width=device-width, minimum-scale=1" />\n'
					+ '		<meta name="viewport" content="width=device-width, maximum-scale=1" />\n'
					+ '		<meta name="apple-mobile-web-app-capable" content="yes" />\n'
					+ '		<meta name=“viewport” content=”initial-scale=1, viewport-fit=cover”>\n'
					+ '\n'
					+ '		<title></title>\n'
					+ '	</head>\n'
					+ '\n'
					+ '	<body id="main" >\n'
					+ '	</body>\n'
					+ '</html>\n';
		
		$this.toClipboard(code);
	};

	////////////
	// Extend //
	////////////

	var $this = utils.extend(component, this);
	return $this;
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("quickCodeHTMLPanel");
