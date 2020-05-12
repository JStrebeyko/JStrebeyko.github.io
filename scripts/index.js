(function setup(context) {
	var container;
	var originalNode;

	const nav = document.querySelector('nav')
	var [about, work, hire] = nav.children;
	
	const anchorWrappers = {
		about: nav.children[0],
		work: nav.children[1],
		hire: nav.children[2],
	}
	
	// the boxes will jump between the two layers:
	const wrap = document.querySelector('.full-wrap')

	const AboutContent = `<h1>haha</h1>`
	const WorkContent = `<h1>haha</h1>`
	const HireContent = `<h1>haha</h1>`

	const routes = {
		"/about": AboutContent,
		"/work": WorkContent,
		"/hire": HireContent
	}

	function show(node) {

		const subpageName = '/'+node.innerText;

		// Back-button functionality
		(function spawnCloseButton() {
			const closeButton = document.createElement('button');
			closeButton.setAttribute('aria-label', 'close')
			closeButton.classList.add('close');
			const buttonConent = document.createTextNode('×')
			closeButton.append(buttonConent);
			closeButton.addEventListener('click', function addClose() {
				close(node)
				history.pushState({}, '', window.location.origin)
				closeButton.removeEventListener('click', addClose)
			})
			node.append(closeButton);
		})();

		// URL management
		(function manageURL(){
			history.pushState({}, '', window.location.origin + subpageName)
			console.log(history)
		})();

		// populating conent
		(function showContent(){
			// 1.1. Create a div
			var contentDiv = document.createElement('div');
			// contentDiv.classList.add('content');

			// 1.2
			node.append(contentDiv);
			contentDiv.innerHTML = routes[window.location.pathname];
		})();
	}

	function close(node) {
		// 0. get link wrapper:
		
		// originalNode.classList.remove('hidden')

		// 1. Animate back
		// originalBox.getThere(node)
		// node.classList.add('minimize1');
		// console.log(originalBox.get())
		// const {top, left, height, width} = originalBox.get();
		// node.style.top = top;
		// node.style.left = left;
		// node.style.height = height;
		// node.style.width = width;

		// 2. Append to its original position
		node.classList.remove('full-screen1');
		node.classList.add('minimized1');
		node.addEventListener('animationend', function onAnimationEnd() {
			node.removeEventListener('animationend', onAnimationEnd)
			originalNode.style.visibility = 'visible';
			node.remove()
			wrap.style.visibility = 'hidden';
			console.log('should hide!')
		})
		// anchorWrappers[node.textContent].append(node)
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

		// 1.1 let's have a reference to the original menu box:
		originalNode = node;

		// 1.2 copy node and append it to the overlay wrapper with original box's position
		const nodeCopy = node.cloneNode(true)
		originalNode.style.visibility = 'hidden';
		wrap.append(nodeCopy)
		nodeCopy.style.top = `${y}px`;
		nodeCopy.style.left = `${x}px`;

		// 1.3 make the overlay visible
		wrap.style.visibility = 'visible'

		// 2.1 animate fullscreen
		// TODO: differentiate animations conditionally
		nodeCopy.classList.add('full-screen1')

		// 3.1 boxes content animation callback
		nodeCopy.addEventListener('animationend', function addShow() {
			nodeCopy.removeEventListener('animationend', addShow)
			show(nodeCopy);
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