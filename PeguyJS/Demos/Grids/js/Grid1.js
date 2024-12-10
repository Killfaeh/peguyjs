function Grid1()
{
	////////////////
	// Attributes //
	////////////////
	
	var html = '<div class="grid grid1" >'
					+ '<div id="leftPanel" class="leftPanel" >'
						+ '<div class="panel" ></div>'
					+ '</div>'
					+ '<div id="rightPanel" class="rightPanel" >'
						+ '<div class="panel" ></div>'
					+ '</div>'
				+ '</div>';
	
	var component = new Component(html);
	
	var slide1 = new HorizontalSlide(component.getById('leftPanel'), component.getById('rightPanel'), 300);
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
	Loader.hasLoaded("grid1");