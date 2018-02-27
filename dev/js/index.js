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
				this.target = document.getElementById('click-rate')

				this.bindEvents()
			},

			bindEvents() {
				this.copyFooter()

				this.submit.addEventListener('click', (event) => {
					event.preventDefault()
					event.stopPropagation()

					this.submit.innerHTML = 'Loading...'
					this.target.innerHTML = ''

					this.sendData()
				})
			},

			sendData(){
				let token = this.inputToken.value,
					link = this.inputLink.value,
					url = `${base_url}?unit=day&units=-1&rollup=true&access_token=${token}&link=${link}`

				if(token !== '' && link !== ''){
					fetch(url)
					.then((response) => {
						return response.json()
					})
					.then((resp) => {
						const {data} = resp
						this.target.innerHTML = data.link_clicks
						this.submit.innerHTML = 'Measure'
					})

				}else
					this.showErrors(token, link)
			},

			showErrors(token, link){
				this.submit.innerHTML = 'Measure'

				let msg = 'Please,'
				if(token === '')
					msg += ' put your access token'

				if(link === ''){
					if(token === '')
						msg += ' and'
					else
						msg += ' put'

					msg += ' the link you want to measure'
				}

				alert(msg)
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