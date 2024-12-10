function QuickCodeJSPanel()
{
	////////////////
	// Attributes //
	////////////////


	var html = '<div class="quickCodePanel" >'
				+ '<table>'
	
					+ '<tr>'
						+ '<td>' + "To clipboard" + '</td>'
						+ '<td><input id="toClipboard" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+'if (!navigator.clipboard)<br />' 
								+'{<br />' 
								+'	var textArea = document.createElement("textarea");<br />' 
								+'	textArea.value = "Hello world !";<br />' 
								+'	<br />' 
								+'	textArea.style.top = "-1000000000px";<br />' 
								+'	textArea.style.left = "-1000000000px";<br />' 
								+'	textArea.style.width = "100px";<br />' 
								+'	textArea.style.height = "100px";<br />' 
								+'	textArea.style.position = "absolute";<br />' 
								+'	<br />' 
								+'	document.body.appendChild(textArea);<br />' 
								+'	textArea.focus();<br />' 
								+'	textArea.select();<br />' 
								+'	<br />' 
								+'	try<br />' 
								+'	{<br />' 
								+'		var successful = document.execCommand("copy");<br />' 
								+'		<br />' 
								+'		if (successful)<br />' 
								+'		{<br />'
								+'			// Something to do...<br />'
								+'		} <br />'
								+'		else<br />' 
								+'		{<br />'
								+'			// Something to do...<br />'
								+'		} <br />'
								+'	}<br />' 
								+'	catch ($error) <br />'
								+'	{<br />'
								+'		// Something to do...<br />'
								+'	} <br />'
								+'	<br />' 
								+'	document.body.removeChild(textArea);<br />' 
								+'}<br />' 
								+'else<br />' 
								+'{<br />' 
								+'	navigator.clipboard.writeText("Hello world !").then(function()<br />'
								+'	{<br />'
								+'		// Something to do...<br />'
								+'	}, <br />'
								+'	function($error) <br />'
								+'	{<br />'
								+'		// Something to do...<br />'
								+'	});<br />'
								+'}'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create regex" + '</td>'
						+ '<td><input id="createRegex" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+'var myRegex = new RegExp("[a-z]");<br />'
								+'var matchMyRegex = inputStr.match(myRegex);<br />'
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
	
	component.getById('createRegex').onClick = function()
	{
		var code = 'var myRegex = new RegExp("[a-z]");\n' 
					+'var matchMyRegex = inputStr.match(myRegex);\n';
		
		$this.toClipboard(code);
	};

	////////////
	// Extend //
	////////////

	var $this = utils.extend(component, this);
	return $this;
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("quickCodeJSPanel");
