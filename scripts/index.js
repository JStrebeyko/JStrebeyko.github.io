(function setup(context) {
	var container;

	var originalMenuBox;

	var sectionSelected = '';
	
	// the boxes will jump between the two layers:
	var wrap = document.querySelector('.full-wrap');
	var articles = document.querySelector('.invisible-container')

	/**
	 * First, we disable default link behavior, and set up handle for opening sections.
	 * TODO: IIFE
	 */
	function setupLinks() {
		var nav = document.querySelector('nav')
		Array.from(nav.children).forEach(function handleEventListeners(el) {
			el.addEventListener('click', function handleLinkClick(e) {
				sectionSelected = el.pathname.slice(1)
				event.preventDefault()
				console.log(event.target)
				open(event.target)
			})
		})
	}
	setupLinks();


	/**
	 *  @param node DOMNode representing a nav box clicked 
	 *  @returns it does not strictly return anything, but
	 *  it should end up with a full screen container.
	 */
	function open(node) {
		
		// 1. Animate accordingly
		switch(sectionSelected){
			// 1.1 'About' animation: swipe to left upper corner and enlarge:
			case 'about':
				const {x, y, width, height} = node.getBoundingClientRect()
				const menuBoxCopy = node.cloneNode(true);
				originalMenuBox = node;
				originalMenuBox.style.visibility = 'hidden';
				wrap.append(menuBoxCopy)
				menuBoxCopy.style.top = `${y}px`;
				menuBoxCopy.style.left = `${x}px`;
				// 1.3 make the overlay visible
				wrap.style.visibility = 'visible'

				// 2.1 animate fullscreen
				// TODO: differentiate animations conditionally
				menuBoxCopy.classList.add('full-screen1')

				container = menuBoxCopy;

				// 3.1 boxes content animation callback
				menuBoxCopy.addEventListener('animationend', function addShow() {
					menuBoxCopy.removeEventListener('animationend', addShow)
					appendContent(menuBoxCopy);
				})
				break;
			case 'work':
				break;
			case 'hire':
			  break;
			default:
				break;
		}
	}

	function appendContent(node) {
		var contentToAppend = articles.querySelector(`article.${sectionSelected}-content`).cloneNode(true)
		var justACloseButton = closeButton.get()
		// Append content & close button
		node.append(contentToAppend);
		node.append(justACloseButton);
		
		setTimeout(function() {
			node.classList.add('full-height');
			contentToAppend.classList.remove('hidden');
			justACloseButton.classList.remove('hidden');
		},0)
	}

	/**
	 *  Close the section, the animation is section-dependant
	 */
	function close() {		
		switch(sectionSelected){
			// 1.1 'About' animation: swipe to left upper corner and enlarge:
			case 'about':
				// 2. Append to its original position
				container.classList.remove('full-screen1');
				container.classList.add('minimized1');
				closeButton.hide()
				// TODO: retract text

				container.addEventListener('animationend', function onAnimationEnd() {
					container.removeEventListener('animationend', onAnimationEnd)
					originalMenuBox.style.visibility = 'visible';
					container.remove()
					wrap.style.visibility = 'hidden';
					console.log('should hide!')
					container=undefined;
				})
				break;
			case 'work':
				break;
			case 'hire':
			  break;
			default:
				break;
		}
	}

	var closeButton = (function closeButton() {
		var button = document.createElement('button');
		button.setAttribute('aria-label', 'close')
		button.classList.add('close', 'hidden');
		var buttonConent = document.createTextNode('×')
		button.append(buttonConent);
		button.addEventListener('click', function addClose() {
			// button.removeEventListener('click', addClose) 
			close()
			// history.pushState({}, '', window.location.origin)
		})
		function get() {
			return button;
		}
		function hide() {
			button.classList.add('hide')
		}
	  function show() {
			button.classList.remove('hide')
		}
		return {get, hide, show}
	})()
	// var myCloseButton = closeButton.get()
	console.log(closeButton.get())
	/**
	 *  The close button:
	 */
	// var closeButtonTmplt = `<button aria-label="close" class="close">×</button>`
})(document)