export const getHeader = () => {
	fetch('../components/header.html')
		.then(res => res.text())
		.then(data => {
			const headerNode = document.getElementById("headerTarget");
			headerNode.innerHTML = data
		});
}

export const getFooter = () => {
	fetch('../components/footer.html')
		.then(res => res.text())
		.then(data => {
			const footerNode = document.getElementById('footerTarget');
			footerNode.innerHTML = data
		});
}

export default {
	getHeader,
	getFooter
}
