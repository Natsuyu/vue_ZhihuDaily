import Vue from 'vue'
import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'

var index = require('./components/index'),
    explore = require('./components/explore'),
    message = require('./components/message'),
    header = require('./components/header'),
    article = require('./components/article')

Vue.use(VueRouter)
// Vue.use(VueResource)

var App = Vue.extend({}),
    Router = new VueRouter({})

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
Router.beforeEach(function(transition){
    console.log("Change")
    transition.next(transition)
})
Router.start(App, 'body')

