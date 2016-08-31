import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import index from './components/index'
import explore from './components/explore'
import message from './components/message'
import header from './components/header'
import article from './components/article'
import hh from './components/Hello'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.emulateJSON = true;

Vue.transition('loading', {
    beforeEnter: (el) => {
        document.querySelector('.m-mask').style.display = "block"
    },
    enter: (el) => {
        document.querySelector('.m-mask').style.display = "none"

    }
})

var App = Vue.extend(),
    Router = new VueRouter({
        hashbang: false,
        history: true,
        transitionOnLoad: true
    })

Router.map({
    '/': {
        component: (resolve) => {
            require(['./components/header.vue'], resolve)
        },
        subRoutes: {
            '/': {
                component: (resolve) => {
                    require(['./components/index.vue'], resolve)
                }
            },
            'explore': {
                component: (resolve) => {
                    require(['./components/explore.vue'], resolve)
                }
            },
            'message': {
                component: (resolve) => {
                    require(['./components/message.vue'], resolve)
                }
            }
        }
    },
    '/article/:id': {
        name: 'article',
        component: (resolve) => {
            require(['./components/article.vue'], resolve)
        }
    }
})
Router.redirect({
    //tmp handle 404 page
    '*': '/article/134dsf'
})
Router.beforeEach(function(transition) {
    console.log("Change")
    transition.next(transition)
})
Router.start(App, 'body')