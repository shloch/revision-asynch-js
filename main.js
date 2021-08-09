// ----- witthout Promise
const getTodos = (url, callback) => {
	const request = new XMLHttpRequest();
	request.addEventListener('readystatechange', () => {
		const SUCCESS_FETCH = 4
		if(request.readyState === SUCCESS_FETCH  && request.status === 200){
			const data = JSON.parse(request.responseText)
			callback(undefined, data)
		} else if(request.readyState === 4) {
			callback('could not fetch data', undefined)
		}
	})

	request.open('GET', url)
	request.send()
}


// ------ with Promise ------
const getTodos2 = (url) => {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.addEventListener('readystatechange', () => {
			const SUCCESS_FETCH = 4
			if(request.readyState === SUCCESS_FETCH  && request.status === 200){
				const data = JSON.parse(request.responseText)
				resolve(data)
			} else if(request.readyState === 4) {
				reject("error getting resource")
			}
		})

		request.open('GET', url)
		request.send()
	})
}

getTodos2('https://jsonplaceholder.typicode.com/todos/1')
.then(data => {
	console.log('promise 1 resolved :', data)
	return  getTodos2('https://jsonplaceholder.typicode.com/todos/2EE')
})
.then(data => {
	console.log('promise 2 resolved :', data)
	return  getTodos2('https://jsonplaceholder.typicode.com/todos/2')
})
.then(data => {
	console.log('promise 3 resolved :', data)
	return  getTodos2('https://jsonplaceholder.typicode.com/todos/3')
})
.catch(err => {
	console.log("promise rejected :", err)
})
