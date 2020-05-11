(function setup(context) {
	var container;

	const nav = document.querySelector('nav')
	var [about, work, hire] = nav.children;
	
	const anchorWrappers = {
		about: nav.children[0],
		work: nav.children[1],
		hire: nav.children[2],
	}
	
	// the boxes will jump between the two layers:
	const wrap = document.querySelector('.full-wrap')

	// let's save the original box position in case we need to retract there:
	var originalBox = {
		set: function setOriginalBox(node) {
			console.log(getComputedStyle(node))
			const { top, left, width, height } = getComputedStyle(node)
			originalBox.top = top
			originalBox.left = left
			originalBox.width = width
			originalBox.height = height
		},
		get: function getOriginalBox() {
			return {
				top: originalBox.top,
				left: originalBox.left,
				width: originalBox.width,
				height: originalBox.height
			}
		},
	}

	/**
	 *  to handle box click
	 * 1. a custom event handler, preventingDefault() and doing router magick.
	 * 2. ANIMATION
	 *    a) appending the box onto the overlay
	 *    b) doing actual animation
	 *    c) when done : providing visibility classes to box children
	 * 3. BACK BUTTON
	 *    a) folding animation
	 * 		b) router magick
	 */

	function show(node) {
		console.log('LOADED')
		console.log(node)
		
		// Back-button functionality
		node.addEventListener('click', function addClose() {
			close(node)
			node.removeEventListener('click', addClose)
		})

	}

	function close(node) {
		// 0. get link wrapper:
		console.log(node.innerText)

		// 1. Animate back
		node.classList.toggle('full-screen1')
		// originalBox.getThere(node)
		// node.classList.add('minimize1');
		console.log(originalBox.get())
		const {top, left, height, width} = originalBox.get();
		node.style.top = top;
		node.style.left = left;
		node.style.height = height;
		node.style.width = width;

		// 2. Append to its original position
		wrap.style.visibility = 'hidden';

		anchorWrappers[node.textContent].append(node)
		// console.log(node.classList)
		console.log('should hide!')
		// node.removeEventListener('click', close)
	}
	// function copyNodeStyle(sourceNode, targetNode) {
	// 	var computedStyle = window.getComputedStyle(sourceNode);
	// 	var propertiesToCopy = ['height', 'background-color', 'width', 'display', 'position']
	//   Array.from(computedStyle).forEach(function (key) {
	// 		if (propertiesToCopy.indexOf(key) > -1){
	// 			return targetNode.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key));
	// 		}
	// 	});
	// 	targetNode
	// }

	// function copyNodePosition(sourceNode, targetNode) {
	// 	var position = sourceNode.getBoundingClientRect();
	// 	targetNode.style.setProperty('top', position.y + 'px');
	// 	targetNode.style.left = position.x + 'px';
	// }

	function setupLinks() {
		[about, work, hire].forEach(function handleEventListeners(el) {
			el.addEventListener('click', function handleLinkClick(e) {
				event.preventDefault()
				open(event.target)
			})
		})
	}

	function open(node) {
		// 1.1 get the box
		const {x, y, width, height} = node.getBoundingClientRect()

		// 1.1 save the original boxes dimensions - DOES NOT WORK, as it saves the absolute (view-port-relative) position values - not the ones against the parent
		originalBox.set(node)
		console.log(originalBox.get())

		// 1.2 append it to the overlay wrapper with original box's position
		wrap.append(node)
		node.style.top = `${y}px`;
		node.style.left = `${x}px`;

		// 1.3 make the overlay visible
		wrap.style.visibility = 'visible'

		// 2.1 animate fullscreen
		// TODO: differentiate animations consitionally
		node.classList.toggle('full-screen1')

		// 3.1 boxes content animation callback"
		node.addEventListener('animationend', function addShow() {
			show(node);
			node.removeEventListener('animationend', addShow)
		})

										// OLD HANDLING - literally copying the node to only append it 🤦‍♂️
										// const target = event.target;
										// const nodeCopy = target.cloneNode(true)
										// copyNodeStyle(target, nodeCopy)
										// copyNodePosition(target, nodeCopy)
										// target.style.display = 'none';
									// copy position
	}

	setupLinks()
})(document)