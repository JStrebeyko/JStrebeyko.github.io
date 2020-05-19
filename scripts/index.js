(function setup(context) {
	var container;

	var originalMenuBox;

	var menuBoxCopy;

	var sectionSelected = '';

	var isSectionOpen = false;

	// the boxes will jump between the two layers:
	var wrap = document.querySelector('.full-wrap');
	var articles = document.querySelector('.invisible-container')
	var nav = document.querySelector('nav');
	var menuLinks = Array.from(nav.children);

	/**
	 * First, we disable default link behavior, and set up handle for opening sections.
	 * TODO: IIFE
	 */
	function setupLinks() {
		menuLinks.forEach(function handleEventListeners(el, index) {
			el.addEventListener('click', function handleLinkClick(e) {
				e.preventDefault();
				if (!isSectionOpen) {
					sectionSelected = el.pathname.slice(1);
					originalMenuBox = e.target;
					open()
				}
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
	function open() {
		menuBoxCopy = originalMenuBox.cloneNode(true);
		
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
				ocean();
				break;
			default:
				break;
		}
	}

	function ocean() {
		console.log('OCEAAAN!!!')
		var ocean = document.createElement('div');
		ocean.classList.add('ocean');
		var diagonal = Math.sqrt(window.innerHeight**2 + window.innerWidth**2)
		console.log(diagonal)
		// set dimmensions
		ocean.style.width = diagonal + 'px';
		ocean.style.height = diagonal + 'px';
		wrap.append(ocean)
		wrap.style.visibility = 'visible'
		var to = setTimeout(function() {
			ocean.classList.add('wave');
			console.log(ocean.classList);
		}, 0);
	}
					
		function appendContent() {
			var contentToAppend = articles.querySelector(`article.${sectionSelected}-content`).cloneNode(true)
			var justACloseButton = closeButton.get()
			// Append content & close button
			container.append(contentToAppend);
			container.append(justACloseButton);
			
			setTimeout(function() {
				container.classList.add('full-height');
				contentToAppend.classList.remove('hidden');
				justACloseButton.classList.remove('hidden');
				isSectionOpen = true;
		},0)
	}

	/**
	 * utility class
	 * @param {string} classToAdd
	 * @param {string} classToRemove
	 */
	function retractTextAndReplaceClass(classToAdd, classToRemove) {
		var contents = container.querySelector('article');		
		
		// 1.1. grab article and hide its content			
		contents.classList.add('retract-text')
		container.classList.remove('full-height')
		
		// // 1.2 While contents are disappearing, start minimizing
		var delay = setTimeout(function myDelay() {
			container.classList.remove(classToRemove);
			container.classList.add(classToAdd);
	
			// 1.3 finalize close: remove the container, make the original box visible;
			container.addEventListener('animationend', function onAnimationEnd() {
				container.removeEventListener('animationend', onAnimationEnd)
				originalMenuBox.style.visibility = 'visible';
				container.remove()
				wrap.style.visibility = 'hidden';
				clearTimeout(delay)
				isSectionOpen = false;
			})
		}, 1)

	}
	
	/**
	 *  Close the section, the animation is section-dependant
	 */
	function close() {
	  if (!isSectionOpen) return;
		switch(sectionSelected){
			case 'about':
				retractTextAndReplaceClass('minimized1', 'full-screen1')
				break;
			case 'work':
				retractTextAndReplaceClass('minimized2', 'stretch')
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
			close()
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

	// Keyup control
	window.addEventListener('keyup', handleKeyUp)
	function handleKeyUp(event) {
		const key = event.keyCode;
		// if 1:
		if (key === 49) {
			menuLinks[0].children[0].click()
		}
		// press 2
		if (key === 50) {
			menuLinks[1].children[0].click()
		}
		// press 3
		if (key === 51) {
			menuLinks[2].children[0].click()
		}
		// ESC
		if (key === 27) {
			close()
		}
	}
})(document)