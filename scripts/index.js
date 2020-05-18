(function setup(context) {
	var container;

	var originalMenuBox;

	var menuBoxCopy;

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
	 * Utility class
	 * @param {string} className animation class to be applied 
	 */
	function animateWithClassAndAppend(className) {
		const {x, y, width, height} = originalMenuBox.getBoundingClientRect()

		// 1.1 copy the original menu box and make it invisible
		originalMenuBox.style.visibility = 'hidden';

		// 1.2 add the copied node to the overlay and position it in the place of the disappeared one
		wrap.append(menuBoxCopy)
		menuBoxCopy.style.top = `${y}px`;
		menuBoxCopy.style.left = `${x}px`;
		wrap.style.visibility = 'visible'

		// 1.3 animate fullscreen
		menuBoxCopy.classList.add(className)
		container = menuBoxCopy;

		// 1.4 boxes content animation callback
		menuBoxCopy.addEventListener('animationend', function addShow() {
			menuBoxCopy.removeEventListener('animationend', addShow)
			appendContent();
		})
	}


	/**
	 *  @param node DOMNode representing a nav box clicked 
	 *  @returns it does not strictly return anything, but
	 *  it should end up with a full screen container.
	 */
	function open(node) {
		originalMenuBox = node;
		menuBoxCopy = node.cloneNode(true);
		
		// Animate accordingly
		switch(sectionSelected){
			// 1. 'About' animation: swipe to left upper corner and enlarge
			case 'about':
				animateWithClassAndAppend('full-screen1')
				break;
			// 2. 'Work' animation: make it full-height, then widen to full width
			case 'work':
				animateWithClassAndAppend('stretch')
				break;
			case 'hire':
			  break;
			default:
				break;
		}
	}

	function appendContent() {
		console.log(sectionSelected)
		var contentToAppend = articles.querySelector(`article.${sectionSelected}-content`).cloneNode(true)
		var justACloseButton = closeButton.get()
		// Append content & close button
		container.append(contentToAppend);
		container.append(justACloseButton);
		
		setTimeout(function() {
			container.classList.add('full-height');
			contentToAppend.classList.remove('hidden');
			justACloseButton.classList.remove('hidden');
		},0)
	}

	/**
	 * utility class
	 * @param {string} classToAdd
	 * @param {string} classToRemove
	 * TODO: use a utility class to avoid repetition below (?)
	 */

	
	/**
	 *  Close the section, the animation is section-dependant
	 */
	function close() {		
		var contents = container.querySelector('article');

		switch(sectionSelected){
			case 'about':
				// 1.1. grab article and hide its content			
				contents.classList.add('retract-text')
				container.classList.remove('full-height')
				
				// 1.2 While contents are disappearing, start minimizing
				var delay = setTimeout(function myDelay(){
					container.classList.remove('full-screen1');
					container.classList.add('minimized1');

					// 1.3 finalize close: remove the container, make the original box visible;
					container.addEventListener('animationend', function onAnimationEnd() {
						container.removeEventListener('animationend', onAnimationEnd)
						originalMenuBox.style.visibility = 'visible';
						container.remove()
						wrap.style.visibility = 'hidden';
						clearTimeout(delay)
					})
				}, 1)
				break;
			case 'work':
				// Repetition:
				contents.classList.add('retract-text')
				container.classList.remove('full-height')

				var delay = setTimeout(function myDelay() {
					container.classList.remove('stretch');
					container.classList.add('minimized2');

					// 1.3 finalize close: remove the container, make the original box visible;
					container.addEventListener('animationend', function onAnimationEnd() {
						container.removeEventListener('animationend', onAnimationEnd)
						originalMenuBox.style.visibility = 'visible';
						container.remove()
						wrap.style.visibility = 'hidden';
						clearTimeout(delay)
					})
				}, 1)
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