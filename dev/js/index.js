'use strict'

import axios from 'axios'

(() => {

	const base_url = 'https://api-ssl.bitly.com/v3/link/clicks',
		jlozovei = 'https://jlozovei.github.io/',
		app = {
			init() {
				this.render()
			},

			cacheDOM() {
				this.inputToken = document.getElementById('accessToken')
				this.inputLink = document.getElementById('link')
				this.submit = document.getElementById('measure')
				this.footer = document.getElementById('footer')

				this.bindEvents()
			},

			bindEvents() {
				this.copyFooter()

				this.submit.addEventListener('click', (event) => {
					event.preventDefault()
					event.stopPropagation()

					this.sendData()
				})
			},

			sendData(){
				let token = this.inputToken.value,
					link = this.inputLink.value,
					url = `${base_url}?format=txt&unit=day&units=-1&rollup=true&access_token=${token}&link=${link}`

				if(token !== '' && link !== '')
					axios.get(url).then((data) => {
						console.log(data)
					})
				else
					this.showErrors()
			},

			showErrors(){
				alert('Put the values')
			},

			copyFooter() {
				let date = new Date(),
					year = date.getFullYear()

				this.footer.innerHTML =  `<p>With <span class="heart">&#x2764;</span> by <a href="${jlozovei}" target="_blank" rel="noopener">jlozovei</a> | &copy; ${year}</p>`	
			},

			render() {
				this.cacheDOM()
			}
		}

	app.init()

})();