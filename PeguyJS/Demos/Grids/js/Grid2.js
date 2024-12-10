function Grid2()
{
	////////////////
	// Attributes //
	////////////////
	
	var html = '<div class="grid grid2" >'
					+ '<div id="topPanel" class="topPanel" >'
						+ '<div class="panel" ></div>'
					+ '</div>'
					+ '<div id="bottomPanel" class="bottomPanel" >'
						+ '<div class="panel" ></div>'
					+ '</div>'
				+ '</div>';
	
	var component = new Component(html);
	
	var slide1 = new VerticalSlide(component.getById('topPanel'), component.getById('bottomPanel'), 300);
	component.appendChild(slide1);
	
	/////////////////
	// Init events //
	/////////////////
	
	slide1.onDrag = function() { Events.resize(); };
	
	////////////
	// Extend //
	////////////

	var $this = utils.extend(component, this);
	return $this;
}

if (Loader !== undefined && Loader !== null)
	Loader.hasLoaded("grid2");