function QuickCodeJanusJSPanel()
{
	////////////////
	// Attributes //
	////////////////


	var html = '<div class="quickCodePanel" >'
				+ '<table>'
					
					+ '<tr>'
						+ '<th colspan="3" style="text-align: left" >' + "Create project base code" + '</th>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create default base code" + '</td>'
						+ '<td><input id="createDefaultBaseCode" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre></pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create ViewManager base code" + '</td>'
						+ '<td><input id="createViewManagerBaseCode" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'function ViewManager()<br />'
								+ '{<br />'
								+ "	////////////////<br />"
								+ '	// Attributes //<br />'
								+ "	////////////////<br />"
								+ '<br />'
								+ '	var grid = new Grid();<br />'
								+ '<br />'
								+ "	/////////////<br />"
								+ '	// Methods //<br />'
								+ "	/////////////<br />"
								+ '<br />'
								+ '	this.init = function()<br />'
								+ '	{<br />'
								+ "		document.getElementById('screen').removeAllChildren();<br />"
								+ "		document.getElementById('screen').appendChild(grid);<br />"
								+ '	};<br />'
								+ '<br />'
								+ '	this.resize = function()<br />'
								+ '	{<br />'
								+ '		<br />'
								+ '	};<br />'
								+ '<br />'
								+ "	///////////////////////<br />"
								+ '	// Getters &amp; Setters //<br />'
								+ "	///////////////////////<br />"
								+ '<br />'
								+ '	// GET<br />'
								+ '<br />'
								+ '	// SET<br />'
								+ '<br />'
								+ '	var $this = this;<br />'
								+ '}<br />'
								+ '<br />'
								+ 'if (Loader !== null &amp;&amp; Loader !== undefined)<br />'
								+ '	Loader.hasLoaded("viewManager");<br />'
								//*/
							+ '</pre>'
						+ '</td>'
					+ '</tr>'

					+ '<tr>'
						+ '<td>' + "Grid1 class" + '<br /><br /><img width="200" src="images/grid01.png" /></td>'
						+ '<td><input id="grid1Class" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ "function Grid1()<br />"
								+ "{<br />"
								+ "	///////////////<br />"
								+ "	// Attributs //<br />"
								+ "	///////////////<br />"
								+ "	<br />"
								+ "	var html = '&lt;div class=\"grid grid1\" &gt;'<br />"
								+ "					+ '&lt;div id=\"leftPanel\" class=\"leftPanel\" &gt;'<br />"
								+ "						+ '&lt;div class=\"panel\" &gt;&lt;/div&gt;'<br />"
								+ "					+ '&lt;/div&gt;'<br />"
								+ "					+ '&lt;div id=\"rightPanel\" class=\"rightPanel\" &gt;'<br />"
								+ "						+ '&lt;div class=\"panel\" &gt;&lt;/div&gt;'<br />"
								+ "					+ '&lt;/div&gt;'<br />"
								+ "				+ '&lt;/div&gt;';<br />"
								+ "	<br />"
								+ "	var component = new Component(html);<br />"
								+ "	<br />"
								+ "	var slide1 = new HorizontalSlide(component.getById('leftPanel'), component.getById('rightPanel'), 300);<br />"
								+ "	component.appendChild(slide1);<br />"
								+ "	<br />"
								+ "	///////////////////////////////////<br />"
								+ "	// Initialisation des événements //<br />"
								+ "	///////////////////////////////////<br />"
								+ "	<br />"
								+ "	slide1.onDrag = function() { Events.resize(); };<br />"
								+ "	<br />"
								+ "	//////////////<br />"
								+ "	// Héritage //<br />"
								+ "	//////////////<br />"
								+ "<br />"
								+ "	var $this = utils.extend(component, this);<br />"
								+ "	return $this;<br />"
								+ "}<br />"
								+ "<br />"
								+ "if (Loader !== undefined &amp;&amp; Loader !== null)<br />"
								+ "	Loader.hasLoaded(\"grid1\");<br />"
							+ '</pre>'
						+ '</td>'
					+ '</tr>'

					+ '<tr>'
						+ '<td>' + "Grid1 css" + '</td>'
						+ '<td><input id="grid1CSS" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ ".grid1<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	left: 0px;<br />"
								+ "	right: 0px;<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid1 .leftPanel, .grid1 .rightPanel<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid1 .leftPanel<br />"
								+ "{<br />"
								+ "	left: 0px;<br />"
								+ "	right: 50%;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid1 .rightPanel<br />"
								+ "{<br />"
								+ "	left: 50%;<br />"
								+ "	right: 0px;<br />"
								+ "}<br />"
								+ "<br />"
							+ '</pre>'
						+ '</td>'
					+ '</tr>'

					+ '<tr>'
						+ '<td>' + "Grid2 class" + '<br /><br /><img width="200" src="images/grid02.png" /></td>'
						+ '<td><input id="grid2Class" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ "function Grid2()<br />"
								+ "{<br />"
								+ "	///////////////<br />"
								+ "	// Attributs //<br />"
								+ "	///////////////<br />"
								+ "	<br />"
								+ "	var html = '&lt;div class=\"grid grid2\" &gt;'<br />"
								+ "					+ '&lt;div id=\"topPanel\" class=\"topPanel\" &gt;'<br />"
								+ "						+ '&lt;div class=\"panel\" &gt;&lt;/div&gt;'<br />"
								+ "					+ '&lt;/div&gt;'<br />"
								+ "					+ '&lt;div id=\"bottomPanel\" class=\"bottomPanel\" &gt;'<br />"
								+ "						+ '&lt;div class=\"panel\" &gt;&lt;/div&gt;'<br />"
								+ "					+ '&lt;/div&gt;'<br />"
								+ "				+ '&lt;/div&gt;';<br />"
								+ "	<br />"
								+ "	var component = new Component(html);<br />"
								+ "	<br />"
								+ "	var slide1 = new VerticalSlide(component.getById('topPanel'), component.getById('bottomPanel'), 300);<br />"
								+ "	component.appendChild(slide1);<br />"
								+ "	<br />"
								+ "	///////////////////////////////////<br />"
								+ "	// Initialisation des événements //<br />"
								+ "	///////////////////////////////////<br />"
								+ "	<br />"
								+ "	slide1.onDrag = function() { Events.resize(); };<br />"
								+ "	<br />"
								+ "	//////////////<br />"
								+ "	// Héritage //<br />"
								+ "	//////////////<br />"
								+ "<br />"
								+ "	var $this = utils.extend(component, this);<br />"
								+ "	return $this;<br />"
								+ "}<br />"
								+ "<br />"
								+ "if (Loader !== undefined &amp;&amp; Loader !== null)<br />"
								+ "	Loader.hasLoaded(\"grid2\");<br />"
							+ '</pre>'
						+ '</td>'
					+ '</tr>'

					+ '<tr>'
						+ '<td>' + "Grid2 css" + '</td>'
						+ '<td><input id="grid2CSS" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ ".grid2<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	left: 0px;<br />"
								+ "	right: 0px;<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid2 .topPanel, .grid2 .bottomPanel<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	left: 0px;<br />"
								+ "	right: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid2 .topPanel<br />"
								+ "{<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 50%;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid2 .bottomPanel<br />"
								+ "{<br />"
								+ "	top: 50%;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
							+ '</pre>'
						+ '</td>'
					+ '</tr>'

					+ '<tr>'
						+ '<td>' + "Grid3 class" + '<br /><br /><img width="200" src="images/grid03.png" /></td>'
						+ '<td><input id="grid3Class" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ "function Grid3()<br />"
								+ "{<br />"
								+ "	///////////////<br />"
								+ "	// Attributs //<br />"
								+ "	///////////////<br />"
								+ "	<br />"
								+ "	var html = '&lt;div class=\"grid grid3\" &gt;'<br />"
								+ "				+ '&lt;div id=\"leftPanel\" class=\"leftPanel\" &gt;&lt;div class=\"panel\" &gt;&lt;/div&gt;&lt;/div&gt;'<br />"
								+ "				+ '&lt;div id=\"rightPanel\" class=\"rightPanel\" &gt;'<br />"
								+ "					+ '&lt;div id=\"leftRightPanel\" class=\"leftRightPanel\" &gt;&lt;div class=\"panel\" &gt;&lt;/div&gt;&lt;/div&gt;'<br />"
								+ "					+ '&lt;div id=\"rightRightPanel\" class=\"rightRightPanel\" &gt;&lt;div class=\"panel\" &gt;&lt;/div&gt;&lt;/div&gt;'<br />"
								+ "				+ '&lt;/div&gt;'<br />"
								+ "			+ '&lt;/div&gt;';<br />"
								+ "	<br />"
								+ "	var component = new Component(html);<br />"
								+ "	<br />"
								+ "	var slide1 = new HorizontalSlide(component.getById('leftPanel'), component.getById('rightPanel'), 300);<br />"
								+ "	var slide2 = new HorizontalSlide(component.getById('leftRightPanel'), component.getById('rightRightPanel'), 300);<br />"
								+ "	<br />"
								+ "	component.appendChild(slide1);<br />"
								+ "	component.getById('rightPanel').appendChild(slide2);<br />"
								+ "	<br />"
								+ "	///////////////////////////////////<br />"
								+ "	// Initialisation des événements //<br />"
								+ "	///////////////////////////////////<br />"
								+ "	<br />"
								+ "	slide1.onDrag = function() { Events.resize(); };<br />"
								+ "	slide2.onDrag = function() { Events.resize(); };<br />"
								+ "	<br />"
								+ "	//////////////<br />"
								+ "	// Héritage //<br />"
								+ "	//////////////<br />"
								+ "<br />"
								+ "	var $this = utils.extend(component, this);<br />"
								+ "	return $this;<br />"
								+ "}<br />"
								+ "<br />"
								+ "if (Loader !== undefined &amp;&amp; Loader !== null)<br />"
								+ "	Loader.hasLoaded(\"grid3\");<br />"
							+ '</pre>'
						+ '</td>'
					+ '</tr>'

					+ '<tr>'
						+ '<td>' + "Grid3 css" + '</td>'
						+ '<td><input id="grid3CSS" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ ".grid3<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	left: 0px;<br />"
								+ "	right: 0px;<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid3 .leftPanel, .grid3 .rightPanel, .grid3 .leftRightPanel, .grid3 .rightRightPanel<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid3 .leftPanel<br />"
								+ "{<br />"
								+ "	left: 0px;<br />"
								+ "	right: 67%;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid3 .rightPanel<br />"
								+ "{<br />"
								+ "	left: 33%;<br />"
								+ "	right: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid3 .leftRightPanel<br />"
								+ "{<br />"
								+ "	left: 0px;<br />"
								+ "	right: 50%;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid3 .rightRightPanel<br />"
								+ "{<br />"
								+ "	left: 50%;<br />"
								+ "	right: 0px;<br />"
								+ "}<br />"
							+ '</pre>'
						+ '</td>'
					+ '</tr>'

					+ '<tr>'
						+ '<td>' + "Grid4 class" + '<br /><br /><img width="200" src="images/grid04.png" /></td>'
						+ '<td><input id="grid4Class" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ "function Grid4()<br />"
								+ "{<br />"
								+ "	///////////////<br />"
								+ "	// Attributs //<br />"
								+ "	///////////////<br />"
								+ "	<br />"
								+ "	var html = '&lt;div class=\"grid grid4\" &gt;'<br />"
								+ "				+ '&lt;div id=\"leftPanel\" class=\"leftPanel\" &gt;&lt;div class=\"panel\" &gt;&lt;/div&gt;&lt;/div&gt;'<br />"
								+ "				+ '&lt;div id=\"rightPanel\" class=\"rightPanel\" &gt;'<br />"
								+ "					+ '&lt;div id=\"topPanel\" class=\"topPanel\" &gt;&lt;div class=\"panel\" &gt;&lt;/div&gt;&lt;/div&gt;'<br />"
								+ "					+ '&lt;div id=\"bottomPanel\" class=\"bottomPanel\" &gt;&lt;div class=\"panel\" &gt;&lt;/div&gt;&lt;/div&gt;'<br />"
								+ "				+ '&lt;/div&gt;'<br />"
								+ "			+ '&lt;/div&gt;';<br />"
								+ "	<br />"
								+ "	var component = new Component(html);<br />"
								+ "	<br />"
								+ "	var slide1 = new HorizontalSlide(component.getById('leftPanel'), component.getById('rightPanel'), 500);<br />"
								+ "	var slide2 = new VerticalSlide(component.getById('topPanel'), component.getById('bottomPanel'), 300);<br />"
								+ "	<br />"
								+ "	component.appendChild(slide1);<br />"
								+ "	component.getById('rightPanel').appendChild(slide2);<br />"
								+ "	<br />"
								+ "	///////////////////////////////////<br />"
								+ "	// Initialisation des événements //<br />"
								+ "	///////////////////////////////////<br />"
								+ "	<br />"
								+ "	slide1.onDrag = function() { Events.resize(); };<br />"
								+ "	slide2.onDrag = function() { Events.resize(); };<br />"
								+ "	<br />"
								+ "	//////////////<br />"
								+ "	// Héritage //<br />"
								+ "	//////////////<br />"
								+ "<br />"
								+ "	var $this = utils.extend(component, this);<br />"
								+ "	return $this;<br />"
								+ "}<br />"
								+ "<br />"
								+ "if (Loader !== undefined &amp;&amp; Loader !== null)<br />"
								+ "	Loader.hasLoaded(\"grid4\");<br />"
							+ '</pre>'
						+ '</td>'
					+ '</tr>'

					+ '<tr>'
						+ '<td>' + "Grid4 css" + '</td>'
						+ '<td><input id="grid4CSS" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ ".grid4<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	left: 0px;<br />"
								+ "	right: 0px;<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid4 .leftPanel, .grid4 .rightPanel<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid4 .leftPanel<br />"
								+ "{<br />"
								+ "	left: 0px;<br />"
								+ "	right: 500px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid4 .rightPanel<br />"
								+ "{<br />"
								+ "	left: calc(100% - 500px);<br />"
								+ "	right: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid4 .topPanel, .grid4 .bottomPanel<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	left: 0px;<br />"
								+ "	right: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid4 .topPanel<br />"
								+ "{<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 50%;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid4 .bottomPanel<br />"
								+ "{<br />"
								+ "	top: 50%;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
							+ '</pre>'
						+ '</td>'
					+ '</tr>'

					+ '<tr>'
						+ '<td>' + "Grid5 class" + '<br /><br /><img width="200" src="images/grid05.png" /></td>'
						+ '<td><input id="grid5Class" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ "function Grid5()<br />"
								+ "{<br />"
								+ "	///////////////<br />"
								+ "	// Attributs //<br />"
								+ "	///////////////<br />"
								+ "	<br />"
								+ "	var html = '&lt;div class=\"grid grid5\" &gt;'<br />"
								+ "				+ '&lt;div id=\"leftPanel\" class=\"leftPanel\" &gt;'<br />"
								+ "					+ '&lt;div id=\"topPanel\" class=\"topPanel\" &gt;&lt;div class=\"panel\" &gt;&lt;/div&gt;&lt;/div&gt;'<br />"
								+ "					+ '&lt;div id=\"bottomPanel\" class=\"bottomPanel\" &gt;&lt;div class=\"panel\" &gt;&lt;/div&gt;&lt;/div&gt;'<br />"
								+ "				+ '&lt;/div&gt;'<br />"
								+ "				+ '&lt;div id=\"rightPanel\" class=\"rightPanel\" &gt;&lt;div class=\"panel\" &gt;&lt;/div&gt;&lt;/div&gt;'<br />"
								+ "			+ '&lt;/div&gt;';<br />"
								+ "	<br />"
								+ "	var component = new Component(html);<br />"
								+ "	<br />"
								+ "	var slide1 = new HorizontalSlide(component.getById('leftPanel'), component.getById('rightPanel'), 500);<br />"
								+ "	var slide2 = new VerticalSlide(component.getById('topPanel'), component.getById('bottomPanel'), 300);<br />"
								+ "	<br />"
								+ "	component.appendChild(slide1);<br />"
								+ "	component.getById('leftPanel').appendChild(slide2);<br />"
								+ "	<br />"
								+ "	///////////////////////////////////<br />"
								+ "	// Initialisation des événements //<br />"
								+ "	///////////////////////////////////<br />"
								+ "	<br />"
								+ "	slide1.onDrag = function() { Events.resize(); };<br />"
								+ "	slide2.onDrag = function() { Events.resize(); };<br />"
								+ "	<br />"
								+ "	//////////////<br />"
								+ "	// Héritage //<br />"
								+ "	//////////////<br />"
								+ "<br />"
								+ "	var $this = utils.extend(component, this);<br />"
								+ "	return $this;<br />"
								+ "}<br />"
								+ "<br />"
								+ "if (Loader !== undefined &amp;&amp; Loader !== null)<br />"
								+ "	Loader.hasLoaded(\"grid5\");<br />"
							+ '</pre>'
						+ '</td>'
					+ '</tr>'

					+ '<tr>'
						+ '<td>' + "Grid5 css" + '</td>'
						+ '<td><input id="grid5CSS" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ ".grid5<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	left: 0px;<br />"
								+ "	right: 0px;<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid5 .leftPanel, .grid5 .rightPanel<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid5 .leftPanel<br />"
								+ "{<br />"
								+ "	left: 0px;<br />"
								+ "	right: calc(100% - 500px);<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid5 .rightPanel<br />"
								+ "{<br />"
								+ "	left: 500px;<br />"
								+ "	right: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid5 .topPanel, .grid5 .bottomPanel<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	left: 0px;<br />"
								+ "	right: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid5 .topPanel<br />"
								+ "{<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 50%;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid5 .bottomPanel<br />"
								+ "{<br />"
								+ "	top: 50%;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
							+ '</pre>'
						+ '</td>'
					+ '</tr>'

					+ '<tr>'
						+ '<td>' + "Grid6 class" + '<br /><br /><img width="200" src="images/grid06.png" /></td>'
						+ '<td><input id="grid6Class" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ "function Grid6()<br />"
								+ "{<br />"
								+ "	///////////////<br />"
								+ "	// Attributs //<br />"
								+ "	///////////////<br />"
								+ "	<br />"
								+ "	var html = '&lt;div class=\"grid grid6\" &gt;'<br />"
								+ "				+ '&lt;div id=\"leftPanel\" class=\"leftPanel\" &gt;&lt;div class=\"panel\" &gt;&lt;/div&gt;&lt;/div&gt;'<br />"
								+ "				+ '&lt;div id=\"rightPanel\" class=\"rightPanel\" &gt;'<br />"
								+ "					+ '&lt;div id=\"topPanel\" class=\"topPanel\" &gt;&lt;div class=\"panel\" &gt;&lt;/div&gt;&lt;/div&gt;'<br />"
								+ "					+ '&lt;div id=\"bottomPanel\" class=\"bottomPanel\" &gt;'<br />"
								+ "						+ '&lt;div id=\"topBottomPanel\" class=\"topBottomPanel\" &gt;&lt;div class=\"panel\" &gt;&lt;/div&gt;&lt;/div&gt;'<br />"
								+ "						+ '&lt;div id=\"bottomBottomPanel\" class=\"bottomBottomPanel\" &gt;&lt;div class=\"panel\" &gt;&lt;/div&gt;&lt;/div&gt;'<br />"
								+ "					+ '&lt;/div&gt;'<br />"
								+ "				+ '&lt;/div&gt;'<br />"
								+ "			+ '&lt;/div&gt;';<br />"
								+ "	<br />"
								+ "	var component = new Component(html);<br />"
								+ "	<br />"
								+ "	var slide1 = new HorizontalSlide(component.getById('leftPanel'), component.getById('rightPanel'), 500);<br />"
								+ "	var slide2 = new VerticalSlide(component.getById('topPanel'), component.getById('bottomPanel'), 300);<br />"
								+ "	var slide3 = new VerticalSlide(component.getById('topBottomPanel'), component.getById('bottomBottomPanel'), 300);<br />"
								+ "	<br />"
								+ "	component.appendChild(slide1);<br />"
								+ "	component.getById('rightPanel').appendChild(slide2);<br />"
								+ "	component.getById('bottomPanel').appendChild(slide3);<br />"
								+ "	<br />"
								+ "	///////////////////////////////////<br />"
								+ "	// Initialisation des événements //<br />"
								+ "	///////////////////////////////////<br />"
								+ "	<br />"
								+ "	slide1.onDrag = function() { Events.resize(); };<br />"
								+ "	slide2.onDrag = function() { Events.resize(); };<br />"
								+ "	slide3.onDrag = function() { Events.resize(); };<br />"
								+ "	<br />"
								+ "	//////////////<br />"
								+ "	// Héritage //<br />"
								+ "	//////////////<br />"
								+ "<br />"
								+ "	var $this = utils.extend(component, this);<br />"
								+ "	return $this;<br />"
								+ "}<br />"
								+ "<br />"
								+ "if (Loader !== undefined &amp;&amp; Loader !== null)<br />"
								+ "	Loader.hasLoaded(\"grid6\");<br />"
							+ '</pre>'
						+ '</td>'
					+ '</tr>'

					+ '<tr>'
						+ '<td>' + "Grid6 css" + '</td>'
						+ '<td><input id="grid6CSS" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ ".grid6<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	left: 0px;<br />"
								+ "	right: 0px;<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid6 .leftPanel, .grid6 .rightPanel<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid6 .leftPanel<br />"
								+ "{<br />"
								+ "	left: 0px;<br />"
								+ "	right: 500px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid6 .rightPanel<br />"
								+ "{<br />"
								+ "	left: calc(100% - 500px);<br />"
								+ "	right: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid6 .topPanel, .grid6 .bottomPanel, .grid6 .topBottomPanel, .grid6 .bottomBottomPanel<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	left: 0px;<br />"
								+ "	right: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid6 .topPanel<br />"
								+ "{<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 67%;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid6 .bottomPanel<br />"
								+ "{<br />"
								+ "	top: 33%;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid6 .topBottomPanel<br />"
								+ "{<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 50%;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid6 .bottomBottomPanel<br />"
								+ "{<br />"
								+ "	top: 50%;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
							+ '</pre>'
						+ '</td>'
					+ '</tr>'

					+ '<tr>'
						+ '<td>' + "Grid7 class" + '<br /><br /><img width="200" src="images/grid07.png" /></td>'
						+ '<td><input id="grid7Class" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ "function Grid7()<br />"
								+ "{<br />"
								+ "	///////////////<br />"
								+ "	// Attributs //<br />"
								+ "	///////////////<br />"
								+ "	<br />"
								+ "	var html = '&lt;div class=\"grid grid7\" &gt;'<br />"
								+ "				+ '&lt;div id=\"leftPanel\" class=\"leftPanel\" &gt;'<br />"
								+ "					+ '&lt;div id=\"topPanel\" class=\"topPanel\" &gt;&lt;div class=\"panel\" &gt;&lt;/div&gt;&lt;/div&gt;'<br />"
								+ "					+ '&lt;div id=\"bottomPanel\" class=\"bottomPanel\" &gt;'<br />"
								+ "						+ '&lt;div id=\"topBottomPanel\" class=\"topBottomPanel\" &gt;&lt;div class=\"panel\" &gt;&lt;/div&gt;&lt;/div&gt;'<br />"
								+ "						+ '&lt;div id=\"bottomBottomPanel\" class=\"bottomBottomPanel\" &gt;&lt;div class=\"panel\" &gt;&lt;/div&gt;&lt;/div&gt;'<br />"
								+ "					+ '&lt;/div&gt;'<br />"
								+ "				+ '&lt;/div&gt;'<br />"
								+ "				+ '&lt;div id=\"rightPanel\" class=\"rightPanel\" &gt;&lt;div class=\"panel\" &gt;&lt;/div&gt;&lt;/div&gt;'<br />"
								+ "			+ '&lt;/div&gt;';<br />"
								+ "	<br />"
								+ "	var component = new Component(html);<br />"
								+ "	<br />"
								+ "	var slide1 = new HorizontalSlide(component.getById('leftPanel'), component.getById('rightPanel'), 500);<br />"
								+ "	var slide2 = new VerticalSlide(component.getById('topPanel'), component.getById('bottomPanel'), 300);<br />"
								+ "	var slide3 = new VerticalSlide(component.getById('topBottomPanel'), component.getById('bottomBottomPanel'), 300);<br />"
								+ "	<br />"
								+ "	component.appendChild(slide1);<br />"
								+ "	component.getById('leftPanel').appendChild(slide2);<br />"
								+ "	component.getById('bottomPanel').appendChild(slide3);<br />"
								+ "	<br />"
								+ "	///////////////////////////////////<br />"
								+ "	// Initialisation des événements //<br />"
								+ "	///////////////////////////////////<br />"
								+ "	<br />"
								+ "	slide1.onDrag = function() { Events.resize(); };<br />"
								+ "	slide2.onDrag = function() { Events.resize(); };<br />"
								+ "	slide3.onDrag = function() { Events.resize(); };<br />"
								+ "	<br />"
								+ "	//////////////<br />"
								+ "	// Héritage //<br />"
								+ "	//////////////<br />"
								+ "<br />"
								+ "	var $this = utils.extend(component, this);<br />"
								+ "	return $this;<br />"
								+ "}<br />"
								+ "<br />"
								+ "if (Loader !== undefined &amp;&amp; Loader !== null)<br />"
								+ "	Loader.hasLoaded(\"grid7\");<br />"
							+ '</pre>'
						+ '</td>'
					+ '</tr>'

					+ '<tr>'
						+ '<td>' + "Grid7 css" + '</td>'
						+ '<td><input id="grid7CSS" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ ".grid7<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	left: 0px;<br />"
								+ "	right: 0px;<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid7 .leftPanel, .grid7 .rightPanel<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid7 .leftPanel<br />"
								+ "{<br />"
								+ "	left: 0px;<br />"
								+ "	right: calc(100% - 500px);<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid7 .rightPanel<br />"
								+ "{<br />"
								+ "	left: 500px;<br />"
								+ "	right: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid7 .topPanel, .grid7 .bottomPanel, .grid7 .topBottomPanel, .grid7 .bottomBottomPanel<br />"
								+ "{<br />"
								+ "	position: absolute;<br />"
								+ "	left: 0px;<br />"
								+ "	right: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid7 .topPanel<br />"
								+ "{<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 67%;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid7 .bottomPanel<br />"
								+ "{<br />"
								+ "	top: 33%;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid7 .topBottomPanel<br />"
								+ "{<br />"
								+ "	top: 0px;<br />"
								+ "	bottom: 50%;<br />"
								+ "}<br />"
								+ "<br />"
								+ ".grid7 .bottomBottomPanel<br />"
								+ "{<br />"
								+ "	top: 50%;<br />"
								+ "	bottom: 0px;<br />"
								+ "}<br />"
							+ '</pre>'
						+ '</td>'
					+ '</tr>'

					+ '<tr>'
						+ '<th colspan="3" style="text-align: left" >' + "Create components" + '</th>'
					+ '</tr>'
				
					+ '<tr>'
						+ '<td>' + "Create accordion" + '</td>'
						+ '<td><input id="createAccordion" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'var myAccordion = newAccordion($openOneCloseAll);'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create accordion item" + '</td>'
						+ '<td><input id="createAccordionItem" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'var myAccordionItem = new AccordionItem($label, $content);<br /><br />'
								+ 'myAccordion.addElement(myAccordionItem);'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create auto complete" + '</td>'
						+ '<td><input id="createAutoComplete" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'var myAutoComplete = new AutoComplete();<br />'
								+ 'myAutoComplete.setList(["value1", "value2", "value3"]);<br /><br />'
								+ 'myAutoComplete.onChange = function($value) { /* Do something. */ };<br />'
								+ 'myAutoComplete.onTyping = function($value) { /* Do something. */ };'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create button" + '</td>'
						+ '<td><input id="createButton" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'var myButton = new Button($label)<br /><br />'
								+ 'myButton.onAction = function() { /* Do something. */ };'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create calendar (classic only)" + '</td>'
						+ '<td><input id="createCalendar" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'var myCalendar = new Calendar(new Date(), $autoresize);<br /><br />'
								+ 'myCalendar.onChange = function() { /* Do something. */ };<br />'
								+ 'myCalendar.onOpen = function() { /* Do something. */ };'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create canvas" + '</td>'
						+ '<td><input id="createCanvas" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'var myCanvas = Canvas2D($width, $height);'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create check box" + '</td>'
						+ '<td><input id="createCheckBox" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'var myCheckBox = CheckBox($checked, $size);<br />'
								+ 'myCheckBox.onChange = function($checked) { /* Do something. */ };'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create check box list" + '</td>'
						+ '<td><input id="createCheckBoxList" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'var options = [{ name: "value1", label: "Value 1", checked: true }, { name: "value2", label: "Value 2", checked: false }];<br /><br />'
								+ 'var myCheckBoxList = CheckBoxList($name, options, $nbColumns, $isHTML);<br /><br />'
								+ 'myCheckBoxList.onChange = function($checked) { /* Do something. */ };'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create color palette" + '</td>'
						+ '<td><input id="createColorPalette" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'var colorsList = ["rgb(255, 0, 0)", "#00FF00", "rgb(0, 0, 255)"];<br /><br />'
								+ 'var myColorPalette = ColorPalette(colorsList);'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create color picker" + '</td>'
						+ '<td><input id="createColorPicker" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'var myColorPicker = ColorPicker();<br /><br />'
								+ 'myColorPicker.onChange = function() { /* Do something. */ };'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create combo box" + '</td>'
						+ '<td><input id="createComboBox" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'var options = [{ value: "value1", name: "Value 1", color: "rgb(255, 0, 0)" }, { value: "value2", name: "Value 2", color: "rgb(0, 0, 255)" }];<br /><br />'
								+ 'var myComboBox = ComboBox($name, options, $currentValue, $freeOption, $autoResize);<br /><br />'
								+ 'myComboBox.onChange = function() { /* Do something. */ };'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create combo box item" + '</td>'
						+ '<td><input id="createComboBoxItem" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'var myComboBoxItem = new ComboBoxItem($name, $value, $color, $selected);'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create component" + '</td>'
						+ '<td><input id="createComponent" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ "var html = '&lt;div&gt;&lt;/div&gt;';<br /><br />"
								+ 'var myComponent = new Component(html);'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create comfirm popup" + '</td>'
						+ '<td><input id="createComfirmPopup" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ "var html = '&lt;div&gt;&lt;/div&gt;';<br /><br />"
								+ 'var myConfirmPopup = new ConfirmPopup(html, $yesNo);<br /><br />'
								+ 'myConfirmPopup.onCancel = function() { /* Do something. */ };<br /><br />'
								+ 'myConfirmPopup.onOk = function()<br />'
								+'{<br />'
								+ '	/* Do something. */<br />'
								+ '	return true;<br />'
								+ '};<br />'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create content editable" + '</td>'
						+ '<td><input id="createContentEditable" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'var myContentEditable = new ContentEditable();<br /><br />'
								+ 'myContentEditable.setBold(true);<br />'
								+ 'myContentEditable.setItalic(true);<br />'
								+ 'myContentEditable.setUnderline(true);<br />'
								+ 'myContentEditable.setStrike(true);<br />'
								+ 'myContentEditable.setFontSize(true);<br />'
								+ 'myContentEditable.setFont(true);<br />'
								+ 'myContentEditable.setTitle(true);<br />'
								+ 'myContentEditable.setTextColor(true);<br />'
								+ 'myContentEditable.setQuote(true);<br />'
								+ 'myContentEditable.setCode(true);<br />'
								+ 'myContentEditable.setAlign(true);<br />'
								+ 'myContentEditable.setLists(true);<br />'
								+ 'myContentEditable.setTables(true);<br />'
								+ 'myContentEditable.setLinks(true);<br />'
								+ 'myContentEditable.setImages(true);<br />'
								+ 'myContentEditable.setAddAnchor(false);<br />'
								+ 'myContentEditable.setKeepBR(false);<br />'
								+ 'myContentEditable.setDefaultColor("rgb(0, 0, 0)");<br />'
								+ 'myContentEditable.setColorsList(["rgb(255, 0, 0)", "#00FF00", "rgb(0, 0, 255)"]);<br />'
								+ "myContentEditable.setFontsList([{ value: 'Arial', label: 'Arial' }, { value: 'Times New Roman', label: 'Times New Roman' }]);<br />"
								+ "myContentEditable.setLanguagesList([{ value: 'xml', label: 'HTML, XML' }, { value: 'css', label: 'CSS' }, { value: 'javascript', label: 'Javascript' }, { value: 'json', label: 'JSON' }]);<br />"
								+ "myContentEditable.setImagesUploadModes({ url: false, hosted: true });<br /><br />"
								+ "myContentEditable.setImagesLibraryConfig({<br /><br />"
								+ "	params: { 'sectionId': 0 },<br /><br />"
								+ "	displayFreezeScreen: function() {},<br />"
								+ "	hideFreezeScreen: function() {},<br /><br />"
					
								+ "	onError: function($statut, $response)<br />"
								+ "	{<br />"
								+ "		var errorPopup = new InfoPopup('&lt;p class=\"error\" &gt;' + $response['error'] + '&lt;/p&gt;');<br />"
								+ "		document.getElementById('main').appendChild(errorPopup);<br />"
								+ "	},<br /><br />"
					
								+ "	getImagesListRequest: { url: '/path', method: 'GET', param: ['sectionId'], data: [], response: {id: 'id', url: 'url'} },<br />"
								+ "	uploadImageRequest: { url: '/path', method: 'POST', param: [], data: ['sectionId'], response: {id: 'id', url: 'url'} },<br />"
								+ "	editImageRequest: { url: '/path', method: 'POST', param: [], data: [], response: {id: 'id', url: 'url'} },<br />"
								+ "	deleteImageRequest: { url: '/path', method: 'POST', param: [], data: [], response: {id: 'id', url: 'url'} }<br />"
								+ "});<br /><br />"
								+ "myContentEditable.setImgSecureURL('/path');<br /><br />"
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<td>' + "Create context menu" + '</td>'
						+ '<td><input id="createContextMenu" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'var myContextMenu = new ContextMenu(Events.mouseX, Events.mouseY);<br /><br />'
								+ 'myContextMenu.addElement(new MenuItem("Label"));'
							+ '</pre>'
						+ '</td>'
					+ '</tr>'
					
					+ '<tr>'
						+ '<th colspan="3" style="text-align: left" >' + "Other codes" + '</th>'
					+ '</tr>'
	
					+ '<tr>'
						+ '<td>' + "To clipboard" + '</td>'
						+ '<td><input id="toClipboard" type="button" value="Copy" /></td>'
						+ '<td>'
							+ '<pre>'
								+ 'dataManager.toClipboard("Hello world !",<br />' 
								+ '							function()<br />' 
								+ '							{<br />' 
								+ '								// Do something...<br />' 
								+ '							},<br />' 
								+ '							function() { console.log("Copy to clipboard failed."); });<br />'
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
	
	component.getById('createDefaultBaseCode').onClick = function()
	{
		var code = '<!DOCTYPE html>\n'
					+ '<html>\n'
					+ '	<head id="head" >\n'
					+ '		<meta charset="utf-8" />\n'
					+ '\n'
					+ "		<!-- Désactiver les comportements natifs indésirables des mobiles -->\n"
					+ '		<meta name="viewport" content="width=device-width, initial-scale=1" />\n'
					+ '		<meta name="viewport" content="width=device-width, minimum-scale=1" />\n'
					+ '		<meta name="viewport" content="width=device-width, maximum-scale=1" />\n'
					+ '		<meta name="apple-mobile-web-app-capable" content="yes" />\n'
					+ '		<meta name=“viewport” content=”initial-scale=1, viewport-fit=cover”>\n'
					+ '\n'
					+ '		<title>My Application</title>\n'
					+ '\n'
					+ '		<!-- Style de la page HTML affichée pendant le chargement du framework et autres contenus, à adapter selon les besoins -->\n'
					+ '		<style>\n'
					+ '\n'
					+ '			#main, #screen\n'
					+ '			{\n'
					+ '				position: absolute;\n'
					+ '				left: 0px;\n'
					+ '				right: 0px;\n'
					+ '				top: 0px;\n'
					+ '				bottom: 0px;\n'
					+ '\n'
					+ '				overflow: hidden;\n'
					+ '\n'
					+ '				margin: 0px;\n'
					+ '				padding: 0px;\n'
					+ '\n'
					+ '				text-align: center;\n'
					+ '				font-family: Arial;\n'
					+ '			}\n'
					+ '\n'
					+ '		</style>\n'
					+ '\n'
					+ '	</head>\n'
					+ '\n'
					+ '	<!-- Racine du DOM, la présence de l\'id "main" est obligatoire -->\n'
					+ '	<body id="main" >\n'
					+ '\n'
					+ '		<!-- Zone d\'écran principal de l\'application, la présence de l\'id "screen" est obligatoire -->\n'
					+ '\n'
					+ '		<div id="screen">\n'
					+ '			<!-- Ici, vous écrivez le HTML que vous voulez -->\n'
					+ '			<p>Chargement en cours...</p>\n'
					+ '		</div>\n'
					+ '\n'
					+ "		<!-- Chargement du Loader qui permet d'initialiser le framework ensuite -->\n"
					+ "		<script src='../JanusJS/Loader.js?token=0' ></script>\n"
					+ '\n'
					+ "		<script type='text/javascript' >\n"
					+ '\n'
					+ "			// Instanciation du Loader\n"
					+ '			// La variable doit obligatoirement s\'appeler "Loader".\n'
					+ "			var Loader = new Loader('../', 'Default');\n"
					+ '\n'
					+ "			// Ici on déclare les ressources statiques supplémentaires à faire charger par le Loader\n"
					+ '\n'
					+ "			// Exemples : \n"
					+ "			Loader.addSVG('/chemin/image.svg', 'monImageSVG');\n"
					+ "			Loader.addStyle('/chemin/feuilleDeStyle.css', 'maFeuilleDeStyle');\n"
					+ "			Loader.addScript('/chemin/script.js', 'monScript');\n"
					+ "			Loader.addComponent('/chemin/feuilleDeStyleDuComposent.css', '/chemin/scriptDuComposent.js', 'monComposent');\n"
					+ '\n'
					+ "			// Redéfinir la fonction this.onload\n"
					+ "			// Elle sera déclenchée lorsque le framework ainsi que les ressources supplémentaires déclarée juste au dessus seront chargés.\n"
					+ "			Loader.onload = function()\n"
					+ "			{\n"
					+ '				console.log("Hello ! J\'ai fini de charger JanusJS ! ");\n'
					+ '				document.getElementById(\'screen\').innerHTML = "<p>Hello ! J\'ai fini de charger JanusJS ! </p>";\n'
					+ '\n'
					+ "				// Code de l'application\n"
					+ "				// Généralement il s'agit d'un simple point d'entrée\n"
					+ "			};\n"
					+ '\n'
					+ "			// On ne lance le chargement du framework que lorsque la page HTML qui héberge l'application a fini de charger\n"
					+ "			window.onload = function()\n"
					+ "			{\n"
					+ "				Loader.load();\n"
					+ "			};\n"
					+ '\n'
					+ "		</script>\n"
					+ '\n'
					+ '	</body>\n'
					+ '</html>\n';
		
		$this.toClipboard(code);
	};
	
	component.getById('createViewManagerBaseCode').onClick = function()
	{
		var code = 'function ViewManager()\n'
					+ '{\n'
					+ "	////////////////\n"
					+ '	// Attributes //\n'
					+ "	////////////////\n"
					+ '\n'
					+ '	var grid = new Grid();\n'
					+ '\n'
					+ "	/////////////\n"
					+ '	// Methods //\n'
					+ "	/////////////\n"
					+ '\n'
					+ '	this.init = function()\n'
					+ '	{\n'
					+ "		document.getElementById('screen').removeAllChildren();\n"
					+ "		document.getElementById('screen').appendChild(grid);\n"
					+ '	};\n'
					+ '\n'
					+ '	this.resize = function()\n'
					+ '	{\n'
					+ '		\n'
					+ '	};\n'
					+ '\n'
					+ "	///////////////////////\n"
					+ '	// Getters & Setters //\n'
					+ "	///////////////////////\n"
					+ '\n'
					+ '	// GET\n'
					+ '\n'
					+ '	// SET\n'
					+ '\n'
					+ '	var $this = this;\n'
					+ '}\n'
					+ '\n'
					+ 'if (Loader !== null && Loader !== undefined)\n'
					+ '	Loader.hasLoaded("viewManager");\n';
		
		$this.toClipboard(code);
	};
	
	component.getById('grid1Class').onClick = function()
	{
		var code = "function Grid1()\n"
					+ "{\n"
					+ "	///////////////\n"
					+ "	// Attributs //\n"
					+ "	///////////////\n"
					+ "	\n"
					+ "	var html = '<div class=\"grid grid1\" >'\n"
					+ "					+ '<div id=\"leftPanel\" class=\"leftPanel\" >'\n"
					+ "						+ '<div class=\"panel\" ></div>'\n"
					+ "					+ '</div>'\n"
					+ "					+ '<div id=\"rightPanel\" class=\"rightPanel\" >'\n"
					+ "						+ '<div class=\"panel\" ></div>'\n"
					+ "					+ '</div>'\n"
					+ "				+ '</div>';\n"
					+ "	\n"
					+ "	var component = new Component(html);\n"
					+ "	\n"
					+ "	var slide1 = new HorizontalSlide(component.getById('leftPanel'), component.getById('rightPanel'), 300);\n"
					+ "	component.appendChild(slide1);\n"
					+ "	\n"
					+ "	///////////////////////////////////\n"
					+ "	// Initialisation des événements //\n"
					+ "	///////////////////////////////////\n"
					+ "	\n"
					+ "	slide1.onDrag = function() { Events.resize(); };\n"
					+ "	\n"
					+ "	//////////////\n"
					+ "	// Héritage //\n"
					+ "	//////////////\n"
					+ "	var $this = utils.extend(component, this);\n"
					+ "	return $this;\n"
					+ "}\n"
					+ "	\n"
					+ "if (Loader !== undefined && Loader !== null)\n"
					+ "	Loader.hasLoaded(\"grid1\");\n";
					
		$this.toClipboard(code);
	};

	component.getById('grid1CSS').onClick = function()
	{
		var code = ".grid1\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	left: 0px;\n"
					+ "	right: 0px;\n"
					+ "	top: 0px;\n"
					+ "	bottom: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid1 .leftPanel, .grid1 .rightPanel\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	top: 0px;\n"
					+ "	bottom: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid1 .leftPanel\n"
					+ "{\n"
					+ "	left: 0px;\n"
					+ "	right: 50%;\n"
					+ "}\n"
					+ "\n"
					+ ".grid1 .rightPanel\n"
					+ "{\n"
					+ "	left: 50%;\n"
					+ "	right: 0px;\n"
					+ "}\n"
					+ "\n";

		$this.toClipboard(code);
	};

	component.getById('grid2Class').onClick = function()
	{
		var code = "function Grid2()\n"
					+ "{\n"
					+ "	///////////////\n"
					+ "	// Attributs //\n"
					+ "	///////////////\n"
					+ "	\n"
					+ "	var html = '<div class=\"grid grid2\" >'\n"
					+ "					+ '<div id=\"topPanel\" class=\"topPanel\" >'\n"
					+ "						+ '<div class=\"panel\" ></div>'\n"
					+ "					+ '</div>'\n"
					+ "					+ '<div id=\"bottomPanel\" class=\"bottomPanel\" >'\n"
					+ "						+ '<div class=\"panel\" ></div>'\n"
					+ "					+ '</div>'\n"
					+ "				+ '</div>';\n"
					+ "	\n"
					+ "	var component = new Component(html);\n"
					+ "	\n"
					+ "	var slide1 = new VerticalSlide(component.getById('topPanel'), component.getById('bottomPanel'), 300);\n"
					+ "	component.appendChild(slide1);\n"
					+ "	\n"
					+ "	///////////////////////////////////\n"
					+ "	// Initialisation des événements //\n"
					+ "	///////////////////////////////////\n"
					+ "	\n"
					+ "	slide1.onDrag = function() { Events.resize(); };\n"
					+ "	\n"
					+ "	//////////////\n"
					+ "	// Héritage //\n"
					+ "	//////////////\n"
					+ "\n"
					+ "	var $this = utils.extend(component, this);\n"
					+ "	return $this;\n"
					+ "}\n"
					+ "\n"
					+ "if (Loader !== undefined && Loader !== null)\n"
					+ "	Loader.hasLoaded(\"grid2\");\n";
		$this.toClipboard(code);
	};

	component.getById('grid2CSS').onClick = function()
	{
		var code = ".grid2\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	left: 0px;\n"
					+ "	right: 0px;\n"
					+ "	top: 0px;\n"
					+ "	bottom: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid2 .topPanel, .grid2 .bottomPanel\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	left: 0px;\n"
					+ "	right: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid2 .topPanel\n"
					+ "{\n"
					+ "	top: 0px;\n"
					+ "	bottom: 50%;\n"
					+ "}\n"
					+ "\n"
					+ ".grid2 .bottomPanel\n"
					+ "{\n"
					+ "	top: 50%;\n"
					+ "	bottom: 0px;\n"
					+ "}\n";
		$this.toClipboard(code);
	};

	component.getById('grid3Class').onClick = function()
	{
		var code = "function Grid3()\n"
					+ "{\n"
					+ "	///////////////\n"
					+ "	// Attributs //\n"
					+ "	///////////////\n"
					+ "	\n"
					+ "	var html = '<div class=\"grid grid3\" >'\n"
					+ "				+ '<div id=\"leftPanel\" class=\"leftPanel\" ><div class=\"panel\" ></div></div>'\n"
					+ "				+ '<div id=\"rightPanel\" class=\"rightPanel\" >'\n"
					+ "					+ '<div id=\"leftRightPanel\" class=\"leftRightPanel\" ><div class=\"panel\" ></div></div>'\n"
					+ "					+ '<div id=\"rightRightPanel\" class=\"rightRightPanel\" ><div class=\"panel\" ></div></div>'\n"
					+ "				+ '</div>'\n"
					+ "			+ '</div>';\n"
					+ "	\n"
					+ "	var component = new Component(html);\n"
					+ "	\n"
					+ "	var slide1 = new HorizontalSlide(component.getById('leftPanel'), component.getById('rightPanel'), 300);\n"
					+ "	var slide2 = new HorizontalSlide(component.getById('leftRightPanel'), component.getById('rightRightPanel'), 300);\n"
					+ "	\n"
					+ "	component.appendChild(slide1);\n"
					+ "	component.getById('rightPanel').appendChild(slide2);\n"
					+ "	\n"
					+ "	///////////////////////////////////\n"
					+ "	// Initialisation des événements //\n"
					+ "	///////////////////////////////////\n"
					+ "	\n"
					+ "	slide1.onDrag = function() { Events.resize(); };\n"
					+ "	slide2.onDrag = function() { Events.resize(); };\n"
					+ "	\n"
					+ "	//////////////\n"
					+ "	// Héritage //\n"
					+ "	//////////////\n"
					+ "\n"
					+ "	var $this = utils.extend(component, this);\n"
					+ "	return $this;\n"
					+ "}\n"
					+ "\n"
					+ "if (Loader !== undefined && Loader !== null)\n"
					+ "	Loader.hasLoaded(\"grid3\");\n";
		$this.toClipboard(code);
	};

	component.getById('grid3CSS').onClick = function()
	{
		var code = ".grid3\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	left: 0px;\n"
					+ "	right: 0px;\n"
					+ "	top: 0px;\n"
					+ "	bottom: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid3 .leftPanel, .grid3 .rightPanel, .grid3 .leftRightPanel, .grid3 .rightRightPanel\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	top: 0px;\n"
					+ "	bottom: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid3 .leftPanel\n"
					+ "{\n"
					+ "	left: 0px;\n"
					+ "	right: 67%;\n"
					+ "}\n"
					+ "\n"
					+ ".grid3 .rightPanel\n"
					+ "{\n"
					+ "	left: 33%;\n"
					+ "	right: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid3 .leftRightPanel\n"
					+ "{\n"
					+ "	left: 0px;\n"
					+ "	right: 50%;\n"
					+ "}\n"
					+ "\n"
					+ ".grid3 .rightRightPanel\n"
					+ "{\n"
					+ "	left: 50%;\n"
					+ "	right: 0px;\n"
					+ "}\n";
		$this.toClipboard(code);
	};

	component.getById('grid4Class').onClick = function()
	{
		var code = "function Grid4()\n"
					+ "{\n"
					+ "	///////////////\n"
					+ "	// Attributs //\n"
					+ "	///////////////\n"
					+ "	\n"
					+ "	var html = '<div class=\"grid grid4\" >'\n"
					+ "				+ '<div id=\"leftPanel\" class=\"leftPanel\" ><div class=\"panel\" ></div></div>'\n"
					+ "				+ '<div id=\"rightPanel\" class=\"rightPanel\" >'\n"
					+ "					+ '<div id=\"topPanel\" class=\"topPanel\" ><div class=\"panel\" ></div></div>'\n"
					+ "					+ '<div id=\"bottomPanel\" class=\"bottomPanel\" ><div class=\"panel\" ></div></div>'\n"
					+ "				+ '</div>'\n"
					+ "			+ '</div>';\n"
					+ "	\n"
					+ "	var component = new Component(html);\n"
					+ "	\n"
					+ "	var slide1 = new HorizontalSlide(component.getById('leftPanel'), component.getById('rightPanel'), 500);\n"
					+ "	var slide2 = new VerticalSlide(component.getById('topPanel'), component.getById('bottomPanel'), 300);\n"
					+ "	\n"
					+ "	component.appendChild(slide1);\n"
					+ "	component.getById('rightPanel').appendChild(slide2);\n"
					+ "	\n"
					+ "	///////////////////////////////////\n"
					+ "	// Initialisation des événements //\n"
					+ "	///////////////////////////////////\n"
					+ "	\n"
					+ "	slide1.onDrag = function() { Events.resize(); };\n"
					+ "	slide2.onDrag = function() { Events.resize(); };\n"
					+ "	\n"
					+ "	//////////////\n"
					+ "	// Héritage //\n"
					+ "	//////////////\n"
					+ "\n"
					+ "	var $this = utils.extend(component, this);\n"
					+ "	return $this;\n"
					+ "}\n"
					+ "\n"
					+ "if (Loader !== undefined && Loader !== null)\n"
					+ "	Loader.hasLoaded(\"grid4\");\n";
		$this.toClipboard(code);
	};

	component.getById('grid4CSS').onClick = function()
	{
		var code = ".grid4\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	left: 0px;\n"
					+ "	right: 0px;\n"
					+ "	top: 0px;\n"
					+ "	bottom: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid4 .leftPanel, .grid4 .rightPanel\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	top: 0px;\n"
					+ "	bottom: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid4 .leftPanel\n"
					+ "{\n"
					+ "	left: 0px;\n"
					+ "	right: 500px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid4 .rightPanel\n"
					+ "{\n"
					+ "	left: calc(100% - 500px);\n"
					+ "	right: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid4 .topPanel, .grid4 .bottomPanel\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	left: 0px;\n"
					+ "	right: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid4 .topPanel\n"
					+ "{\n"
					+ "	top: 0px;\n"
					+ "	bottom: 50%;\n"
					+ "}\n"
					+ "\n"
					+ ".grid4 .bottomPanel\n"
					+ "{\n"
					+ "	top: 50%;\n"
					+ "	bottom: 0px;\n"
					+ "}\n";
		
		$this.toClipboard(code);
	};

	component.getById('grid5Class').onClick = function()
	{
		var code = "function Grid5()\n"
					+ "{\n"
					+ "	///////////////\n"
					+ "	// Attributs //\n"
					+ "	///////////////\n"
					+ "	\n"
					+ "	var html = '<div class=\"grid grid5\" >'\n"
					+ "				+ '<div id=\"leftPanel\" class=\"leftPanel\" >'\n"
					+ "					+ '<div id=\"topPanel\" class=\"topPanel\" ><div class=\"panel\" ></div></div>'\n"
					+ "					+ '<div id=\"bottomPanel\" class=\"bottomPanel\" ><div class=\"panel\" ></div></div>'\n"
					+ "				+ '</div>'\n"
					+ "				+ '<div id=\"rightPanel\" class=\"rightPanel\" ><div class=\"panel\" ></div></div>'\n"
					+ "			+ '</div>';\n"
					+ "	\n"
					+ "	var component = new Component(html);\n"
					+ "	\n"
					+ "	var slide1 = new HorizontalSlide(component.getById('leftPanel'), component.getById('rightPanel'), 500);\n"
					+ "	var slide2 = new VerticalSlide(component.getById('topPanel'), component.getById('bottomPanel'), 300);\n"
					+ "	\n"
					+ "	component.appendChild(slide1);\n"
					+ "	component.getById('leftPanel').appendChild(slide2);\n"
					+ "	\n"
					+ "	///////////////////////////////////\n"
					+ "	// Initialisation des événements //\n"
					+ "	///////////////////////////////////\n"
					+ "	\n"
					+ "	slide1.onDrag = function() { Events.resize(); };\n"
					+ "	slide2.onDrag = function() { Events.resize(); };\n"
					+ "	\n"
					+ "	//////////////\n"
					+ "	// Héritage //\n"
					+ "	//////////////\n"
					+ "\n"
					+ "	var $this = utils.extend(component, this);\n"
					+ "	return $this;\n"
					+ "}\n"
					+ "\n"
					+ "if (Loader !== undefined && Loader !== null)\n"
					+ "	Loader.hasLoaded(\"grid5\");\n";

		$this.toClipboard(code);
	};

	component.getById('grid5CSS').onClick = function()
	{
		var code = ".grid5\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	left: 0px;\n"
					+ "	right: 0px;\n"
					+ "	top: 0px;\n"
					+ "	bottom: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid5 .leftPanel, .grid5 .rightPanel\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	top: 0px;\n"
					+ "	bottom: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid5 .leftPanel\n"
					+ "{\n"
					+ "	left: 0px;\n"
					+ "	right: calc(100% - 500px);\n"
					+ "}\n"
					+ "\n"
					+ ".grid5 .rightPanel\n"
					+ "{\n"
					+ "	left: 500px;\n"
					+ "	right: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid5 .topPanel, .grid5 .bottomPanel\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	left: 0px;\n"
					+ "	right: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid5 .topPanel\n"
					+ "{\n"
					+ "	top: 0px;\n"
					+ "	bottom: 50%;\n"
					+ "}\n"
					+ "\n"
					+ ".grid5 .bottomPanel\n"
					+ "{\n"
					+ "	top: 50%;\n"
					+ "	bottom: 0px;\n"
					+ "}\n";

		$this.toClipboard(code);
	};

	component.getById('grid6Class').onClick = function()
	{
		var code = "function Grid6()\n"
					+ "{\n"
					+ "	///////////////\n"
					+ "	// Attributs //\n"
					+ "	///////////////\n"
					+ "	\n"
					+ "	var html = '<div class=\"grid grid6\" >'\n"
					+ "				+ '<div id=\"leftPanel\" class=\"leftPanel\" ><div class=\"panel\" ></div></div>'\n"
					+ "				+ '<div id=\"rightPanel\" class=\"rightPanel\" >'\n"
					+ "					+ '<div id=\"topPanel\" class=\"topPanel\" ><div class=\"panel\" ></div></div>'\n"
					+ "					+ '<div id=\"bottomPanel\" class=\"bottomPanel\" >'\n"
					+ "						+ '<div id=\"topBottomPanel\" class=\"topBottomPanel\" ><div class=\"panel\" ></div></div>'\n"
					+ "						+ '<div id=\"bottomBottomPanel\" class=\"bottomBottomPanel\" ><div class=\"panel\" ></div></div>'\n"
					+ "					+ '</div>'\n"
					+ "				+ '</div>'\n"
					+ "			+ '</div>';\n"
					+ "	\n"
					+ "	var component = new Component(html);\n"
					+ "	\n"
					+ "	var slide1 = new HorizontalSlide(component.getById('leftPanel'), component.getById('rightPanel'), 500);\n"
					+ "	var slide2 = new VerticalSlide(component.getById('topPanel'), component.getById('bottomPanel'), 300);\n"
					+ "	var slide3 = new VerticalSlide(component.getById('topBottomPanel'), component.getById('bottomBottomPanel'), 300);\n"
					+ "	\n"
					+ "	component.appendChild(slide1);\n"
					+ "	component.getById('rightPanel').appendChild(slide2);\n"
					+ "	component.getById('bottomPanel').appendChild(slide3);\n"
					+ "	\n"
					+ "	///////////////////////////////////\n"
					+ "	// Initialisation des événements //\n"
					+ "	///////////////////////////////////\n"
					+ "	\n"
					+ "	slide1.onDrag = function() { Events.resize(); };\n"
					+ "	slide2.onDrag = function() { Events.resize(); };\n"
					+ "	slide3.onDrag = function() { Events.resize(); };\n"
					+ "	\n"
					+ "	//////////////\n"
					+ "	// Héritage //\n"
					+ "	//////////////\n"
					+ "\n"
					+ "	var $this = utils.extend(component, this);\n"
					+ "	return $this;\n"
					+ "}\n"
					+ "\n"
					+ "if (Loader !== undefined && Loader !== null)\n"
					+ "	Loader.hasLoaded(\"grid6\");\n";

		$this.toClipboard(code);
	};

	component.getById('grid6CSS').onClick = function()
	{
		var code = ".grid6\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	left: 0px;\n"
					+ "	right: 0px;\n"
					+ "	top: 0px;\n"
					+ "	bottom: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid6 .leftPanel, .grid6 .rightPanel\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	top: 0px;\n"
					+ "	bottom: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid6 .leftPanel\n"
					+ "{\n"
					+ "	left: 0px;\n"
					+ "	right: 500px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid6 .rightPanel\n"
					+ "{\n"
					+ "	left: calc(100% - 500px);\n"
					+ "	right: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid6 .topPanel, .grid6 .bottomPanel, .grid6 .topBottomPanel, .grid6 .bottomBottomPanel\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	left: 0px;\n"
					+ "	right: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid6 .topPanel\n"
					+ "{\n"
					+ "	top: 0px;\n"
					+ "	bottom: 67%;\n"
					+ "}\n"
					+ "\n"
					+ ".grid6 .bottomPanel\n"
					+ "{\n"
					+ "	top: 33%;\n"
					+ "	bottom: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid6 .topBottomPanel\n"
					+ "{\n"
					+ "	top: 0px;\n"
					+ "	bottom: 50%;\n"
					+ "}\n"
					+ "\n"
					+ ".grid6 .bottomBottomPanel\n"
					+ "{\n"
					+ "	top: 50%;\n"
					+ "	bottom: 0px;\n"
					+ "}\n";

		$this.toClipboard(code);
	};

	component.getById('grid7Class').onClick = function()
	{
		var code = "function Grid7()\n"
					+ "{\n"
					+ "	///////////////\n"
					+ "	// Attributs //\n"
					+ "	///////////////\n"
					+ "	\n"
					+ "	var html = '<div class=\"grid grid7\" >'\n"
					+ "				+ '<div id=\"leftPanel\" class=\"leftPanel\" >'\n"
					+ "					+ '<div id=\"topPanel\" class=\"topPanel\" ><div class=\"panel\" ></div></div>'\n"
					+ "					+ '<div id=\"bottomPanel\" class=\"bottomPanel\" >'\n"
					+ "						+ '<div id=\"topBottomPanel\" class=\"topBottomPanel\" ><div class=\"panel\" ></div></div>'\n"
					+ "						+ '<div id=\"bottomBottomPanel\" class=\"bottomBottomPanel\" ><div class=\"panel\" ></div></div>'\n"
					+ "					+ '</div>'\n"
					+ "				+ '</div>'\n"
					+ "				+ '<div id=\"rightPanel\" class=\"rightPanel\" ><div class=\"panel\" ></div></div>'\n"
					+ "			+ '</div>';\n"
					+ "	\n"
					+ "	var component = new Component(html);\n"
					+ "	\n"
					+ "	var slide1 = new HorizontalSlide(component.getById('leftPanel'), component.getById('rightPanel'), 500);\n"
					+ "	var slide2 = new VerticalSlide(component.getById('topPanel'), component.getById('bottomPanel'), 300);\n"
					+ "	var slide3 = new VerticalSlide(component.getById('topBottomPanel'), component.getById('bottomBottomPanel'), 300);\n"
					+ "	\n"
					+ "	component.appendChild(slide1);\n"
					+ "	component.getById('leftPanel').appendChild(slide2);\n"
					+ "	component.getById('bottomPanel').appendChild(slide3);\n"
					+ "	\n"
					+ "	///////////////////////////////////\n"
					+ "	// Initialisation des événements //\n"
					+ "	///////////////////////////////////\n"
					+ "	\n"
					+ "	slide1.onDrag = function() { Events.resize(); };\n"
					+ "	slide2.onDrag = function() { Events.resize(); };\n"
					+ "	slide3.onDrag = function() { Events.resize(); };\n"
					+ "	\n"
					+ "	//////////////\n"
					+ "	// Héritage //\n"
					+ "	//////////////\n"
					+ "\n"
					+ "	var $this = utils.extend(component, this);\n"
					+ "	return $this;\n"
					+ "}\n"
					+ "\n"
					+ "if (Loader !== undefined && Loader !== null)\n"
					+ "	Loader.hasLoaded(\"grid7\");\n";

		$this.toClipboard(code);
	};

	component.getById('grid7CSS').onClick = function()
	{
		var code = ".grid7\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	left: 0px;\n"
					+ "	right: 0px;\n"
					+ "	top: 0px;\n"
					+ "	bottom: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid7 .leftPanel, .grid7 .rightPanel\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	top: 0px;\n"
					+ "	bottom: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid7 .leftPanel\n"
					+ "{\n"
					+ "	left: 0px;\n"
					+ "	right: calc(100% - 500px);\n"
					+ "}\n"
					+ "\n"
					+ ".grid7 .rightPanel\n"
					+ "{\n"
					+ "	left: 500px;\n"
					+ "	right: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid7 .topPanel, .grid7 .bottomPanel, .grid7 .topBottomPanel, .grid7 .bottomBottomPanel\n"
					+ "{\n"
					+ "	position: absolute;\n"
					+ "	left: 0px;\n"
					+ "	right: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid7 .topPanel\n"
					+ "{\n"
					+ "	top: 0px;\n"
					+ "	bottom: 67%;\n"
					+ "}\n"
					+ "\n"
					+ ".grid7 .bottomPanel\n"
					+ "{\n"
					+ "	top: 33%;\n"
					+ "	bottom: 0px;\n"
					+ "}\n"
					+ "\n"
					+ ".grid7 .topBottomPanel\n"
					+ "{\n"
					+ "	top: 0px;\n"
					+ "	bottom: 50%;\n"
					+ "}\n"
					+ "\n"
					+ ".grid7 .bottomBottomPanel\n"
					+ "{\n"
					+ "	top: 50%;\n"
					+ "	bottom: 0px;\n"
					+ "}\n";

		$this.toClipboard(code);
	};

	component.getById('createAccordion').onClick = function()
	{
		var code = 'var myAccordion = Accordion($openOneCloseAll);';
		$this.toClipboard(code);
	};
	
	component.getById('createAccordionItem').onClick = function()
	{
		var code = 'var myAccordionItem = AccordionItem($label, $content);\n\n'
					+ 'myAccordion.addElement(myAccordionItem);';
		
		$this.toClipboard(code);
	};
	
	component.getById('createAutoComplete').onClick = function()
	{
		var code = 'var myAutoComplete = AutoComplete();\n'
					+ 'myAutoComplete.setList(["value1", "value2", "value3"]);\n\n'
					+ 'myAutoComplete.onChange = function($value) { /* Do something. */ };\n'
					+ 'myAutoComplete.onTyping = function($value) { /* Do something. */ };';
		
		$this.toClipboard(code);
	};
	
	component.getById('createButton').onClick = function()
	{
		var code = 'var myButton = new Button($label)\n\n'
					+ 'myButton.onAction = function() { /* Do something. */ };\n';
		
		$this.toClipboard(code);
	};
	
	component.getById('createCalendar').onClick = function()
	{
		var code = 'var myCalendar = new Calendar(new Date(), $autoresize);\n\n'
					+ 'myCalendar.onChange = function() { /* Do something. */ };\n'
					+ 'myCalendar.onOpen = function() { /* Do something. */ };';
		
		$this.toClipboard(code);
	};
	
	component.getById('createCanvas').onClick = function()
	{
		var code = 'var myCanvas = Canvas2D($width, $height);';
		$this.toClipboard(code);
	};
	
	component.getById('createCheckBox').onClick = function()
	{
		var code = 'var myCheckBox = CheckBox($checked, $size);\n'
					+ 'myCheckBox.onChange = function($checked) { /* Do something. */ };';
		
		$this.toClipboard(code);
	};
	
	component.getById('createCheckBoxList').onClick = function()
	{
		var code = 'var options = [{ name: "value1", label: "Value 1", checked: true }, { name: "value2", label: "Value 2", checked: false }];\n\n'
					+ 'var myCheckBoxList = CheckBoxList($name, options, $nbColumns, $isHTML);\n\n'
					+ 'myCheckBoxList.onChange = function($checked) { /* Do something. */ };';
		
		$this.toClipboard(code);
	};
	
	component.getById('createColorPalette').onClick = function()
	{
		var code = 'var colorsList = ["rgb(255, 0, 0)", "#00FF00", "rgb(0, 0, 255)"];\n\n'
					+ 'var myColorPalette = ColorPalette($colorsList);';
					
		$this.toClipboard(code);
	};
	
	component.getById('createColorPicker').onClick = function()
	{
		var code = 'var myColorPicker = ColorPicker();\n\n'
					+ 'myColorPicker.onChange = function() { /* Do something. */ };';
		
		$this.toClipboard(code);
	};
	
	component.getById('createComboBox').onClick = function()
	{
		var code = 'var options = [{ name: "value1", label: "Value 1", color: "rgb(255, 0, 0)" }, { name: "value2", label: "Value 2", color: "rgb(0, 0, 255)" }];\n\n'
					+ 'var myComboBox = ComboBox($name, options, $currentValue, $freeOption, $autoResize);\n\n'
					+ 'myComboBox.onChange = function() { /* Do something. */ };';
		
		$this.toClipboard(code);
	};
	
	component.getById('createComboBoxItem').onClick = function()
	{
		var code = 'var myComboBoxItem = new ComboBoxItem($name, $value, $color, $selected);';
		
		$this.toClipboard(code);
	};
	
	component.getById('createComponent').onClick = function()
	{
		var code = "var html = '<div></div>';\n\n"
					+ 'var myComponent = new Component(html);';
		
		$this.toClipboard(code);
	};
	
	component.getById('createComfirmPopup').onClick = function()
	{
		var code = "var html = '&lt;div&gt;&lt;/div&gt;';\n\n"
					+ 'var myConfirmPopup = new ConfirmPopup(html, $yesNo);\n\n'
					+ 'myConfirmPopup.onCancel = function() { /* Do something. */ };\n\n'
					+ 'myConfirmPopup.onOk = function()\n'
					+'{\n'
					+ '	/* Do something. */\n'
					+ '	return true;\n'
					+ '};\n';
		
		$this.toClipboard(code);
	};
	
	component.getById('createContentEditable').onClick = function()
	{
		var code = 'var myContentEditable = new ContentEditable();\n\n'
					+ 'myContentEditable.setBold(true);\n'
					+ 'myContentEditable.setItalic(true);\n'
					+ 'myContentEditable.setUnderline(true);\n'
					+ 'myContentEditable.setStrike(true);\n'
					+ 'myContentEditable.setFontSize(true);\n'
					+ 'myContentEditable.setFont(true);\n'
					+ 'myContentEditable.setTitle(true);\n'
					+ 'myContentEditable.setTextColor(true);\n'
					+ 'myContentEditable.setQuote(true);\n'
					+ 'myContentEditable.setCode(true);\n'
					+ 'myContentEditable.setAlign(true);\n'
					+ 'myContentEditable.setLists(true);\n'
					+ 'myContentEditable.setTables(true);\n'
					+ 'myContentEditable.setLinks(true);\n'
					+ 'myContentEditable.setImages(true);\n'
					+ 'myContentEditable.setAddAnchor(false);\n'
					+ 'myContentEditable.setKeepBR(false);\n'
					+ 'myContentEditable.setDefaultColor("rgb(0, 0, 0)");\n'
					+ 'myContentEditable.setColorsList(["rgb(255, 0, 0)", "#00FF00", "rgb(0, 0, 255)"]);\n'
					+ "myContentEditable.setFontsList([{ value: 'Arial', label: 'Arial' }, { value: 'Times New Roman', label: 'Times New Roman' }]);\n"
					+ "myContentEditable.setLanguagesList([{ value: 'xml', label: 'HTML, XML' }, { value: 'css', label: 'CSS' }, { value: 'javascript', label: 'Javascript' }, { value: 'json', label: 'JSON' }]);\n"
					+ "myContentEditable.setImagesUploadModes({ url: false, hosted: true });\n\n"
					+ "myContentEditable.setImagesLibraryConfig({\n\n"
					+ "	params: { 'sectionId': 0 },\n\n"
					+ "	displayFreezeScreen: function() {},\n"
					+ "	hideFreezeScreen: function() {},\n\n"
		
					+ "	onError: function($statut, $response)\n"
					+ "	{<br />"
					+ "		var errorPopup = new InfoPopup('<p class=\"error\" >' + $response['error'] + '</p>');\n"
					+ "		document.getElementById('main').appendChild(errorPopup);\n"
					+ "	},\n\n"
		
					+ "	getImagesListRequest: { url: '/path', method: 'GET', param: ['sectionId'], data: [], response: {id: 'id', url: 'url'} },\n"
					+ "	uploadImageRequest: { url: '/path', method: 'POST', param: [], data: ['sectionId'], response: {id: 'id', url: 'url'} },\n"
					+ "	editImageRequest: { url: '/path', method: 'POST', param: [], data: [], response: {id: 'id', url: 'url'} },\n"
					+ "	deleteImageRequest: { url: '/path', method: 'POST', param: [], data: [], response: {id: 'id', url: 'url'} }\n"
					+ "});\n\n"
					+ "myContentEditable.setImgSecureURL('/path');\n\n";
		
		$this.toClipboard(code);
	};
	
	component.getById('createContextMenu').onClick = function()
	{
		var code = 'var myContextMenu = new ContextMenu(Events.mouseX, Events.mouseY);\n\n'
					+ 'myContextMenu.addElement(new MenuItem("Label"));';
		
		$this.toClipboard(code);
	};
	
	component.getById('toClipboard').onClick = function()
	{
		var code = 'dataManager.toClipboard("Hello world !",\n' 
					+'							function()\n' 
					+'							{\n' 
					+'								// Do something...\n' 
					+'							},\n' 
					+'							function() { console.log("Copy to clipboard failed."); });\n';
		
		$this.toClipboard(code);
	};

	////////////
	// Extend //
	////////////

	var $this = utils.extend(component, this);
	return $this;
}

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("quickCodeJanusJSPanel");
