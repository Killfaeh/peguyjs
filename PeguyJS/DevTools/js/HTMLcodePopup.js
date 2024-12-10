function HTMLcodePopup($htmlCode, $cssCode)
{
	////////////////
	// Attributes //
	////////////////

	var htmlCode = $htmlCode.replace(/\n/gi, '\n\t\t').replace(/\t+$/, '');
	var cssCode = $cssCode;
	
	var htmlBase = '<!DOCTYPE html>\n'
					+ '<html>\n'
					+ '	<head>\n'
					+ '		<meta charset="utf-8" />\n\n'
					+ '		<meta name="viewport" content="width=device-width, initial-scale=1" />\n'
					+ '		<meta name="viewport" content="width=device-width, minimum-scale=1" />\n'
					+ '		<meta name="viewport" content="width=device-width, maximum-scale=1" />\n'
					+ '		<meta name="apple-mobile-web-app-capable" content="yes" />\n'
					+ '		<meta name="viewport" content="initial-scale=1, viewport-fit=cover" />\n\n'
					+ '		<title></title>\n\n'
					+ '		<link rel="stylesheet" href="path/stylesheet.css">\n\n'
					+ '	</head>\n'
					+ '	<body>\n'
					+ '{HTMLcode}'
					+ '	</body>\n'
					+ '</html>';

	var popupHTML = '<h2>HTML page code</h2>'
						+ '<h3 class="htmlTitle" >HTML</h3>'
						+ '<h3 class="cssTitle" >CSS</h3>'
						+ '<div id="code-block-html" class="code-block-html" >'
							+ '<pre id="code-content-html" >' + htmlBase.replace("{HTMLcode}", '\t\t' + htmlCode).replace(/</gi, '&lt;').replace(/>/gi, '&gt;') + '</pre>'
						+ '</div>'
						+ '<div id="code-block-css" class="code-block-css" >'
							+ '<pre id="code-content-css" >' + cssCode + '</pre>'
						+ '</div>'
						+ '<div id="copyHTMLicon" class="copyHTMLicon" ></div>'
						+ '<div id="copyCSSicon" class="copyCSSicon" ></div>';
	
	var popup = new Popup(popupHTML);
	
	popup.addClass('code-popup-html');
	
	var copyHTMLicon = Loader.getSVG('icons', 'copy-paste-icon', 30, 30);
	var copyCSSicon = Loader.getSVG('icons', 'copy-paste-icon', 30, 30);
	
	popup.getById('copyHTMLicon').appendChild(copyHTMLicon);
	popup.getById('copyCSSicon').appendChild(copyCSSicon);
	
	/////////////////
	// Init events //
	/////////////////
	
	copyHTMLicon.onClick = function()
	{
		dataManager.toClipboard(popup.getById('code-content-html').innerHTML.replace(/<br ?\/?>/gi, '\n').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>'), 
									function()
									{
										console.log("Le code HTML a bien été copiée dans le presse papier.");
										
										message = '<p style="text-align: left;" >'
													+ "Le code HTML a bien été copiée dans le presse papier." 
												+ '</p>';
										
										notifCenter.push(message, false);
									}, 
									function() { console.log("La copie a échoué."); });
	};
	
	copyCSSicon.onClick = function()
	{
		dataManager.toClipboard(popup.getById('code-content-css').innerHTML.replace(/<br ?\/?>/gi, '\n').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>'), 
									function()
									{
										console.log("Le code CSS a bien été copiée dans le presse papier.");
										
										message = '<p style="text-align: left;" >'
													+ "Le code CSS a bien été copiée dans le presse papier." 
												+ '</p>';
										
										notifCenter.push(message, false);
									}, 
									function() { console.log("La copie a échoué."); });
	};
	
	popup.onHide = function()
	{
		tabManager.focus();
		return true;
	};
	
	this.onKeyUp = function($event)
	{
		if ($event.keyCode === 27)
			popup.hide();
	};
	
	////////////
	// Extend //
	////////////
	
	var $this = utils.extend(popup, this);
	return $this; 
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("htmlCodePopup");