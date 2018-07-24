import Vue from 'vue';
import VueSocketio from 'vue-socket.io';

const axios = require("axios");

// get special token from cookie
axios.defaults.headers.common['x-auth'] = {};

// initate connection with token 'http://localhost:8500/{{{ token }}}')
Vue.use(VueSocketio, 'http://localhost:8500/testing2')

// expose this api
export const api = new Vue({
	data: function() {
		return {
			base_url: "http://localhost:8500"
    }
	},

	methods: {
		async getFeedbacks() {
			return axios.get(`${this.base_url}/feedback`)
		},
		async markAsRead(feedback) {
			return axios.put(`${this.base_url}/feedback/${feedback._id}`, feedback)
		},
		async deleteFb(feedback) {
			return axios.delete(`${this.base_url}/feedback/${feedback._id}`)
		}
  }
})