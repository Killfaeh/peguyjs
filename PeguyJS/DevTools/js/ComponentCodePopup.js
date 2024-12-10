function ComponentCodePopup($jsCode, $cssCode)
{
	////////////////
	// Attributes //
	////////////////

	var jsCode = $jsCode;
	var cssCode = $cssCode;

	var popupHTML = '<h2>Component code</h2>'
						+ '<h3 class="htmlTitle" >Javascript</h3>'
						+ '<h3 class="cssTitle" >CSS</h3>'
						+ '<div id="code-block-html" class="code-block-html" >'
							+ '<pre id="code-content-html" >' + jsCode.replace(/&/gi, '&amp;').replace(/</gi, '&lt;').replace(/>/gi, '&gt;') + '</pre>'
						+ '</div>'
						+ '<div id="code-block-css" class="code-block-css" >'
							+ '<pre id="code-content-css" >' + cssCode + '</pre>'
						+ '</div>'
						+ '<div id="copyHTMLicon" class="copyHTMLicon" ></div>'
						+ '<div id="copyCSSicon" class="copyCSSicon" ></div>';
	
	var popup = new Popup(popupHTML);
	
	popup.addClass('code-popup-component');
	
	var copyHTMLicon = Loader.getSVG('icons', 'copy-paste-icon', 30, 30);
	var copyCSSicon = Loader.getSVG('icons', 'copy-paste-icon', 30, 30);
	
	popup.getById('copyHTMLicon').appendChild(copyHTMLicon);
	popup.getById('copyCSSicon').appendChild(copyCSSicon);
	
	/////////////////
	// Init events //
	/////////////////
	
	copyHTMLicon.onClick = function()
	{
		dataManager.toClipboard(popup.getById('code-content-html').innerHTML.replace(/<br ?\/?>/gi, '\n').replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&amp;/gi, '&'), 
									function()
									{
										console.log("Le code Javascript a bien été copié dans le presse papier.");
										
										message = '<p style="text-align: left;" >'
													+ "Le code Javascript a bien été copié dans le presse papier." 
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
										console.log("Le code CSS a bien été copié dans le presse papier.");
										
										message = '<p style="text-align: left;" >'
													+ "Le code CSS a bien été copié dans le presse papier." 
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
	Loader.hasLoaded("componentCodePopup");