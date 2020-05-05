var container;


function loadSubPageContent(node) {
	var name = node.textContent
	container = node;
	const backButton = document.createElement('button')
}

function copyNodeStyle(sourceNode, targetNode) {
	var computedStyle = window.getComputedStyle(sourceNode);
	var propertiesToCopy = ['height', 'background-color', 'width', 'display', 'position']
  Array.from(computedStyle).forEach(function (key) {
		if (propertiesToCopy.indexOf(key) > -1){
			return targetNode.style.setProperty(key, computedStyle.getPropertyValue(key), computedStyle.getPropertyPriority(key));
		}
  });
}

function copyNodePosition(sourceNode, targetNode) {
	var position = sourceNode.getBoundingClientRect();
	targetNode.style.setProperty('top', position.y + 'px');
	targetNode.style.left = position.x + 'px';
}

function setupLinks() {
	var allLinks = document.querySelectorAll("a")
	allLinks.forEach(function handleEventListeners(el) {
		el.addEventListener('click', handleLinkClick)
	})
}

function handleLinkClick(event) {
	event.preventDefault()
	runFullScreenAnimation(event.target)
}

function runFullScreenAnimation() {
	const wrap = document.querySelector('.full-wrap')
	const target = event.target;
	const nodeCopy = target.cloneNode(true)
	copyNodeStyle(target, nodeCopy)
	copyNodePosition(target, nodeCopy)
	nodeCopy.classList.add('full-screen1')
	nodeCopy.addEventListener('animationend', ()=> loadSubPageContent(nodeCopy))
	target.style.display = 'none';
	wrap.append(nodeCopy)
	wrap.style.zIndex = 2;
}



(function setup(context) {
	setupLinks()
})(document)