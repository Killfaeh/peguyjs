function Grid7()
{
	////////////////
	// Attributes //
	////////////////
	
	var html = '<div class="grid grid7" >'
				+ '<div id="leftPanel" class="leftPanel" >'
					+ '<div id="topPanel" class="topPanel" ><div class="panel" ></div></div>'
					+ '<div id="bottomPanel" class="bottomPanel" >'
						+ '<div id="topBottomPanel" class="topBottomPanel" ><div class="panel" ></div></div>'
						+ '<div id="bottomBottomPanel" class="bottomBottomPanel" ><div class="panel" ></div></div>'
					+ '</div>'
				+ '</div>'
				+ '<div id="rightPanel" class="rightPanel" ><div class="panel" ></div></div>'
			+ '</div>';
	
	var component = new Component(html);
	
	var slide1 = new HorizontalSlide(component.getById('leftPanel'), component.getById('rightPanel'), 500);
	var slide2 = new VerticalSlide(component.getById('topPanel'), component.getById('bottomPanel'), 300);
	var slide3 = new VerticalSlide(component.getById('topBottomPanel'), component.getById('bottomBottomPanel'), 300);
	
	component.appendChild(slide1);
	component.getById('leftPanel').appendChild(slide2);
	component.getById('bottomPanel').appendChild(slide3);
	
	/////////////////
	// Init events //
	/////////////////
	
	slide1.onDrag = function() { Events.resize(); };
	slide2.onDrag = function() { Events.resize(); };
	slide3.onDrag = function() { Events.resize(); };
	
	////////////
	// Extend //
	////////////

	var $this = utils.extend(component, this);
	return $this;
}

if (Loader !== undefined && Loader !== null)
	Loader.hasLoaded("grid7");