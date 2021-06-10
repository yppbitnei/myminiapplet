import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
let store = new Vuex.Store({
   state:{
       currentUser:{},
       navBarHeight:{}
   },
   mutations:{
       setCurrentUser(state,data){
         console.log('dataset',data);
         state.currentUser = {...data};
       },
       setNavBarHeight(state,height){
        state.navBarHeight = height;
       }
   },
   getters:{
       getCurrentUser:(state)=>{
           console.log('currentUser',state.currentUser);
           return state.currentUser;
       },
       getNavBarHeight:(state)=>{
        console.log('navBarHeight',{...state.navBarHeight});
        return state.navBarHeight;
    }
   }
});

export default store;