import Vue from 'vue'
import VueRouter from 'vue-router'

import index from './components/index'
import explore from './components/explore'
import message from './components/message'
import header from './components/header'
import article from './components/article'
import hh from './components/Hello'
Vue.use(VueRouter)

var App = Vue.extend({}),
    Router = new VueRouter({
        hashbang: false,
        history: true,
        transitionOnLoad: true
    })

Router.map({
    '/': {
        component: header,
        subRoutes: {
            '/': {
                component: index
            },
            'explore': {
                component: explore
            },
            'message': {
                component: message
            }
        }
    },
    '/article/:id': {
        name: 'article',
        component: article,
    }
})
Router.redirect({
    '*': '/article/134dsf'
})
Router.beforeEach(function(transition) {
    console.log("Change")
    transition.next(transition)
})
Router.start(App, 'body')