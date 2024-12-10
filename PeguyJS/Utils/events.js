
Event.prototype.mouseX = function()
{
	return this.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
};

Event.prototype.mouseY = function()
{
	return this.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
};

Event.prototype.targetNode = function()
{
	return this.target || this.srcElement;
};

var doNothing = function($event) {};

var Events = 
{
	////////////////
	//// Souris ////
	////////////////
	
	mouseX: 0,
	mouseY: 0,
	
	updateMouse: function($event)
	{
		Events.mouseX = $event.clientX;
		Events.mouseY = $event.clientY;
	},
	
	////////////////////////////
	//// Gestion du clavier ////
	////////////////////////////
	
	keyPressTable: {},
	keyLastPressTable: {},
	startX: 0,
	startY: 0,
	touchMoved: false,
	doubleTouchStartTimestamp: 0,

	onKeyDown: function($event)
	{
		if (window.event)
			$event = window.event;

		var shortcutModifier = false;

		Events.keyLastPressTable[$event.keyCode] = new Date();

		if (/mac os x/.test(navigator.userAgent.toLowerCase().replace(" ", "")) || /macosx/.test(navigator.userAgent.toLowerCase().replace(" ", "")))
		{
			shortcutModifier = $event.metaKey;

			if (shortcutModifier === true && $event.keyCode !== 91 && $event.keyCode !== 93)
			{
				setTimeout(function()
				{
					//console.log("CHECK KEYDOWN");

					var now = new Date();
					//console.log('Now : ' + now.getTime());

					for (key in Events.keyLastPressTable)
					{
						if (key !== 'cmd' && key !== 91 && key !== 93 && key !== '91' && key !== '93')
						{
							var date = Events.keyLastPressTable[key];

							//console.log('Key : ' + key);
							//console.log('Last press : ' + date.getTime());
							//console.log('Delta : ' + (now.getTime() - date.getTime()));

							if (now.getTime() - date.getTime() >= 550 && Events.keyPressTable[key] === true)
							{
								console.log("SIMULE KEYUP");
								console.log('Now : ' + now.getTime());
								console.log('Key : ' + key);
								console.log('Last press : ' + date.getTime());
								console.log('Delta : ' + (now.getTime() - date.getTime()));
								Events.onKeyUp({ keyCode: key });
							}
						}
					}

				}, 560);
			}
		}
		else
			shortcutModifier = Events.keyPressTable['ctrl'];

		if (!utils.isset(Events.keyPressTable[$event.keyCode]) || Events.keyPressTable[$event.keyCode] === false)
		{
			//console.log("KEY DOWN : " + $event.keyCode);
			//console.log($event);
			
			Events.keyPressTable[$event.keyCode] = true;

			if ($event.keyCode == 16)
				Events.keyPressTable['shift'] = true;
			else if ($event.keyCode == 17)
				Events.keyPressTable['ctrl'] = true;
			else if ($event.keyCode == 18)
				Events.keyPressTable['alt'] = true;
			else if ($event.keyCode == 91)
				Events.keyPressTable['cmd'] = true;
			else if ($event.keyCode == 93)
				Events.keyPressTable['cmd'] = true;
			
			if ($event.key === Debug.consoleKey)
				Debug.console.display();
			
			if (shortcutModifier === true)
			{
				Events.keyPressTable['cmd'] = true;

				if ($event.keyCode === 90) // Z
				{
					if ($event.shiftKey === true)
					{
						if (Events.redo !== doNothing)
						{
							Events.preventDefault($event);
							Events.stopPropagation($event);
							Events.redo();
						}
					}
					else
					{
						if (Events.undo !== doNothing)
						{
							Events.preventDefault($event);
							Events.stopPropagation($event);
							Events.undo();
						}
					}
				}
			}
			
			Components.onKeyDown($event);
			
			/*
			setTimeout(function()
			{
				if ($event.metaKey === true)
				{
					Events.keyPressTable = {};
				}
				
			}, 100);
			//*/
		}
		else if (Events.keyPressTable['ctrl'] === true || $event.metaKey === true)
		{
			Events.preventDefault($event);
			Events.stopPropagation($event);
		}
	},
	
	onKeyUp: function($event)
	{
		if (window.event)
			$event = window.event;
		
		if (utils.isset(Events.keyPressTable[$event.keyCode]) && Events.keyPressTable[$event.keyCode] === true)
		{
			//console.log("KEY UP : " + $event.keyCode);

			var shortcutModifier = Events.keyPressTable['ctrl'];
		
			if (/mac os x/.test(navigator.userAgent.toLowerCase().replace(" ", "")) || /macosx/.test(navigator.userAgent.toLowerCase().replace(" ", "")))
				shortcutModifier = $event.metaKey;
			
			Events.keyPressTable[$event.keyCode] = false;
			
			if ($event.keyCode == 16)
				Events.keyPressTable['shift'] = false;
			else if ($event.keyCode == 17)
				Events.keyPressTable['ctrl'] = false;
			else if ($event.keyCode == 18)
				Events.keyPressTable['alt'] = false;
			else if ($event.keyCode == 91)
				Events.keyPressTable['cmd'] = false;
			else if ($event.keyCode == 93)
				Events.keyPressTable['cmd'] = false;
			else if ($event.key === "Meta")
			{
				Events.keyPressTable['cmd'] = false;
				//Events.keyPressTable = {};
			}
			
			Components.onKeyUp($event);
		}
		else if (Events.keyPressTable['ctrl'] === true || $event.key === "Meta")
		{
			Events.preventDefault($event);
			Events.stopPropagation($event);
		}
	},
	
	onTipText: function($event, $callback)
	{
		var keys = [13, 37, 38, 39, 40];
		
		if (keys.indexOf($event.keyCode) < 0)
			$callback($event);
	},
	
	/////////////////////////////
	//// Evénements tactiles ////
	/////////////////////////////
	
	doubleTouchStartTimestamp: 0,
	
	///////////////////////////
	//// Redimensionnement ////
	///////////////////////////
	
	onResize: function() {},
	onEndResize: function() {},
	resizeDate: new Date(),
	
	endResize: function()
	{
		var currentDate = new Date();
		
		if (currentDate.getTime()-Events.resizeDate.getTime() >= 500)
		{
			Components.onEndResize();
			Events.onEndResize();
		}
	},
	
	resize: function()
	{
		Events.resizeDate = new Date();
		setTimeout(function() { Events.endResize(); }, 500);
		Screen.onResize();
		Components.onResize();
		Events.onResize();
	},
	
	/////////////////////////////////////////////
	//// Empêcher le comportement par défaut ////
	/////////////////////////////////////////////
	
	preventDefault: function($event)
	{
		//Debug.callstack();
		
		if ($event.preventDefault)
			$event.preventDefault();
		// Cas Internet Explorer
		else
			$event.returnValue = false;
	},
	
	stopPropagation: function($event)
	{
		if (utils.isset($event))
		{
			if ($event.stopPropagation)
				$event.stopPropagation();
			else if(window.event)
				window.event.cancelBubble = true;
		}
	},
	
	//////////////////////////////////////
	//// Capter l'événement déclenché ////
	//////////////////////////////////////
	
	catchEvent: function($type, $event)
	{
		if (!$event) // Cas IE 
			$event = window.event;
		
		var specialEvents = ['MouseDown', 'MouseMove', 'MouseUp', 'Click', 'MouseWheel'];
		//var dragAndDropEvents = ['Drag', 'DragStart', 'DragEnd', 'DragOver', 'DragEnter', 'DragLeave', 'DragExit', 'Drop'];
		var dragAndDropEvents = ['DragOver'];
		var specialTags = ['input', 'select', 'textarea'];
		var manageEvent = false;
		
		// Capturer le noeud déclencheur
		
		var catchNode = $event.targetNode();
		var catchNodeTagName = catchNode.tagName.toLowerCase();
		
		/*
		if ($type === 'MouseMove')
		{
			console.log($type);
			console.log(catchNode);
			console.log(catchNodeTagName);
		}
		//*/
		
		// Vérifier si l'événement est déclenchable
		
		if (specialEvents.indexOf($type) < 0)
			manageEvent = true;
		else if (specialTags.indexOf(catchNodeTagName) < 0)
			manageEvent = true;
		//else if (catchNodeTagName === 'input' && catchNode.getAttribute('type') === 'button')
		//	manageEvent = true;
		
		// Rechercher le premier noeud parent qui a l'événement correspondant et le déclencher
		
		if (manageEvent === true)
		{
			var currentNode = catchNode;

			while (currentNode)
			{
				if (utils.isset(currentNode["on" + $type]))
				{
					if (Array.isArray(currentNode["on" + $type]))
					{
						for (var i = 0; i < currentNode["on" + $type].length; i++)
							currentNode["on" + $type][i]($event);
					}
					else
					{
						if (specialEvents.indexOf($type) < 0)
							Events.preventDefault($event);

						currentNode["on" + $type]($event);
					}
					
					currentNode = false;
				}
				else
					currentNode = currentNode.parentNode; 
			}
		}
		
		// Cas mobile
		// Empêcher le scroll de la fenêtre complète sans empêcher le scroll des éléments à l'intérieur
		var mode = Loader.getMode();
		
		if (mode === 'mobile')
		{
			var scrollableNode = false;
			var currentNode = catchNode;
			
			while (currentNode)
			{
				if ($type === 'MouseMove' && (currentNode.scrollHeight > currentNode.offsetHeight || currentNode.scrollWidth > currentNode.offsetWidth))
				{
					scrollableNode = true;
					
					if (utils.isset($event.touches))
					{
						var mouseX = ($event.clientX || $event.touches[0].pageX);
						var mouseY = ($event.clientY || $event.touches[0].pageY);
						var deltaX = mouseX-Events.startX;
						var deltaY = mouseY-Events.startY;
						var scrollX = currentNode.scrollLeft;
						var scrollY = currentNode.scrollTop;
						var scrollXMax = currentNode.scrollWidth-currentNode.offsetWidth;
						var scrollYMax = currentNode.scrollHeight-currentNode.offsetHeight;
						
						if ((scrollX <= 0 && deltaX > 0 && scrollY <= 0 && deltaY > 0)
							|| (scrollX <= 0 && deltaX > 0 && scrollY >= scrollYMax && deltaY < 0)
							|| (scrollX >= scrollXMax && deltaX < 0 && scrollY <= 0 && deltaY > 0)
							|| (scrollX >= scrollXMax && deltaX < 0 && scrollY >= scrollYMax && deltaY < 0))
						{
							scrollableNode = false;
						}
					}
				}
				
				currentNode = currentNode.parentNode; 
			}
			
			if ($type === 'MouseMove' && scrollableNode !== true)
				Events.preventDefault($event);
		}
		else
		{
			if (dragAndDropEvents.indexOf($type) >= 0)
				Events.preventDefault($event);
		}
	},
	
	///////////////////////////////////////////////
	//// Initialisation globale des événements ////
	///////////////////////////////////////////////
	
	init: function()
	{
		var mode = Loader.getMode();
		
		document.getElementById('main').addEvent('mousedown', function($event)
		{
			Events.updateMouse($event);
			Events.catchEvent('MouseDown', $event);
		});
		
		document.getElementById('main').addEvent('mousemove', function($event)
		{
			Events.updateMouse($event);
			Events.catchEvent('MouseMove', $event);
		});
		
		document.getElementById('main').addEvent('mouseup', function($event)
		{
			Events.updateMouse($event);
			Events.catchEvent('MouseUp', $event);
		});

		// pointermove : This event is fired when a pointer changes coordinates.
		// pointerrawupdate : This event is fired when any of a pointer's properties change.
		// pointerup : This event is fired when a pointer is no longer active.
		// pointercancel : A browser fires this event if it concludes the pointer will no longer be able to generate events (for example the related device is deactivated).
		// pointerout : This event is fired for several reasons including: pointing device is moved out of the hit test boundaries of an element; firing the pointerup event for a device that does not support hover (see pointerup); after firing the pointercancel event (see pointercancel); when a pen stylus leaves the hover range detectable by the digitizer.
		// pointerleave : This event is fired when a pointing device is moved out of the hit test boundaries of an element. For pen devices, this event is fired when the stylus leaves the hover range detectable by the digitizer.
		// gotpointercapture : This event is fired when an element receives pointer capture.
		// lostpointercapture : This event is fired after pointer capture is released for a pointer.

		document.getElementById('main').addEvent('pointerdown', function($event)
		{
			Events.updateMouse($event);
			Events.catchEvent('PointerDown', $event);
		});

		document.getElementById('main').addEvent('pointermove', function($event)
		{
			Events.updateMouse($event);
			Events.catchEvent('PointerMove', $event);
		});

		document.getElementById('main').addEvent('pointerup', function($event)
		{
			Events.updateMouse($event);
			Events.catchEvent('PointerUp', $event);
		});
		
		if (mode === 'classic')
		{
			document.getElementById('main').addEvent('keydown', Events.onKeyDown);
			document.getElementById('main').addEvent('keyup', Events.onKeyUp);
			document.getElementById('main').addEvent('click', function($event) { Events.catchEvent('Click', $event); });
			document.getElementById('main').addEvent('dblclick', function($event) { Events.catchEvent('DblClick', $event); });
			//document.getElementById('main').addEvent('mouseover', function($event) { Events.catchEvent('MouseOver', $event); });
			//document.getElementById('main').addEvent('mouseout', function($event) { Events.catchEvent('MouseOut', $event); });
			document.getElementById('main').addEvent('drag', function($event) { Events.catchEvent('Drag', $event); });
			document.getElementById('main').addEvent('dragstart', function($event) { Events.catchEvent('DragStart', $event); });
			document.getElementById('main').addEvent('dragend', function($event) { Events.catchEvent('DragEnd', $event); });
			document.getElementById('main').addEvent('dragover', function($event) { Events.catchEvent('DragOver', $event); });
			document.getElementById('main').addEvent('dragenter', function($event) { Events.catchEvent('DragEnter', $event); });
			document.getElementById('main').addEvent('dragleave', function($event) { Events.catchEvent('DragLeave', $event); });
			document.getElementById('main').addEvent('dragexit', function($event) { Events.catchEvent('DragExit', $event); });
			document.getElementById('main').addEvent('drop', function($event) { Events.catchEvent('Drop', $event); });
			document.getElementById('main').addEvent('contextmenu', function($event) { Events.catchEvent('ContextMenu', $event); });
			document.getElementById('main').addEvent('mousewheel', function($event) { Events.catchEvent('MouseWheel', $event); });
		}
		else
		{
			// Pour test en simulant un mobile sur un navigateur de bureau
			//document.getElementById('main').addEvent('click', function($event) { Events.catchEvent('Click', $event); });
			
			document.getElementById('main').addEvent('touchstart', function($event)
			{
				var now = new Date();

				startX = ($event.clientX || $event.touches[0].pageX);
				startY = ($event.clientY || $event.touches[0].pageY);

				Events.catchEvent('MouseDown', $event);

				if (now.getTime()-Events.doubleTouchStartTimestamp < 500)
					Events.preventDefault($event);

				Events.doubleTouchStartTimestamp = now.getTime();
			});

			document.getElementById('main').addEvent('touchmove', function($event)
			{
				//console.log("Touch event");
				//console.log($event);
				//console.log($event.touches);
				Events.touchMoved = true;
				Events.catchEvent('MouseMove', $event);
			});

			document.getElementById('main').addEvent('touchend', function($event)
			{
				if (Events.touchMoved === true)
					setTimeout(function() { Events.catchEvent('MouseUp', $event) }, 20);
				else
					setTimeout(function() { Events.catchEvent('Click', $event) }, 20);

				Events.touchMoved = false;
			});
			
			document.getElementById('main').addEvent('gesturestart', function($event) { Events.catchEvent('GestureStart', $event); });
			document.getElementById('main').addEvent('gesturechange', function($event) { Events.catchEvent('GestureChange', $event); });
			document.getElementById('main').addEvent('gestureend', function($event) { Events.catchEvent('GestureEnd', $event); });
		}

		document.getElementById('main').onClick = new Array();
		document.getElementById('main').onDblClick = new Array();
		document.getElementById('main').onMouseDown = new Array();
		document.getElementById('main').onMouseMove = new Array();
		document.getElementById('main').onMouseUp = new Array();
		document.getElementById('main').onPointerDown = new Array();
		document.getElementById('main').onPointerMove = new Array();
		document.getElementById('main').onPointerUp = new Array();
		//document.getElementById('main').onMouseOver = new Array();
		//document.getElementById('main').onMouseOut = new Array();
		document.getElementById('main').onDrag = new Array();
		document.getElementById('main').onDragStart = new Array();
		document.getElementById('main').onDragEnd = new Array();
		document.getElementById('main').onDragOver = new Array();
		document.getElementById('main').onDragEnter = new Array();
		document.getElementById('main').onDragLeave = new Array();
		document.getElementById('main').onDragExit = new Array();
		document.getElementById('main').onDrop = new Array();
		document.getElementById('main').onContextMenu = new Array();
		window.onBlur = new Array();
		
		window.onblur = function($event)
		{
			console.log($event);

			Events.keyPressTable = {};
			Events.keyLastPressTable = {};

			for (var i = 0; i < window.onBlur.length; i++)
				window.onBlur[i]($event);
		};

		window.onresize = function() { Events.resize(); };
	},
	
	//////////////////////////////
	//// Mécanisme de signaux ////
	//////////////////////////////
	
	signals: {},
	
	emit: function($eventName, $args)
	{
		//console.log("Trigger : " + $eventName);
		//Debug.callstack();
		
		if (!utils.isset($args))
			$args = [];
		
		//console.log($args);
		//console.log(Events.signals[$eventName]);
		
		if (utils.isset(Events.signals[$eventName]))
		{
			for (var i = 0; i < Events.signals[$eventName].length; i++)
			{
				if (!utils.isset(Events.signals[$eventName][i].node) 
					|| (utils.isset(Events.signals[$eventName][i].node) && utils.isset(Events.signals[$eventName][i].node.parentNode)))
				{
					Events.signals[$eventName][i].apply(Events, $args);
				}
			}
		}
	},
	
	connect: function($eventName, $function, $node)
	{
		if (utils.isset($function))
		{
			if (utils.isset($node))
				$function.node = $node;
			
			if (!utils.isset(Events.signals[$eventName]))
				Events.signals[$eventName] = [];
			
			var index = Events.signals[$eventName].indexOf($function);
			
			if (index < 0)
				Events.signals[$eventName].push($function);
		}
	},
	
	unconnect: function($eventName, $function)
	{
		if (utils.isset(Events.signals[$eventName]))
		{
			var index = Events.signals[$eventName].indexOf($function)
			
			if (index >= 0)
				Events.signals[$eventName].splice(index, 1);
		}
	},
	
	unconnectAll: function() { Events.signals = {}; },
	
	//////////////////////////
	//// Annuler/rétablir ////
	//////////////////////////
	
	undo: doNothing,
	redo: doNothing
};

if (Loader !== null && Loader !== undefined)
	Loader.hasLoaded("events");